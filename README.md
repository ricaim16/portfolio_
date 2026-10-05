# Emebet Atsbaha: Portfolio

Personal developer portfolio built with plain HTML, CSS and vanilla JavaScript. No frameworks, no build step.

All content (text, skills, experience, projects, links) lives in [js/data.js](js/data.js). `js/main.js` renders it.

## Run locally

```bash
cd portfolio_16
python3 -m http.server 8000
```

Open http://localhost:8000. After changes, hard refresh with `Ctrl + Shift + R`.

## What to replace

| What | Where |
|---|---|
| LinkedIn URL | `socials` in `js/data.js` (currently `YOUR-LINKEDIN-ID`) |
| Pharmacy GitHub link | `githubUrl` of the Pharmacy project in `js/data.js` (empty = button hidden) |
| More screenshots | Add files to `assets/projects/<project>/` and list them in `images` in `js/data.js` |
| CV | Replace `assets/Emebet_Atsbaha_CV.pdf` (keep the same name) |


## Contact form (Vercel function + Gmail)

The form posts to `api/contact.js`, a Vercel serverless function that emails the message to your Gmail. Your email and password live only in Vercel's environment variables, never in the site code. It does not work on GitHub Pages or when opening `index.html` locally; there the form shows "isn't connected yet".

1. Turn on 2-Step Verification for your Google account, then create an **App Password** at https://myaccount.google.com/apppasswords (name it "Portfolio").
2. Deploy the repo to Vercel (see below).
3. In Vercel: **Project → Settings → Environment Variables**, add (for Production):
   - `GMAIL_USER`: the Gmail address that sends and receives the mail
   - `GMAIL_APP_PASSWORD`: the 16-character App Password
   - `CONTACT_TO` (optional): deliver to a different address than `GMAIL_USER`
4. **Redeploy** (Deployments → ⋯ → Redeploy), then send a test message from the live site. Hitting Reply in Gmail answers the visitor.

Test locally with `npx vercel dev` (it reads variables from a git-ignored `.env` file).

## Deploy

### GitHub Pages
1. Create a repository and push this folder to it (`index.html` at the repo root).
2. In the repo go to **Settings → Pages**.
3. Under **Build and deployment** choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. Your site appears at `https://<username>.github.io/<repo>/` after a minute.

### Vercel (recommended, needed for the contact form)
1. Push the repo to GitHub, then on https://vercel.com choose **Add New → Project** and import it.
2. Framework preset: **Other**. Leave the build command and output directory empty (the site is served from the repo root).
3. Add the environment variables from the section above, then **Deploy**.

## Structure

```
portfolio_16/
├── index.html
├── css/style.css
├── js/data.js      all content
├── js/main.js      rendering, nav, theme, lightbox, form
├── api/contact.js  emails the contact form (Vercel function)
├── package.json
└── assets/
    ├── Emebet_Atsbaha_CV.pdf
    ├── favicon.svg
    └── projects/   ethiopost-crm, ethiopost-legal, flora-skincare, pharmacy
```
