import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ValueProposition() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-base text-center">
      <motion.div 
        className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="minimal-card p-8 rounded-lg">
          <h2 className="text-4xl mb-4 text-electric-cyan">Sitting Idle?</h2>
          <p className="text-text-secondary text-lg">
            We provide the projects, mentorship, and a real-world environment to turn your skills into a powerful portfolio.
          </p>
        </div>
        <div className="minimal-card p-8 rounded-lg">
          <h2 className="text-4xl mb-4 text-molten-orange">Have an Idea?</h2>
          <p className="text-text-secondary text-lg">
            Our Crucible is an incubator where we give the best student-led ideas the team, direction, and resources to become reality.
          </p>
        </div>
      </motion.div>
    </section>
  );
}