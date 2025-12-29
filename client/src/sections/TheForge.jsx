import { useState } from 'react';
import { motion } from 'framer-motion';
import { forgeCategories } from '../data/content';

// --- CATEGORY ICONS ---
const CategoryIcons = {
  forge: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  craft: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeOpacity="0.6" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
    </svg>
  ),
  amplify: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3v18h18" strokeOpacity="0.6" />
      <path d="M7 16l4-4 3 3 5-6" />
      <circle cx="18" cy="9" r="2" />
    </svg>
  ),
};

// --- SERVICE ICONS ---
const ServiceIcons = {
  saas: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" strokeOpacity="0.6" />
      <path d="M8 21h8" /><path d="M12 17v4" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  mobile: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="2" strokeOpacity="0.6" />
      <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  landing: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity="0.6" />
      <path d="M3 9h18" /><circle cx="6" cy="6" r="1" />
    </svg>
  ),
  management: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" strokeOpacity="0.6" />
      <rect x="3" y="14" width="7" height="7" rx="1" strokeOpacity="0.6" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  iot: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4" /><path d="M12 18v4" />
      <path d="M2 12h4" /><path d="M18 12h4" />
      <path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" />
    </svg>
  ),
  uiux: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeOpacity="0.6" />
    </svg>
  ),
  templates: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity="0.6" />
      <path d="M3 9h18" /><path d="M9 21V9" />
    </svg>
  ),
  catalogs: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeOpacity="0.6" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  creatives: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity="0.6" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  email: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" strokeOpacity="0.6" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  social: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" strokeOpacity="0.6" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98" /><path d="M15.41 6.51l-6.82 3.98" />
    </svg>
  ),
  seo: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" strokeOpacity="0.6" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6" /><path d="M8 11h6" />
    </svg>
  ),
  whatsapp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeOpacity="0.6" />
    </svg>
  ),
};

const getServiceIcon = (id) => {
  const Icon = ServiceIcons[id];
  return Icon ? <Icon /> : <ServiceIcons.saas />;
};

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export default function Forge({ showTitle = true }) {
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We will be in touch shortly.');
    e.target.reset();
  };

  // Flatten all services for the contact form select
  const allServices = forgeCategories.flatMap(cat => cat.services);

  return (
    <section id="forge" className="relative py-24 min-h-screen overflow-hidden">

      {/* Background Ambient Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,95,31,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,95,31,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Hero Header */}
        {showTitle && (
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#ff7f50]"></span>
              <span className="text-accent font-body tracking-[0.25em] uppercase text-xs font-medium">Services & Capabilities</span>
              <span className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#ff7f50]"></span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hero-title text-5xl md:text-7xl lg:text-8xl mb-6"
            >
              The Forge
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto"
            >
              Where raw ideas are shaped into powerful digital solutions.
            </motion.p>
          </div>
        )}

        {/* Category Sections */}
        <div className="max-w-6xl mx-auto space-y-20">
          {forgeCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Category Header */}
              <div className="flex items-center gap-6 mb-10">
                {/* Icon */}
                <div className={`p-4 rounded-xl border transition-all duration-500 ${category.id === 'forge' ? 'bg-accent/10 border-accent text-accent' :
                    category.id === 'craft' ? 'bg-purple-500/10 border-purple-500/50 text-purple-400' :
                      'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                  }`}>
                  {CategoryIcons[category.id]()}
                </div>

                {/* Title & Description */}
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className={`text-3xl md:text-4xl font-heading ${category.id === 'forge' ? 'text-accent' :
                        category.id === 'craft' ? 'text-purple-400' :
                          'text-emerald-400'
                      }`}>
                      {category.name}
                    </h3>
                    <span className="text-text-secondary font-body text-sm tracking-wider uppercase">
                      {category.tagline}
                    </span>
                  </div>
                  <p className="text-text-secondary">{category.description}</p>
                </div>

                {/* Decorative Line */}
                <div className={`hidden md:block flex-1 h-px ${category.id === 'forge' ? 'bg-gradient-to-r from-accent/50 to-transparent' :
                    category.id === 'craft' ? 'bg-gradient-to-r from-purple-500/50 to-transparent' :
                      'bg-gradient-to-r from-emerald-500/50 to-transparent'
                  }`} />
              </div>

              {/* Service Cards Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {category.services.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={cardVariants}
                    className={`group relative p-5 rounded-xl border backdrop-blur-md transition-all duration-500 cursor-pointer overflow-hidden
                      bg-surface/40 hover:bg-surface/70 border-border 
                      hover:shadow-[0_0_25px_rgba(255,95,31,0.1)]
                      ${category.id === 'forge' ? 'hover:border-accent/50' :
                        category.id === 'craft' ? 'hover:border-purple-500/50' :
                          'hover:border-emerald-500/50'}`}
                  >
                    {/* Hover Glow Line */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${category.id === 'forge' ? 'bg-accent' :
                        category.id === 'craft' ? 'bg-purple-500' :
                          'bg-emerald-500'
                      }`} />

                    {/* Icon */}
                    <div className={`mb-4 p-2.5 rounded-lg inline-block border transition-all duration-500
                      bg-base border-border text-text-secondary
                      ${category.id === 'forge' ? 'group-hover:text-accent group-hover:border-accent/50' :
                        category.id === 'craft' ? 'group-hover:text-purple-400 group-hover:border-purple-500/50' :
                          'group-hover:text-emerald-400 group-hover:border-emerald-500/50'}`}
                    >
                      {getServiceIcon(service.id)}
                    </div>

                    {/* Title */}
                    <h4 className={`font-heading text-lg mb-2 transition-colors duration-300 text-text-primary
                      ${category.id === 'forge' ? 'group-hover:text-accent' :
                        category.id === 'craft' ? 'group-hover:text-purple-400' :
                          'group-hover:text-emerald-400'}`}
                    >
                      {service.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {service.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form Section - Chat Bot Style */}
        <div id="contact-form" className="max-w-3xl mx-auto mt-24 pt-20 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent"></span>
              <span className="text-accent font-body tracking-[0.2em] uppercase text-xs">Submit Your Blueprint</span>
              <span className="w-8 h-px bg-accent"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading text-text-primary mb-2">Have a Project in Mind?</h2>
            <p className="text-base text-text-secondary">Describe your idea and we'll get back to you.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="blueprint-chat-container"
          >
            {/* Contact Fields - Above Chat */}
            <div className="blueprint-fields">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="blueprint-input"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="blueprint-input"
              />
              <select className="blueprint-select" defaultValue="">
                <option value="" disabled>Select Service</option>
                {allServices.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            {/* Gradient Border Wrapper */}
            <div className="blueprint-chat-border">
              {/* Inner Content */}
              <form onSubmit={handleContactSubmit} className="blueprint-chat-inner">
                {/* Textarea Area */}
                <div className="blueprint-chat-input">
                  <textarea
                    placeholder="Tell us about your project... What are you building?"
                    required
                    className="blueprint-textarea"
                  ></textarea>
                </div>

                {/* Options Bar */}
                <div className="blueprint-chat-options">
                  {/* Left: Add Buttons */}
                  <div className="blueprint-btns-add">
                    <button type="button" title="Attach file">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                      </svg>
                    </button>
                    <button type="button" title="Add link">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                      </svg>
                    </button>
                  </div>

                  {/* Right: Submit Button */}
                  <button type="submit" className="blueprint-btn-submit">
                    <span className="blueprint-btn-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}