// RoyDevXyz Theme JavaScript

(function() {
  'use strict';

  // ==========================================
  // Language Switching
  // ==========================================
  function initLanguageSwitcher() {
    const isPostPage = document.querySelector('.post') !== null;
    if (isPostPage) {
      document.querySelectorAll('.lang-content').forEach(function(el) {
        el.style.display = 'block';
      });
      return;
    }

    function detectBrowserLanguage() {
      const langCode = (navigator.language || navigator.userLanguage).split('-')[0].toLowerCase();
      return langCode === 'ko' ? 'ko' : 'en';
    }

    let currentLang = localStorage.getItem('preferredLanguage') || detectBrowserLanguage();

    function switchLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('preferredLanguage', lang);

      document.querySelectorAll('.lang-content').forEach(function(el) {
        el.style.display = 'none';
      });

      document.querySelectorAll('.lang-content[data-lang="' + lang + '"]').forEach(function(el) {
        el.style.display = 'block';
      });

      document.querySelectorAll('.lang-link').forEach(function(link) {
        link.classList.toggle('active', link.getAttribute('data-lang') === lang);
      });
    }

    document.querySelectorAll('.lang-link').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        switchLanguage(this.getAttribute('data-lang'));
      });
    });

    switchLanguage(currentLang);
  }

  // ==========================================
  // Back to Top
  // ==========================================
  function addBackToTop() {
    var btn = document.createElement('button');
    btn.textContent = '\u2191';
    btn.style.cssText =
      'position:fixed;bottom:2rem;right:calc(50% - 320px + 1rem);width:36px;height:36px;' +
      'background:var(--bg);border:1px solid var(--border);border-radius:50%;' +
      'font-size:16px;cursor:pointer;opacity:0;transition:opacity 0.3s;z-index:1000;color:var(--text);';

    document.body.appendChild(btn);

    window.addEventListener('scroll', function() {
      btn.style.opacity = window.scrollY > 300 ? '1' : '0';
    });

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // Copy Code Button
  // ==========================================
  function addCopyButtons() {
    document.querySelectorAll('pre code').forEach(function(codeBlock) {
      var pre = codeBlock.parentElement;
      var btn = document.createElement('button');
      btn.textContent = 'Copy';
      btn.style.cssText =
        'position:absolute;top:8px;right:8px;padding:4px 8px;' +
        'background:var(--border);color:var(--text);border:none;border-radius:3px;' +
        'cursor:pointer;font-size:12px;opacity:0.6;transition:opacity 0.15s;';

      btn.addEventListener('mouseenter', function() { this.style.opacity = '1'; });
      btn.addEventListener('mouseleave', function() { this.style.opacity = '0.6'; });

      pre.style.position = 'relative';
      pre.appendChild(btn);

      btn.addEventListener('click', function() {
        navigator.clipboard.writeText(codeBlock.textContent).then(function() {
          btn.textContent = 'Copied!';
          setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
        });
      });
    });
  }

  // ==========================================
  // Init
  // ==========================================
  function init() {
    initLanguageSwitcher();
    addBackToTop();
    addCopyButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
