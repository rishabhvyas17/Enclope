import { motion } from 'framer-motion';

const pathSteps = [
  { title: "Apprentice", description: "Onboarding & First Project" },
  { title: "Artisan", description: "Specialize & Lead" },
  { title: "Forge Master", description: "Mentor & Innovate" },
];

export default function EnterFoundry() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <section id="enter-foundry" className="py-20 min-h-screen">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-bold text-text-primary">Your Apprenticeship</h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto">Follow the Builder's Path and forge your future.</p>
      </div>
      
      <motion.div 
        className="timeline-container max-w-lg mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {pathSteps.map((step, index) => (
          <motion.div key={index} className="timeline-item mb-16" variants={itemVariants}>
            <div className="timeline-dot"></div>
            <div className={`w-1/2 p-4 ${index % 2 === 0 ? 'pr-8' : 'ml-auto pl-8 text-right'}`}>
              <h3 className="text-2xl text-text-primary">{step.title}</h3>
              <p className="text-text-secondary mt-2">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-20">
        <button className="btn-primary text-xl px-12 py-4 rounded-full">Apply to Join</button>
      </div>
    </section>
  );
}