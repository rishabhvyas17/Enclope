import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Monitor, Smartphone, Globe } from 'lucide-react';

const exhibits = [
  {
    id: "01",
    title: "Sage Utility",
    tag: "Open Source Infrastructure",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop", 
    desc: "A centralized academic repository bridging the gap between students and resources. Features secure peer-to-peer sharing and legacy paper archives.",
    stack: ["React Native", "Node.js", "Firebase"],
    status: "Deployed",
    type: "Mobile App"
  },
  {
    id: "02",
    title: "Quizzie AI",
    tag: "Generative SaaS",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop", 
    desc: "An intelligent engine that transforms raw text into gamified assessments using NLP. Designed for rapid educational scaling.",
    stack: ["Next.js", "OpenAI API", "GCP"],
    status: "Beta",
    type: "Web Platform"
  },
  {
    id: "03",
    title: "Foundry OS",
    tag: "Internal System",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", 
    desc: "The operating system for our community. Manages member progressions, code reviews, and squad assignments.",
    stack: ["Turborepo", "Supabase", "TypeScript"],
    status: "Concept",
    type: "Dashboard"
  }
];

// --- COMPONENT: SHOWROOM DISPLAY CASE ---
const DisplayCase = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative w-full h-[450px] overflow-hidden rounded-xl bg-[#050505] border border-white/5 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. THE IMAGE (The Artifact) */}
      <div className="absolute inset-0">
        <motion.img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover opacity-50 grayscale transition-all duration-700 group-hover:opacity-40 group-hover:grayscale-0 group-hover:scale-105"
        />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* 2. THE SPOTLIGHT EFFECT */}
      <div 
        className={`absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : ''}`} 
        style={{ mixBlendMode: 'overlay' }}
      />

      {/* 3. THE INFO PLACARD */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        
        {/* Top Row: Identification */}
        <div className="flex justify-between items-start">
           <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-white/40 border border-white/10 px-2 py-1 rounded bg-black/50 backdrop-blur-md uppercase tracking-widest">
                Exhibit_0{index + 1}
              </span>
              {item.status === "Deployed" && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 border border-green-500/20">
                   <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[9px] font-mono text-green-500 uppercase tracking-wide">Live</span>
                </div>
              )}
           </div>
           
           {/* Icon Badge */}
           <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${isHovered ? 'bg-white text-black border-white' : 'bg-black/50 text-white/50 border-white/10'}`}>
              <ArrowUpRight size={14} />
           </div>
        </div>

        {/* Bottom Row: Details */}
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
           
           {/* Category Label */}
           <span className="text-accent font-mono text-[10px] uppercase tracking-[0.2em] mb-2 block">
             {item.tag}
           </span>

           {/* Title */}
           <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
             {item.title}
           </h3>

           {/* The Spec Sheet (Slides Up) */}
           <div className={`overflow-hidden transition-all duration-500 ease-out ${isHovered ? 'max-h-[150px] opacity-100' : 'max-h-0 opacity-0'}`}>
             <p className="text-sm text-text-secondary font-light leading-relaxed mb-4 max-w-sm">
               {item.desc}
             </p>
             
             {/* Tech Specs */}
             <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                {item.stack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono text-white/60 uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
             </div>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function Showroom() {
  return (
    <section className="py-32 bg-black relative border-b border-white/5">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ 
              backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
           }} 
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* HEADER */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
               The <span className="text-white/40">Showroom.</span>
             </h2>
             <p className="text-text-secondary max-w-lg text-base font-light">
               Where theory meets reality. Browse the artifacts forged by our engineers.
             </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="hidden md:block"
           >
             <button className="text-xs font-mono text-white/40 hover:text-white uppercase tracking-widest border-b border-transparent hover:border-white transition-all pb-1">
               View Full Archive
             </button>
           </motion.div>
        </div>

        {/* THE GALLERY GRID */}
        {/* Using a Bento Grid layout for visual interest */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
           
           {/* Primary Item (Sage) - Wide */}
           <div className="md:col-span-8">
              <DisplayCase item={exhibits[0]} index={0} />
           </div>

           {/* Secondary Item (Quizzie) - Tall/Narrow */}
           <div className="md:col-span-4">
              <DisplayCase item={exhibits[1]} index={1} />
           </div>

           {/* Tertiary Item (Internal) - Full Width or Thirds depending on content */}
           <div className="md:col-span-12">
              <DisplayCase item={exhibits[2]} index={2} />
           </div>
           
        </div>

      </div>
    </section>
  );
}