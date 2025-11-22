import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const phases = [
  {
    id: "01",
    title: "PROTOCOL",
    subtitle: "The Calibration",
    desc: "Master the internal stack. Break things in the sandbox. Learn the workflow.",
    status: "INITIATION",
    time: "1-2 Months"
  },
  {
    id: "02",
    title: "DEPLOYMENT",
    subtitle: "The Arena",
    desc: "Cleared for duty. Join a squad. Ship live SaaS products for paying clients.",
    status: "ACTIVE DUTY",
    time: "3-5 Months"
  },
  {
    id: "03",
    title: "COMMAND",
    subtitle: "The Vanguard",
    desc: "Architect solutions. Lead junior squads. Own the product roadmap.",
    status: "ELITE TIER",
    time: "6+ Months"
  }
];

export default function EnterFoundry() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end center"]
  });

  const beamHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 500,
    damping: 90
  });

  return (
    <section ref={containerRef} className="py-24 relative w-full overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* 1. HEADER */}
        <div className="relative pl-16 md:pl-24 mb-16">
          <div className="absolute left-[29px] md:left-[45px] top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-[0_0_20px_#ff7f50] z-10 animate-pulse"></div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-text-primary leading-none tracking-tight">
              THE <span className="text-accent">TRAJECTORY</span>
            </h2>
          
          </motion.div>
        </div>

        {/* 2. THE JOURNEY SYSTEM */}
        <div className="relative">
          
          {/* Background Track */}
          <div className="absolute left-[32px] md:left-[48px] top-[-20px] bottom-0 w-[1px] bg-white/10 z-0"></div>
          
          {/* Foreground Laser */}
          <motion.div 
            style={{ height: beamHeight }}
            className="absolute left-[32px] md:left-[48px] top-[-20px] w-[2px] bg-accent shadow-[0_0_25px_#ff7f50] z-10 origin-top"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-white blur-[2px] rounded-full shadow-[0_0_20px_white]"></div>
          </motion.div>

          <div className="flex flex-col gap-8"> 
            {phases.map((phase, index) => (
              <motion.div 
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-16 md:pl-24 group"
              >
                
                {/* --- THE NODE (The "Ember") --- */}
                {/* Default: Dark Orange Border. Hover: Bright Orange + Glow */}
                <div className="absolute left-[21px] md:left-[37px] top-0 w-[24px] h-[24px] flex items-center justify-center bg-base border-2 border-accent/30 rounded-full z-20 group-hover:border-accent transition-colors duration-500 shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                  <div className="w-1.5 h-1.5 bg-accent/50 rounded-full group-hover:bg-accent group-hover:scale-150 group-hover:shadow-[0_0_10px_#ff7f50] transition-all duration-500"></div>
                </div>

                {/* --- THE CARD --- */}
                <div className="relative p-6 rounded-xl border border-white/5 bg-surface/40 backdrop-blur-xl transition-all duration-500 group-hover:bg-surface/60 group-hover:border-accent/40 group-hover:shadow-[0_10px_40px_-10px_rgba(255,95,31,0.15)] group-hover:translate-x-2 overflow-hidden">
                  
                  {/* SPICE 1: Orange Side Bar */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent group-hover:via-accent transition-all duration-500"></div>

                  {/* SPICE 2: Giant Watermark Number */}
                  <div className="absolute -right-4 -bottom-8 text-[120px] font-bold font-heading text-accent/[0.03] group-hover:text-accent/[0.07] transition-colors duration-500 select-none pointer-events-none">
                    {phase.id}
                  </div>

                  <div className="flex flex-col gap-3 relative z-10">
                    
                    <div className="flex items-center justify-between gap-4">
                      {/* SPICE 3: Title turns Orange on Hover */}
                      <h3 className="text-2xl md:text-3xl font-bold text-text-secondary group-hover:text-accent transition-colors duration-300">
                        {phase.title}
                      </h3>
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest border border-white/10 px-2 py-1 rounded group-hover:text-accent group-hover:border-accent/30 transition-colors">
                        {phase.status}
                      </span>
                    </div>

                    <p className="text-accent font-mono text-xs tracking-widest uppercase opacity-80">
                      {phase.subtitle}
                    </p>

                    <p className="text-text-secondary text-sm leading-relaxed max-w-xl opacity-80 group-hover:opacity-100 transition-opacity">
                      {phase.desc}
                    </p>
                    
                    <div className="mt-2 flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-all duration-500">
                       <div className="h-px w-6 bg-accent/50"></div>
                       <span className="text-xs font-mono text-text-primary">{phase.time}</span>
                    </div>

                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

        {/* 3. FOOTER ACTION */}
        <div className="relative pl-16 md:pl-24 mt-12">
           <div className="absolute left-[32px] md:left-[48px] top-[-20px] h-16 w-[1px] bg-gradient-to-b from-accent/50 to-transparent z-0"></div>
           
           <button className="group flex items-center gap-4 text-sm font-bold tracking-widest text-text-secondary hover:text-accent transition-colors py-4">
             <span className="w-12 h-px bg-text-secondary group-hover:bg-accent transition-colors"></span>
             INITIATE SEQUENCE
           </button>
        </div>

      </div>
    </section>
  );
}