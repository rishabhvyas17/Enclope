import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS (Geometric & Technical) ---
const Icons = {
  Workflow: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity="0.5" />
      <path d="M9 9h6" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  ),
  Collaboration: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Output: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Impact: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.5" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
};

// --- DATA ---
const specs = [
  {
    id: 1,
    label: "WORKFLOW",
    current: "Watching Tutorials",
    upgrade: "Shipping Features",
    icon: <Icons.Workflow />,
    desc: "Stop consuming. Start creating."
  },
  {
    id: 2,
    label: "ENVIRONMENT",
    current: "Isolated (Localhost)",
    upgrade: "Collaborative (Git)",
    icon: <Icons.Collaboration />,
    desc: "Code alone, you break it. Code together, you build it."
  },
  {
    id: 3,
    label: "OUTPUT",
    current: "Static Certificate",
    upgrade: "Live Portfolio",
    icon: <Icons.Output />,
    desc: "Recruiters don't verify PDFs. They click links."
  },
  {
    id: 4,
    label: "MARKET VALUE",
    current: "Theoretical Knowledge",
    upgrade: "Proven Experience",
    icon: <Icons.Impact />,
    desc: "Degree gets the interview. Work gets the job."
  }
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function ValueProposition() {
  const [hovered, setHovered] = useState(null);

  // Map icons to IDs
  const getIcon = (id) => {
    if (id == 1) return <Icons.Workflow />;
    if (id == 2) return <Icons.Collaboration />;
    if (id == 3) return <Icons.Output />;
    if (id == 4) return <Icons.Impact />;
    return <Icons.Workflow />;
  };

  return (
    <section className="py-24 relative w-full overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-4"
          >
            {/* Stable Dot (No Pulse) */}
            <span className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#ff7f50]"></span>
            <span className="text-accent font-heading tracking-[0.2em] uppercase text-xs">System Analysis</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-text-primary leading-tight"
          >
            Don't just learn. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-secondary to-transparent">Evolve.</span>
          </motion.h2>
        </div>

        {/* The Spec Sheet Grid */}
        <div className="relative max-w-7xl mx-auto">
          
          {/* The Circuit Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[28px] top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-border to-transparent md:block hidden z-0"
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-5" 
          >
            {specs.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl border backdrop-blur-md transition-all duration-500 z-10 overflow-hidden ${
                  hovered === item.id 
                    ? 'bg-surface/90 border-accent' // Clean border change, no shadow shimmer
                    : 'bg-surface/30 border-border hover:border-text-secondary/30'
                }`}
              >
                {/* REMOVED: Background Gradient Sweep */}
                
                {/* 1. Icon & Label */}
                <div className="flex items-center gap-5 w-full md:w-[220px] relative z-10">
                  <div className={`p-3 rounded-lg border transition-all duration-500 ${hovered === item.id ? 'bg-accent text-base border-accent rotate-3 scale-110' : 'bg-base border-border text-text-secondary'}`}>
                    {getIcon(item.id)}
                  </div>
                  <span className="font-heading text-xs tracking-[0.15em] text-text-secondary uppercase group-hover:text-text-primary transition-colors">
                    {item.label}
                  </span>
                </div>

                {/* 2. The Comparison */}
                <div className="flex items-center justify-center md:justify-start gap-6 md:gap-10 w-full md:flex-1 relative z-10">
                  {/* Current State */}
                  <div className={`text-lg md:text-xl transition-all duration-500 text-right md:text-left font-light ${hovered === item.id ? 'text-text-secondary/20 blur-[1px]' : 'text-text-secondary'}`}>
                    {item.current}
                  </div>
                  
                  {/* Arrow */}
                  <div className="relative flex-shrink-0">
                    <span className={`text-xl transition-all duration-500 block ${hovered === item.id ? 'text-accent translate-x-3 scale-125' : 'text-border'}`}>
                      →
                    </span>
                  </div>

                  {/* New State */}
                  <div className={`text-lg md:text-2xl font-bold transition-all duration-500 ${hovered === item.id ? 'text-accent scale-105 drop-shadow-[0_0_15px_rgba(255,95,31,0.5)]' : 'text-text-primary'}`}>
                    {item.upgrade}
                  </div>
                </div>

                {/* 3. Insight */}
                <div className="w-full md:w-1/3 text-center md:text-right hidden md:block relative z-10">
                  <p className={`text-sm transition-all duration-500 ${hovered === item.id ? 'text-text-primary opacity-100 translate-y-0' : 'text-text-secondary opacity-0 translate-y-2'}`}>
                    "{item.desc}"
                  </p>
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Final Trigger */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <button className="btn-primary text-lg px-12 py-4 rounded-full group relative overflow-hidden hover:scale-105 transition-transform duration-300">
            <span className="relative z-10 group-hover:text-base font-bold tracking-wider">Initialize Upgrade</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}