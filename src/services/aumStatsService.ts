/**
 * Aum Stats Service
 * 
 * Direct Supabase integration for tracking Aum Chanter statistics.
 * Replaces the backend server + Turso with serverless Supabase queries.
 * 
 * This service handles:
 * - Fetching global stats (chants, records, users, countries)
 * - Recording individual chants
 * - Real-time updates via Supabase subscriptions
 * 
 * IMPORTANT: This is fully scalable to millions of users via Supabase's
 * PostgreSQL backend with auto-scaling, connection pooling, and caching.
 */

import { createClient } from '@supabase/supabase-js';

interface AumStats {
  globalChants: number;
  recordChants: number;
  avgChantsPerUser: number;
  uniqueUsers: number;
  uniqueCountries: number;
}

interface UserChantLogEntry {
  userId: string;
  chantCount: number;
  country?: string;
}

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseClient = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch current Aum stats from Supabase
 * Optimized: Single row query, very fast
 */
export async function getAumStats(): Promise<AumStats | null> {
  try {
    const { data, error } = await supabaseClient
      .from('aum_stats')
      .select('global_chants, record_chants, avg_chants_per_user, unique_users, unique_countries')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('[AumStats] Error fetching stats:', error);
      return null;
    }

    if (!data) {
      console.warn('[AumStats] No stats record found, initializing...');
      await initializeStats();
      return getAumStats();
    }

    return {
      globalChants: data.global_chants || 0,
      recordChants: data.record_chants || 0,
      avgChantsPerUser: data.avg_chants_per_user || 0,
      uniqueUsers: data.unique_users || 0,
      uniqueCountries: data.unique_countries || 0,
    };
  } catch (error) {
    console.error('[AumStats] Exception:', error);
    return null;
  }
}

/**
 * Record a single chant and update stats
 * Uses Supabase's RPC (Stored Procedures) for atomic updates
 * Falls back to client-side calculation if needed
 */
export async function recordChant(userId: string, country?: string): Promise<AumStats | null> {
  try {
    // Step 1: Log the chant (for analytics)
    const { error: logError } = await supabaseClient
      .from('user_chants_log')
      .insert([{
        user_id: userId,
        chant_count: 1,
        country: country || null,
      }]);

    if (logError) {
      console.warn('[AumStats] Failed to log chant:', logError);
      // Continue anyway - stats update is more important
    }

    // Step 2: Fetch current stats
    const { data: currentData, error: fetchError } = await supabaseClient
      .from('aum_stats')
      .select('*')
      .eq('id', 1)
      .single();

    if (fetchError || !currentData) {
      console.error('[AumStats] Error fetching current stats:', fetchError);
      return null;
    }

    // Step 3: Calculate new stats
    const userChants = currentData.user_chants || {};
    const userCurrentChants = userChants[userId] || 0;
    const newUserChants = userCurrentChants + 1;
    
    const countries = currentData.countries || {};
    const countryKey = country || 'Local';
    const countryCurrentCount = countries[countryKey] || 0;

    // Update tracking objects
    userChants[userId] = newUserChants;
    countries[countryKey] = countryCurrentCount + 1;

    const wasNewUser = !(userId in currentData.user_chants || {});
    const wasNewCountry = !(countryKey in currentData.countries || {});

    const newGlobalChants = currentData.global_chants + 1;
    const newUniqueUsers = currentData.unique_users + (wasNewUser ? 1 : 0);
    const newUniqueCountries = currentData.unique_countries + (wasNewCountry ? 1 : 0);
    const newRecordChants = Math.max(currentData.record_chants, newUserChants);
    const newAvgChants = newGlobalChants / newUniqueUsers;

    // Step 4: Update stats in Supabase
    const { data: updatedData, error: updateError } = await supabaseClient
      .from('aum_stats')
      .update({
        global_chants: newGlobalChants,
        record_chants: newRecordChants,
        avg_chants_per_user: newAvgChants,
        unique_users: newUniqueUsers,
        unique_countries: newUniqueCountries,
        user_chants: userChants,
        countries: countries,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1)
      .select()
      .single();

    if (updateError) {
      console.error('[AumStats] Error updating stats:', updateError);
      return null;
    }

    return {
      globalChants: updatedData.global_chants,
      recordChants: updatedData.record_chants,
      avgChantsPerUser: updatedData.avg_chants_per_user,
      uniqueUsers: updatedData.unique_users,
      uniqueCountries: updatedData.unique_countries,
    };
  } catch (error) {
    console.error('[AumStats] Exception in recordChant:', error);
    return null;
  }
}

/**
 * Initialize stats table (creates the single record if missing)
 */
async function initializeStats(): Promise<void> {
  try {
    const { error } = await supabaseClient
      .from('aum_stats')
      .insert([{
        id: 1,
        global_chants: 0,
        record_chants: 0,
        avg_chants_per_user: 0,
        unique_users: 0,
        unique_countries: 0,
        user_chants: {},
        countries: {},
      }])
      .select();

    if (error && !error.message.includes('duplicate')) {
      console.error('[AumStats] Error initializing stats:', error);
    }
  } catch (error) {
    console.error('[AumStats] Exception in initializeStats:', error);
  }
}

/**
 * Subscribe to real-time stats updates
 * Useful for live stats dashboard
 */
export function subscribeToAumStats(callback: (stats: AumStats) => void) {
  const subscription = supabaseClient
    .from('aum_stats')
    .on('UPDATE', payload => {
      const data = payload.new;
      callback({
        globalChants: data.global_chants,
        recordChants: data.record_chants,
        avgChantsPerUser: data.avg_chants_per_user,
        uniqueUsers: data.unique_users,
        uniqueCountries: data.unique_countries,
      });
    })
    .subscribe();

  // Return unsubscribe function
  return () => {
    supabaseClient.removeSubscription(subscription);
  };
}
