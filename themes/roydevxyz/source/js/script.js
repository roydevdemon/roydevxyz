// RoyDevXyz Theme JavaScript

(function() {
  'use strict';

  // ==========================================
  // Language Switching Functionality
  // ==========================================

  function initLanguageSwitcher() {
    // Get current language from localStorage or default to 'en'
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';

    // Function to switch language
    function switchLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('preferredLanguage', lang);

      // Hide all language content
      document.querySelectorAll('.lang-content').forEach(function(element) {
        element.style.display = 'none';
      });

      // Show only content for selected language
      document.querySelectorAll('.lang-content[data-lang="' + lang + '"]').forEach(function(element) {
        element.style.display = 'block';
      });

      // Update active state of language buttons
      document.querySelectorAll('.lang-link').forEach(function(link) {
        if (link.getAttribute('data-lang') === lang) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    // Set up language switch buttons
    document.querySelectorAll('.lang-link').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        switchLanguage(lang);
      });
    });

    // Apply saved language preference on page load
    switchLanguage(currentLang);
  }

  // Initialize language switcher when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }

  // Smooth scroll to top
  function addBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.textContent = '👾';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
      position: fixed;
      bottom: 3rem;
      right: 1rem;
      width: 50px;
      height: 50px;
      background: #0f1419;
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1000;
    `;

    document.body.appendChild(backToTop);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
      } else {
        backToTop.style.opacity = '0';
      }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addBackToTop);
  } else {
    addBackToTop();
  }

  // Add active class to current nav item
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    }
  });

  // Add copy button to code blocks
  document.querySelectorAll('pre code').forEach(function(codeBlock) {
    const pre = codeBlock.parentElement;
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.className = 'copy-code-button';
    button.style.cssText = `
      position: absolute;
      top: 5px;
      right: 5px;
      padding: 5px 10px;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
    `;

    pre.style.position = 'relative';
    pre.appendChild(button);

    button.addEventListener('click', function() {
      navigator.clipboard.writeText(codeBlock.textContent).then(function() {
        button.textContent = 'Copied!';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
      });
    });
  });

})();
