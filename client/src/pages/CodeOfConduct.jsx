import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, Heart, AlertTriangle, CheckCircle } from 'lucide-react';

export default function CodeOfConduct() {
    return (
        <div className="min-h-screen pt-20 pb-32">
            {/* Back Link */}
            <div className="container mx-auto px-6 max-w-4xl mb-12">
                <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 mb-6 border border-accent/20 bg-accent/10 px-3 py-1 rounded-full">
                        <Shield className="w-3 h-3 text-accent" />
                        <span className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase">
                            Community Guidelines
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                        Code of Conduct
                    </h1>
                    <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                        At Enclope, we're building more than software—we're forging a community.
                        These guidelines ensure our foundry remains a safe, inclusive, and productive space for everyone.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">

                    {/* Our Pledge */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <Heart className="w-5 h-5 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Our Pledge</h2>
                        </div>
                        <p className="text-white/70 leading-relaxed">
                            We pledge to make participation in our community a harassment-free experience for everyone,
                            regardless of age, body size, disability, ethnicity, gender identity and expression,
                            level of experience, nationality, personal appearance, race, religion, or sexual identity
                            and orientation.
                        </p>
                    </section>

                    {/* Expected Behaviors */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Expected Behaviors</h2>
                        </div>
                        <div className="grid gap-4">
                            {[
                                'Use welcoming and inclusive language',
                                'Be respectful of differing viewpoints and experiences',
                                'Gracefully accept constructive criticism',
                                'Focus on what is best for the community',
                                'Show empathy towards other community members',
                                'Help newcomers learn and grow',
                                'Give credit where credit is due'
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                    </div>
                                    <p className="text-white/70">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Unacceptable Behaviors */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Unacceptable Behaviors</h2>
                        </div>
                        <div className="grid gap-4">
                            {[
                                'Harassment, trolling, or discrimination of any kind',
                                'Publishing others\' private information without consent',
                                'Sexual language or imagery in any context',
                                'Insulting or derogatory comments',
                                'Personal or political attacks',
                                'Public or private harassment',
                                'Other conduct which could reasonably be considered inappropriate'
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <AlertTriangle className="w-3 h-3 text-red-500" />
                                    </div>
                                    <p className="text-white/70">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Enforcement */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-orange-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Enforcement</h2>
                        </div>
                        <p className="text-white/70 leading-relaxed mb-6">
                            Community leaders are responsible for clarifying and enforcing our standards of
                            acceptable behavior and will take appropriate and fair corrective action in
                            response to any behavior that they deem inappropriate, threatening, offensive,
                            or harmful.
                        </p>
                        <p className="text-white/70 leading-relaxed">
                            Violations of this Code of Conduct may result in temporary or permanent bans
                            from the community, depending on the severity of the violation.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="text-center py-8">
                        <p className="text-white/40 text-sm mb-4">
                            If you experience or witness unacceptable behavior, please report it to:
                        </p>
                        <a
                            href="mailto:conduct@enclope.com"
                            className="text-accent hover:text-accent/80 font-mono text-lg transition-colors"
                        >
                            conduct@enclope.com
                        </a>
                    </section>

                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-white/10 text-center">
                    <p className="text-white/30 text-sm">
                        This Code of Conduct is adapted from the{' '}
                        <a
                            href="https://www.contributor-covenant.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/50 hover:text-white transition-colors underline"
                        >
                            Contributor Covenant
                        </a>
                        , version 2.1.
                    </p>
                </div>
            </div>
        </div>
    );
}
