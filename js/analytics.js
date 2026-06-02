/* Consent-aware Google Analytics loader.
   GA is only loaded after the visitor explicitly accepts via the cookie banner.
   The choice is persisted in localStorage ('granted' | 'denied'). */
(function () {
    'use strict';

    var GA_ID = 'G-TTZ2JDD0BP';
    var STORAGE_KEY = 'analytics-consent';

    function store(value) {
        try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
    }
    function read() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function loadGA() {
        if (window.__gaLoaded) return;
        window.__gaLoaded = true;

        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(s);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', GA_ID, { anonymize_ip: true });
    }

    function showBanner() {
        var b = document.getElementById('cookie-banner');
        if (b) b.hidden = false;
    }
    function hideBanner() {
        var b = document.getElementById('cookie-banner');
        if (b) b.hidden = true;
    }

    function setConsent(value) {
        store(value);
        hideBanner();
        if (value === 'granted') loadGA();
    }

    function openPrivacyModal() {
        var link = document.getElementById('impressum-link');
        if (link) link.click();
    }
    function closePrivacyModal() {
        var overlay = document.getElementById('impressum-modal');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    function init() {
        var consent = read();
        if (consent === 'granted') {
            loadGA();
        } else if (consent !== 'denied') {
            showBanner();
        }

        var accept = document.getElementById('cookie-accept');
        var decline = document.getElementById('cookie-decline');
        var privacyLink = document.getElementById('cookie-privacy-link');

        if (accept) accept.addEventListener('click', function () { setConsent('granted'); });
        if (decline) decline.addEventListener('click', function () { setConsent('denied'); });
        if (privacyLink) privacyLink.addEventListener('click', function (e) { e.preventDefault(); openPrivacyModal(); });

        // "Cookie-Einstellungen ändern" links (e.g. inside the privacy policy) re-open the banner
        document.addEventListener('click', function (e) {
            var trigger = e.target.closest ? e.target.closest('[data-cookie-settings]') : null;
            if (trigger) {
                e.preventDefault();
                closePrivacyModal();
                showBanner();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
