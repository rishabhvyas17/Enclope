import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/content';

export default function Forge({ showTitle = true }) {
  // State to track which service is currently selected
  const [selectedId, setSelectedId] = useState(services[0].id);

  // Find the full object for the selected service
  const selectedService = services.find(s => s.id === selectedId);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We will be in touch shortly.');
    e.target.reset();
  };

  return (
    <section id="forge" className="py-20 min-h-screen">
      {showTitle && (
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary">The Forge</h2>
          <p className="text-lg mt-4">Our Services & Capabilities</p>
        </div>
      )}

      {/* --- NEW INTERACTIVE SERVICES GRID --- */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column: Service Selector */}
        <div className="md:col-span-1">
          <ul className="space-y-2">
            {services.map(service => (
              <li 
                key={service.id}
                onClick={() => setSelectedId(service.id)}
                className={`p-4 rounded-lg cursor-pointer border transition-colors duration-300 ${selectedId === service.id ? 'bg-surface border-accent' : 'border-border hover:bg-muted'}`}
              >
                <h3 className="text-2xl font-heading">{service.title}</h3>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Service Details */}
        <div className="md:col-span-2 minimal-card rounded-xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId} // This key is crucial for AnimatePresence to work
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="text-6xl mb-4">{selectedService.icon}</div>
              <h2 className="text-4xl font-bold text-text-primary mb-4">{selectedService.title}</h2>
              <p className="text-lg text-text-secondary leading-relaxed">{selectedService.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- CONTACT FORM SECTION --- */}
      <div className="max-w-3xl mx-auto mt-20 border-t border-border pt-20">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Have a project in mind?</h2>
            <p className="text-lg mt-4 text-text-secondary">Let's build something incredible together.</p>
        </div>
        <form onSubmit={handleContactSubmit} className="space-y-6">
            <input type="text" placeholder="Your Name" required className="w-full bg-surface p-3 rounded-md border border-border text-text-primary focus:border-accent focus:outline-none transition-colors" />
            <input type="email" placeholder="Your Email" required className="w-full bg-surface p-3 rounded-md border border-border text-text-primary focus:border-accent focus:outline-none transition-colors" />
            <textarea placeholder="Tell us about your project..." required className="w-full bg-surface p-3 rounded-md border border-border text-text-primary focus:border-accent focus:outline-none transition-colors h-32"></textarea>
            <div className="text-center">
                <button type="submit" className="btn-primary text-xl px-12 py-4 rounded-full">
                    Submit Blueprint
                </button>
            </div>
        </form>
      </div>
    </section>
  );
}