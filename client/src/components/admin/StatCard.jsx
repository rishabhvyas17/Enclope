import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color = 'orange',
    onClick
}) {
    const colorClasses = {
        orange: {
            bg: 'from-orange-500/10 to-orange-600/5',
            icon: 'text-orange-500',
            border: 'border-orange-500/20',
            trend: 'text-orange-400',
        },
        green: {
            bg: 'from-green-500/10 to-green-600/5',
            icon: 'text-green-500',
            border: 'border-green-500/20',
            trend: 'text-green-400',
        },
        blue: {
            bg: 'from-blue-500/10 to-blue-600/5',
            icon: 'text-blue-500',
            border: 'border-blue-500/20',
            trend: 'text-blue-400',
        },
        purple: {
            bg: 'from-purple-500/10 to-purple-600/5',
            icon: 'text-purple-500',
            border: 'border-purple-500/20',
            trend: 'text-purple-400',
        },
    };

    const colors = colorClasses[color] || colorClasses.orange;

    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
    const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-white/40';

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative overflow-hidden bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl p-6 cursor-pointer transition-all hover:border-white/20`}
        >
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-24 h-24 ${colors.icon} opacity-5 blur-2xl rounded-full`} />

            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${colors.icon}`}>
                <Icon className="w-6 h-6" />
            </div>

            {/* Content */}
            <p className="text-white/50 text-sm mb-1">{title}</p>
            <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-white">{value}</h3>

                {trendValue && (
                    <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
                        <TrendIcon className="w-4 h-4" />
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
