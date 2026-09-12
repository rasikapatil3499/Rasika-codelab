# Supabase Authentication Setup

GitHub Pages hosts static files only. It does not store passwords or run a backend. This project uses Supabase for authentication and profile data.

## 1. Create the Supabase project

1. Create a project at https://supabase.com.
2. Open **Authentication > Providers**.
3. Enable **Email**.
4. Enable **Google** and configure the Google OAuth client in Google Cloud.
5. Open **SQL Editor** and run `supabase/schema.sql`.

## 2. Configure the frontend

Open `js/auth.js` and replace:

```js
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

Use the URL and the publishable/anon key from **Project Settings > API**. The publishable/anon key is intended for browser use. Never put a `service_role` key in this repository.

## 3. Configure redirect URLs

In **Authentication > URL Configuration**, add both local and GitHub Pages URLs. Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your values:

```text
http://localhost:5500/login.html
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/login.html
```

The Google Cloud OAuth client must also allow the Supabase callback URL shown by Supabase in the Google provider settings.

## 4. Run locally

Use a local web server. Opening `login.html` directly with `file://` will not work with OAuth.

```bash
python -m http.server 5500
```

Then open `http://localhost:5500/login.html`.

## 5. Publish on GitHub Pages

Push the project to GitHub, then select **Settings > Pages > Deploy from a branch** and choose the branch/folder containing the HTML files. Add the final GitHub Pages URL to Supabase redirect URLs before testing Google login.

User passwords and provider identities are stored by Supabase Auth. Application profile fields are stored in the `public.profiles` table protected by row-level security. Do not store passwords in HTML, JavaScript, GitHub, or localStorage.
