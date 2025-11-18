'use client';

import { FaMicrosoft, FaGamepad, FaCode, FaBug, FaServer, FaLightbulb } from 'react-icons/fa';
import { SiUbisoft, SiNetflix } from 'react-icons/si';

const Experience = () => {
  const experiences = [
    {
      company: 'Microsoft',
      role: 'Insider Programs',
      period: 'Laufend',
      description: 'Pre-testing & QA für Windows, Xbox und Hololens Plattformen',
      icon: <FaMicrosoft className="text-4xl" />,
    },
    {
      company: 'Ubisoft',
      role: 'AAA Game Testing',
      period: '2020 - 2022',
      description: 'Testing von Technical Alphas und MVP-Versionen von AAA-Videospielen',
      icon: <SiUbisoft className="text-4xl" />,
    },
    {
      company: 'Netflix',
      role: 'Security Research',
      period: '2020',
      description: 'HDCP-Schwachstellenanalyse für 4K-Content-Recording-Forschung',
      icon: <SiNetflix className="text-4xl" />,
    },
    {
      company: 'Keywords Studios',
      role: 'Global Beta Testing',
      period: '2017 - heute',
      description: 'Testing von Multiplayer AAA-Spielen führender Entwickler weltweit',
      icon: <FaGamepad className="text-4xl" />,
    },
    {
      company: 'XboxDev',
      role: 'Gründer & Redakteur',
      period: '2016 - heute',
      description: 'Gründung und Leitung des führenden Xbox-Entwickler-Newsportals',
      icon: <FaCode className="text-4xl" />,
    },
    {
      company: 'Realworld One GmbH',
      role: 'AR/VR Testing',
      period: '2022',
      description: 'QA für E-Learning-Software basierend auf AR/VR-Anwendungen',
      icon: <FaLightbulb className="text-4xl" />,
    },
  ];

  return (
    <section id="experience" className="section-container">
      <h2 className="section-title">Berufserfahrung</h2>
      <p className="section-subtitle">
        Umfangreiche Erfahrung mit führenden Unternehmen in der Gaming- und Tech-Industrie
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp, index) => (
          <div key={index} className="card hover:transform hover:-translate-y-2">
            <div className="text-purple-400 mb-4">{exp.icon}</div>
            <h3 className="text-xl font-bold mb-2">{exp.company}</h3>
            <p className="text-purple-300 text-sm mb-2">{exp.role}</p>
            <p className="text-gray-400 text-sm mb-3">{exp.period}</p>
            <p className="text-gray-300 text-sm">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
