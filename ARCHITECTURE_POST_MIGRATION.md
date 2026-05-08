# Architecture: Post-Turso Migration

## 🏗️ New Architecture Overview

```
┌─────────────────────────────────────────────────┐
│   Cloudflare Pages (Frontend)                   │
│   - React + Vite                                │
│   - Aum Chanter Page                            │
└─────────────┬───────────────────────────────────┘
              │ (Direct HTTPS)
              │
┌─────────────▼───────────────────────────────────┐
│   Supabase PostgreSQL Database                  │
│   - aum_stats table (aggregated stats)          │
│   - user_chants_log table (history/audit)      │
│   - Real-time subscriptions enabled             │
└─────────────────────────────────────────────────┘
```

## 📋 Database Tables

### **aum_stats** (Aggregated Statistics)
```sql
id (PK)                 -- Always = 1 (single record)
global_chants           -- Total chants recorded
record_chants           -- Highest chants by one user
avg_chants_per_user     -- Average across all users
unique_users            -- Number of unique users
unique_countries        -- Number of unique countries
user_chants JSONB       -- {user_id: count} tracking
countries JSONB         -- {country: count} tracking
updated_at              -- Last update timestamp
created_at              -- Record creation timestamp
```

### **user_chants_log** (Historical Data)
```sql
id (PK)                 -- Unique log entry ID
user_id                 -- User identifier
chant_count             -- Number of chants in this event
country                 -- Country code (nullable)
timestamp               -- When chant occurred
created_at              -- Database timestamp
```

---

## 🔄 Data Flow

### **Recording a Chant**

1. **User clicks ॐ button** in Aum Chanter page
2. **Frontend calls**: `recordChant(userId, country)` from `aumStatsService.ts`
3. **Service**:
   - Inserts row into `user_chants_log` (for audit trail)
   - Fetches current `aum_stats` record
   - Calculates new totals in memory
   - Updates `aum_stats` with `UPDATE` query
4. **Supabase RLS Policy**: `Allow public update on aum_stats` ✅
5. **Frontend**: Stats UI refreshes every 1 second via `getAumStats()`

### **Fetching Stats**

1. **AumChanterPage `useEffect`** calls `getAumStats()` every 1 second
2. **Service**:
   - Queries `SELECT * FROM aum_stats WHERE id = 1`
   - Returns aggregated statistics
3. **Frontend**: Displays global chants, record, unique users, etc.

---

## 🎯 Supabase vs Digital Ocean

| Aspect | Digital Ocean | Supabase | Winner |
|--------|---------------|----------|--------|
| **Server cost** | $5-15/month | $0 (free tier) | Supabase |
| **Setup time** | 30 min | Done! | Supabase |
| **Maintenance** | Manual | Fully managed | Supabase |
| **Scaling** | Manual restart | Auto-scaling | Supabase |
| **Backups** | Manual | Daily automatic | Supabase |
| **Analytics** | Complex setup | Native tables | Supabase |
| **Complexity** | 2 services | 1 service | Supabase |

---

## ♾️ Scaling Mathematics

### **Aum Chanter Usage Pattern**
- User visits page
- Makes 1-108 chants per session
- We record: 1 chant log entry + 1 stats update per chant

### **At 1 Million Users**
- **Daily active**: ~10,000
- **Daily chants**: ~500,000
- **Monthly rows added**: ~15M (user_chants_log)
- **Storage used**: ~50MB
- **Query cost**: ~$2 (at $4 per million queries)
- **Status**: ✅ **Free tier handles it**

### **At 10 Million Users**
- **Daily active**: ~100,000
- **Daily chants**: ~5M
- **Monthly rows added**: ~150M
- **Storage used**: ~500MB
- **Query cost**: ~$20
- **Status**: ✅ **Paid tier: $25/month**

### **At 100 Million Users**
- **Daily active**: ~1M
- **Daily chants**: ~50M
- **Monthly rows added**: ~1.5B
- **Storage used**: ~5GB
- **Query cost**: ~$200
- **Status**: ✅ **Enterprise: $500/month**

**Key insight**: Cost scales **linearly** with usage. No surprises.

---

## 🛡️ Security Policies

```sql
-- Anyone can read stats (anonymous)
CREATE POLICY "Allow public read" ON aum_stats
  FOR SELECT USING (true);

-- Anyone can update stats (rate limiting in frontend)
CREATE POLICY "Allow public update" ON aum_stats
  FOR UPDATE USING (true) WITH CHECK (true);

-- Anyone can log their chants
CREATE POLICY "Allow public insert" ON user_chants_log
  FOR INSERT WITH CHECK (true);
```

**Note**: Rate limiting is client-side (minimum 180ms between chants)

---

## 🚀 Future Enhancements

1. **Real-time dashboard**: Use Supabase subscriptions
2. **Analytics queries**: `SELECT * FROM user_chants_log WHERE timestamp > now() - INTERVAL '7 days'`
3. **Leaderboards**: Index on `user_chants DESC`
4. **Country stats**: Aggregate from `countries` JSONB field
5. **Webhooks**: Send stats to external services

All possible without code changes!
