/**
 * Shree Chautare Danda Secondary School - Main JavaScript
 * Production-ready vanilla JS architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. DOM SELECTORS
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const backToTopBtn = document.getElementById('back-to-top');
  
  // Gallery
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  
  // Testimonial Carousel
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevTestimonialBtn = document.getElementById('carousel-prev');
  const nextTestimonialBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  
  // Event Modal
  const eventModal = document.getElementById('event-modal');
  const eventModalClose = document.getElementById('event-modal-close');
  const eventModalDismiss = document.getElementById('event-modal-dismiss');
  const modalBtns = document.querySelectorAll('.event-modal-btn');
  
  // Accordion & Forms
  const faqQuestions = document.querySelectorAll('.faq-question');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  // Class Selector
  const classSelect = document.getElementById('class-select');
  const importantQuestionsBtn = document.getElementById('important-questions-btn');

  let currentLightboxIndex = 0;
  let currentTestimonialIndex = 0;
  let testimonialInterval = null;

  // Static event database for detail modals
  const eventsData = {
    '1': {
      title: 'Parent-Teacher Gathering',
      category: 'Community & Parents',
      date: 'November 15, 2026',
      description: 'An interactive open day allowing guardians and teachers to review student academic growth, co-curricular interests, and school development plans in Baglung.'
    },
    '2': {
      title: 'Annual Science & Craft Exhibition',
      category: 'Academic / Science',
      date: 'November 28, 2026',
      description: 'A platform showcasing student creativity through working physics models, chemical demonstrations, biology posters, and traditional handcrafts.'
    },
    '3': {
      title: 'Inter-House Sports Meet',
      category: 'Sports & Wellness',
      date: 'December 10, 2026',
      description: 'Annual sports day featuring relay races, volleyball tournaments, athletic sprints, and team-building competitions across all house levels.'
    }
  };

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // 2. MOBILE NAVIGATION & NAVBAR SCROLL
  // ==========================================================================
  
  // Toggle mobile drawer
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile drawer when link clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Handle sticky scroll effect on Navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to Top button visibility
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    highlightNavOnScroll();
  });

  // Active link scroll spy
  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ==========================================================================
  // 3. SCROLL REVEAL ANIMATIONS & COUNTERS
  // ==========================================================================
  
  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      revealObserver.observe(el);
    });

    // Animated Statistics Counters
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      counterObserver.observe(statsSection);
    }
  } else {
    // Make elements instantly visible if reduced motion is enabled
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('reveal-active');
    });
  }

  function runCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1500;
      const step = Math.ceil(target / (duration / 16));

      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 16);
    });
  }

  // ==========================================================================
  // 4. GALLERY FILTERING & LIGHTBOX
  // ==========================================================================
  
  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // Lightbox Implementation
  const visibleGalleryImages = () => Array.from(galleryItems).filter(item => !item.classList.contains('hide'));

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const visibleItems = visibleGalleryImages();
      currentLightboxIndex = visibleItems.indexOf(item);
      openLightbox(visibleItems[currentLightboxIndex]);
    });
  });

  function openLightbox(item) {
    const img = item.querySelector('.gallery-img');
    const title = item.querySelector('.gallery-item-title').textContent;
    const cat = item.querySelector('.gallery-cat').textContent;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = `${cat} — ${title}`;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightboxModal() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightboxModal);

  function navigateLightbox(direction) {
    const visibleItems = visibleGalleryImages();
    if (visibleItems.length === 0) return;

    if (direction === 'next') {
      currentLightboxIndex = (currentLightboxIndex + 1) % visibleItems.length;
    } else {
      currentLightboxIndex = (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
    }
    openLightbox(visibleItems[currentLightboxIndex]);
  }

  if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox('next'));
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));

  // ==========================================================================
  // 5. TESTIMONIALS CAROUSEL
  // ==========================================================================
  
  function initTestimonials() {
    if (testimonialCards.length === 0) return;

    // Create pagination dots dynamically
    dotsContainer.innerHTML = '';
    testimonialCards.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToTestimonial(idx));
      dotsContainer.appendChild(dot);
    });

    startTestimonialAutoPlay();
  }

  function goToTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach(d => d.classList.remove('active'));

    currentTestimonialIndex = index;
    testimonialCards[currentTestimonialIndex].classList.add('active');
    if (dots[currentTestimonialIndex]) {
      dots[currentTestimonialIndex].classList.add('active');
    }
  }

  function nextTestimonial() {
    let nextIdx = (currentTestimonialIndex + 1) % testimonialCards.length;
    goToTestimonial(nextIdx);
  }

  function prevTestimonial() {
    let prevIdx = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    goToTestimonial(prevIdx);
  }

  function startTestimonialAutoPlay() {
    if (testimonialInterval) clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  function stopTestimonialAutoPlay() {
    if (testimonialInterval) clearInterval(testimonialInterval);
  }

  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', () => {
      nextTestimonial();
      startTestimonialAutoPlay();
    });
  }

  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', () => {
      prevTestimonial();
      startTestimonialAutoPlay();
    });
  }

  // Pause autoplay on mouse hover
  const carouselContainer = document.querySelector('.testimonial-carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopTestimonialAutoPlay);
    carouselContainer.addEventListener('mouseleave', startTestimonialAutoPlay);
  }

  initTestimonials();

  // ==========================================================================
  // 6. EVENT MODAL IMPLEMENTATION
  // ==========================================================================
  
  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.getAttribute('data-event-id');
      const data = eventsData[eventId];

      if (data) {
        document.getElementById('modal-event-cat').textContent = data.category;
        document.getElementById('modal-event-title').textContent = data.title;
        document.getElementById('modal-event-date').querySelector('span').textContent = data.date;
        document.getElementById('modal-event-desc').textContent = data.description;

        eventModal.classList.add('active');
        eventModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeEventModal() {
    eventModal.classList.remove('active');
    eventModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (eventModalClose) eventModalClose.addEventListener('click', closeEventModal);
  if (eventModalDismiss) eventModalDismiss.addEventListener('click', closeEventModal);

  // ==========================================================================
  // 6b. CLASS SELECTOR
  // ==========================================================================

  if (classSelect && importantQuestionsBtn) {
    classSelect.addEventListener('change', () => {
      if (classSelect.value === '10') {
        importantQuestionsBtn.style.display = 'inline-flex';
      } else {
        importantQuestionsBtn.style.display = 'none';
      }
    });
  }

  // ==========================================================================
  // 7. FAQ ACCORDION
  // ==========================================================================
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      const answer = question.nextElementSibling;

      // Close all accordions
      faqQuestions.forEach(q => {
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.style.maxHeight = null;
      });

      // Expand clicked item if previously closed
      if (!isExpanded) {
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ==========================================================================
  // 8. CONTACT FORM VALIDATION (FRONTEND ONLY)
  // ==========================================================================
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      // Simple Email Regular Expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
      }

      // Validate Email
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('invalid');
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('invalid');
        isValid = false;
      } else {
        subjectInput.classList.remove('invalid');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.classList.add('invalid');
        isValid = false;
      } else {
        messageInput.classList.remove('invalid');
      }

      if (isValid) {
        // Show success alert message
        if (formSuccess) formSuccess.style.display = 'flex';
        contactForm.reset();

        // Hide success message after 6 seconds
        setTimeout(() => {
          if (formSuccess) formSuccess.style.display = 'none';
        }, 6000);
      }
    });
  }

  // ==========================================================================
  // 9. BACK TO TOP & KEYBOARD ACCESSIBILITY
  // ==========================================================================
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Escape key support for Modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.classList.contains('active')) {
        closeLightboxModal();
      }
      if (eventModal && eventModal.classList.contains('active')) {
        closeEventModal();
      }
    }

    // Lightbox Arrow Key Controls
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    }
  });

  // Close Modals when clicking outside content
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightboxModal();
    });
  }

  if (eventModal) {
    eventModal.addEventListener('click', (e) => {
      if (e.target === eventModal) closeEventModal();
    });
  }
});
