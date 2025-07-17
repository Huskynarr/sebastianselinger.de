// Portfolio Modal System
const portfolioData = {
    huskynarr: {
        title: "Huskynarr Gaming Identity",
        subtitle: "Personal Gaming Brand & Community Platform",
        image: "./images/projects/huskynarr.de.png",
        description: "Huskynarr represents my personal gaming identity and brand that I've been developing since 2008. This project encompasses my online presence in the gaming community, including social media, streaming, and community engagement across various gaming platforms.",
        technologies: ["Community Management", "Social Media", "Gaming", "Branding", "Content Creation"],
        year: "2008 - Present",
        category: "Personal Branding",
        status: "Active",
        links: [
            {
                text: "Gaming Profile",
                url: "https://huskynarr.de",
                icon: "fas fa-gamepad"
            }
        ]
    },
    xboxdev: {
        title: "XboxDev News Portal",
        subtitle: "Gaming Industry News & Developer Resources",
        image: "./images/projects/xboxdev.com.png",
        description: "XboxDev.com is a comprehensive gaming industry news portal that I founded and manage. The platform focuses on Xbox ecosystem news, developer resources, and industry insights. It serves as a hub for gaming professionals and enthusiasts interested in Xbox development and gaming industry trends.",
        technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "SEO", "Content Management"],
        year: "2016 - Present",
        category: "Web Development",
        status: "Active",
        links: [
            {
                text: "Visit XboxDev",
                url: "https://xboxdev.com",
                icon: "fas fa-external-link-alt"
            }
        ]
    },
    nda: {
        title: "NDA Projects",
        subtitle: "Confidential QA & Testing Projects",
        image: "./images/projects/pexels-pixabay-261679.jpg",
        description: "Over the years, I have worked on numerous quality assurance and testing projects for major gaming companies and software developers. Due to non-disclosure agreements, specific details cannot be shared, but these projects have involved AAA game testing, software quality assurance, and technical validation across various platforms.",
        technologies: ["QA Testing", "Bug Reporting", "Test Automation", "Game Testing", "Software Testing"],
        year: "2017 - Present",
        category: "Quality Assurance",
        status: "Ongoing",
        links: []
    },
    hdcp: {
        title: "HDCP Security Research",
        subtitle: "Xbox Series X HDCP Implementation Analysis",
        image: "https://i0.wp.com/backend.huskynarr.de/wp-content/uploads/2019/12/crypto.jpg",
        description: "Security research project analyzing HDCP (High-bandwidth Digital Content Protection) implementation on Xbox Series X with AverMedia Capture Card 4K GC573. This research identified potential vulnerabilities in content protection systems for streaming platforms like Netflix and Amazon Prime Video.",
        technologies: ["Security Research", "HDCP Analysis", "Hardware Testing", "Vulnerability Assessment"],
        year: "2020",
        category: "Security Research",
        status: "Completed",
        links: [
            {
                text: "Research Details",
                url: "#",
                icon: "fas fa-shield-alt"
            }
        ]
    },
    rbtv: {
        title: "RBTV.info Community Project",
        subtitle: "Community Information Platform",
        image: "./images/projects/rbtv-page.png",
        description: "RBTV.info was a community-driven information platform that I created and managed for the Rocket Beans TV community. The project provided schedules, news, and community features for fans of the German gaming and entertainment channel.",
        technologies: ["Web Development", "Community Management", "API Integration", "Real-time Data"],
        year: "2016 - 2022",
        category: "Community Platform",
        status: "Archived",
        links: []
    },
    gamescom_countdown: {
        title: "Gamescom Countdown Automation",
        subtitle: "Automated Social Media Bot with Test Automation",
        image: "https://i0.wp.com/backend.huskynarr.de/wp-content/uploads/2019/12/crypto.jpg",
        description: "An innovative automation project that created daily countdown posts for Gamescom, the world's largest gaming event. The system automatically posted remaining days/nights until Gamescom, combined with interesting facts about the gaming industry, Gamescom, and Cologne. The unique aspect was that instead of using standard APIs or bot functions, it utilized test automation techniques to navigate through obfuscated websites (particularly X/Twitter) and post content automatically. This approach demonstrated advanced web scraping and automation skills while bypassing traditional API limitations.",
        technologies: ["Test Automation", "Web Scraping", "Selenium WebDriver", "JavaScript", "Social Media Automation", "Obfuscation Bypass", "Daily Scheduling"],
        year: "2018 - 2023",
        category: "Automation Project",
        status: "Completed",
        links: []
    },
    gamescom_guide: {
        title: "Gamescom Survival Guide",
        subtitle: "Comprehensive Event Guide Book",
        image: "./images/projects/website%20ss%20-%20portfolio.png",
        description: "A comprehensive guide book for parents and first-time visitors to Gamescom. This project was born from numerous requests for tips and advice about navigating the world's largest gaming convention. The guide covers everything from planning and logistics to making the most of the event experience.",
        technologies: ["Content Writing", "Publishing", "Amazon KDP", "Graphic Design"],
        year: "2020",
        category: "Publishing",
        status: "Published",
        links: [
            {
                text: "Buy on Amazon",
                url: "https://amzn.to/3d5O7F3",
                icon: "fab fa-amazon"
            }
        ]
    },
    cologna: {
        title: "Cologna Browser Game",
        subtitle: "Classic Browser Game Revival",
        image: "./images/projects/cologna-page.png",
        description: "Acquisition, distribution, and further development of Cologna, one of the oldest browser games on the market. This project involved modernizing the classic gameplay while preserving its nostalgic appeal and community features.",
        technologies: ["Game Development", "PHP", "MySQL", "Legacy Code", "Community Management"],
        year: "2014 - 2024",
        category: "Game Development",
        status: "Active",
        links: []
    },
    gamescom_press: {
        title: "Gamescom.Press",
        subtitle: "Gaming Press Community Platform",
        image: "https://i0.wp.com/backend.huskynarr.de/wp-content/uploads/2019/12/crypto.jpg",
        description: "Community fan project focused on gaming press and media coverage of Gamescom and other gaming events. The platform served as a hub for gaming journalists and content creators.",
        technologies: ["Community Platform", "Content Management", "Press Relations"],
        year: "2016 - 2023",
        category: "Media Platform",
        status: "Archived",
        links: []
    }
};

function openPortfolioModal(projectId) {
    const project = portfolioData[projectId];
    if (!project) return;
    
    // Create modal HTML
    const modalHTML = `
        <div class="portfolio-modal" id="portfolioModal">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="${project.image}" alt="${project.title}" class="modal-image">
                    <button class="modal-close" onclick="closePortfolioModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <h2 class="modal-title">${project.title}</h2>
                    <p class="modal-subtitle">${project.subtitle}</p>
                    <p class="modal-description">${project.description}</p>
                    
                    <div class="modal-meta">
                        <div class="meta-item">
                            <strong>Year:</strong> ${project.year}
                        </div>
                        <div class="meta-item">
                            <strong>Category:</strong> ${project.category}
                        </div>
                        <div class="meta-item">
                            <strong>Status:</strong> ${project.status}
                        </div>
                    </div>
                    
                    <div class="modal-technologies">
                        <h4>Technologies & Skills:</h4>
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    
                    ${project.links.length > 0 ? `
                        <div class="modal-links">
                            ${project.links.map(link => `
                                <a href="${link.url}" target="_blank" class="modal-link">
                                    <i class="${link.icon}"></i>
                                    ${link.text}
                                </a>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('portfolioModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('portfolioModal');
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePortfolioModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePortfolioModal();
        }
    });
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Initialize portfolio items
document.addEventListener('DOMContentLoaded', function() {
    // Remove all <a> tags from portfolio items and add click handlers
    const portfolioItems = document.querySelectorAll('.item-holder');
    
    portfolioItems.forEach(function(item) {
        // Remove any existing <a> tags and their href attributes
        const links = item.querySelectorAll('a');
        links.forEach(function(link) {
            // Move all children out of the <a> tag
            while (link.firstChild) {
                link.parentNode.insertBefore(link.firstChild, link);
            }
            // Remove the empty <a> tag
            link.remove();
        });
        
        // Add click handlers based on image source
        const img = item.querySelector('img');
        if (img) {
            const src = img.src;
            
            if (src.includes('huskynarr')) {
                item.setAttribute('onclick', 'openPortfolioModal("huskynarr")');
                item.style.cursor = 'pointer';
            } else if (src.includes('xboxdev')) {
                item.setAttribute('onclick', 'openPortfolioModal("xboxdev")');
                item.style.cursor = 'pointer';
            } else if (src.includes('pexels-pixabay-261679')) {
                item.setAttribute('onclick', 'openPortfolioModal("nda")');
                item.style.cursor = 'pointer';
            } else if (src.includes('crypto.jpg')) {
                // Check caption to determine which project
                const caption = item.querySelector('.item-caption h2');
                if (caption) {
                    if (caption.textContent.includes('HDCP') || caption.textContent.includes('PoC')) {
                        item.setAttribute('onclick', 'openPortfolioModal("hdcp")');
                    } else if (caption.textContent.includes('Countdown')) {
                        item.setAttribute('onclick', 'openPortfolioModal("gamescom_countdown")');
                    } else if (caption.textContent.includes('Press')) {
                        item.setAttribute('onclick', 'openPortfolioModal("gamescom_press")');
                    }
                }
                item.style.cursor = 'pointer';
            } else if (src.includes('rbtv-page')) {
                item.setAttribute('onclick', 'openPortfolioModal("rbtv")');
                item.style.cursor = 'pointer';
            } else if (src.includes('website%20ss%20-%20portfolio')) {
                item.setAttribute('onclick', 'openPortfolioModal("gamescom_guide")');
                item.style.cursor = 'pointer';
            } else if (src.includes('cologna-page')) {
                item.setAttribute('onclick', 'openPortfolioModal("cologna")');
                item.style.cursor = 'pointer';
            }
        }
    });
    
    // Prevent any remaining link clicks in portfolio
    document.querySelectorAll('.portfolio a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    });
    
    console.log('Portfolio modal system initialized - all links disabled');
});