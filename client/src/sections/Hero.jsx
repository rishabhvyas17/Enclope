import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// The text that will be dynamically typed
const changingTexts = [
  "Sitting idle? We'll give you the work.",
  "Have an idea? We'll give you the team.",
  "Need experience? We'll give you the projects."
];

export default function Hero() {
  // State to manage the typing animation
  const [textIndex, setTextIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = changingTexts[textIndex];
      
      // Determine if we are typing or deleting
      const updatedText = isDeleting
        ? currentText.substring(0, typedText.length - 1)
        // [from www.example.com] This is the deleting logic
        : currentText.substring(0, typedText.length + 1);

      setTypedText(updatedText);

      // Logic to switch between typing and deleting
      if (!isDeleting && updatedText === currentText) {
        // Pause at the end of a sentence
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % changingTexts.length);
      }
    };

    const typingSpeed = isDeleting ? 75 : 150;
    const timeout = setTimeout(handleTyping, typingSpeed);
    
    // Cleanup function to clear the timeout
    return () => clearTimeout(timeout);
  }, [typedText, textIndex, isDeleting]);


  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="relative z-10 p-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl mb-4 text-text-primary"
        >
          Where Ideas Get Built.
        </motion.h1>

        {/* Dynamic Text Section */}
        <div className="h-16 md:h-20 flex items-center justify-center">
            <p className="text-xl md:text-2xl text-text-secondary font-body">
              {typedText}
              <span className="text-electric-cyan animate-pulse">|</span>
            </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link to="/join">
            <button className="btn-primary text-base px-8 py-3 rounded-full">
              [ I'm here to BUILD ]
            </button>
          </Link>
          <Link to="/forge">
            <button className="btn-primary text-base px-8 py-3 rounded-full">
              [ I have a BLUEPRINT ]
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}