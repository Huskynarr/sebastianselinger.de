(function() {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function getPathLanguage() {
        var path = (window.location.pathname || '/').toLowerCase();
        if (path === '/en' || path.indexOf('/en/') === 0) return 'en';
        if (path === '/de' || path.indexOf('/de/') === 0) return 'de';
        return null;
    }

    function detectLanguage() {
        var pathLang = getPathLanguage();
        if (pathLang) return pathLang;

        var saved = localStorage.getItem('lang');
        if (saved === 'de' || saved === 'en') return saved;

        var browserLang = (navigator.language || navigator.userLanguage || 'de').toLowerCase();
        return browserLang.indexOf('de') === 0 ? 'de' : 'en';
    }

    var currentLang = detectLanguage();

    function syncLanguageUrl(lang) {
        var path = (window.location.pathname || '/').toLowerCase();
        var hash = window.location.hash || '';

        if (path === '/de' || path === '/de/' || path === '/en' || path === '/en/') {
            var target = '/' + lang + '/';
            if (window.location.pathname !== target) {
                window.history.replaceState(null, '', target + hash);
            }
        }
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.setAttribute('data-lang', lang);

        document.querySelectorAll('[data-lang-de]').forEach(function(el) {
            var text = el.getAttribute('data-lang-' + lang);
            if (text) el.textContent = text;
        });

        var newLabel = lang === 'de' ? 'EN' : 'DE';
        var langToggle = document.getElementById('lang-toggle');
        var langToggleMobile = document.getElementById('lang-toggle-mobile');
        if (langToggle) langToggle.textContent = newLabel;
        if (langToggleMobile) langToggleMobile.textContent = newLabel;

        syncLanguageUrl(lang);
        initRotator();
    }

    var rotatorWords = {
        de: ['Systemadministrator', 'IT-Berater', 'QA-Experte', 'Ihr IT-Partner'],
        en: ['System Administrator', 'IT Consultant', 'QA Expert', 'Your IT Partner']
    };

    var rotatorIndex = 0;
    var rotatorEl = document.getElementById('rotator-text');
    var rotatorInterval;

    function initRotator() {
        if (!rotatorEl) return;
        if (rotatorInterval) clearInterval(rotatorInterval);

        rotatorIndex = 0;
        var words = rotatorWords[currentLang] || rotatorWords.de;
        rotatorEl.textContent = words[0];

        if (prefersReducedMotion) return;

        rotatorInterval = setInterval(function() {
            rotatorEl.style.opacity = '0';
            rotatorEl.style.transform = 'translateY(-10px)';

            setTimeout(function() {
                rotatorIndex = (rotatorIndex + 1) % words.length;
                rotatorEl.textContent = words[rotatorIndex];
                rotatorEl.style.opacity = '1';
                rotatorEl.style.transform = 'translateY(0)';
            }, 300);
        }, 3000);
    }

    if (rotatorEl && !prefersReducedMotion) {
        rotatorEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    var langToggleButton = document.getElementById('lang-toggle');
    var langToggleMobileButton = document.getElementById('lang-toggle-mobile');

    if (langToggleButton) {
        langToggleButton.addEventListener('click', function() {
            setLanguage(currentLang === 'de' ? 'en' : 'de');
        });
    }

    if (langToggleMobileButton) {
        langToggleMobileButton.addEventListener('click', function() {
            setLanguage(currentLang === 'de' ? 'en' : 'de');
            closeMobileNav();
        });
    }

    setLanguage(currentLang);

    var mobileToggle = document.getElementById('mobile-toggle');
    var mobileNav = document.getElementById('mobile-nav');

    function closeMobileNav() {
        if (!mobileToggle || !mobileNav) return;
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('active');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function() {
            var isOpen = mobileNav.classList.contains('active');
            if (isOpen) {
                closeMobileNav();
            } else {
                mobileToggle.classList.add('active');
                mobileToggle.setAttribute('aria-expanded', 'true');
                mobileNav.classList.add('active');
                mobileNav.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });

        mobileNav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', closeMobileNav);
        });
    }

    var nav = document.getElementById('nav');
    var scrollTop = document.getElementById('scroll-top');
    var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateNavbarState() {
        var y = window.scrollY;

        if (nav) {
            if (y > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        if (scrollTop) {
            if (y > 500) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        }

        var scrollPos = y + 120;
        sections.forEach(function(sec) {
            var top = sec.offsetTop;
            var height = sec.offsetHeight;
            var id = sec.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function(a) {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateNavbarState, { passive: true });
    updateNavbarState();

    if (scrollTop) {
        scrollTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    var revealElements = document.querySelectorAll('.reveal');

    if (prefersReducedMotion) {
        revealElements.forEach(function(el) {
            el.classList.add('visible');
            el.querySelectorAll('.skill-bar-fill').forEach(function(bar) {
                var w = bar.getAttribute('data-width');
                if (w) bar.style.width = w + '%';
            });
        });
    } else {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    entry.target.querySelectorAll('.skill-bar-fill').forEach(function(bar) {
                        var w = bar.getAttribute('data-width');
                        if (w) bar.style.width = w + '%';
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    var filterButtons = document.querySelectorAll('.portfolio-filter');
    var portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var filter = this.getAttribute('data-filter');

            filterButtons.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            portfolioItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    var modalOverlay = document.getElementById('portfolio-modal');
    var modalImage = document.getElementById('modal-image');
    var modalTitle = document.getElementById('modal-title');
    var modalDate = document.getElementById('modal-date');
    var modalDesc = document.getElementById('modal-desc');
    var modalTags = document.getElementById('modal-tags');
    var modalCloseBtn = document.getElementById('modal-close');
    var lastFocusedElement = null;

    function openPortfolioModal(item) {
        if (!modalOverlay || !modalImage || !modalTitle || !modalDate || !modalDesc || !modalTags) return;

        var titleDe = item.getAttribute('data-modal-title-de');
        var titleEn = item.getAttribute('data-modal-title-en');
        var title = item.getAttribute('data-modal-title');

        modalTitle.textContent = (titleDe && titleEn) ? (currentLang === 'de' ? titleDe : titleEn) : (title || '');
        modalImage.src = item.getAttribute('data-modal-img') || '';
        modalImage.alt = modalTitle.textContent;
        modalDate.textContent = item.getAttribute('data-modal-date') || '';
        modalDesc.textContent = currentLang === 'de'
            ? (item.getAttribute('data-modal-desc-de') || '')
            : (item.getAttribute('data-modal-desc-en') || '');

        var tags = item.getAttribute('data-modal-tags');
        modalTags.innerHTML = '';
        if (tags) {
            tags.split(',').forEach(function(tag) {
                var span = document.createElement('span');
                span.textContent = tag.trim();
                modalTags.appendChild(span);
            });
        }

        lastFocusedElement = document.activeElement;
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (modalCloseBtn) modalCloseBtn.focus();
    }

    portfolioItems.forEach(function(item) {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'Open project details');

        item.addEventListener('click', function() {
            openPortfolioModal(this);
        });

        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openPortfolioModal(this);
            }
        });
    });

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    var impressumOverlay = document.getElementById('impressum-modal');
    var impressumCloseBtn = document.getElementById('impressum-close');
    var impressumLink = document.getElementById('impressum-link');

    if (impressumLink) {
        impressumLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (!impressumOverlay) return;
            lastFocusedElement = document.activeElement;
            impressumOverlay.classList.add('active');
            impressumOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (impressumCloseBtn) impressumCloseBtn.focus();
        });
    }

    function closeImpressum() {
        if (!impressumOverlay) return;
        impressumOverlay.classList.remove('active');
        impressumOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    if (impressumCloseBtn) {
        impressumCloseBtn.addEventListener('click', closeImpressum);
    }

    if (impressumOverlay) {
        impressumOverlay.addEventListener('click', function(e) {
            if (e.target === impressumOverlay) closeImpressum();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && impressumOverlay && impressumOverlay.classList.contains('active')) {
            closeImpressum();
        }
    });

    var flipCards = document.querySelectorAll('.flip-card');
    var touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    function toggleFlipCard(card) {
        card.classList.toggle('flipped');
    }

    flipCards.forEach(function(card) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Show collaboration details');

        if (touchDevice) {
            card.addEventListener('click', function() {
                toggleFlipCard(card);
            });
        }

        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleFlipCard(card);
            }
        });
    });

    var skillTabs = document.querySelectorAll('.skill-tab');
    var skillPanels = document.querySelectorAll('.skill-panel');

    function animateSkillBars(panel) {
        panel.querySelectorAll('.skill-bar-fill').forEach(function(bar) {
            bar.style.width = '0';
            var w = bar.getAttribute('data-width');
            setTimeout(function() {
                if (w) bar.style.width = w + '%';
            }, 50);
        });
    }

    skillTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var target = this.getAttribute('data-tab');
            skillTabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
            skillPanels.forEach(function(p) {
                if (p.getAttribute('data-panel') === target) {
                    p.classList.add('active');
                    if (!prefersReducedMotion) {
                        animateSkillBars(p);
                    }
                } else {
                    p.classList.remove('active');
                }
            });
        });
    });

    var skillsSection = document.getElementById('skills');
    if (skillsSection && !prefersReducedMotion) {
        var skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var activePanel = skillsSection.querySelector('.skill-panel.active');
                    if (activePanel) animateSkillBars(activePanel);
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        skillsObserver.observe(skillsSection);
    }

    var form = document.getElementById('contact-form');
    var submitBtn = document.getElementById('submit-btn');
    var formMessage = document.getElementById('form-message');

    if (form && submitBtn && formMessage) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var nameVal = document.getElementById('name').value.trim();
            var emailVal = document.getElementById('email').value.trim();
            var messageVal = document.getElementById('message').value.trim();

            if (!nameVal || !emailVal || !messageVal) {
                formMessage.className = 'form-message error';
                formMessage.textContent = currentLang === 'de'
                    ? 'Bitte füllen Sie alle Pflichtfelder aus.'
                    : 'Please fill in all required fields.';
                return;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                formMessage.className = 'form-message error';
                formMessage.textContent = currentLang === 'de'
                    ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
                    : 'Please enter a valid email address.';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = currentLang === 'de' ? 'Wird gesendet...' : 'Sending...';

            var formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(function(response) {
                if (response.ok) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = currentLang === 'de'
                        ? 'Nachricht erfolgreich gesendet! Ich melde mich bald bei Ihnen.'
                        : 'Message sent successfully! I will get back to you soon.';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            }).catch(function() {
                formMessage.className = 'form-message error';
                formMessage.textContent = currentLang === 'de'
                    ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.'
                    : 'Error sending message. Please try again.';
            }).finally(function() {
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = currentLang === 'de'
                    ? 'Nachricht senden'
                    : 'Send Message';
            });
        });
    }

    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
