# 🔐 Your Supabase Credentials

These are YOUR Supabase credentials - keep them safe!

## Project Details
- **Project URL**: https://hzarmvixgfrnaclcberb.supabase.co
- **Project ID**: `hzarmvixgfrnaclcberb`
- **Account Email**: viprananda@gmail.com

## API Keys
- **Public Anon Key**: `sb_publishable_zlCjSjqW9rQCFA7sDUMB5Q_fsvaaYUi`
- **Database URL**: `postgresql://postgres:[YOUR-PASSWORD]@db.hzarmvixgfrnaclcberb.supabase.co:5432/postgres`

## Configured in Your App
Your `.env.local` and `.env.production` files are already configured to use:
- `VITE_SUPABASE_URL=https://hzarmvixgfrnaclcberb.supabase.co`
- `VITE_SUPABASE_ANON_KEY=sb_publishable_zlCjSjqW9rQCFA7sDUMB5Q_fsvaaYUi`

## ✅ Next Steps

### 1. Access Your Supabase Dashboard
Go to: https://supabase.com/dashboard
Log in with: `viprananda@gmail.com`

### 2. Select Your Project
Click on project `hzarmvixgfrnaclcberb`

### 3. Create Tables from SQL Schema
1. Go to **SQL Editor**
2. Click **New Query**
3. Paste contents from: `supabase-aum-stats-schema.sql`
4. Click **Run**

This creates:
- `aum_stats` - aggregated Aum Chanter statistics
- `user_chants_log` - historical chant data for analytics

### 4. Verify Tables Exist
1. Go to **Table Editor**
2. You should see `aum_stats` and `user_chants_log` tables
3. Both tables have proper RLS policies for public access

## 🚀 Ready to Go!
Your app is now configured to use YOUR Supabase project!
