// A YouTube background that does not break when YouTube is not there.
//
// The order matters, and each step exists because the step before it can fail:
//
//   1. The photograph in styles.css (.hero-poster) is always painted. Nothing
//      here has to succeed for the hero to look finished.
//   2. We load the video's THUMBNAIL first — not to show it, but because it is
//      a plain image, so we get an onerror we can act on. That makes it the
//      honest test of "can this network reach YouTube at all?" A school
//      filter that blocks YouTube blocks its image host too.
//   3. Only then do we load YouTube's own player script and start the video,
//      invisible. It fades in once YouTube says it is PLAYING — never before.
//      A player that is still loading is a black box with YouTube's buttons
//      on it, and a player that failed is an error message. Neither should
//      ever cover your photograph.
//
// Two deliberate refusals: no video on a phone (it is a lot of somebody's data
// for decoration), and no video for a reader whose system asks for reduced
// motion. Both keep the photograph, which is the hero standing still.

(function () {
  const stage = document.querySelector('[data-hero-video]');
  if (!stage) return;

  const id = stage.dataset.video;
  if (!id) return;

  // THE CLIP, in seconds: data-start and data-end on the same element. The
  // video loops between them, so pick the stretch you want and skip the
  // titles. No data-end plays to the end of the video and starts again.
  const start = Number(stage.dataset.start) || 0;
  const end = Number(stage.dataset.end) || 0;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = window.matchMedia('(max-width: 767px)').matches;

  // Nothing to test for a reader who will not get the video anyway.
  if (reduced || narrow) return;

  const probe = new Image();
  probe.onload = loadPlayer;
  // No handler needed for failure: the photograph is already on the page.
  probe.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  function loadPlayer() {
    // YouTube's script calls this function by name once it has loaded.
    window.onYouTubeIframeAPIReady = addVideo;
    const api = document.createElement('script');
    api.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(api);
  }

  function addVideo() {
    const slot = document.createElement('div');
    stage.appendChild(slot);

    // The player replaces `slot` with an <iframe>, which styles.css sizes.
    new YT.Player(slot, {
      host: 'https://www.youtube-nocookie.com',
      videoId: id,
      playerVars: {
        autoplay: 1,
        mute: 1, // Browsers refuse to autoplay anything audible. This is why.
        start: start,
        controls: 0,
        playsinline: 1, // iOS otherwise takes the video fullscreen.
        rel: 0,
        disablekb: 1,
        iv_load_policy: 3, // no pop-up annotations
      },
      events: { onReady: onReady, onStateChange: onStateChange },
    });
  }

  function onReady(event) {
    const frame = event.target.getIframe();
    frame.title = 'Background video';
    // Decorative: it carries no information the words do not. So it is hidden
    // from screen readers and unreachable by keyboard, which is what
    // "decorative" has to mean to be true.
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
  }

  // YouTube draws its own pause button in the middle of the picture for the
  // first few seconds after the video starts — and again after every jump. No
  // crop can reach the middle, so the video stays hidden until it has gone.
  const SETTLE = 4000; // milliseconds

  let started = false;

  function onStateChange(event) {
    if (event.data !== YT.PlayerState.PLAYING || started) return;
    started = true;

    const player = event.target;
    const last = end || player.getDuration() - 1;
    setTimeout(() => stage.classList.add('is-playing'), SETTLE);

    // THE LOOP. Fade back to the photograph just before the clip runs out,
    // jump while nobody can see it, and fade in again once the button has
    // gone. The player never reaches its end screen of suggested videos.
    setInterval(() => {
      const now = player.getCurrentTime();
      if (now >= last - 1.5) stage.classList.remove('is-playing');
      if (now >= last) {
        player.seekTo(start, true);
        setTimeout(() => stage.classList.add('is-playing'), SETTLE);
      }
    }, 250);
  }
})();
