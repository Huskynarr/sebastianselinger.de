// Interactive Skill Matrix
const skillsData = {
    frontend: [
        {
            name: "React Development",
            level: "expert",
            percentage: 95,
            icon: "⚛️",
            technologies: ["React", "Redux", "Next.js", "TypeScript", "JSX"],
            experience: "5+ years building complex SPAs and component libraries. Expert in hooks, context, and performance optimization."
        },
        {
            name: "Modern JavaScript",
            level: "expert", 
            percentage: 92,
            icon: "🚀",
            technologies: ["ES6+", "TypeScript", "Async/Await", "Modules", "Webpack"],
            experience: "Deep knowledge of modern JS features, async programming, and build tools. Experience with performance optimization."
        },
        {
            name: "CSS & Styling",
            level: "advanced",
            percentage: 88,
            icon: "🎨",
            technologies: ["CSS3", "SASS", "Styled Components", "Bootstrap", "Responsive Design"],
            experience: "Advanced CSS skills including animations, grid, flexbox, and modern layout techniques."
        },
        {
            name: "Vue.js",
            level: "intermediate",
            percentage: 75,
            icon: "💚",
            technologies: ["Vue 3", "Vuex", "Vue Router", "Composition API"],
            experience: "Solid experience with Vue ecosystem for building interactive web applications."
        }
    ],
    backend: [
        {
            name: "Node.js Development",
            level: "expert",
            percentage: 90,
            icon: "🟢",
            technologies: ["Express.js", "NestJS", "Socket.io", "GraphQL", "REST APIs"],
            experience: "Extensive experience building scalable backend services, APIs, and real-time applications."
        },
        {
            name: "Python Development",
            level: "expert",
            percentage: 88,
            icon: "🐍",
            technologies: ["Flask", "Django", "FastAPI", "SQLAlchemy", "Pandas"],
            experience: "Strong Python skills for web development, automation, and data processing applications."
        },
        {
            name: "Database Management",
            level: "advanced",
            percentage: 85,
            icon: "🗄️",
            technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQL Optimization"],
            experience: "Database design, optimization, and management for high-performance applications."
        },
        {
            name: "PHP Development",
            level: "intermediate",
            percentage: 70,
            icon: "🐘",
            technologies: ["PHP 8", "Laravel", "WordPress", "Composer"],
            experience: "Solid PHP experience for web development and content management systems."
        }
    ],
    qa_automation: [
        {
            name: "Selenium WebDriver",
            level: "expert",
            percentage: 95,
            icon: "🤖",
            technologies: ["Selenium Grid", "Page Object Model", "TestNG", "JUnit", "Cross-browser Testing"],
            experience: "Expert-level automation framework development and complex test scenario implementation."
        },
        {
            name: "Cypress Testing",
            level: "expert",
            percentage: 92,
            icon: "🌲",
            technologies: ["Cypress", "E2E Testing", "API Testing", "Visual Testing", "CI/CD Integration"],
            experience: "Advanced Cypress automation for modern web applications with comprehensive test coverage."
        },
        {
            name: "Test Frameworks",
            level: "expert",
            percentage: 90,
            icon: "🧪",
            technologies: ["Jest", "Mocha", "Chai", "Jasmine", "Playwright"],
            experience: "Extensive experience with multiple testing frameworks for unit, integration, and E2E testing."
        },
        {
            name: "Performance Testing",
            level: "advanced",
            percentage: 82,
            icon: "⚡",
            technologies: ["JMeter", "LoadRunner", "Artillery", "K6", "Performance Monitoring"],
            experience: "Load testing, stress testing, and performance optimization for web applications."
        },
        {
            name: "API Testing",
            level: "expert",
            percentage: 88,
            icon: "🔌",
            technologies: ["Postman", "REST Assured", "Newman", "GraphQL Testing", "Contract Testing"],
            experience: "Comprehensive API testing strategies including functional, security, and contract testing."
        }
    ],
    gaming: [
        {
            name: "Game Testing",
            level: "expert",
            percentage: 95,
            icon: "🎮",
            technologies: ["AAA Games", "Multiplayer Testing", "Platform Testing", "Regression Testing"],
            experience: "8+ years testing AAA games for major publishers including Ubisoft, Keywords Studios, and Microsoft."
        },
        {
            name: "Gaming Platforms",
            level: "expert",
            percentage: 90,
            icon: "🎯",
            technologies: ["Xbox", "PlayStation", "PC Gaming", "Mobile Gaming", "VR/AR"],
            experience: "Extensive testing across all major gaming platforms and emerging technologies."
        },
        {
            name: "Beta Testing",
            level: "expert",
            percentage: 92,
            icon: "🔬",
            technologies: ["Alpha Testing", "Beta Programs", "User Acceptance", "Bug Reporting"],
            experience: "Lead beta tester for major gaming companies with focus on quality and user experience."
        },
        {
            name: "Gaming Industry Knowledge",
            level: "expert",
            percentage: 88,
            icon: "🏆",
            technologies: ["Industry Trends", "Gaming News", "Developer Relations", "Community Management"],
            experience: "Deep industry knowledge through XboxDev news portal and extensive network in gaming community."
        }
    ],
    devops: [
        {
            name: "CI/CD Pipelines",
            level: "advanced",
            percentage: 85,
            icon: "🔄",
            technologies: ["Jenkins", "GitHub Actions", "GitLab CI", "Azure DevOps", "Docker"],
            experience: "Building and maintaining automated deployment pipelines for web applications and testing frameworks."
        },
        {
            name: "Containerization",
            level: "advanced",
            percentage: 80,
            icon: "🐳",
            technologies: ["Docker", "Docker Compose", "Kubernetes", "Container Orchestration"],
            experience: "Containerizing applications and managing container deployments for scalable solutions."
        },
        {
            name: "Cloud Platforms",
            level: "intermediate",
            percentage: 75,
            icon: "☁️",
            technologies: ["AWS", "Azure", "Google Cloud", "Serverless", "Cloud Storage"],
            experience: "Deploying and managing applications on major cloud platforms with focus on scalability."
        },
        {
            name: "Infrastructure as Code",
            level: "intermediate",
            percentage: 70,
            icon: "📋",
            technologies: ["Terraform", "Ansible", "CloudFormation", "Infrastructure Automation"],
            experience: "Automating infrastructure deployment and management using modern IaC tools."
        }
    ]
};

class SkillMatrix {
    constructor() {
        this.currentCategory = 'qa_automation';
        this.animationDelay = 100;
        this.init();
    }

    init() {
        this.createSkillMatrix();
        this.bindEvents();
        this.showCategory(this.currentCategory);
    }

    createSkillMatrix() {
        const container = document.getElementById('skill-matrix-container');
        if (!container) return;

        container.innerHTML = `
            <div class="skill-matrix-heading">
                <h2>Interactive Skill Matrix</h2>
                <p>Explore my technical expertise across different domains. Click on categories to see detailed skills and experience levels.</p>
            </div>
            
            <div class="skill-categories">
                <button class="skill-category-btn" data-category="qa_automation">QA Automation</button>
                <button class="skill-category-btn" data-category="frontend">Frontend</button>
                <button class="skill-category-btn" data-category="backend">Backend</button>
                <button class="skill-category-btn" data-category="gaming">Gaming Industry</button>
                <button class="skill-category-btn" data-category="devops">DevOps</button>
            </div>
            
            <div class="skill-matrix-grid" id="skill-grid">
                <!-- Skills will be populated here -->
            </div>
        `;
    }

    bindEvents() {
        const categoryButtons = document.querySelectorAll('.skill-category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.showCategory(category);
                this.updateActiveButton(e.target);
            });
        });
    }

    updateActiveButton(activeButton) {
        document.querySelectorAll('.skill-category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    showCategory(category) {
        this.currentCategory = category;
        const grid = document.getElementById('skill-grid');
        const skills = skillsData[category] || [];

        // Clear existing skills
        grid.innerHTML = '';

        // Add new skills with animation delay
        skills.forEach((skill, index) => {
            setTimeout(() => {
                const skillElement = this.createSkillElement(skill);
                grid.appendChild(skillElement);
                
                // Trigger progress bar animation
                setTimeout(() => {
                    const progressFill = skillElement.querySelector('.skill-progress-fill');
                    progressFill.style.width = skill.percentage + '%';
                }, 100);
            }, index * this.animationDelay);
        });

        // Update active button
        const activeButton = document.querySelector(`[data-category="${category}"]`);
        if (activeButton) {
            this.updateActiveButton(activeButton);
        }
    }

    createSkillElement(skill) {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item';
        skillDiv.setAttribute('data-level', skill.level);
        
        skillDiv.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-info">
                    <h3>${skill.name}</h3>
                    <div class="skill-level">${skill.level} - ${skill.percentage}%</div>
                </div>
            </div>
            
            <div class="skill-progress">
                <div class="skill-progress-bar">
                    <div class="skill-progress-fill"></div>
                </div>
            </div>
            
            <div class="skill-technologies">
                ${skill.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <div class="skill-experience">
                ${skill.experience}
            </div>
        `;

        return skillDiv;
    }

    // Method to add new skills dynamically
    addSkill(category, skill) {
        if (!skillsData[category]) {
            skillsData[category] = [];
        }
        skillsData[category].push(skill);
        
        if (this.currentCategory === category) {
            this.showCategory(category);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if skill matrix container exists
    const container = document.getElementById('skill-matrix-container');
    if (container) {
        window.skillMatrix = new SkillMatrix();
        console.log('✅ Interactive Skill Matrix initialized');
    }
});

// Intersection Observer for scroll animations
const observeSkillMatrix = () => {
    const skillSection = document.querySelector('.skill-matrix-section');
    if (!skillSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Re-trigger progress animations when section comes into view
                const progressBars = entry.target.querySelectorAll('.skill-progress-fill');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillSection);
};

// Initialize observer when DOM is loaded
document.addEventListener('DOMContentLoaded', observeSkillMatrix);