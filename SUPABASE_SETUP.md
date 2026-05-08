# 🚀 Supabase Setup Guide for Admin Moderator System

When you're ready to go online with multi-user moderator support, follow these steps.

---

## ⏱️ Estimated Time: 10-15 minutes

---

## Step 1: Create Supabase Project (2 min)

1. Go to **[supabase.com](https://supabase.com)**
2. Click **"Start your project"** (sign up if needed)
3. Click **"New Project"**
4. Fill in:
   - **Name**: `ramakrishna-admin` (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to South Africa
5. Click **"Create new project"**
6. Wait ~2 minutes for setup

---

## Step 2: Create Database Tables (2 min)

1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Open the file `supabase-schema.sql` from this project
4. Copy ALL contents and paste into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

✅ Tables created: `admin_users`, `mantra_assignments`

---

## Step 3: Get Your API Keys (1 min)

1. Click **"Project Settings"** (gear icon, bottom left)
2. Click **"API"** in the sidebar
3. Copy these two values:

```
Project URL:     https://xxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 4: Configure Environment (2 min)

1. Create a `.env` file in your project root (if not exists)
2. Add these lines with YOUR values:

```env
VITE_SUPABASE_ADMIN_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ADMIN_ANON_KEY=your-anon-key-here
```

⚠️ **IMPORTANT**: Never commit `.env` to Git!

---

## Step 5: Enable Supabase (1 min)

Open `src/config/supabaseAdmin.ts` and change line 22:

**FROM:**
```typescript
export const USE_SUPABASE_ADMIN = false;
```

**TO:**
```typescript
export const USE_SUPABASE_ADMIN = true;
```

---

## Step 6: Test Locally (2 min)

> ✅ Supabase package is already installed!

1. Start the dev server: `bun run dev`
2. Go to `http://localhost:8080/admin/login`
3. Login with `RKCAdmin2024`
4. Create a test moderator
5. Check Supabase dashboard → Table Editor → `admin_users`
6. You should see the new moderator!

---

## Step 7: Deploy (2 min)

1. Add environment variables to Cloudflare Pages:
   - Go to Cloudflare Dashboard → Pages → Your Project → Settings
   - Click "Environment variables"
   - Add `VITE_SUPABASE_ADMIN_URL` and `VITE_SUPABASE_ADMIN_ANON_KEY`
2. Commit and push your changes
3. Cloudflare will auto-deploy

---

## ✅ Done!

Your moderator system is now online. Multiple users can:
- Login from anywhere with their moderator codes
- Work on assigned mantras simultaneously
- Submit work for your review
- See real-time status updates

---

## 🔒 Security Recommendations (Optional)

For production, consider:

1. **Change Super Admin Code**: Update `SUPER_ADMIN_CODE` in `src/types/adminTypes.ts`
2. **Restrict Admin Access**: Keep admin routes dev-only OR add proper authentication
3. **Review RLS Policies**: Customize Row Level Security in Supabase if needed

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Supabase credentials not configured" | Check `.env` file has correct values |
| Tables not found | Run `supabase-schema.sql` in SQL Editor |
| Login not working | Check browser console for errors |
| Data not saving | Verify RLS policies in Supabase |

---

## 📁 Files Reference

| File | Purpose |
|------|---------|
| `src/config/supabaseAdmin.ts` | Toggle switch & config |
| `src/services/supabaseAdminStorage.ts` | Supabase implementation |
| `supabase-schema.sql` | Database tables SQL |
| `.env.example` | Environment template |

---

**Questions?** The system is designed to work identically whether using local storage or Supabase - just flip the switch!

