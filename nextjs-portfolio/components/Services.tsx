'use client';

import { FaCode, FaBug, FaServer, FaLightbulb, FaGamepad, FaMobileAlt } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaCode className="text-5xl" />,
      title: 'Web Development',
      description: 'Moderne, responsive Webanwendungen mit modernsten Technologien.',
      features: [
        'React & Next.js Development',
        'Node.js & Express Backend',
        'Database Design & Integration',
        'API Development & Integration',
      ],
    },
    {
      icon: <FaBug className="text-5xl" />,
      title: 'QA & Test Automation',
      description: 'Umfassende Qualitätssicherung und automatisierte Testlösungen.',
      features: [
        'Automated Test Framework Setup',
        'Selenium & Cypress Testing',
        'API Testing & Validation',
        'Gaming Industry Testing',
      ],
    },
    {
      icon: <FaServer className="text-5xl" />,
      title: 'DevOps & Cloud Solutions',
      description: 'Optimierung von Deployment-Prozessen mit modernen DevOps-Praktiken.',
      features: [
        'Docker Containerization',
        'AWS Cloud Deployment',
        'CI/CD Pipeline Setup',
        'Infrastructure as Code',
      ],
    },
    {
      icon: <FaLightbulb className="text-5xl" />,
      title: 'Technical Consulting',
      description: 'Strategische Beratung für technische Entscheidungen und Architektur.',
      features: [
        'Architecture Review',
        'Technology Stack Selection',
        'Code Quality Assessment',
        'Security Audits',
      ],
    },
    {
      icon: <FaGamepad className="text-5xl" />,
      title: 'Gaming Industry Expertise',
      description: 'Spezialisierte Services für die Gaming-Industrie.',
      features: [
        'AAA Game Testing',
        'Gaming Platform Development',
        'Multiplayer Testing',
        'Platform Certification',
      ],
    },
    {
      icon: <FaMobileAlt className="text-5xl" />,
      title: 'Mobile App Development',
      description: 'Cross-platform Mobile-Anwendungen mit außergewöhnlicher UX.',
      features: [
        'React Native Development',
        'iOS & Android Apps',
        'Progressive Web Apps',
        'Mobile Testing',
      ],
    },
  ];

  return (
    <section id="services" className="section-container bg-slate-900/50">
      <h2 className="section-title">Services</h2>
      <p className="section-subtitle">
        Umfassende Lösungen für Ihre Entwicklungs- und Qualitätssicherungsanforderungen
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="card hover:transform hover:-translate-y-2">
            <div className="text-purple-400 mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
            <p className="text-gray-300 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <li key={i} className="text-gray-400 text-sm flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <a href="#contact" className="btn-primary">
          Projekt starten
        </a>
      </div>
    </section>
  );
};

export default Services;
