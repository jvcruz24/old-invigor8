document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaq();
  initWeightCalculator();
  initMobileCarousel();
});

function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('open');
    if (icon) {
      icon.className = menu.classList.contains('open')
        ? 'fas fa-times'
        : 'fas fa-bars';
    }
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      if (icon) icon.className = 'fas fa-bars';
    });
  });
}

function initFaq() {
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
      });

      if (!isOpen) item.classList.add('open');
    });
  });
}

function initWeightCalculator() {
  const slider = document.getElementById('weight-slider');
  const display = document.getElementById('weight-display');
  const lossDisplay = document.getElementById('loss-display');

  if (!slider || !display || !lossDisplay) return;

  function update() {
    const weight = parseInt(slider.value, 10);
    const loss = Math.round(weight * 0.1);
    display.textContent = weight;
    lossDisplay.textContent = loss;

    const percent = ((weight - 150) / (400 - 150)) * 100;
    slider.style.background = `linear-gradient(to right, #5a36c4 0%, #5a36c4 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`;
  }

  slider.addEventListener('input', update);
  update();
}

function initMobileCarousel() {
  const carousel = document.getElementById('mobile-carousel');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!carousel || !dots.length) return;

  let currentIndex = 0;
  let startX = 0;

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, dots.length - 1));
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index, 10));
    });
  });

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    carousel.style.transition = 'none';
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    carousel.style.transition = 'transform 0.4s ease';
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      goTo(currentIndex + (diff < 0 ? 1 : -1));
    }
  }, { passive: true });

  goTo(0);
}
