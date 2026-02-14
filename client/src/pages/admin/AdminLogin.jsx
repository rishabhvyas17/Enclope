import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
    const navigate = useNavigate();
    const { user, signIn, loading: authLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    if (user && !authLoading) {
        return <Navigate to="/admin" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signIn(email, password);

        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/3 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative"
            >
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Flame className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Command Center</h1>
                    <p className="text-white/40 text-sm mt-1">Enclope Admin Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <p className="text-red-400 text-sm">{error}</p>
                            </motion.div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
                                placeholder="admin@enclope.com"
                                required
                                autoFocus
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                'Access Command Center'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-white/30 text-xs mt-6">
                        Protected area. Unauthorized access prohibited.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
