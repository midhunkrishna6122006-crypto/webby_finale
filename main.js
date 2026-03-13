// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  document.body.style.opacity = '1';
});

// ========== GSAP CINEMATIC SCROLL (Optional Enhancement) ==========
function initCinematicScrollAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Prevent conflicts with CSS-based reveal system
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(el => el.classList.remove('reveal', 'revealed'));

  // Smooth, cinematic section entrances (sequential/staggered)
  const sections = document.querySelectorAll(
    '.hero, .stats-section, .featured-destinations, .why-choose-us, .testimonials-section, .cta-banner, .page-hero, .filter-bar, .destinations-page'
  );

  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { autoAlpha: 0, y: 24, scale: 0.985 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Stagger destination cards as they enter
  const destinationCards = document.querySelectorAll('.dest-card, .destination-card');
  if (destinationCards.length) {
    gsap.from(destinationCards, {
      autoAlpha: 0,
      y: 30,
      scale: 0.98,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: destinationCards[0].closest('.destinations-grid, .destinations-page-grid, .featured-destinations, .destinations-page') || destinationCards[0],
        start: 'top 80%'
      }
    });
  }

  // Cinematic image zoom + subtle parallax while scrolling (uses existing bg elements)
  const bgTargets = document.querySelectorAll('.card-bg, .dest-bg');
  bgTargets.forEach((bg) => {
    const parent = bg.closest('.dest-card, .destination-card');
    if (!parent) return;

    gsap.fromTo(
      bg,
      { scale: 1.08, yPercent: -2 },
      {
        scale: 1.14,
        yPercent: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: parent,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6
        }
      }
    );
  });

  // Hover animations for destination cards (scale/shadow + subtle tilt)
  const isDesktop = window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : window.innerWidth > 968;
  if (isDesktop) {
    destinationCards.forEach((card) => {
      card.style.willChange = 'transform';

      const onEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.25,
          ease: 'power2.out'
        });
      };

      const onLeave = () => {
        gsap.to(card, {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 0.35,
          ease: 'power2.out'
        });
      };

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * 6;
        const ry = (((x / rect.width) - 0.5) * -6);
        gsap.to(card, {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 1000,
          transformOrigin: 'center',
          duration: 0.2,
          ease: 'power2.out'
        });
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      card.addEventListener('mousemove', onMove);
    });
  }

  // Click transitions into the existing navigation/scroll experience
  const transitionLinks = document.querySelectorAll('.card-explore, .card-explore-btn');
  transitionLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      e.preventDefault();

      gsap.to(document.body, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          window.location.href = href;
        }
      });
    });
  });
}

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ========== ACTIVE NAV LINK ==========
const normalizePath = (path) => {
  const cleaned = (path || '').split('?')[0].split('#')[0];
  const last = cleaned.split('/').filter(Boolean).pop() || 'index.html';
  return last.toLowerCase();
};

const currentPage = normalizePath(window.location.pathname);
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

navLinks.forEach(link => {
  const linkPage = normalizePath(link.getAttribute('href'));
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});

// ========== INDEX HERO SEARCH NAVIGATION ==========
const heroSearchBtn = document.getElementById('heroSearchBtn');
if (heroSearchBtn) {
  heroSearchBtn.addEventListener('click', () => {
    window.location.href = 'destinations.html';
  });
}

// ========== HERO PARTICLES ==========
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    particle.style.top = Math.random() * 100 + '%';
    particle.style.left = Math.random() * 100 + '%';
    
    const duration = 3 + Math.random() * 5;
    particle.style.setProperty('--duration', duration + 's');
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    particlesContainer.appendChild(particle);
  }
}

// ========== STATS COUNTER ANIMATION ==========
const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

function animateCount(el, target, duration = 2000) {
  let startTime;
  
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  
  requestAnimationFrame(step);
}

const animateStats = () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    if (!isNaN(target)) {
      animateCount(stat, target, 2000);
    }
  });
};

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.section-header, .stat-item, .dest-card, .feature-card, .testimonial-card, .package-card, .transport-card, .destination-card');

if (revealElements.length > 0) {
  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(index % 6) * 0.1}s`;
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        if (entry.target === statsSection && !statsAnimated) {
          statsAnimated = true;
          animateStats();
        }
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  if (statsSection) {
    observer.observe(statsSection);
  }
}

// ========== CUSTOM CURSOR (Desktop Only) ==========
if (window.innerWidth > 968) {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, .dest-card, .package-card, .transport-card, .destination-card');

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.opacity = '0.5';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.opacity = '1';
    });
  });
}

// ========== CARD PARALLAX TILT (Desktop Only) ==========
// Skip legacy tilt if GSAP cinematic hover/tilt is enabled
if (window.innerWidth > 968 && !(window.gsap && window.ScrollTrigger)) {
  const tiltCards = document.querySelectorAll('.dest-card, .destination-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * -8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Init GSAP enhancements after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCinematicScrollAnimations();
});
