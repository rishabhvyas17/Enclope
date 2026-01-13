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

export default function TermsAndConditionsPage() {
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
                    <motion.h1 className="hero-title text-5xl md:text-6xl mb-4" variants={fadeInUp}>Terms and Conditions</motion.h1>
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
                        <h2 className="text-2xl font-heading text-white mb-4">1. Introduction</h2>
                        <p>
                            Welcome to Enclope. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.
                        </p>
                    </motion.section>

                    {/* Services */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">2. Services</h2>
                        <p className="mb-4">Enclope provides digital services across three categories:</p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Forge (Development)</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li><span className="text-white">SaaS Applications</span> – Project-based, milestone payments</li>
                                    <li><span className="text-white">Landing Pages</span> – One-time delivery + optional maintenance (6-month minimum contract)</li>
                                    <li><span className="text-white">Management Systems</span> – Project-based, milestone payments</li>
                                    <li><span className="text-white">IoT Products</span> – Project-based, milestone payments</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Craft (Design)</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li><span className="text-white">UI/UX Redesign</span> – Project-based, milestone payments</li>
                                    <li><span className="text-white">Templates</span> – One-time delivery</li>
                                    <li><span className="text-white">Brand Catalogs</span> – One-time delivery</li>
                                    <li><span className="text-white">WhatsApp Creatives</span> – One-time or monthly subscription</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Amplify (Marketing)</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li><span className="text-white">Email Campaigns</span> – Monthly subscription</li>
                                    <li><span className="text-white">Social Media Management</span> – Monthly subscription</li>
                                    <li><span className="text-white">SEO Optimization</span> – Monthly subscription (6-month minimum contract)</li>
                                    <li><span className="text-white">WhatsApp Campaigns</span> – Monthly subscription</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* Payment Terms */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">3. Payment Terms</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><span className="text-white">Payment Structure:</span> Payments are milestone-based. Specific milestones and amounts will be outlined in your project agreement.</li>
                            <li><span className="text-white">Payment Delay:</span> If payment is delayed beyond the agreed timeline, all work on the project will be paused until payment is received.</li>
                            <li><span className="text-white">Subscription Services:</span> Monthly subscriptions are billed at the beginning of each billing cycle. Minimum contract periods apply as specified for each service.</li>
                        </ul>
                    </motion.section>

                    {/* Refund Policy */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">4. Refund Policy</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>If the project has <span className="text-white">not been started</span> from our side, you may request a cancellation. A <span className="text-white">50% cancellation fee</span> will be deducted, and the remaining amount will be refunded.</li>
                            <li>Once work has commenced, refunds will be calculated based on the work completed and milestones achieved.</li>
                            <li>No refunds are provided for subscription services after the billing cycle has begun.</li>
                        </ul>
                    </motion.section>

                    {/* Intellectual Property */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">5. Intellectual Property</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><span className="text-white">Ownership:</span> All deliverables, including but not limited to source code, designs, and assets, remain the intellectual property of Enclope unless otherwise agreed in writing.</li>
                            <li><span className="text-white">License:</span> Upon full payment, clients receive a license to use the deliverables for their intended business purposes.</li>
                            <li><span className="text-white">Portfolio Rights:</span> Enclope reserves the right to showcase completed work in our portfolio, case studies, and marketing materials unless explicitly prohibited by prior written agreement.</li>
                        </ul>
                    </motion.section>

                    {/* Liability */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">6. Limitation of Liability</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Enclope is <span className="text-white">not liable</span> for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.</li>
                            <li>Clients are responsible for thoroughly reviewing and testing all deliverables before deploying them for production or commercial use.</li>
                            <li>Our maximum liability shall not exceed the total amount paid by the client for the specific service in question.</li>
                        </ul>
                    </motion.section>

                    {/* User Responsibilities */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">7. User Responsibilities</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><span className="text-white">Accurate Information:</span> You agree to provide accurate and complete information required for the delivery of services.</li>
                            <li><span className="text-white">Prohibited Uses:</span> You shall not use our services for any illegal, fraudulent, or harmful activities, including but not limited to spamming, phishing, or distributing malware.</li>
                            <li><span className="text-white">Misuse:</span> If we suspect misuse of our services, we reserve the right to immediately terminate services without refund. You will be held responsible for any damages caused by such misuse.</li>
                        </ul>
                    </motion.section>

                    {/* Termination */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">8. Termination</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Either party may terminate the agreement with written notice if the other party breaches any material term of these Terms.</li>
                            <li>Upon termination, the client shall pay for all work completed up to the termination date.</li>
                            <li>Enclope reserves the right to terminate services immediately if payment is overdue or if prohibited use is detected.</li>
                        </ul>
                    </motion.section>

                    {/* Governing Law */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">9. Governing Law and Dispute Resolution</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>These Terms shall be governed by and construed in accordance with the laws of <span className="text-white">India</span>.</li>
                            <li>Any disputes arising from these Terms shall be resolved through good-faith negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts in India.</li>
                        </ul>
                    </motion.section>

                    {/* Age Requirement */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">10. Age Requirement</h2>
                        <p>
                            You must be at least <span className="text-white">14 years of age</span> to use our services. By using our services, you represent and warrant that you meet this age requirement.
                        </p>
                    </motion.section>

                    {/* Changes */}
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">11. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website with an updated "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the modified Terms.
                        </p>
                    </motion.section>

                    {/* Contact */}
                    <motion.section className="pb-8" variants={fadeInUp}>
                        <h2 className="text-2xl font-heading text-white mb-4">12. Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions about these Terms and Conditions, please contact us at:
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
