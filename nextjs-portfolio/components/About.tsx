'use client';

const About = () => {
  return (
    <section id="about" className="section-container bg-slate-900/50">
      <h2 className="section-title">Über mich</h2>
      <p className="section-subtitle">
        Leidenschaftlicher Fullstack-Entwickler und QA-Experte mit umfangreicher Erfahrung in der Gaming-Industrie
      </p>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-6 text-gradient">Wer ich bin</h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Als passionierter Fullstack-Entwickler und QA-Experte bringe ich über 8 Jahre Erfahrung in der Gaming-Industrie mit. 
            Meine Expertise umfasst moderne Entwicklungstechnologien, umfassende Test-Automatisierung und Gaming-Industry-Standards.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Ich spezialisiere mich auf robuste Webanwendungen, die Implementierung umfassender Test-Automatisierungs-Frameworks 
            und stelle Softwarequalität im großen Maßstab sicher. Lassen Sie uns gemeinsam etwas Außergewöhnliches schaffen.
          </p>
          <a href="/files/cv-de-1.pdf" className="btn-primary inline-block">
            Lebenslauf herunterladen
          </a>
        </div>
        
        <div className="card">
          <h3 className="text-2xl font-bold mb-6 text-purple-400">Fähigkeiten im Überblick</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Fullstack Development (React, Node.js, Python)</span>
                <span className="text-purple-400">95%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{width: '95%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>QA Automation (Selenium, Cypress, Jest)</span>
                <span className="text-purple-400">92%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>Gaming Industry & Testing</span>
                <span className="text-purple-400">90%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{width: '90%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>DevOps & CI/CD (Docker, Jenkins, AWS)</span>
                <span className="text-purple-400">85%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
