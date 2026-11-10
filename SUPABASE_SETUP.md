# Shared website content setup

The public catalogue and website settings are read from Supabase. Admin changes
are saved to the shared database, and product/category/hero images are uploaded
to Supabase Storage. Only user IDs listed in `public.site_admins` can make
changes.

## 1. Configure Supabase

1. In Supabase, open **SQL Editor**, paste the contents of `supabase/schema.sql`,
   and run it.
2. In **Authentication → Providers**, enable Email sign-in and disable public
   sign-ups.
3. In **Authentication → Users**, create the admin account with an email and
   password.
4. In SQL Editor, allow that account to edit the site. Replace the email:

   ```sql
   insert into public.site_admins (user_id)
   select id from auth.users where email = 'admin@example.com'
   on conflict (user_id) do nothing;
   ```

   Confirm the statement inserted one row. Do not grant the admin role to
   visitors.

## 2. Configure the app

Copy `.env.example` to `.env.local` for local development and fill in the
Supabase **Project URL** and **publishable/anon key** from Project Settings →
API Keys. These are public client values; never put a `service_role` or secret
key in the browser app.

In Vercel, add the same two variables under **Project → Settings → Environment
Variables** for Production, Preview, and Development:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Redeploy after changing environment variables. They are read during the build.

## 3. Start using shared content

Open the deployed site's Admin ERP tab and sign in with the account created in
Supabase. New product/category/branding/contact changes are synced to Supabase;
visitors receive updates in real time. Images are stored in the public
`site-media` bucket, while uploads and edits require the allowlisted admin
account. If a visitor's live-update connection is temporarily unavailable, the
saved changes are still shared, but that visitor may need to refresh the page.

This app retains existing browser-local content as the initial values on the
admin device. The first signed-in admin session syncs those current values to
Supabase; after that, Supabase is the shared source of truth.
