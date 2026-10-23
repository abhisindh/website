const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav?.classList.toggle('is-open', !isOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#print-cv')?.addEventListener('click', () => window.print());

document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#form-status').textContent = 'This profile link will be available here soon.';
  });
});

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const endpoint = contactForm.dataset.endpoint;
  const status = document.querySelector('#form-status');

  if (!endpoint || endpoint.startsWith('[')) {
    status.textContent = 'The contact form is being prepared. Please connect with me through a professional profile in the meantime.';
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  submitButton.disabled = true;
  status.textContent = 'Sending your message…';

  // Apps Script does not provide browser CORS headers, so send a simple request.
  // The opaque no-cors response cannot confirm whether the script appended the row.
  fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  })
    .then(() => {
      status.textContent = 'Your message was sent for delivery.';
      contactForm.reset();
    })
    .catch(() => {
      status.textContent = 'We could not send your message. Please try again or contact me through a professional profile.';
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});
