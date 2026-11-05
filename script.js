/**
 * ==========================================================================
 * PORTFOLIO - MUHAMMAD ALI NARAHANSYAH
 * Interactive Features & DOM Animations (script.js)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. DOM Elements Selection
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');
  const revealElements = document.querySelectorAll('.reveal');
  const sections = document.querySelectorAll('section[id], footer[id]');

  // ------------------------------------------------------------------------
  // 2. Mobile Menu Toggle Logic
  // ------------------------------------------------------------------------
  const toggleMobileMenu = () => {
    const isOpen = mobileMenu.classList.contains('open');

    if (isOpen) {
      mobileMenu.classList.remove('open');
      hamburgerIcon.classList.remove('ph-x');
      hamburgerIcon.classList.add('ph-list');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.add('open');
      hamburgerIcon.classList.remove('ph-list');
      hamburgerIcon.classList.add('ph-x');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
  };

  if (mobileMenuBtn && mobileMenu && hamburgerIcon) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close mobile menu when clicking any nav item
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
          toggleMobileMenu();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !navbar.contains(e.target)
      ) {
        toggleMobileMenu();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. Scroll Reveal Animations (IntersectionObserver)
  // ------------------------------------------------------------------------
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Hanya animasikan sekali
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback untuk browser yang belum mendukung IntersectionObserver
    revealElements.forEach((el) => el.classList.add('active'));
  }

  // ------------------------------------------------------------------------
  // 4. Navbar Background Blur & Back-To-Top on Scroll
  // ------------------------------------------------------------------------
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar Scrolled State
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top Button Visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger initial check on page load

  // Smooth Back to Top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. Active Navigation Link on Scroll (ScrollSpy)
  // ------------------------------------------------------------------------
  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // ------------------------------------------------------------------------
  // 6. Skills Tab Switching & Animated Progress Bars
  // ------------------------------------------------------------------------
  const skillTabBtns = document.querySelectorAll('.skills-tab-btn');
  const skillTabPanels = document.querySelectorAll('.skills-tab-panel');

  const animateProgressBars = (container = document) => {
    const bars = container.querySelectorAll('.skill-progress-bar');
    bars.forEach((bar) => {
      const progress = bar.getAttribute('data-progress');
      if (progress) {
        bar.style.width = progress;
      }
    });
  };

  // Switch tabs (Hard Skills / Soft Skills)
  if (skillTabBtns.length > 0) {
    skillTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab'); // 'hard' or 'soft'

        // Switch active tab button
        skillTabBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Switch active tab panel
        skillTabPanels.forEach((panel) => {
          panel.classList.remove('active');
        });

        const activePanel = document.getElementById(`panel-${targetTab}-skill`);
        if (activePanel) {
          activePanel.classList.add('active');
          // Animate progress bars for newly active panel
          setTimeout(() => animateProgressBars(activePanel), 50);
        }
      });
    });
  }

  // Animate progress bars when skills section is scrolled into view
  const skillsSection = document.getElementById('skills');
  if (skillsSection && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateProgressBars(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    skillsObserver.observe(skillsSection);
  } else {
    // Fallback immediate trigger
    animateProgressBars();
  }

  console.log('Portfolio Muhammad Ali Narahansyah loaded successfully.');
});