# Osu!Multitool
Live scores, rankings, PP calculators, BPM test, map PP with mods. Static HTML/CSS/JS + Vercel serverless (`api/`) + Supabase.
Player avatars, country flags, beatmap covers and team images are displayed from osu! API data and osu!'s image hosts.
The interface is available in Russian and English; the language choice is saved in the browser.
Privacy and Terms pages describe the account cookie, profile data, saved Live scores, BPM test data, external services, and non-commercial MIT-licensed use.

## Setup
1. Run `schema.sql` in Supabase. Live score tracking stores scores observed after setup; earlier osu! scores are not backfilled.
2. Create an osu! OAuth app; callback: `https://YOUR-DOMAIN/api/auth?a=callback`.
3. Set env vars from `.env.example` in Vercel.
4. Push to GitHub and import into Vercel.
5. The Live page ranks observed scores by rolling day, week, 30-day month, 365-day year, or all-time, with worldwide and country filters. Historical scores from before tracking was enabled cannot be backfilled.
