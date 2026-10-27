// ===============================
// Mobile menu toggle
// ===============================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileMenuIcon = document.getElementById('mobileMenuIcon');

function closeMobileNav() {
  if (mobileNav) mobileNav.classList.remove('show');
  if (mobileMenuIcon) mobileMenuIcon.textContent = '☰';
}

if (mobileMenuBtn && mobileNav && mobileMenuIcon) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
    mobileMenuIcon.textContent = mobileNav.classList.contains('show') ? '✕' : '☰';
  });
}

// ===============================
// Smooth scroll for nav links (with header offset)
// ===============================
const HEADER_OFFSET = 70;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    closeMobileNav();

    const top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===============================
// Scroll progress bar
// ===============================
const progressBar = document.getElementById('progressBar');

const updateProgress = () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
};

window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);
updateProgress();

// ===============================
// Reveal-on-scroll (for any element with the .reveal class)
// ===============================
const reveals = document.querySelectorAll('.reveal');
if (reveals.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    },
    { threshold: 0.1 }
  );
  reveals.forEach((el) => observer.observe(el));
}

// ===============================
// Contact form
// The form posts directly to FormSubmit (see the action attribute in index.html),
// so no JavaScript is needed here.
// ===============================

// ===============================
// Lightweight carousel
// ===============================
function initCarousel(carousel) {
  const track = carousel.querySelector('.carousel-track');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  if (!slides.length) return;

  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const autoplayMs = parseInt(carousel.dataset.autoplay || '0', 10);

  let index = 0;
  let intervalId = null;

  // Make every slide as wide as the carousel and line them up side by side
  function layout() {
    const width = carousel.clientWidth;
    slides.forEach((slide) => {
      slide.style.width = `${width}px`;
      if (window.innerWidth <= 768) {
        slide.style.height = 'auto';
      }
    });
    track.style.width = `${width * slides.length}px`;
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === index ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * carousel.clientWidth}px)`;
    renderDots();
  }

  function startAutoplay() {
    if (autoplayMs > 0 && slides.length > 1 && !intervalId) {
      intervalId = setInterval(() => goTo(index + 1), autoplayMs);
    }
  }

  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  prevBtn?.addEventListener('click', () => goTo(index - 1));
  nextBtn?.addEventListener('click', () => goTo(index + 1));

  window.addEventListener('resize', () => {
    layout();
    goTo(index);
  });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  layout();
  renderDots();
  goTo(0);
  startAutoplay();
}

document.querySelectorAll('.carousel').forEach(initCarousel);
