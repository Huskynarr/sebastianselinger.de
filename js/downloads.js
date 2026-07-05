document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const searchInput = document.getElementById('search-certs');
    const langToggle = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');

    // Get current language from documentElement
    function getLang() {
        return document.documentElement.getAttribute('data-lang') || 'de';
    }

    // SVG icon for the download/view PDF button
    const externalLinkIcon = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
    `;

    // Render certificates
    function renderCertificates(query = '') {
        const lang = getLang();
        const searchLower = query.toLowerCase().trim();

        // 1. Allgemein Section
        const allgemeinList = document.getElementById('list-allgemein');
        const allgemeinBadge = document.getElementById('badge-allgemein');
        if (allgemeinList && DOWNLOADS_DATA.allgemein) {
            const filtered = DOWNLOADS_DATA.allgemein.filter(item => {
                const title = (lang === 'de' ? item.title_de : item.title_en) || '';
                const issuer = (lang === 'de' ? item.issuer_de : item.issuer_en) || '';
                return title.toLowerCase().includes(searchLower) || issuer.toLowerCase().includes(searchLower);
            });

            allgemeinBadge.textContent = filtered.length;
            allgemeinList.innerHTML = '';

            if (filtered.length === 0) {
                allgemeinList.innerHTML = `<div class="no-results" data-lang-de="Keine Zertifikate gefunden." data-lang-en="No certificates found.">${lang === 'de' ? 'Keine Zertifikate gefunden.' : 'No certificates found.'}</div>`;
            } else {
                filtered.forEach(item => {
                    const title = lang === 'de' ? item.title_de : item.title_en;
                    const issuer = lang === 'de' ? item.issuer_de : item.issuer_en;
                    const date = lang === 'de' ? item.date_de : item.date_en;

                    let actionHtml = '';
                    const fileDe = item.files.de;
                    const fileEn = item.files.en;

                    if (fileDe && fileEn && fileDe !== fileEn) {
                        actionHtml = `
                            <a href="${encodeURI(fileDe)}" class="btn-download" target="_blank" aria-label="PDF Deutsch für ${title}">
                                <span>Deutsch</span>
                                ${externalLinkIcon}
                            </a>
                            <a href="${encodeURI(fileEn)}" class="btn-download" target="_blank" aria-label="PDF English for ${title}">
                                <span>English</span>
                                ${externalLinkIcon}
                            </a>
                        `;
                    } else {
                        const fileLink = fileDe || fileEn;
                        const btnText = lang === 'de' ? 'PDF anzeigen' : 'View PDF';
                        actionHtml = `
                            <a href="${encodeURI(fileLink)}" class="btn-download" target="_blank" aria-label="${btnText} - ${title}">
                                <span>${btnText}</span>
                                ${externalLinkIcon}
                            </a>
                        `;
                    }

                    allgemeinList.innerHTML += `
                        <div class="cert-row">
                            <div class="cert-info">
                                <span class="cert-title">${title}</span>
                                <div class="cert-meta">
                                    <span class="cert-issuer-badge">${issuer}</span>
                                    <span class="cert-date-val">${date}</span>
                                </div>
                            </div>
                            <div class="cert-actions">
                                ${actionHtml}
                            </div>
                        </div>
                    `;
                });
            }
        }

        // 2. PMI Section
        const pmiList = document.getElementById('list-pmi');
        const pmiBadge = document.getElementById('badge-pmi');
        if (pmiList && DOWNLOADS_DATA.pmi) {
            const filtered = DOWNLOADS_DATA.pmi.filter(item => {
                return item.title.toLowerCase().includes(searchLower);
            });

            pmiBadge.textContent = filtered.length;
            pmiList.innerHTML = '';

            if (filtered.length === 0) {
                pmiList.innerHTML = `<div class="no-results" data-lang-de="Keine Zertifikate gefunden." data-lang-en="No certificates found.">${lang === 'de' ? 'Keine Zertifikate gefunden.' : 'No certificates found.'}</div>`;
            } else {
                filtered.forEach(item => {
                    const date = lang === 'de' ? item.date_de : item.date_en;
                    const btnText = lang === 'de' ? 'PDF anzeigen' : 'View PDF';
                    const issuer = lang === 'de' ? 'PMI (LinkedIn Learning)' : 'PMI (LinkedIn Learning)';

                    pmiList.innerHTML += `
                        <div class="cert-row">
                            <div class="cert-info">
                                <span class="cert-title">${item.title}</span>
                                <div class="cert-meta">
                                    <span class="cert-issuer-badge">${issuer}</span>
                                    <span class="cert-date-val">${date}</span>
                                </div>
                            </div>
                            <div class="cert-actions">
                                <a href="${encodeURI(item.file)}" class="btn-download" target="_blank" aria-label="${btnText} - ${item.title}">
                                    <span>${btnText}</span>
                                    ${externalLinkIcon}
                                </a>
                            </div>
                        </div>
                    `;
                });
            }
        }

        // 3. LinkedIn Section
        const linkedinList = document.getElementById('list-linkedin');
        const linkedinBadge = document.getElementById('badge-linkedin');
        if (linkedinList && DOWNLOADS_DATA.linkedIn) {
            const filtered = DOWNLOADS_DATA.linkedIn.filter(item => {
                return item.title.toLowerCase().includes(searchLower);
            });

            linkedinBadge.textContent = filtered.length;
            linkedinList.innerHTML = '';

            if (filtered.length === 0) {
                linkedinList.innerHTML = `<div class="no-results" data-lang-de="Keine Zertifikate gefunden." data-lang-en="No certificates found.">${lang === 'de' ? 'Keine Zertifikate gefunden.' : 'No certificates found.'}</div>`;
            } else {
                filtered.forEach(item => {
                    const date = lang === 'de' ? item.date_de : item.date_en;
                    const btnText = lang === 'de' ? 'PDF anzeigen' : 'View PDF';
                    const issuer = 'LinkedIn Learning';

                    linkedinList.innerHTML += `
                        <div class="cert-row">
                            <div class="cert-info">
                                <span class="cert-title">${item.title}</span>
                                <div class="cert-meta">
                                    <span class="cert-issuer-badge">${issuer}</span>
                                    <span class="cert-date-val">${date}</span>
                                </div>
                            </div>
                            <div class="cert-actions">
                                <a href="${encodeURI(item.file)}" class="btn-download" target="_blank" aria-label="${btnText} - ${item.title}">
                                    <span>${btnText}</span>
                                    ${externalLinkIcon}
                                </a>
                            </div>
                        </div>
                    `;
                });
            }
        }

        // Auto-expand/collapse accordions during search
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const body = item.querySelector('.accordion-body');
            const badge = item.querySelector('.accordion-badge');
            const count = parseInt(badge.textContent, 10);

            if (searchLower !== '') {
                // If search is active, open sections with results, close empty ones
                if (count > 0) {
                    item.classList.add('active');
                    body.style.maxHeight = body.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    body.style.maxHeight = '0px';
                }
            } else {
                // Restore default states when search is cleared
                // By default, open 'allgemein' (first tab) and close others
                const itemId = item.getAttribute('data-id');
                if (itemId === 'allgemein') {
                    item.classList.add('active');
                    body.style.maxHeight = body.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    body.style.maxHeight = '0px';
                }
            }
        });
    }

    // Setup Accordion Toggle Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const body = item.querySelector('.accordion-body');
            const isActive = item.classList.contains('active');

            // Close current item if active, otherwise open it
            if (isActive) {
                item.classList.remove('active');
                body.style.maxHeight = '0px';
            } else {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // Listen to Search Input
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            renderCertificates(e.target.value);
        });
    }

    // Initial render
    renderCertificates();

    // Listen to language switch buttons from main template
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            setTimeout(() => {
                renderCertificates(searchInput ? searchInput.value : '');
            }, 50);
        });
    }
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', function() {
            setTimeout(() => {
                renderCertificates(searchInput ? searchInput.value : '');
            }, 50);
        });
    }
});
