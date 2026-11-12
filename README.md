# Mike Gilbert Portfolio

Static site. No build step, no frameworks. Hosts free on GitHub Pages.

## Host on GitHub Pages
1. Create a new repository on github.com (public). For a root domain, name it `yourusername.github.io`.
2. Upload the **contents** of this folder (not the folder itself) so `index.html` sits at the repository root. For 1,700 files, use GitHub Desktop or `git add . && git commit -m "site" && git push` rather than the web uploader.
3. Repository Settings > Pages > Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`. Save.
4. The site goes live in a minute or two at `https://yourusername.github.io/repo-name/`. All paths are relative, so it works in a subfolder.
5. Custom domain (mikegilbert.net): add it under Settings > Pages, then point your DNS to GitHub Pages as shown in their docs.

## Structure
- `index.html` splash (logo plays once, click to enter, fade, then goes to `home/`)
- `home/`, `animation/`, `illustration/`, `graphic-design/`, `motion-graphics/` 4 x 4 tile grids
- `about/`, `contact/`
- `projects/<project-name>/` 16 project pages (for example `projects/rick-and-morty/`), one per Home tile, in the same order. Replace the lorem ipsum paragraphs (marked CASE STUDY TEXT) with your case study.
- Each page folder has its own `images/` folder. Swap files in place, keep the same names.

## Rollover images
Every tile has a pair: `rick-and-morty_static.jpg` (shown by default) and `rick-and-morty_rollover.jpg` (shown on hover). The placeholders are labelled STATIC (grey) and ROLLOVER (blue). Phones and tablets show the static image only, so the rollover is never downloaded there. Project pages have no rollovers.

## Export sizes (JPG, quality 70 to 80, keep files small)
| File | Pixels |
|---|---|
| Tiles (one pair per project name) and `profile` | 800 x 800 |
| `banner`, project `image-009` and `image-019`, About `image-009` | 2000 x 600 |
| Project `image-001`, `image-011` | 1600 x 1000 |
| Project `image-002..008`, `012..018`, `image-010`; About `image-001..008` | 1200 x 750 |
| Project `logo.png` | 800 x 500 |
| Project `company-logo-001/002.png` | 400 x 160 |

## Things to edit
- **Text**: open any `index.html` and replace the lorem ipsum, project titles and alt text.
- **Fonts**: Gotham is licensed, so it is not included. Add your webfont files to `assets/fonts/` named `Gotham-Book.woff2`, `Gotham-BookItalic.woff2`, and likewise `Regular`, `Medium`, `Bold`, `Ultra`. Until then the site falls back to Century Gothic or Arial.
- **Colors**: top of `assets/css/style.css` (`--p` primary, `--h` highlight, `--g` grey, reserved for special cases such as the mobile menu lines).
- **Splash**: if you swap `assets/img/MIKE_SIGNATURE.gif`, set `data-ms` on the `#logo` tag in `index.html` to the new GIF length in milliseconds (currently 2600), and replace `assets/img/logo.png` with its last frame. That PNG also sits in the Home button.
- **Contact form**: GitHub Pages has no server. Create a free form at formspree.io and replace `YOUR_FORM_ID` in `contact/index.html`. Also update the phone, email, address and social links there.
- **Category pages**: Animation, Illustration, Graphic Design and Motion Graphics currently each show all 16 projects. To sort them, edit the tile links and image files in each category folder.

## Features
- **Video rollovers**: put `rick-and-morty_rollover.mp4` next to the rollover JPG in the same `images/` folder. On desktop hover it loads once and loops muted over the image. If the file does not exist, the JPG rollover shows as normal. Keep clips square, about 480 px and under 1 MB: `ffmpeg -i clip.mov -vf "crop='min(iw,ih)':'min(iw,ih)',scale=480:480" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart rick-and-morty_rollover.mp4`
- **Lightbox**: click any image on a project page. Arrow keys, swipe, Escape and pinch zoom work. Replace nothing; it uses the images already on the page.
- **Next and previous project**: strip at the bottom of every project page, wrapping around. Page changes crossfade in current Chrome, Edge and Safari while the header stays fixed.
- **Signature replay**: hover the home button on desktop to replay the signature GIF (loads on first hover only).
- **Scroll reveal**: project page images fade up as they appear. Off for visitors who prefer reduced motion.

## Share cards (link previews)
Every project has `images/share.jpg` (1200 x 630); the site default is `assets/img/share.jpg`. The address used in previews defaults to `https://www.mikegilbert.net/`. If your real address differs, run once: `python3 tools/portfolio.py url https://yourname.github.io/repo/`. Social sites cache previews, so test with each platform's debugger after publishing.

## Image export tool
1. Create a `_source` folder in the repository (it is git-ignored). Mirror the site folders inside it and drop in full size originals with the same names as the slots, for example `_source/projects/rick-and-morty/image-001.png` or `_source/home/images/rick-and-morty_rollover.psd`.
2. Run `pip install pillow` once, then `python3 tools/portfolio.py export`.
3. Each file is resized to its slot size, compressed and written over the placeholder. Tiles and banners are centre cropped to fit, logos are fitted with a transparent background. PSD files export the flattened composite.

4. Website preview deployment
