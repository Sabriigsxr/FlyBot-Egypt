/**
 * FlyBot Egypt — Premium Luxury Webapp
 * Smooth Scroll Animations & Interactive Features
 */

(function() {
  'use strict';

  // ============================================
  // PRELOADER
  // ============================================
  
  const preloader = document.getElementById('preloader');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      initScrollAnimations();
    }, 2200);
  });

  // ============================================
  // NAVIGATION
  // ============================================
  
  const nav = document.getElementById('nav');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');
  let lastScrollY = 0;

  function handleNavScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.position = 'fixed';
      navLinks.style.top = '80px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.flexDirection = 'column';
      navLinks.style.alignItems = 'center';
      navLinks.style.gap = '2rem';
      navLinks.style.padding = '2rem';
      navLinks.style.background = 'rgba(10,10,10,0.98)';
      navLinks.style.backdropFilter = 'blur(20px)';
      navLinks.style.borderBottom = '1px solid rgba(201,168,76,0.1)';
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (window.innerWidth <= 968) {
          navLinks.style.display = 'none';
        }
      }
    });
  });

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  
  function initScrollAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal], .reveal');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay based on index within viewport
          const delay = entry.target.dataset.delay || (index % 4) * 100;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el, index) => {
      el.dataset.delay = (index % 4) * 100;
      observer.observe(el);
    });
  }

  // ============================================
  // PARALLAX EFFECTS
  // ============================================
  
  function initParallax() {
    const heroBg = document.querySelector('.hero-bg img');
    
    if (heroBg) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        heroBg.style.transform = `translateY(${rate}px) scale(1.1)`;
      }, { passive: true });
    }
  }

  // ============================================
  // PRODUCT CARD HOVER EFFECTS
  // ============================================
  
  function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
      const image = card.querySelector('.product-image img');
      
      card.addEventListener('mouseenter', () => {
        if (image) {
          image.style.transform = 'scale(1.05)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (image) {
          image.style.transform = 'scale(1)';
        }
      });
    });
  }

  // ============================================
  // GALLERY MARQUEE PAUSE ON HOVER
  // ============================================
  
  function initGalleryMarquee() {
    const marquee = document.querySelector('.gallery-marquee');
    
    if (marquee) {
      marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
      });
      
      marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
      });
    }
  }

  // ============================================
  // FORM HANDLING
  // ============================================
  
  function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            form.reset();
          }, 2000);
        }, 1500);
      });
    }
  }

  // ============================================
  // CURSOR GLOW EFFECT (Desktop only)
  // ============================================
  
  function initCursorGlow() {
    if (window.innerWidth <= 768) return;
    
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);
    
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    
    updateCounter();
  }

  // ============================================
  // SCROLL PROGRESS INDICATOR
  // ============================================
  
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(90deg, #c9a84c, #e8d48b);
      z-index: 10001;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
  }

  // ============================================
  // SMOOTH SECTION TRANSITIONS
  // ============================================
  
  function initSectionTransitions() {
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      sectionObserver.observe(section);
    });
  }

  // ============================================
  // TILT EFFECT ON CARDS
  // ============================================
  
  function initTiltEffect() {
    if (window.innerWidth <= 768) return;
    
    const cards = document.querySelectorAll('.service-card, .testimonial-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ============================================
  // INITIALIZE
  // ============================================
  
  document.addEventListener('DOMContentLoaded', () => {
    // Set initial body overflow
    document.body.style.overflow = 'hidden';
    
    // Initialize all features
    initParallax();
    initProductCards();
    initGalleryMarquee();
    initContactForm();
    initCursorGlow();
    initScrollProgress();
    initSectionTransitions();
    initTiltEffect();
  });

  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Recalculate any size-dependent features
    }, 250);
  });

})();
