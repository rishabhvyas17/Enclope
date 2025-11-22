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
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary">The Starter Kit</h2>
          <p className="text-lg mt-4 text-text-secondary">Your toolkit for building the future, delivered to your door upon joining the foundry. </p>
          <Link to="/join">
            <button className="btn-primary text-xl px-12 py-4 rounded-full mt-8">
              Apply to Claim
            </button>
          </Link>
        </div>
        <div>
          <img 
            src="../src/assets/Gemini_Generated_Image_b2ssevb2ssevb2ss.png" 
            alt="Enclope Starter Kit" 
            className="rounded-lg shadow-2xl" 
          />
        </div>
      </div>
    </motion.section>
  );
}