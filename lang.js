(function () {
  function setLang(lang) {
    document.body.classList.remove('lang-ru', 'lang-en');
    document.body.classList.add('lang-' + lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      const isActive = btn.textContent.trim().toLowerCase() === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    try { localStorage.setItem('aristcel-lang', lang); } catch (e) {}
  }

  window.setLang = setLang;

  window.toggleNav = function () {
    document.querySelector('.nav-links').classList.toggle('open');
  };

  try {
    const saved = localStorage.getItem('aristcel-lang');
    if (saved === 'ru') setLang('ru');
  } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.querySelector('.nav-links').classList.remove('open');
      });
    });
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const hash = this.getAttribute('href');
        if (hash.length < 2) return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 58;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  });
}());
