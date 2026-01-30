import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Zap, Anvil, Hammer } from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Crucible() {
  return (
    <section id="about" className="py-20 min-h-screen">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-text-primary mb-6"
            variants={fadeInUp}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            <span className="text-accent font-bold">Enclope</span> is a portmanteau of "Enclose" and "Develop".
            We enclose raw talent and promising ideas within a supportive, structured environment to develop them into professional skills and impactful products.
          </motion.p>
        </motion.div>

        {/* Mission & Vision Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Mission */}
          <motion.div className="foundry-card-wrapper" variants={cardVariants}>
            <div className="foundry-card-content">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <Target size={32} />
                </div>
                <h3 className="text-3xl font-heading font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed">
                To create a dynamic ecosystem where emerging talent can learn by building. We empower students to transform their theoretical knowledge into practical expertise, and we provide businesses with a pipeline to the next generation of innovators.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div className="foundry-card-wrapper" variants={cardVariants}>
            <div className="foundry-card-content">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <Lightbulb size={32} />
                </div>
                <h3 className="text-3xl font-heading font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed">
                To become the premier launchpad for student-led digital innovation, recognized for cultivating exceptional talent and delivering outstanding project outcomes.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* The Foundry Concept */}
        <motion.div
          className="mb-20 rounded-3xl overflow-hidden relative border border-white/10 bg-black/40 p-10 md:p-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Anvil size={18} className="text-accent" />
              <span className="font-mono text-sm uppercase tracking-widest text-white/60">The Core Concept</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">The Digital Foundry</h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="p-6" variants={cardVariants}>
                <div className="text-accent/40 mb-4 flex justify-center"><Anvil size={48} /></div>
                <h4 className="text-xl font-bold text-white mb-2">Raw Talent</h4>
                <p className="text-white/60 text-sm">Students & Ideas represent the raw, potent materials ready to be shaped.</p>
              </motion.div>
              <motion.div className="p-6" variants={cardVariants}>
                <div className="text-accent mb-4 flex justify-center"><Hammer size={48} /></div>
                <h4 className="text-xl font-bold text-white mb-2">The Forge</h4>
                <p className="text-white/60 text-sm">Our mentorship and collaborative process melts down barriers and shapes potential.</p>
              </motion.div>
              <motion.div className="p-6" variants={cardVariants}>
                <div className="text-accent/40 mb-4 flex justify-center"><Zap size={48} /></div>
                <h4 className="text-xl font-bold text-white mb-2">Impact</h4>
                <p className="text-white/60 text-sm">Polished professionals and high-quality products emerge from the foundry.</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative background element */}
          <div className="absolute top-0 w-full h-full left-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent to-transparent"></div>
        </motion.div>

        {/* Brand Ethos */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h3
            className="text-2xl font-mono uppercase tracking-widest text-white/40 mb-10 text-center"
            variants={fadeInUp}
          >
            Brand Ethos
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {[
              { title: "Ambitious", desc: "We tackle challenging projects and set high standards." },
              { title: "Supportive", desc: "We are a community built on mentorship and peer learning." },
              { title: "Pragmatic", desc: "We focus on building real things and delivering tangible results." },
              { title: "Innovative", desc: "We embrace fresh ideas and agile methodologies." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                variants={cardVariants}
              >
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}