'use client';

import { FaExternalLinkAlt } from 'react-icons/fa';

const Portfolio = () => {
  const projects = [
    {
      title: 'XboxDev',
      category: 'Website',
      description: 'Gaming-Industrie-Newsportal für Xbox-Entwickler und Fans',
      period: 'März 2018 - heute',
      link: 'https://xboxdev.com',
    },
    {
      title: 'Huskynarr',
      category: 'Website',
      description: 'Privates Projekt über meine Gaming-Identität',
      period: 'Januar 2008',
      link: 'https://huskynarr.de',
    },
    {
      title: 'HDCP Issue PoC',
      category: 'Security Research',
      description: 'Fehlerhafte Netflix/Amazon HDCP-Implementierung auf Xbox',
      period: '2020',
      link: '#',
    },
    {
      title: 'Gamescom Countdown',
      category: 'Automation',
      description: 'Countdown-Website für gamescom mit Discord und Twitter Bot',
      period: '2018-2023',
      link: '#',
    },
    {
      title: 'RBTV.info',
      category: 'Community Project',
      description: 'Erstellung und Verwaltung des Community-Projekts',
      period: '2016 - 2022',
      link: '#',
    },
    {
      title: 'Cologna',
      category: 'Game Development',
      description: 'Akquisition und Weiterentwicklung eines der ältesten Browser-Spiele',
      period: '2014-2024',
      link: '#',
    },
  ];

  return (
    <section id="portfolio" className="section-container bg-slate-900/50">
      <h2 className="section-title">Portfolio</h2>
      <p className="section-subtitle">
        Eine Auswahl meiner Projekte und Arbeiten
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="card group hover:transform hover:-translate-y-2">
            <div className="flex justify-between items-start mb-3">
              <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30">
                {project.category}
              </span>
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-300 text-sm mb-3">{project.description}</p>
            <p className="text-gray-500 text-xs">{project.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
