import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

export default function PrivacyPolicyPage() {
    return (
        <section className="relative py-24 min-h-screen overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div
                        className="flex items-center justify-center gap-3 mb-6"
                        variants={fadeInUp}
                    >
                        <span className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#ff7f50]"></span>
                        <span className="text-accent font-body tracking-[0.25em] uppercase text-xs font-medium">Legal</span>
                        <span className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#ff7f50]"></span>
                    </motion.div>
                    <motion.h1 className="hero-title text-5xl md:text-6xl mb-4" variants={fadeInUp}>Privacy Policy</motion.h1>
                    <motion.p className="text-text-secondary" variants={fadeInUp}>Last updated: December 31, 2024</motion.p>
                </motion.div>

                {/* Content */}
                <motion.div
                    className="space-y-12 text-text-secondary leading-relaxed"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >

                    {/* Introduction */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">Introduction</h2>
                        <p>
                            Welcome to Enclope ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                        </p>
                    </motion.section>

                    {/* Information We Collect */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">Information We Collect</h2>
                        <p className="mb-4">We may collect the following types of personal information:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><span className="text-white">Personal Identifiers:</span> Name, email address, phone number</li>
                            <li><span className="text-white">Social Media Handles:</span> For project collaboration and communication</li>
                            <li><span className="text-white">Project Documents:</span> Files and requirements you share with us for service delivery</li>
                            <li><span className="text-white">Usage Data:</span> Information about how you interact with our website (pages visited, time spent, etc.)</li>
                        </ul>
                    </motion.section>

                    {/* How We Use Your Information */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">How We Use Your Information</h2>
                        <p className="mb-4">We use the information we collect for the following purposes:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>To provide and deliver our services</li>
                            <li>To communicate with you about projects, updates, and inquiries</li>
                            <li>To analyze and improve our website and services</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </motion.section>

                    {/* Data Sharing */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">Data Sharing</h2>
                        <p>
                            We do <span className="text-white font-semibold">not</span> sell, trade, or share your personal information with third parties for marketing purposes. Your data is used solely for internal operations and communication related to the services you have requested.
                        </p>
                    </motion.section>

                    {/* Data Security */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">Data Security</h2>
                        <p className="mb-4">We implement appropriate security measures to protect your personal information, including:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><span className="text-white">Encryption:</span> All data transmitted over our website is protected using HTTPS/TLS encryption</li>
                            <li><span className="text-white">Secure Storage:</span> Your data is stored securely with access controls and regular security audits</li>
                        </ul>
                    </motion.section>

                    {/* Your Rights */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">Your Rights</h2>
                        <p className="mb-4">Depending on your location, you may have the following rights regarding your personal data:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><span className="text-white">Right to Access:</span> Request a copy of the personal data we hold about you</li>
                            <li><span className="text-white">Right to Rectification:</span> Request correction of inaccurate or incomplete data</li>
                            <li><span className="text-white">Right to Erasure:</span> Request deletion of your personal data</li>
                            <li><span className="text-white">Right to Data Portability:</span> Request a copy of your data in a structured, machine-readable format</li>
                            <li><span className="text-white">Right to Withdraw Consent:</span> Withdraw consent at any time where we rely on consent to process your data</li>
                        </ul>
                        <p className="mt-4">
                            To exercise any of these rights, please contact us at the email address provided below.
                        </p>
                    </motion.section>

                    {/* Cookies */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">Cookies</h2>
                        <p>
                            Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings.
                        </p>
                    </motion.section>

                    {/* International Data Transfers */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">International Data Transfers</h2>
                        <p>
                            If you are accessing our services from outside India, please be aware that your information may be transferred to, stored, and processed in India. By using our services, you consent to this transfer. We ensure that any international data transfers comply with applicable laws, including the EU General Data Protection Regulation (GDPR) where applicable.
                        </p>
                    </motion.section>

                    {/* Changes to This Policy */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date. We encourage you to review this policy periodically.
                        </p>
                    </motion.section>

                    {/* Contact Us */}
                    <motion.section className="pb-8" variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                        </p>
                        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                            <p className="text-white font-semibold mb-2">Enclope</p>
                            <p>Email: <a href="mailto:info@enclop.com" className="text-accent hover:underline">info@enclop.com</a></p>
                        </div>
                    </motion.section>

                    {/* Back Link */}
                    <motion.div className="pt-8 border-t border-white/10" variants={fadeInUp}>
                        <Link to="/" className="text-accent hover:underline inline-flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
