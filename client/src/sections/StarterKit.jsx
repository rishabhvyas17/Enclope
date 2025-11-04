import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function StarterKit() {
  return (
    <motion.section 
      id="starter-kit" 
      className="py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-surface border border-border rounded-xl p-8 md:p-12">
        <div className="text-center md:text-left">
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary">Your Journey Begins.</h2>
          <p className="text-lg mt-4 text-text-secondary">Your toolkit for building the future, delivered to your door upon joining the foundry. </p>
          <Link to="/join">
            <button className="btn-primary text-xl px-12 py-4 rounded-full mt-8">
              Apply to Join
            </button>
          </Link>
        </div>
        <div>
          <img 
            src="https://placehold.co/600x400/141414/262626?text=Enclop+Goodies" 
            alt="Enclop Starter Kit" 
            className="rounded-lg shadow-2xl" 
          />
        </div>
      </div>
    </motion.section>
  );
}