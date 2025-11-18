'use client';

import { useState } from 'react';
import { FaLinkedin, FaXing, FaGithub, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mnqogpdr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-container bg-slate-900/50">
      <h2 className="section-title">Kontakt</h2>
      <p className="section-subtitle">
        Lassen Sie uns zusammenarbeiten! Ich freue mich auf Ihre Nachricht.
      </p>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gradient">Kontaktinformationen</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Haben Sie ein spannendes Projekt oder benötigen Sie Unterstützung bei der Qualitätssicherung? 
              Ich bin hier, um Ihnen zu helfen und gemeinsam großartige Lösungen zu entwickeln.
            </p>
            
            <div className="space-y-6">
              <h4 className="text-xl font-semibold mb-4">Soziale Netzwerke</h4>
              <div className="flex flex-col gap-4">
                <a
                  href="https://www.linkedin.com/in/SebastianSelinger/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <FaLinkedin className="text-2xl" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.xing.com/profile/Sebastian_Selinger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <FaXing className="text-2xl" />
                  <span>XING</span>
                </a>
                <a
                  href="https://github.com/Huskynarr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <FaGithub className="text-2xl" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Ihr Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="ihre@email.de"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Betreff
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Betreff (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Ihre Nachricht..."
                />
              </div>
              
              {submitStatus === 'success' && (
                <div className="bg-green-600/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg">
                  Nachricht erfolgreich gesendet!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-600/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
                  Fehler beim Senden. Bitte versuchen Sie es erneut.
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Wird gesendet...' : (
                  <>
                    <FaPaperPlane />
                    Nachricht senden
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <footer className="mt-20 pt-8 border-t border-white/10 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Sebastian Selinger. Alle Rechte vorbehalten.
        </p>
      </footer>
    </section>
  );
};

export default Contact;
