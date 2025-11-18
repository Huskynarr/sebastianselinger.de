'use client';

import { FaLinkedin, FaXing, FaGithub, FaFacebook } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
      
      <div className="section-container text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Hi, ich bin <span className="text-gradient">Sebastian Selinger</span>
        </h1>
        
        <div className="text-2xl md:text-3xl text-gray-300 mb-8">
          <span className="inline-block">Fullstack Developer</span>
          <span className="mx-3">•</span>
          <span className="inline-block">QA Expert</span>
          <span className="mx-3">•</span>
          <span className="inline-block">Gaming Industry Specialist</span>
        </div>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          8+ Jahre Erfahrung in der Gaming-Industrie mit Expertise in React, Node.js, Python und Test-Automatisierung
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="#contact" className="btn-primary">
            Kontaktieren
          </a>
          <a href="#portfolio" className="btn-secondary">
            Projekte ansehen
          </a>
        </div>
        
        <div className="flex justify-center gap-6">
          <a href="https://www.linkedin.com/in/SebastianSelinger/" target="_blank" rel="noopener noreferrer" 
             className="text-3xl hover:text-purple-400 transition-colors">
            <FaLinkedin />
          </a>
          <a href="https://www.xing.com/profile/Sebastian_Selinger" target="_blank" rel="noopener noreferrer"
             className="text-3xl hover:text-purple-400 transition-colors">
            <FaXing />
          </a>
          <a href="https://github.com/Huskynarr" target="_blank" rel="noopener noreferrer"
             className="text-3xl hover:text-purple-400 transition-colors">
            <FaGithub />
          </a>
          <a href="https://www.facebook.com/sebastianvonselinger" target="_blank" rel="noopener noreferrer"
             className="text-3xl hover:text-purple-400 transition-colors">
            <FaFacebook />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
