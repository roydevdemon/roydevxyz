// RoyDevXyz Theme JavaScript

(function() {
  'use strict';

  // ==========================================
  // Language Switching Functionality
  // ==========================================

  function initLanguageSwitcher() {
    // Check if we're on a post or essays page
    const isPostPage = document.querySelector('.post') !== null;
    const isEssaysPage = window.location.pathname.includes('/essays');

    // If on post or essays page, show all content and disable language switching
    if (isPostPage || isEssaysPage) {
      // Show all language content
      document.querySelectorAll('.lang-content').forEach(function(element) {
        element.style.display = 'block';
      });
      return; // Don't initialize language switcher
    }

    // Detect browser language
    function detectBrowserLanguage() {
      const browserLang = navigator.language || navigator.userLanguage;
      // Extract language code (e.g., 'ko-KR' -> 'ko')
      const langCode = browserLang.split('-')[0].toLowerCase();

      // Support only 'ko' and 'en', default to 'en' for all other languages
      return langCode === 'ko' ? 'ko' : 'en';
    }

    // Get current language from localStorage or detect from browser
    let currentLang = localStorage.getItem('preferredLanguage') || detectBrowserLanguage();

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

    // Check for dark mode preference
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const lightModeStyles = {
      background: '#ffffff',
      border: '2px solid #d4d4d4',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    };

    const darkModeStyles = {
      background: '#1a1f29',
      border: '2px solid #2d3748',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
    };

    const currentStyles = isDarkMode ? darkModeStyles : lightModeStyles;

    backToTop.style.cssText = `
      position: fixed;
      bottom: 3rem;
      right: calc(50% - 320px + 1rem);
      width: 50px;
      height: 50px;
      background: ${currentStyles.background};
      border: ${currentStyles.border};
      box-shadow: ${currentStyles.boxShadow};
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      z-index: 1000;
    `;

    document.body.appendChild(backToTop);

    // Bounce animation on hover
    backToTop.addEventListener('mouseenter', function() {
      this.style.animation = 'bounce 0.6s ease';
    });

    backToTop.addEventListener('mouseleave', function() {
      this.style.animation = '';
    });

    // Add bounce keyframes to document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0) scale(1);
        }
        25% {
          transform: translateY(-10px) scale(1.05);
        }
        50% {
          transform: translateY(0) scale(1);
        }
        75% {
          transform: translateY(-5px) scale(1.02);
        }
      }
      .back-to-top {
        will-change: transform;
      }
    `;
    document.head.appendChild(style);

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

    // Update colors when color scheme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        const newStyles = e.matches ? darkModeStyles : lightModeStyles;
        backToTop.style.background = newStyles.background;
        backToTop.style.border = newStyles.border;
        backToTop.style.boxShadow = newStyles.boxShadow;
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addBackToTop);
  } else {
    addBackToTop();
  }

  // Terminal Input Handler
  function initTerminalInput() {
    const terminalInput = document.getElementById('terminalInput');
    if (!terminalInput) return;

    // Get current language from localStorage
    function getCurrentLang() {
      return localStorage.getItem('preferredLanguage') || 'en';
    }

    // Get localized messages
    function getLocalizedMessage(key) {
      const lang = getCurrentLang();
      const messages = {
        en: {
          help: "Available commands:\n- help: Show this help\n- clear: Clear input\n- about: Go to about page\n- home: Go to home page\n- categories: View categories",
          commandNotFound: "Command not found: {command}\nType 'help' for available commands."
        },
        ko: {
          help: "사용 가능한 명령어:\n- help: 도움말 보기\n- clear: 입력 지우기\n- about: 소개 페이지로 이동\n- home: 홈으로 이동\n- categories: 카테고리 보기",
          commandNotFound: "명령어를 찾을 수 없습니다: {command}\n'help'를 입력하여 사용 가능한 명령어를 확인하세요."
        }
      };
      return messages[lang][key] || messages['en'][key];
    }

    // Focus input when clicking anywhere on the page
    document.addEventListener('click', function() {
      terminalInput.focus();
    });

    // Handle Enter key
    terminalInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const command = this.value.trim().toLowerCase();

        // Command handling
        if (command === 'help') {
          alert(getLocalizedMessage('help'));
        } else if (command === 'clear') {
          this.value = '';
        } else if (command === 'about') {
          window.location.href = '/about';
        } else if (command === 'home') {
          window.location.href = '/';
        } else if (command === 'categories') {
          window.location.href = '/categories';
        } else if (command) {
          alert(getLocalizedMessage('commandNotFound').replace('{command}', command));
        }

        this.value = '';
      }
    });
  }

  // Initialize terminal input when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalInput);
  } else {
    initTerminalInput();
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
