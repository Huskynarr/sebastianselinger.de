// Modern Portfolio System
class ModernPortfolio {
    constructor() {
        this.portfolioData = [
            {
                id: 'huskynarr',
                title: 'Huskynarr Gaming Identity',
                category: 'Personal Branding',
                year: '2008 - Present',
                status: 'active',
                image: './images/projects/huskynarr.de.webp',
                description: 'Personal gaming brand and community platform representing my online presence in the gaming community.',
                technologies: ['Community Management', 'Social Media', 'Gaming', 'Branding'],
                links: [
                    { type: 'external', url: 'https://huskynarr.de', icon: 'fas fa-external-link-alt' }
                ],
                filters: ['websites', 'all']
            },
            {
                id: 'xboxdev',
                title: 'XboxDev News Portal',
                category: 'Web Development',
                year: '2016 - Present',
                status: 'active',
                image: './images/projects/xboxdev.com.webp',
                description: 'Gaming industry news portal and developer resources platform focusing on Xbox ecosystem and gaming industry trends.',
                technologies: ['WordPress', 'PHP', 'MySQL', 'SEO', 'Content Management'],
                links: [
                    { type: 'external', url: 'https://xboxdev.com', icon: 'fas fa-external-link-alt' }
                ],
                filters: ['websites', 'all']
            },
            {
                id: 'nda',
                title: 'NDA Projects',
                category: 'Quality Assurance',
                year: '2017 - Present',
                status: 'active',
                image: './images/projects/pexels-pixabay-261679.webp',
                description: 'Confidential quality assurance and testing projects for major gaming companies and software developers.',
                technologies: ['QA Testing', 'Bug Reporting', 'Test Automation', 'Game Testing'],
                links: [],
                filters: ['qa']
            },
            {
                id: 'hdcp',
                title: 'HDCP Security Research',
                category: 'Security Research',
                year: '2020',
                status: 'completed',
                image: 'https://i0.wp.com/backend.huskynarr.de/wp-content/uploads/2019/12/crypto.jpg',
                description: 'Security research analyzing HDCP implementation vulnerabilities on Xbox Series X with AverMedia Capture Card.',
                technologies: ['Security Research', 'HDCP Analysis', 'Hardware Testing', 'Vulnerability Assessment'],
                links: [],
                filters: ['research']
            },
            {
                id: 'gamescom_countdown',
                title: 'Gamescom Countdown Automation',
                category: 'Automation Project',
                year: '2018 - 2023',
                status: 'completed',
                image: 'https://i0.wp.com/backend.huskynarr.de/wp-content/uploads/2019/12/crypto.jpg',
                description: 'Automated social media bot using test automation techniques to navigate obfuscated websites and post daily countdown content.',
                technologies: ['Test Automation', 'Web Scraping', 'Selenium WebDriver', 'Social Media Automation'],
                links: [],
                filters: ['automation', 'qa']
            },
            {
                id: 'rbtv',
                title: 'RBTV.info Community Platform',
                category: 'Community Platform',
                year: '2016 - 2022',
                status: 'archived',
                image: './images/projects/rbtv-page.webp',
                description: 'Community-driven information platform for Rocket Beans TV with schedules, news, and community features.',
                technologies: ['Web Development', 'Community Management', 'API Integration', 'Real-time Data'],
                links: [],
                filters: ['websites']
            },
            {
                id: 'gamescom_guide',
                title: 'Gamescom Survival Guide',
                category: 'Publishing',
                year: '2020',
                status: 'completed',
                image: './images/projects/website ss - portfolio.webp',
                description: 'Comprehensive guide book for parents and first-time visitors to navigate the world\'s largest gaming convention.',
                technologies: ['Content Writing', 'Publishing', 'Amazon KDP', 'Graphic Design'],
                links: [
                    { type: 'external', url: 'https://amzn.to/3d5O7F3', icon: 'fab fa-amazon' }
                ],
                filters: ['research', 'games']
            },
            {
                id: 'cologna',
                title: 'Cologna Browser Game',
                category: 'Game Development',
                year: '2014 - 2024',
                status: 'active',
                image: './images/projects/cologna-page.webp',
                description: 'Acquisition and modernization of one of the oldest browser games, preserving classic gameplay while adding modern features.',
                technologies: ['Game Development', 'PHP', 'MySQL', 'Legacy Code', 'Community Management'],
                links: [],
                filters: ['games']
            }
        ];
        
        this.currentFilter = 'all';
        this.animationDelay = 100;
        this.init();
    }

    init() {
        this.createPortfolioStructure();
        this.renderPortfolio();
        this.bindEvents();
        this.initIntersectionObserver();
    }

    createPortfolioStructure() {
        const portfolioSection = document.querySelector('.portfolio');
        if (!portfolioSection) return;

        portfolioSection.innerHTML = `
            <div class="container">
                <div class="portfolio-container">
                    <div class="portfolio-header">
                        <h2>Portfolio</h2>
                        <p class="portfolio-subtitle">
                            Explore my diverse range of projects spanning web development, QA automation, 
                            gaming industry work, and innovative automation solutions. Each project represents 
                            a unique challenge and learning experience.
                        </p>
                    </div>
                    
                    <div class="portfolio-filters">
                        <button class="portfolio-filter active" data-filter="all">All Projects</button>
                        <button class="portfolio-filter" data-filter="websites">Websites</button>
                        <button class="portfolio-filter" data-filter="qa">QA & Testing</button>
                        <button class="portfolio-filter" data-filter="automation">Automation</button>
                        <button class="portfolio-filter" data-filter="games">Gaming</button>
                        <button class="portfolio-filter" data-filter="research">Research</button>
                    </div>
                    
                    <div class="portfolio-grid" id="portfolio-grid">
                        <!-- Portfolio items will be populated here -->
                    </div>
                </div>
            </div>
        `;
    }

    renderPortfolio() {
        const grid = document.getElementById('portfolio-grid');
        if (!grid) return;

        grid.innerHTML = '';

        this.portfolioData.forEach((project, index) => {
            setTimeout(() => {
                const card = this.createPortfolioCard(project);
                grid.appendChild(card);
                
                // Trigger animation
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, 50);
            }, index * this.animationDelay);
        });
    }

    createPortfolioCard(project) {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.setAttribute('data-modal', project.id);
        card.setAttribute('data-filters', project.filters.join(' '));

        const statusClass = project.status;
        const statusText = project.status.charAt(0).toUpperCase() + project.status.slice(1);

        card.innerHTML = `
            <div class="portfolio-card-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="portfolio-card-overlay">
                    <div class="portfolio-card-overlay-content">
                        <button class="portfolio-view-btn" onclick="openPortfolioModal('${project.id}')">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="portfolio-card-content">
                <div class="portfolio-card-header">
                    <h3 class="portfolio-card-title">${project.title}</h3>
                    <span class="portfolio-card-year">${project.year}</span>
                </div>
                
                <div class="portfolio-card-category">${project.category}</div>
                
                <p class="portfolio-card-description">${project.description}</p>
                
                <div class="portfolio-card-technologies">
                    ${project.technologies.map(tech => 
                        `<span class="portfolio-tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                
                <div class="portfolio-card-footer">
                    <div class="portfolio-card-status">
                        <span class="portfolio-status-indicator ${statusClass}"></span>
                        <span>${statusText}</span>
                    </div>
                    
                    <div class="portfolio-card-links">
                        ${project.links.map(link => 
                            `<a href="${link.url}" target="_blank" class="portfolio-link" title="View Project">
                                <i class="${link.icon}"></i>
                            </a>`
                        ).join('')}
                        <button class="portfolio-link" onclick="openPortfolioModal('${project.id}')" title="View Details">
                            <i class="fas fa-info-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    bindEvents() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.portfolio-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterProjects(filter);
                this.updateActiveFilter(e.target);
            });
        });

        // Card click events
        const cards = document.querySelectorAll('.portfolio-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on links or buttons
                if (e.target.closest('a, button')) return;
                
                const modalId = card.dataset.modal;
                if (window.openPortfolioModal) {
                    window.openPortfolioModal(modalId);
                }
            });
        });
    }

    filterProjects(filter) {
        this.currentFilter = filter;
        const cards = document.querySelectorAll('.portfolio-card');

        cards.forEach((card, index) => {
            const cardFilters = card.dataset.filters ? card.dataset.filters.split(' ') : [];
            const shouldShow = filter === 'all' || cardFilters.includes(filter);

            // Remove existing classes first
            card.classList.remove('hidden', 'visible');
            
            if (shouldShow) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.classList.add('visible');
                    card.classList.remove('hidden');
                }, index * 50);
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });
    }

    updateActiveFilter(activeButton) {
        document.querySelectorAll('.portfolio-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    initIntersectionObserver() {
        const cards = document.querySelectorAll('.portfolio-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // Method to add new projects
    addProject(project) {
        this.portfolioData.push(project);
        this.renderPortfolio();
        this.bindEvents();
    }

    // Method to update project
    updateProject(id, updates) {
        const projectIndex = this.portfolioData.findIndex(p => p.id === id);
        if (projectIndex !== -1) {
            this.portfolioData[projectIndex] = { ...this.portfolioData[projectIndex], ...updates };
            this.renderPortfolio();
            this.bindEvents();
        }
    }
}

// Initialize Modern Portfolio
document.addEventListener('DOMContentLoaded', function() {
    const portfolioSection = document.querySelector('.portfolio');
    if (portfolioSection) {
        window.modernPortfolio = new ModernPortfolio();
        console.log('✅ Modern Portfolio initialized');
    }
});

// Integration with existing portfolio modal
if (typeof openPortfolioModal === 'undefined') {
    window.openPortfolioModal = function(projectId) {
        console.log('Opening modal for project:', projectId);
        // Fallback if modal system isn't loaded
        alert(`Portfolio details for ${projectId} - Modal system loading...`);
    };
}