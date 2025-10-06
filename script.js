// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileMenuIcon = document.getElementById('mobileMenuIcon');

if (mobileMenuBtn && mobileNav && mobileMenuIcon) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
    mobileMenuIcon.textContent = mobileNav.classList.contains('show') ? '✕' : '☰';
  });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      mobileNav?.classList.remove('show');
      mobileMenuIcon && (mobileMenuIcon.textContent = '☰');
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll progress bar
const progressBar = document.getElementById('progressBar');
const updateProgress = () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
};
window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);
updateProgress();

// Contact form mailto submit
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const sendBtn = document.getElementById('sendBtn');

if (contactForm && formSuccess && sendBtn) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    const subject = document.getElementById('subject')?.value?.trim() || '';
    const message = document.getElementById('message')?.value?.trim() || '';

    const to = 'omurekasteffi@gmail.com';
    const composedSubject = subject || `New message from ${name || 'Portfolio Contact'}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailtoHref = `mailto:${to}?subject=${encodeURIComponent(composedSubject)}&body=${body}`;

    // Open the user's email client
    window.location.href = mailtoHref;

    // Optimistically show success after a short delay to allow client to open
    sendBtn.disabled = true;
    sendBtn.textContent = 'Opening email...';
    setTimeout(() => {
      formSuccess.hidden = false;
      sendBtn.textContent = 'Sent!';
      setTimeout(() => {
        contactForm.reset();
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Message';
      }, 2500);
    }, 800);
  });
}

