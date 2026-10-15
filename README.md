# Osu!Multitool
Live scores, rankings, PP calculators, BPM test, map PP with mods. Static HTML/CSS/JS + Vercel serverless (`api/`) + Supabase.
Player avatars, country flags, beatmap covers and team images are displayed from osu! API data and osu!'s image hosts.
The interface is available in Russian and English; the language choice is saved in the browser.

## Setup
1. Run `schema.sql` in Supabase.
2. Create an osu! OAuth app; callback: `https://YOUR-DOMAIN/api/auth?a=callback`.
3. Set env vars from `.env.example` in Vercel.
4. Push to GitHub and import into Vercel.
