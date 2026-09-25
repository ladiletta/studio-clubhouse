// Three small jobs every page shares. None of them is load-bearing: with this
// file missing, the phone menu still opens, the forms still check themselves,
// and the footer year says whatever the HTML says.

// 1. THE PHONE MENU is a <details>, so it opens and closes with no script at
//    all. What it cannot do alone is close when you tap somewhere else or
//    press Escape — which is what every menu on the web has taught people to
//    expect.
document.addEventListener('click', (event) => {
  document.querySelectorAll('details.dropdown[open]').forEach((menu) => {
    if (!menu.contains(event.target)) menu.removeAttribute('open');
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('details.dropdown[open]').forEach((menu) => {
    menu.removeAttribute('open');
    menu.querySelector('summary').focus();
  });
});

// 2. THE FOOTER YEAR keeps itself current.
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// 3. DEMO FORMS. A form marked data-demo has nowhere to send yet, so instead of
//    reloading the page it shows its thank-you message ([data-sent]).
//
//    The browser checks `required` and `type="email"` BEFORE it fires submit,
//    so by the time this runs the form is already valid. When you connect a
//    real service, give the form its action and delete data-demo — this code
//    then leaves it alone.
document.querySelectorAll('form[data-demo]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    const sent = form.querySelector('[data-sent]');
    if (sent) {
      sent.hidden = false;
      sent.focus(); // role="status" plus focus: a screen reader hears it too
    }
  });
});
