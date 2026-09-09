// A YouTube background that does not break when YouTube is not there.
//
// The order matters, and each step exists because the step before it can fail:
//
//   1. The gradient in styles.css (.hero-poster) is always painted. Nothing
//      here has to succeed for the hero to look deliberate.
//   2. We load the video's THUMBNAIL first. It is a plain image, so we get an
//      onerror we can act on — which makes it both the poster and the honest
//      test of "can this network reach YouTube at all?" A school filter that
//      blocks YouTube blocks its image host too.
//   3. Only if that image loads do we put an <iframe> on the page. An iframe
//      gives you no usable way to ask whether it worked, so we never guess:
//      by the time it exists we already know the answer.
//
// Two deliberate refusals: no video on a phone (it is a lot of somebody's data
// for decoration), and no video for a reader whose system asks for reduced
// motion. Both keep the poster, which is the same picture standing still.

(function () {
  const stage = document.querySelector('[data-hero-video]');
  if (!stage) return;

  const id = stage.dataset.video;
  if (!id) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = window.matchMedia('(max-width: 767px)').matches;

  // The poster runs on phones too — it is one image, and it is the picture the
  // headline sits on. Only the moving version is withheld.
  const poster = new Image();
  poster.onload = function () {
    stage.style.backgroundImage = `url(${poster.src})`;
    stage.classList.add('has-poster');
    if (reduced || narrow) return;
    addVideo();
  };
  // No handler needed for failure: the gradient is already on the page.
  poster.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  function addVideo() {
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1', // Browsers refuse to autoplay anything audible. This is why.
      loop: '1',
      playlist: id, // loop=1 needs a playlist to loop; one video, itself.
      controls: '0',
      playsinline: '1', // iOS otherwise takes the video fullscreen.
      modestbranding: '1',
      rel: '0',
      disablekb: '1',
    });

    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?${params}`;
    frame.allow = 'autoplay; encrypted-media';
    frame.title = 'Background video';
    // Decorative: it carries no information the words do not. So it is hidden
    // from screen readers and unreachable by keyboard, which is what
    // "decorative" has to mean to be true.
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    frame.loading = 'lazy';

    stage.appendChild(frame);
    // Fade in on the next frame, so the browser has a "before" to animate from.
    requestAnimationFrame(() => stage.classList.add('is-playing'));
  }
})();
