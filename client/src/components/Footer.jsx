import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
           }} 
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* 1. TOP SECTION: GIANT CTA */}
        <div className="mb-20 pb-20 border-b border-white/5">
           <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
              <div className="max-w-2xl">
                 <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-4 block">
                   Initiate Sequence
                 </span>
                 <h2 className="text-5xl md:text-8xl font-heading font-bold text-white tracking-tighter leading-[0.9]">
                   READY TO <br />
                   <span className="text-white/40 group-hover:text-white transition-colors">FORGE?</span>
                 </h2>
              </div>
              
              <Link to="/apply">
                 <button className="group relative flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full transition-all duration-300 hover:bg-accent hover:text-white">
                    <span className="text-sm font-bold uppercase tracking-widest">Start Application</span>
                    <div className="w-8 h-8 rounded-full bg-black text-white group-hover:bg-white group-hover:text-accent flex items-center justify-center transition-colors">
                       <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                 </button>
              </Link>
           </div>
        </div>

        {/* 2. MIDDLE SECTION: LINKS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
           
           {/* Column 1: Brand (Span 4) */}
           <div className="md:col-span-4">
              
              {/* --- EXACT LOGO MATCH FROM HEADER --- */}
              <div className="mb-6">
                 {/* Applied 'font-heading' here to match Header.jsx */}
                 <Link to="/" className="text-3xl font-heading tracking-wider inline-block">
                    <span className="text-white">E</span><span className="text-white/60">nclope</span>
                 </Link>
              </div>
              {/* ------------------------------------ */}
              
              <p className="text-text-secondary font-light leading-relaxed mb-6 max-w-sm">
                A digital foundry for the next generation of engineers. 
                We don't just write code; we architect the future.
              </p>
              
              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 <span className="font-mono text-[10px] text-green-500 uppercase tracking-widest">
                   Systems Operational
                 </span>
              </div>
           </div>

           {/* Column 2: SITEMAP */}
           <div className="md:col-span-2 md:col-start-7">
              <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">Directory</h4>
              <ul className="space-y-4">
                 {['Home', 'Showroom', 'Crucible', 'Apply'].map((item) => (
                   <li key={item}>
                     <Link to={`/${item.toLowerCase()}`} className="text-white/70 hover:text-accent transition-colors text-sm block">
                       {item}
                     </Link>
                   </li>
                 ))}
              </ul>
           </div>

           {/* Column 3: SOCIALS */}
           <div className="md:col-span-2">
              <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">Connect</h4>
              <ul className="space-y-4">
                 {[
                   { name: 'Github', icon: Github },
                   { name: 'Twitter', icon: Twitter },
                   { name: 'LinkedIn', icon: Linkedin },
                   { name: 'Instagram', icon: Instagram }
                 ].map((item) => (
                   <li key={item.name}>
                     <a href="#" className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
                       <item.icon size={16} className="group-hover:text-accent transition-colors" />
                       {item.name}
                     </a>
                   </li>
                 ))}
              </ul>
           </div>

           {/* Column 4: LEGAL */}
           <div className="md:col-span-2">
              <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4">
                 <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                 <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                 <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Code of Conduct</a></li>
              </ul>
           </div>

        </div>

        {/* 3. BOTTOM SECTION: SYSTEM BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
           
           <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
              &copy; {currentYear} Enclope Foundry. All Rights Reserved.
           </div>

           <div className="flex items-center gap-6">
              <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                Server: <span className="text-white/60">Ap-South-1</span>
              </div>
              <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                Latency: <span className="text-green-500">12ms</span>
              </div>
           </div>

        </div>

      </div>
    </footer>
  );
}