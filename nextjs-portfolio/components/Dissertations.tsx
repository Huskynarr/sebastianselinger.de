'use client';

import { FaGraduationCap, FaFilePdf } from 'react-icons/fa';

const Dissertations = () => {
  const dissertations = [
    {
      title: 'Optimierung von Test-Automatisierungs-Frameworks für AAA-Gaming',
      institution: 'Technische Hochschule',
      year: '2023',
      description: 'Entwicklung und Evaluation eines skalierbaren Test-Frameworks für Multiplayer-Spiele mit Fokus auf Performance und Zuverlässigkeit.',
      topics: ['Test Automation', 'Gaming QA', 'Scalability', 'Performance Testing'],
      status: 'Abgeschlossen',
      pdfLink: '#',
    },
    {
      title: 'Security Testing in Cloud-basierten Gaming-Plattformen',
      institution: 'Universität für Technologie',
      year: '2022',
      description: 'Analyse von Sicherheitslücken in modernen Cloud-Gaming-Infrastrukturen und Entwicklung von Best Practices.',
      topics: ['Cloud Security', 'Gaming Platforms', 'Penetration Testing', 'DevSecOps'],
      status: 'Abgeschlossen',
      pdfLink: '#',
    },
    {
      title: 'KI-gestützte Testautomatisierung für moderne Webanwendungen',
      institution: 'Institut für Software Engineering',
      year: '2024',
      description: 'Forschung zu Machine Learning-Algorithmen für intelligente Test-Case-Generierung und automatische Bug-Detection.',
      topics: ['Machine Learning', 'Test Automation', 'AI in QA', 'Web Testing'],
      status: 'In Arbeit',
      pdfLink: '#',
    },
  ];

  return (
    <section id="dissertations" className="section-container">
      <h2 className="section-title">Dissertationen & Forschung</h2>
      <p className="section-subtitle">
        Akademische Arbeiten und Forschungsbeiträge im Bereich Software-Testing und QA
      </p>
      
      <div className="space-y-6">
        {dissertations.map((diss, index) => (
          <div key={index} className="card hover:transform hover:-translate-y-1">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center border-2 border-purple-500/50">
                  <FaGraduationCap className="text-4xl text-purple-400" />
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{diss.title}</h3>
                    <p className="text-purple-300 text-sm">
                      {diss.institution} • {diss.year}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs border ${
                    diss.status === 'Abgeschlossen' 
                      ? 'bg-green-600/20 text-green-300 border-green-500/30'
                      : 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30'
                  }`}>
                    {diss.status}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {diss.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {diss.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                {diss.pdfLink !== '#' && (
                  <a
                    href={diss.pdfLink}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <FaFilePdf />
                    <span>PDF herunterladen</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 card text-center">
        <h3 className="text-2xl font-bold mb-4 text-purple-400">Forschungsinteressen</h3>
        <p className="text-gray-300 mb-6">
          Meine Forschung konzentriert sich auf die Schnittstelle zwischen Software-Testing, 
          künstlicher Intelligenz und Gaming-Technologien. Ich bin stets an Kooperationen 
          und wissenschaftlichem Austausch interessiert.
        </p>
        <a href="#contact" className="btn-secondary inline-block">
          Zusammenarbeit anfragen
        </a>
      </div>
    </section>
  );
};

export default Dissertations;
