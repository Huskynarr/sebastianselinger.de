(function() {
    var path = (window.location.pathname || '/').toLowerCase();
    var pathLang = null;

    if (path === '/en' || path.indexOf('/en/') === 0) {
        pathLang = 'en';
    } else if (path === '/de' || path.indexOf('/de/') === 0) {
        pathLang = 'de';
    }

    var saved = localStorage.getItem('lang');
    var browser = (navigator.language || navigator.userLanguage || 'de').toLowerCase();
    var browserLang = browser.indexOf('de') === 0 ? 'de' : 'en';

    var lang = pathLang || (saved === 'de' || saved === 'en' ? saved : browserLang);
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
})();
