import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';

// Toast Context
const ToastContext = createContext(null);

// Toast types configuration
const toastConfig = {
    success: {
        icon: CheckCircle2,
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        iconColor: 'text-green-500',
        progressColor: 'bg-green-500',
    },
    error: {
        icon: XCircle,
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        iconColor: 'text-red-500',
        progressColor: 'bg-red-500',
    },
    warning: {
        icon: AlertCircle,
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        iconColor: 'text-yellow-500',
        progressColor: 'bg-yellow-500',
    },
};

// Individual Toast Component
function Toast({ id, type, title, message, onDismiss, duration = 5000 }) {
    const config = toastConfig[type] || toastConfig.success;
    const Icon = config.icon;

    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onDismiss]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`relative overflow-hidden w-full max-w-sm ${config.bgColor} ${config.borderColor} border rounded-xl backdrop-blur-md shadow-2xl`}
        >
            <div className="p-4 flex items-start gap-3">
                {/* Icon */}
                <div className={`flex-shrink-0 ${config.iconColor}`}>
                    <Icon size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {title && (
                        <p className="text-white font-medium text-sm">{title}</p>
                    )}
                    {message && (
                        <p className="text-white/70 text-sm mt-0.5">{message}</p>
                    )}
                </div>

                {/* Close Button */}
                <button
                    onClick={() => onDismiss(id)}
                    className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Progress Bar */}
            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-0.5 ${config.progressColor}`}
            />
        </motion.div>
    );
}

// Toast Container Component
function ToastContainer({ toasts, onDismiss }) {
    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
                ))}
            </AnimatePresence>
        </div>
    );
}

// Toast Provider
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (type, title, message, duration = 5000) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    };

    const dismissToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const toast = {
        success: (title, message, duration) => addToast('success', title, message, duration),
        error: (title, message, duration) => addToast('error', title, message, duration),
        warning: (title, message, duration) => addToast('warning', title, message, duration),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        </ToastContext.Provider>
    );
}

// Hook to use toast
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
