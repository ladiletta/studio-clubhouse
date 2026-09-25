# Clubhouse — a Studio starter

A three-page team site with a **YouTube background hero** and a card that
overlaps it, a whole season marked up as a real table, and filters that need no
JavaScript. Not a finished template you recolor — a professional structure you
make yours, and can defend every choice in.

**See it running: <https://dadiletta.github.io/studio-clubhouse/>** — that page
is built from this branch, so it is exactly what you get when you copy it.

That difference is the point. A team handed a finished site rearranges it. A
team handed a real structure builds one.

```
index.html         hero (video) · next game · record · fixtures and results · news · story · sponsors
schedule.html      the season as a real table, a Home/Away filter, ticket tiers, the venue and a map
roster.html        players by number with a position filter, coaches, how to try out
styles.css         your palette, your type, the hero video, the filters
js/hero-video.js   the video, and what happens when YouTube is blocked
js/site.js         the phone menu, the footer year, and the demo signup
img/               the photographs, and favicon.svg (the icon in the browser tab)
```

## Start here

1. When VS Code offers to install this folder's recommended extensions, say
   yes. They are **Live Server**, which runs the site, and **Live Share**, which
   is how you show it to a teammate or your teacher when it misbehaves — click
   **Live Share** in the status bar, paste the link it copies into Google Chat,
   and go back to work.
2. Open `index.html` with **Live Server** — the **Go Live** button in the status
   bar. Not by double-clicking: see Unit 4 for why `file://` is not a website.
3. Change `data-theme="night"` on the `<html>` tag — **in all three pages**. Do
   this first. Try `sunset`, `synthwave`, `dracula`, `forest`, `business`,
   `dim`, `black`. All 35 are at
   [daisyui.com/docs/themes](https://daisyui.com/docs/themes/).
4. Swap the hero video: `data-video="pGeUEGLOtcA"` in `index.html`. The id is
   the part after `v=` in a YouTube URL. Swap the poster photograph in
   `styles.css` to match, then fix both credits in the footer. Then set
   `data-start` and `data-end` to the seconds you want it to loop between.
5. Replace the words. Every one of them. Then the photographs.
6. Commit as you go. Push at least once a session — a commit is local until you
   push it.

## What is in it

- **Filters with no JavaScript.** The schedule's Home/Away buttons and the
  roster's positions are radio buttons, and a few `:has()` rules in
  `styles.css` hide what does not match. Every row needs its `data-venue`, and
  every player card its `data-pos`, or the filter cannot see it. The positions
  are soccer's — rename them for your sport in three places: the buttons, the
  cards, and `styles.css`.
- **A phone menu that needs no JavaScript.** It is a `<details>` element.
  `js/site.js` only adds "close when I tap away".
- **Real photographs, properly credited.** Every one is from Wikimedia Commons,
  under a license that lets you use it, and the footer's credits list says whose
  it is, where it came from, the license, and that it was cropped. That list is
  the model for yours.
- **Two typefaces from Google Fonts** — Oswald for headings, Inter for body —
  set in `styles.css`.
- **A map** of the venue, from OpenStreetMap: free, no account, no key.
- **A skip link**, the first thing a keyboard user reaches. Press Tab on any
  page to see it.

## How the video hero works

Read `js/hero-video.js`; it explains itself. The short
version:

- The **photograph in `styles.css` is always painted.** Nothing has to succeed
  for the hero to look finished. Most visitors — anyone on a phone, anyone on a
  network that blocks YouTube — only ever see the photograph, so it has to be a
  good one.
- The script loads the video's **thumbnail** first, as a test: a school filter
  that blocks YouTube blocks its image host too. Only if the thumbnail loads
  does YouTube's player go on the page, and it stays invisible until YouTube
  says the video is **playing**. Nobody sees a loading screen, an error
  message or YouTube's buttons where your photograph was.
- **The clip loops.** `data-start` and `data-end` pick the seconds. The zoom
  in `styles.css` (`--video-zoom`) crops YouTube's title bar and any black
  bars off the edges; a new video may need a different number.
- **No video on a phone**, and none for a reader whose system asks for reduced
  motion. Both keep the photograph.

If you see the photograph and no video, that is the fallback working. Try it on
a different network before you go looking for a bug. And check the address
bar: opened as a `file://` page instead of through Live Server, YouTube refuses
to play at all, because it will not play for a page that cannot say where it is.

## Before you put real people on the internet

A photograph of somebody under 18 on a public website is not a design decision.
Ask them, ask the school, and if either answer is no, use the number instead of
the face — which is what the roster cards do already, and they look fine. The
same goes for a highlight reel with faces in it.

## Things that will bite you

- **The three pages must match.** Theme, nav, footer, fonts, credits. A site
  that restyles itself between clicks reads as broken. This is the real cost of
  plain HTML, and Unit 8's build step is the fix.
- **The nav is in there twice** on every page — a row of links for wide screens
  and the phone dropdown. Add a page, add it to both, on all three pages.
- **Your team's color may not take black text.** `--color-primary-content` is
  the text color that rides on `--color-primary`. Set both together and measure
  the pair — a deep navy with black text on it is the classic school-site
  failure.
- **A color-only badge is not enough.** The win and loss badges say "W" and "L"
  as well as being green and red, because about one boy in twelve cannot tell
  those two colors apart. Keep the letter.
- **The overlapping card.** The `-mb-20 md:-mb-24` on the "next game" card is
  what pulls it across the hero's bottom edge, and the `pt-32 md:pt-36` on the
  section below is what makes room for it. Change one, check the other.
- **Lightening the scrim.** The dark layer over the video is what makes the
  headline readable. Measured, not guessed. Lighten it and measure again.
- **Changing the theme changes every contrast.** This starter was measured on
  `night`: every piece of text clears WCAG's floor against what is behind it —
  4.5:1, or 3:1 for large headings. Muted text (`opacity-80`) is the first thing
  to fail on a new theme. Measure again after you switch.
- **Big photographs.** A photo straight off a phone is 4 MB. The ones here are
  300 KB at most. Resize yours before you commit them.

## Check your own work before you hand it in

Tick this yourself first — auditing a page against a written spec is a graded
skill in its own right (`WD3.B`), and it is much better to find these than to
have them found.

- [ ] Every placeholder is gone. Search all three files for `Opponent`, `00`,
      `20XX`, `A name`, `Sponsor` and `______`.
- [ ] Every section is the element it should be — `nav`, `header`, `main`,
      `footer`, `article`, `table` — not a `div` wearing a class.
- [ ] The headings outline each page. Read `h1`, `h2`, `h3` alone, in order: one
      `h1` per page, no levels skipped.
- [ ] One column on a phone, more on wider screens. Check at 380px, 768px and
      full width. Nothing scrolls sideways at 380px — the schedule table
      scrolls **inside its own box**, which is what `overflow-x-auto` is for.
- [ ] Both filters still work after your edits. Click every button.
- [ ] There is **one** obvious call to action per page, and its label says what
      happens. Not "Click here".
- [ ] Your palette is recorded as a comment block at the top of `styles.css`,
      with a mood sentence and a job for each color.
- [ ] Two type faces at most: one for headings, one for body.
- [ ] Body text against its background is at least **4.5:1**. Check it — do not
      guess.
- [ ] Every image has `alt` text that says what the image is FOR. Decorative
      images take an empty `alt=""`.
- [ ] Every image and every video has its creator, source and license in the
      footer. **If you cannot write that line, you are not allowed to use it.**
- [ ] Nobody is on this site who did not agree to be.
- [ ] The hero still looks deliberate with the video blocked. Turn wifi off and
      reload.
- [ ] If you used AI to generate any part of this, say so and say which part.
- [ ] It works from a fresh clone — no absolute paths to your own disk.
- [ ] It is **pushed**.

## Credits

Component classes are [daisyUI](https://daisyui.com/) by Pouya Saadeghi (MIT),
on [Tailwind CSS](https://tailwindcss.com/) (MIT). Both load from a CDN via the
three tags in each file's `<head>`. Icons are from [Lucide](https://lucide.dev/)
(ISC), copied into the pages as inline SVG. Oswald and Inter are from
[Google Fonts](https://fonts.google.com/), under the SIL Open Font License.

The hero video is **_Soccer Game by DJI Mavic Pro Drone_ by allenthebigman**, marked
CC BY on YouTube.
The photographs in `img/` are from Wikimedia Commons, each under its own license
— CC0 or CC BY-SA 4.0 — and each is credited by name in the footer. They are
placeholders: replace them with pictures you have the right to use, and replace
their lines with yours. The map is © OpenStreetMap contributors.

Everything else here was written for this course, MIT licensed. See `LICENSE`.
The MIT license covers the code and the words, not the photographs or the video.
