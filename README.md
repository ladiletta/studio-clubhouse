# Clubhouse — a Studio starter

A three-page team site with a **YouTube background hero** and a card that
overlaps it. Not a finished template you recolour — a professional structure you
make yours, and can defend every choice in.

**See it running: <https://ladiletta.github.io/studio-clubhouse/>** — that page
is built from this branch, so it is exactly what you get when you copy it.

That difference is the point. A team handed a finished site rearranges it. A
team handed a real structure builds one.

```
index.html      hero (video) · next game · record · fixtures · story · call to action
schedule.html   the full season as a real table, plus ticket prices
roster.html     players and coaches
styles.css      your palette, your type, the hero video rules
js/hero-video.js   the video, and what happens when YouTube is blocked
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
4. Swap the hero video: `data-video="R6MlUcmOul8"` in `index.html`. The id is
   the part after `v=` in a YouTube URL. Then fix the credit in the footer.
5. Replace the words. Every one of them.
6. Commit as you go. Push at least once a session — a commit is local until you
   push it.

## How the video hero works

Read `js/hero-video.js`; it is thirty lines and it explains itself. The short
version:

- The **gradient in `styles.css` is always painted.** Nothing has to succeed for
  the hero to look deliberate.
- The script loads the video's **thumbnail** first. That image is both the
  poster and the honest test of whether this network can reach YouTube at all —
  a school filter that blocks YouTube blocks its image host too. Only if the
  thumbnail loads does an `<iframe>` go on the page.
- **No video on a phone**, and none for a reader whose system asks for reduced
  motion. Both keep the poster.

If you see the gradient and no video, that is the fallback working. Try it on a
different network before you go looking for a bug.

## Before you put real people on the internet

A photograph of somebody under 18 on a public website is not a design decision.
Ask them, ask the school, and if either answer is no, use the number instead of
the face — which is what the roster cards do already, and they look fine. The
same goes for a highlight reel with faces in it.

## Things that will bite you

- **The three pages must match.** Theme, nav, footer, palette. A site that
  restyles itself between clicks reads as broken. This is the real cost of
  plain HTML, and Unit 8's build step is the fix.
- **Your team's colour may not take black text.** `--color-primary-content` is
  the text colour that rides on `--color-primary`. Set both together and measure
  the pair — a deep navy with black text on it is the classic school-site
  failure.
- **A colour-only badge is not enough.** The win and loss badges say "W" and "L"
  as well as being green and red, because about one boy in twelve cannot tell
  those two colours apart. Keep the letter.
- **The overlapping card.** The `-mb-16 md:-mb-20` on the "next game" card is
  what pulls it across the hero's bottom edge, and the padding on the section
  below is what makes room for it. Change one, check the other.
- **Lightening the scrim.** The dark layer over the video is what makes the
  headline readable. Measured, not guessed. Lighten it and measure again.

## Check your own work before you hand it in

Tick this yourself first — auditing a page against a written spec is a graded
skill in its own right (`WD3.B`), and it is much better to find these than to
have them found.

- [ ] Every placeholder is gone. Search all three files for `Opponent`, `00`,
      `20XX`, `A name` and `______`.
- [ ] Every section is the element it should be — `nav`, `header`, `main`,
      `footer`, `article`, `table` — not a `div` wearing a class.
- [ ] The headings outline each page. Read `h1`, `h2`, `h3` alone, in order: one
      `h1` per page, no levels skipped.
- [ ] One column on a phone, more on wider screens. Check at 380px, 768px and
      full width. Nothing scrolls sideways at 380px — the schedule table
      scrolls **inside its own box**, which is what `overflow-x-auto` is for.
- [ ] There is **one** obvious call to action per page, and its label says what
      happens. Not "Click here".
- [ ] Your palette is recorded as a comment block at the top of `styles.css`,
      with a mood sentence and a job for each colour.
- [ ] Two type faces at most: one for headings, one for body.
- [ ] Body text against its background is at least **4.5:1**. Check it — do not
      guess.
- [ ] Every image has `alt` text that says what the image is FOR. Decorative
      images take an empty `alt=""`.
- [ ] Every image and every video has its creator, source and licence in the
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
three tags in each file's `<head>`.

The hero video that ships with this starter is **_Tears of Steel_ by the Blender
Foundation**, released under CC BY 3.0. It is a placeholder — replace it with
footage you have the right to use, and replace its credit line in the footer
with yours.

Everything else here was written for this course, MIT licensed. See `LICENSE`.
