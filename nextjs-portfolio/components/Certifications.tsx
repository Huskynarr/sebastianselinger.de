'use client';

import { FaCertificate, FaCheckCircle } from 'react-icons/fa';
import { SiAtlassian, SiGoogle } from 'react-icons/si';

const Certifications = () => {
  const certifications = [
    {
      title: 'Agile Project Management with Jira Cloud',
      issuer: 'LinkedIn Learning',
      icon: <SiAtlassian className="text-4xl" />,
      date: 'März 2024',
      description: 'Umfassende Jira Cloud-Schulung mit Projekten, Boards, Issues und Agile Prozessen.',
      badges: ['JIRA', 'Agile Management', 'Project Boards'],
      credentialId: '',
      link: 'https://www.linkedin.com/in/SebastianSelinger/',
    },
    {
      title: 'Agile Strategieumsetzung mit OKR',
      issuer: 'LinkedIn Learning',
      icon: <FaCertificate className="text-4xl" />,
      date: 'März 2024',
      description: 'Strategische Implementierung des OKR-Frameworks für agile Organisationen.',
      badges: ['OKR Framework', 'Strategy', 'Goal Setting'],
      credentialId: '',
      link: 'https://www.linkedin.com/in/SebastianSelinger/',
    },
    {
      title: 'Scrum Master Certification Series',
      issuer: 'LinkedIn Learning',
      icon: <FaCertificate className="text-4xl" />,
      date: 'März 2024',
      description: 'Vollständige Scrum Master Zertifizierungsvorbereitung mit Grundlagen und fortgeschrittenen Themen.',
      badges: ['Scrum Framework', 'Agile Methods', 'Team Leadership'],
      credentialId: '',
      link: 'https://www.linkedin.com/in/SebastianSelinger/',
    },
    {
      title: 'Data Privacy Basic',
      issuer: 'Proliance',
      icon: <FaCertificate className="text-4xl" />,
      date: 'November 2023',
      description: 'Umfassende Datenschutzschulung mit DSGVO-Compliance und Datensicherheit.',
      badges: ['GDPR', 'Data Protection', 'Privacy Law'],
      credentialId: '',
      link: 'https://www.linkedin.com/in/SebastianSelinger/',
    },
    {
      title: 'Kevin Mitnick Security Awareness Training',
      issuer: 'KnowBe4',
      icon: <FaCertificate className="text-4xl" />,
      date: 'November 2022',
      description: 'Fortgeschrittene Sicherheitsschulung durch Cybersecurity-Experten Kevin Mitnick.',
      badges: ['Cybersecurity', 'Social Engineering', 'Threat Awareness'],
      credentialId: '128201335',
      link: 'https://www.linkedin.com/in/SebastianSelinger/',
    },
    {
      title: 'Fundamentals of Digital Marketing',
      issuer: 'Google Digital Academy',
      icon: <SiGoogle className="text-4xl" />,
      date: 'Oktober 2022',
      description: 'Umfassende digitale Marketing-Grundlagen mit SEO, SEM und Online-Strategien.',
      badges: ['Digital Marketing', 'SEO/SEM', 'Analytics'],
      credentialId: 'F3D 4CT 9SS',
      link: 'https://www.linkedin.com/in/SebastianSelinger/',
    },
    {
      title: 'A1/A3 Fernpiloten Lehrgang',
      issuer: 'EASA - European Aviation Safety Agency',
      icon: <FaCertificate className="text-4xl" />,
      date: 'Juni 2021',
      description: 'Europäische Drohnenpiloten-Lizenz für A1/A3-Kategorie-Operationen.',
      badges: ['Drone Operations', 'Aviation Safety', 'EU Regulation'],
      credentialId: '',
      link: 'https://www.linkedin.com/in/SebastianSelinger/',
    },
    {
      title: 'Fritz!Zuhause - Smart Home',
      issuer: 'AVM GmbH',
      icon: <FaCertificate className="text-4xl" />,
      date: 'September 2019',
      description: 'Smart-Home-Technologie-Zertifizierung mit Fritz!Box-Integration.',
      badges: ['Smart Home', 'IoT', 'Network Technology'],
      credentialId: '6343643842703887624',
      link: 'https://www.linkedin.com/in/SebastianSelinger/',
    },
  ];

  return (
    <section id="certifications" className="section-container bg-slate-900/50">
      <h2 className="section-title">Zertifizierungen</h2>
      <p className="section-subtitle">
        Professionelle Zertifikate und Qualifikationen in verschiedenen Technologiebereichen
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <div key={index} className="card hover:transform hover:-translate-y-1">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 text-purple-400">
                {cert.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                <p className="text-purple-300 text-sm mb-2">{cert.issuer}</p>
                <p className="text-gray-400 text-sm mb-3">
                  <FaCheckCircle className="inline mr-1 text-green-400" />
                  Erhalten: {cert.date}
                </p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {cert.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {cert.badges.map((badge, i) => (
                <span
                  key={i}
                  className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30"
                >
                  {badge}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {cert.credentialId && (
                <span className="text-gray-400 text-xs">
                  ID: {cert.credentialId}
                </span>
              )}
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
                Verifizieren →
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-300 mb-6">
          Kontinuierliche Weiterbildung ist mir wichtig. Ich bin stets dabei, meine Fähigkeiten zu erweitern 
          und neue Technologien zu erlernen.
        </p>
      </div>
    </section>
  );
};

export default Certifications;
