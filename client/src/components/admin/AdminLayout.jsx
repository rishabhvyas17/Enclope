import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, FileText, MessageSquare, Package,
    Settings, LogOut, ChevronLeft, Flame, Menu, X,
    Users, Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Navigation items configuration
const navItems = [
    {
        id: 'overview',
        label: 'Overview',
        icon: LayoutDashboard,
        description: 'Dashboard & Stats'
    },
    {
        id: 'applications',
        label: 'Applications',
        icon: FileText,
        description: 'Student & Client',
        children: [
            { id: 'students', label: 'Students', icon: Users },
            { id: 'clients', label: 'Clients', icon: Building2 },
        ]
    },
    {
        id: 'contacts',
        label: 'Contacts',
        icon: MessageSquare,
        description: 'Project Inquiries'
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: Package,
        description: 'Portfolio'
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        description: 'Admin Management'
    },
];

export default function AdminLayout({ children, activeView, onViewChange }) {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);

    const handleLogout = async () => {
        await signOut();
        navigate('/admin/login');
    };

    const handleNavClick = (itemId, hasChildren) => {
        if (hasChildren) {
            setExpandedItem(expandedItem === itemId ? null : itemId);
        } else {
            onViewChange(itemId);
            setIsMobileMenuOpen(false);
        }
    };

    const NavContent = () => (
        <>
            {/* Logo Section */}
            <div className="p-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Flame className="w-5 h-5 text-white" />
                    </div>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-1"
                        >
                            <h1 className="text-white font-bold text-sm">Enclope</h1>
                            <p className="text-white/40 text-xs">Command Center</p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id ||
                        (item.children?.some(child => activeView === child.id));
                    const isExpanded = expandedItem === item.id;

                    return (
                        <div key={item.id}>
                            <button
                                onClick={() => handleNavClick(item.id, !!item.children)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${isActive
                                        ? 'bg-orange-500/10 text-orange-500'
                                        : 'text-white/50 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {!isCollapsed && (
                                    <>
                                        <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                                        {item.children && (
                                            <ChevronLeft className={`w-4 h-4 transition-transform ${isExpanded ? '-rotate-90' : ''}`} />
                                        )}
                                    </>
                                )}
                            </button>

                            {/* Children */}
                            {!isCollapsed && item.children && isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="ml-4 mt-1 space-y-1"
                                >
                                    {item.children.map((child) => {
                                        const ChildIcon = child.icon;
                                        return (
                                            <button
                                                key={child.id}
                                                onClick={() => { onViewChange(child.id); setIsMobileMenuOpen(false); }}
                                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${activeView === child.id
                                                        ? 'bg-orange-500/10 text-orange-500'
                                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <ChildIcon className="w-4 h-4" />
                                                <span>{child.label}</span>
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="p-3 border-t border-white/5">
                <div className={`flex items-center gap-3 px-3 py-2 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                        <span className="text-orange-500 text-xs font-bold">
                            {user?.email?.[0]?.toUpperCase() || 'A'}
                        </span>
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                                {user?.email?.split('@')[0] || 'Admin'}
                            </p>
                            <p className="text-white/40 text-xs truncate">{user?.email}</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all ${isCollapsed ? 'justify-center' : ''
                        }`}
                >
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && <span className="text-sm">Sign Out</span>}
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-[#050505] flex">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? 72 : 260 }}
                className="hidden lg:flex flex-col bg-[#0a0a0a] border-r border-white/5 relative"
            >
                <NavContent />

                {/* Collapse Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                    <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
                </button>
            </motion.aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <Flame className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-bold text-sm">Command Center</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white/60 hover:text-white"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-[280px] h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <NavContent />
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 lg:p-6 p-4 pt-20 lg:pt-6 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
