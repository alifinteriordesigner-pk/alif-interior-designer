# Alif Interior Designer — Website

Marketing website for **Alif Interior Designer**, built with React, Vite, TypeScript, Tailwind CSS and React Router.
Every public page is **prerendered to static HTML at build time** (good for search engines and link previews) and then
becomes an interactive React app in the browser. It has no backend, database or tracking scripts.

- Pages: Home, About, Services, Projects (with filters), Project details (with lightbox gallery), Contact
- The inquiry form opens WhatsApp with a ready-made message. The visitor still has to press **Send** in WhatsApp.
- All business details and content live in a few editable files (see below)

---

## 1. Requirements

Install **Node.js 24 LTS** (22.12 or newer also works) from <https://nodejs.org>. Then check it in a terminal:

```bash
node -v   # should print v24.x (or v22.12+)
npm -v
```

If you use `nvm`, run `nvm use` inside the project; the `.nvmrc` file selects Node 24.

## 2. Install, run and build

```bash
cd alif-interior-designer
npm install          # install dependencies (uses package-lock.json)
npm run dev          # development server → http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload |
| `npm run build` | Type-check, build the site and prerender every page into `dist/` |
| `npm run preview` | Serve the built `dist/` folder locally → http://localhost:4173 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript checks |
| `npm test` | Unit tests (form validation and WhatsApp/email link building) |
| `npm run check` | Lint + tests + build, all in one go (run this before pushing) |

---

## 3. Where to edit things

| What | File |
|---|---|
| Business name, email, phone, **WhatsApp**, address, service area, hours, social links, website URL, default SEO text, logo | `src/config/business.ts` |
| Services (title, description, scope, image) | `src/data/services.ts` |
| Projects / portfolio | `src/data/projects.ts` |
| FAQs | `src/data/faqs.ts` |
| Design process stages, "why our approach" points, founder/team | `src/data/content.ts` |
| Home page text (hero, studio intro) | `src/pages/Home.tsx` |
| About page text | `src/pages/About.tsx` |
| Page titles & descriptions for search engines | `src/lib/seo.ts` (`STATIC_PAGES`) |
| Colours and fonts | `src/index.css` (`@theme` block) |
| Photographs | `public/images/` (see below) |

### Contact information

Open `src/config/business.ts` and fill in the real values. **Anything left as `''` is hidden on the website.** The site
never shows invented details.

- `email`: the **public** email you want customers to use. It doesn't have to be your Git/GitHub email.
- `phone`: written the way visitors should read it, e.g. `+92 300 1234567`.
- `whatsapp`: **digits only** in international format: country code + number, with no `+`, spaces or leading `0`
  (e.g. `923001234567`). Once this is set:
  - the floating WhatsApp button appears on every page except Contact,
  - the contact form's **Continue in WhatsApp** button is enabled.
- `siteUrl`: the live address, e.g. `https://alifinteriordesigner.pk` (or your `*.vercel.app` address until the domain
  is ready). It enables canonical URLs, absolute social-preview image links and `sitemap.xml`.
- `mapEmbedUrl`: only if you have a real studio location. In Google Maps choose *Share → Embed a map* and copy just the
  `src="…"` URL.
- `logo.src`: put a logo file in `public/images/` (SVG or PNG, about 180×48) and set e.g. `'/images/logo.svg'`. When it
  is empty, the text logo is used.

### Founder / team

The About page shows a team section **only** when `team` in `src/data/content.ts` contains real people. Add entries with
a name, role, short bio and an optional photo path.

### Adding or replacing a project

1. Prepare photos in a **3:2 landscape** ratio and export each one twice as WebP:
   `my-project-1-800.webp` (800×533) and `my-project-1-1600.webp` (1600×1067). Free tools such as
   <https://squoosh.app> can resize and convert them. Aim for roughly 100–250 KB per 1600 px file.
2. Copy them into `public/images/`.
3. In `src/data/projects.ts`, copy an existing project block and change:
   - `slug`: the page URL, lowercase with hyphens (e.g. `gulberg-apartment` → `/projects/gulberg-apartment`)
   - `title`, `category` (`Residential`, `Commercial` or `Renovation`), `summary`, `brief`, `concept`, `features`
   - `cover` and `gallery`: the image base names without `-800.webp` / `-1600.webp`, plus a short description (`alt`) of
     each photo for visually impaired visitors
   - `isSample: false` for real client work, which removes the "Concept Project" label
   - `location`, `area` and `year` only if you have real values
   - `featured: true` on up to three projects to show them on the home page
4. Delete the sample projects you no longer need.

New projects get their own page and sitemap entry automatically on the next build.

### Replacing other photographs

Keep the **same file names** and sizes in `public/images/` and overwrite the files, or use new names and update the
references (`src/data/services.ts`, `src/pages/Home.tsx`, `src/pages/About.tsx`). The hero uses three files:
`hero-1920.webp` (1920×1200), `hero-1280.webp` (1280×800) and `hero-mobile.webp` (800×1100, portrait). The social-share
image is `og-image.jpg` (1200×630).

The current photos are licensed **sample images from Unsplash**, not your work. Their sources and license terms are
listed in [`docs/IMAGE_CREDITS.md`](docs/IMAGE_CREDITS.md).

---

## 4. Publish the code to GitHub (account: `alifinteriordesigner-pk`)

These steps are **not done yet**. Do them yourself when you are ready. They do not change your global Git settings.

1. Sign in to GitHub as **alifinteriordesigner-pk** and open <https://github.com/new>.
2. Repository name: `alif-interior-designer`. Choose Private or Public. **Do not** add a README, .gitignore or license
   (the project already has them). Click **Create repository**.
3. In a terminal, inside the `alif-interior-designer` folder:

```bash
npm run check                       # make sure everything builds
git init -b main
git add .
git status                          # check: no node_modules, dist, .env or credential files listed
git commit -m "Initial website"
git remote add origin https://github.com/alifinteriordesigner-pk/alif-interior-designer.git
git push -u origin main
```

If you have the GitHub CLI, `gh repo create alifinteriordesigner-pk/alif-interior-designer --private --source . --push`
does steps 2–3 in one go.

> Keep files like `Creds.txt` **outside** this project folder. They are also listed in `.gitignore` as a safety net.
> Never commit passwords or tokens.

## 5. Deploy on Vercel

1. Sign in at <https://vercel.com> (with the Google account linked to your Vercel account).
2. **Connect GitHub:** *Account Settings → Authentication / Git* (or the prompt on the import screen) → connect GitHub and
   give the Vercel app access to the `alif-interior-designer` repository.
3. **Import:** *Add New… → Project* → pick `alif-interior-designer` → **Import**.
4. **Build settings.** These are detected automatically and are also stored in `vercel.json`:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install` (default)
   - Node.js version (*Settings → Build and Deployment*): **24.x**
   - No environment variables are needed.
5. Click **Deploy**. When it finishes you get a `https://<project>.vercel.app` address.
6. Put that address (or your final domain) into `siteUrl` in `src/config/business.ts`, then commit and push so canonical
   URLs and the sitemap use it.

### How routing works on Vercel

The build writes one HTML file per page (`about.html`, `projects/ivory-arch-living.html`, …). `vercel.json` sets
`"cleanUrls": true`, so `/about` serves `about.html`, and refreshing or opening any page directly works. Unknown URLs
get the prerendered `404.html` with a real 404 status. There is **no blanket rewrite to index.html**, so static files,
assets and any future `/api` functions are not overridden.

### Costs

- **Hosting:** Vercel's free *Hobby* plan is limited to personal, non-commercial use under Vercel's terms. A business
  website will usually need a paid plan (e.g. *Pro*). Check <https://vercel.com/pricing> for current terms before
  launching.
- **Domain:** registering `alifinteriordesigner.pk` (if it is available) is a **separate** cost paid to a domain
  registrar, with **renewal fees** every registration period. Vercel hosting does not include `.pk` domain registration.

## 6. Connect a custom domain

1. Register the domain with a registrar. For `.pk` domains this goes through PKNIC or one of its resellers. The domain
   name in this project is only a suggestion; check that it is available first.
2. In Vercel: *Project → Settings → Domains → Add* → enter `alifinteriordesigner.pk` and also add `www.alifinteriordesigner.pk`
   (Vercel will offer to redirect one to the other).
3. Vercel then shows the **exact DNS records** to create, typically an `A` record for the root domain and a `CNAME`
   for `www`, or nameservers if you choose Vercel DNS. Copy **those** values into your registrar's DNS settings. Don't
   copy values from guides, because Vercel's displayed records are what count.
4. Wait for DNS to propagate (minutes to 48 hours). Vercel shows "Valid Configuration" and issues HTTPS automatically.
5. Set `siteUrl` in `src/config/business.ts` to `https://alifinteriordesigner.pk` (or the `www` version you chose as
   primary) and push.

## 7. Making updates

```bash
# edit files…
npm run check
git add .
git commit -m "Describe the change"
git push
```

Every push to `main` triggers a new production deployment. Pushes to other branches create preview deployments with
their own URL, which is handy for reviewing changes first.

## 8. Restoring a previous version

- **Instant:** Vercel → *Project → Deployments* → open an earlier successful deployment → **⋯ → Promote to Production**
  (or use *Instant Rollback*). The site switches back within seconds.
- **In the code:** `git revert <commit>` then `git push` creates a new commit that undoes the change, and Vercel
  redeploys automatically.

---

## Project structure

```
public/            favicon, images (served as-is)
scripts/
  prerender.mjs    build step: renders every route to HTML, writes 404.html, robots.txt, sitemap.xml
src/
  config/          business.ts (contact & SEO settings), navigation.ts
  data/            services, projects, faqs, general content, image helpers
  components/      Header, Footer, Button, SectionHeading, ServiceSection, ProjectCard,
                   ProjectGallery (lightbox), InquiryForm, WhatsAppButton, SiteImage, …
  pages/           Home, About, Services, Projects, ProjectDetail, Contact, NotFound
  lib/             seo.ts (titles, meta, structured data), inquiry.ts (validation & message building)
  entry-server.tsx used only at build time for prerendering
  main.tsx         browser entry
docs/IMAGE_CREDITS.md
vercel.json        Vercel build/output settings, clean URLs, cache headers
```

## The inquiry form

- It validates name, email, optional phone, service, optional location and description, with accessible error
  messages.
- It builds a readable message, URL-encodes it and opens `https://wa.me/<number>?text=…`. The visitor must press
  **Send** in WhatsApp; the site never claims an inquiry was submitted.
- Nothing is stored (no localStorage, cookies or logging).
- Until `whatsapp` is configured, the button is disabled and a notice explains that this contact method isn't available
  yet.
- **Adding real email submission later:** create a Vercel function (e.g. `api/inquiry.ts`) that validates the data with
  the same `validateInquiry` from `src/lib/inquiry.ts` and sends an email through a provider such as Resend or Postmark.
  Then replace the body of `handOff` in `src/components/InquiryForm.tsx` with a `fetch('/api/inquiry', …)`. The form
  layout doesn't need to change. Keep API keys in Vercel environment variables, never in the code.

## SEO notes and limitations

- Each page has its own title, description, Open Graph tags and (once `siteUrl` is set) a canonical URL, all baked into
  the static HTML at build time. Crawlers and link-preview bots that don't run JavaScript still see them.
- `robots.txt` is always generated. `sitemap.xml` is generated **only when `siteUrl` is set**, because sitemaps need full
  URLs. The build prints a reminder while it is empty.
- Until `siteUrl` is set, `og:image` uses a relative path. Some platforms (WhatsApp, Facebook, LinkedIn) need an
  absolute image URL to show a preview picture, so set `siteUrl` before sharing links. Platforms also cache previews,
  so changes may take time to appear.
- Structured data (schema.org) is added to the home page using **only** values you have filled in. It does not include
  ratings, reviews or claims.
- Prerendering and good metadata help search engines, but they don't guarantee indexing or rankings. After launch, add
  the site to Google Search Console and submit the sitemap.
- The **Projects** filter is not reflected in the URL, so filtered views can't be bookmarked or shared.
