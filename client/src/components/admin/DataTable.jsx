import { motion } from 'framer-motion';
import { ChevronRight, Eye, MoreVertical } from 'lucide-react';

export default function DataTable({
    columns,
    data,
    onRowClick,
    emptyMessage = 'No data found',
    loading = false
}) {
    if (loading) {
        return (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex gap-4 animate-pulse">
                            <div className="h-4 bg-white/5 rounded w-1/4" />
                            <div className="h-4 bg-white/5 rounded w-1/3" />
                            <div className="h-4 bg-white/5 rounded w-1/4" />
                            <div className="h-4 bg-white/5 rounded w-1/6" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 text-center">
                <p className="text-white/30">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid gap-4 px-6 py-4 bg-white/5 border-b border-white/5"
                style={{ gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ') }}>
                {columns.map((col) => (
                    <div key={col.key} className="text-white/40 text-xs font-mono uppercase tracking-wider">
                        {col.label}
                    </div>
                ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
                {data.map((row, index) => (
                    <motion.div
                        key={row.id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onRowClick?.(row)}
                        className="grid gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer group"
                        style={{ gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ') }}
                    >
                        {columns.map((col) => (
                            <div key={col.key} className="flex items-center">
                                {col.render ? col.render(row) : (
                                    <span className="text-white/70 text-sm truncate">
                                        {row[col.key] || '-'}
                                    </span>
                                )}
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Status Badge Component
export function StatusBadge({ status }) {
    const statusConfig = {
        pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', label: 'Pending' },
        reviewed: { bg: 'bg-blue-500/10', text: 'text-blue-500', label: 'Reviewed' },
        accepted: { bg: 'bg-green-500/10', text: 'text-green-500', label: 'Accepted' },
        rejected: { bg: 'bg-red-500/10', text: 'text-red-500', label: 'Rejected' },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            {config.label}
        </span>
    );
}

// Date Formatter Component
export function DateCell({ date }) {
    if (!date) return <span className="text-white/30">-</span>;

    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let display;
    if (diffDays === 0) {
        display = 'Today';
    } else if (diffDays === 1) {
        display = 'Yesterday';
    } else if (diffDays < 7) {
        display = `${diffDays} days ago`;
    } else {
        display = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    }

    return (
        <span className="text-white/50 text-sm">{display}</span>
    );
}
