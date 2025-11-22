import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoundryExperience from '../components/FoundryExperience';

// Reusable component for each chapter of the story
const Chapter = ({ children, className = "" }) => (
    <div className={`h-screen flex flex-col justify-center p-8 ${className}`}>
        <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1 }}
        >
            <h1 className="text-5xl md:text-7xl font-heading text-text-primary">{children}</h1>
        </motion.div>
    </div>
);

export default function FoundryPage() {
    const { scrollYProgress } = useScroll();

    return (
        <>
            <Header />
            
            {/* Layer 1: The 3D Stage (Fixed to the background) */}
            <div className="fixed top-0 left-0 w-full h-screen -z-10">
                <Suspense fallback={null}>
                    <Canvas>
                        {/* We pass the scroll progress to the 3D experience */}
                        <FoundryExperience progress={scrollYProgress} />
                    </Canvas>
                </Suspense>
            </div>

            {/* Layer 2: The HTML Story (This is what you scroll through) */}
            <main className="relative z-10">
                <Chapter>It starts with one person.<br/>One idea.</Chapter>
                <Chapter className="text-center">But it takes a team to build a fire.</Chapter>
                <Chapter className="text-right">We provide the process and mentorship to forge a path forward.</Chapter>
                {/* Placeholder for future Acts */}
                <div className="h-screen" /> 
            </main>
            
            <Footer />
        </>
    );
}