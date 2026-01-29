import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, MessageSquare, Users, Building2, Clock,
    CheckCircle2, XCircle, AlertCircle, RefreshCw, X,
    Mail, Download, Save, Loader2, Plus, Pencil, Trash2, Image
} from 'lucide-react';

import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import DataTable, { StatusBadge, DateCell } from '../../components/admin/DataTable';
import { getDashboardStats, getApplications, getContacts, updateApplicationStatus, markContactAsRead, updateApplicationNotes, exportToCSV, getProjects, createProject, updateProject, deleteProject } from '../../lib/api';
import { useToast } from '../../components/ui/Toast';

export default function Dashboard() {
    const toast = useToast();
    const [activeView, setActiveView] = useState('overview');
    const [stats, setStats] = useState(null);
    const [applications, setApplications] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState({ type: null, status: null });

    // Fetch data
    const fetchData = async () => {
        setLoading(true);

        const [statsResult, appsResult, contactsResult, projectsResult] = await Promise.all([
            getDashboardStats(),
            getApplications(),
            getContacts(),
            getProjects()
        ]);

        if (statsResult.success) setStats(statsResult.data);
        if (appsResult.success) setApplications(appsResult.data || []);
        if (contactsResult.success) setContacts(contactsResult.data || []);
        if (projectsResult.success) setProjects(projectsResult.data || []);

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter applications based on view and filters
    const getFilteredApplications = () => {
        let filtered = applications;

        if (activeView === 'students') {
            filtered = filtered.filter(app => app.type === 'student');
        } else if (activeView === 'clients') {
            filtered = filtered.filter(app => app.type === 'client');
        }

        if (filter.status) {
            filtered = filtered.filter(app => app.status === filter.status);
        }

        return filtered;
    };

    // Handle status update
    const handleStatusUpdate = async (id, newStatus) => {
        const result = await updateApplicationStatus(id, newStatus);
        if (result.success) {
            toast.success('Status Updated', `Application marked as ${newStatus}`);
            setApplications(prev =>
                prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
            );
            // Update stats
            setStats(prev => ({
                ...prev,
                pendingApplications: prev.pendingApplications + (newStatus === 'pending' ? 1 : -1)
            }));
        } else {
            toast.error('Update Failed', result.error);
        }
    };

    // Handle contact read
    const handleMarkAsRead = async (id) => {
        const result = await markContactAsRead(id);
        if (result.success) {
            setContacts(prev =>
                prev.map(c => c.id === id ? { ...c, is_read: true } : c)
            );
            setStats(prev => ({
                ...prev,
                unreadContacts: Math.max(0, prev.unreadContacts - 1)
            }));
        }
    };

    // Application columns
    const applicationColumns = [
        {
            key: 'name',
            label: 'Applicant',
            width: '2fr',
            render: (row) => {
                const name = row.form_data?.name || 'Unknown';
                const email = row.form_data?.email || '';
                return (
                    <div>
                        <p className="text-white font-medium">{name}</p>
                        <p className="text-white/40 text-xs">{email}</p>
                    </div>
                );
            }
        },
        {
            key: 'type',
            label: 'Type',
            width: '1fr',
            render: (row) => (
                <span className={`inline-flex items-center gap-1.5 text-sm ${row.type === 'student' ? 'text-green-400' : 'text-blue-400'
                    }`}>
                    {row.type === 'student' ? <Users className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                    {row.type === 'student' ? 'Student' : 'Client'}
                </span>
            )
        },
        {
            key: 'status',
            label: 'Status',
            width: '1fr',
            render: (row) => <StatusBadge status={row.status} />
        },
        {
            key: 'created_at',
            label: 'Submitted',
            width: '1fr',
            render: (row) => <DateCell date={row.created_at} />
        }
    ];

    // Contact columns
    const contactColumns = [
        {
            key: 'name',
            label: 'Contact',
            width: '2fr',
            render: (row) => (
                <div className="flex items-center gap-3">
                    {!row.is_read && (
                        <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                    )}
                    <div>
                        <p className="text-white font-medium">{row.name}</p>
                        <p className="text-white/40 text-xs">{row.email}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'service_interest',
            label: 'Service',
            width: '1fr',
            render: (row) => (
                <span className="text-white/60 text-sm">{row.service_interest || 'General'}</span>
            )
        },
        {
            key: 'message',
            label: 'Message',
            width: '2fr',
            render: (row) => (
                <p className="text-white/50 text-sm truncate max-w-[200px]">{row.message}</p>
            )
        },
        {
            key: 'created_at',
            label: 'Received',
            width: '1fr',
            render: (row) => <DateCell date={row.created_at} />
        }
    ];

    // Render content based on active view
    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return <OverviewView stats={stats} onViewChange={setActiveView} loading={loading} recentApplications={applications.slice(0, 5)} recentContacts={contacts.slice(0, 5)} />;

            case 'applications':
            case 'students':
            case 'clients':
                return (
                    <ApplicationsView
                        applications={getFilteredApplications()}
                        columns={applicationColumns}
                        loading={loading}
                        onRowClick={setSelectedItem}
                        filter={filter}
                        setFilter={setFilter}
                        viewType={activeView}
                    />
                );

            case 'contacts':
                return (
                    <ContactsView
                        contacts={contacts}
                        columns={contactColumns}
                        loading={loading}
                        onRowClick={(contact) => {
                            setSelectedItem(contact);
                            if (!contact.is_read) handleMarkAsRead(contact.id);
                        }}
                    />
                );

            case 'projects':
                return (
                    <ProjectsView
                        projects={projects}
                        loading={loading}
                        onRefresh={fetchData}
                        toast={toast}
                        setProjects={setProjects}
                    />
                );

            case 'settings':
                return <ComingSoonView title="Settings" description="Admin management and configuration." />;

            default:
                return <OverviewView stats={stats} loading={loading} />;
        }
    };

    return (
        <AdminLayout activeView={activeView} onViewChange={setActiveView}>
            {renderContent()}

            {/* Detail Panel */}
            <AnimatePresence>
                {selectedItem && (
                    <DetailPanel
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                        onStatusUpdate={handleStatusUpdate}
                        type={selectedItem.type ? 'application' : 'contact'}
                    />
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}

// ===== OVERVIEW VIEW =====
function OverviewView({ stats, loading, onViewChange, recentApplications, recentContacts }) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-white/50 mt-1">Welcome to the Enclope Command Center</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Applications"
                    value={loading ? '-' : stats?.totalApplications || 0}
                    icon={FileText}
                    color="orange"
                    onClick={() => onViewChange('applications')}
                />
                <StatCard
                    title="Student Applications"
                    value={loading ? '-' : stats?.studentApplications || 0}
                    icon={Users}
                    color="green"
                    onClick={() => onViewChange('students')}
                />
                <StatCard
                    title="Client Briefs"
                    value={loading ? '-' : stats?.clientApplications || 0}
                    icon={Building2}
                    color="blue"
                    onClick={() => onViewChange('clients')}
                />
                <StatCard
                    title="Pending Review"
                    value={loading ? '-' : stats?.pendingApplications || 0}
                    icon={Clock}
                    color="purple"
                />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard
                    title="Contact Inquiries"
                    value={loading ? '-' : stats?.totalContacts || 0}
                    icon={MessageSquare}
                    color="blue"
                    onClick={() => onViewChange('contacts')}
                />
                <StatCard
                    title="Unread Messages"
                    value={loading ? '-' : stats?.unreadContacts || 0}
                    icon={AlertCircle}
                    color="orange"
                    onClick={() => onViewChange('contacts')}
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Applications */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-medium">Recent Applications</h3>
                        <button
                            onClick={() => onViewChange('applications')}
                            className="text-orange-500 text-sm hover:text-orange-400"
                        >
                            View All
                        </button>
                    </div>
                    <div className="space-y-3">
                        {loading ? (
                            <p className="text-white/30 text-sm">Loading...</p>
                        ) : recentApplications?.length > 0 ? (
                            recentApplications.map((app) => (
                                <div key={app.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <div>
                                        <p className="text-white text-sm">{app.form_data?.name || 'Unknown'}</p>
                                        <p className="text-white/40 text-xs">{app.type === 'student' ? 'Student' : 'Client'}</p>
                                    </div>
                                    <StatusBadge status={app.status} />
                                </div>
                            ))
                        ) : (
                            <p className="text-white/30 text-sm">No applications yet</p>
                        )}
                    </div>
                </div>

                {/* Recent Contacts */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-medium">Recent Messages</h3>
                        <button
                            onClick={() => onViewChange('contacts')}
                            className="text-orange-500 text-sm hover:text-orange-400"
                        >
                            View All
                        </button>
                    </div>
                    <div className="space-y-3">
                        {loading ? (
                            <p className="text-white/30 text-sm">Loading...</p>
                        ) : recentContacts?.length > 0 ? (
                            recentContacts.map((contact) => (
                                <div key={contact.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                                    {!contact.is_read && (
                                        <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm truncate">{contact.name}</p>
                                        <p className="text-white/40 text-xs truncate">{contact.message}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white/30 text-sm">No messages yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ===== APPLICATIONS VIEW =====
function ApplicationsView({ applications, columns, loading, onRowClick, filter, setFilter, viewType }) {
    const title = viewType === 'students' ? 'Student Applications' :
        viewType === 'clients' ? 'Client Briefs' : 'All Applications';

    const handleExport = () => {
        const exportData = applications.map(app => ({
            name: app.form_data?.name || '',
            email: app.form_data?.email || '',
            type: app.type,
            status: app.status,
            created_at: new Date(app.created_at).toLocaleDateString(),
            admin_notes: app.admin_notes || '',
            form_data: app.form_data
        }));
        exportToCSV(exportData, `${viewType}_applications`, {
            name: 'Name',
            email: 'Email',
            type: 'Type',
            status: 'Status',
            created_at: 'Submitted',
            admin_notes: 'Notes',
            form_data: 'Full Data'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                    <p className="text-white/50 mt-1">{applications.length} total</p>
                </div>

                {/* Filters & Export */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExport}
                        disabled={applications.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                    <select
                        value={filter.status || ''}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value || null })}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <DataTable
                columns={columns}
                data={applications}
                onRowClick={onRowClick}
                loading={loading}
                emptyMessage="No applications found"
            />
        </div>
    );
}

// ===== CONTACTS VIEW =====
function ContactsView({ contacts, columns, loading, onRowClick }) {
    const handleExport = () => {
        const exportData = contacts.map(c => ({
            name: c.name,
            email: c.email,
            service_interest: c.service_interest || 'General',
            message: c.message,
            is_read: c.is_read ? 'Yes' : 'No',
            created_at: new Date(c.created_at).toLocaleDateString()
        }));
        exportToCSV(exportData, 'contacts', {
            name: 'Name',
            email: 'Email',
            service_interest: 'Service Interest',
            message: 'Message',
            is_read: 'Read',
            created_at: 'Received'
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Contact Inquiries</h1>
                    <p className="text-white/50 mt-1">{contacts.length} total messages</p>
                </div>
                <button
                    onClick={handleExport}
                    disabled={contacts.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            <DataTable
                columns={columns}
                data={contacts}
                onRowClick={onRowClick}
                loading={loading}
                emptyMessage="No contact messages yet"
            />
        </div>
    );
}

// ===== DETAIL PANEL (Slide-out) =====
function DetailPanel({ item, onClose, onStatusUpdate, type, onNotesUpdate }) {
    const toast = useToast();
    const isApplication = type === 'application';
    const formData = item.form_data || item;
    const [notes, setNotes] = useState(item.admin_notes || '');
    const [savingNotes, setSavingNotes] = useState(false);

    const handleSaveNotes = async () => {
        setSavingNotes(true);
        const result = await updateApplicationNotes(item.id, notes);
        setSavingNotes(false);

        if (result.success) {
            toast.success('Notes Saved', 'Admin notes have been updated');
            if (onNotesUpdate) onNotesUpdate(item.id, notes);
        } else {
            toast.error('Failed to Save', result.error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Panel */}
            <motion.div
                initial={{ x: 400 }}
                animate={{ x: 0 }}
                exit={{ x: 400 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 h-full overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">{formData.name || 'Details'}</h2>
                        <p className="text-white/40 text-sm">{formData.email}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-white p-2"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {isApplication ? (
                        <>
                            {/* Status */}
                            <div>
                                <label className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2 block">Status</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['pending', 'reviewed', 'accepted', 'rejected'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => onStatusUpdate(item.id, status)}
                                            className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-all ${item.status === status
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Type */}
                            <div>
                                <label className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2 block">Type</label>
                                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${item.type === 'student' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                                    }`}>
                                    {item.type === 'student' ? <Users className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                                    {item.type === 'student' ? 'Student Application' : 'Client Brief'}
                                </span>
                            </div>

                            {/* Admin Notes */}
                            <div>
                                <label className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2 block">Admin Notes</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add internal notes about this application..."
                                    className="w-full h-24 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 text-sm placeholder-white/30 focus:outline-none focus:border-orange-500/50 resize-none"
                                />
                                <button
                                    onClick={handleSaveNotes}
                                    disabled={savingNotes || notes === (item.admin_notes || '')}
                                    className="mt-2 flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {savingNotes ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Save Notes
                                </button>
                            </div>

                            {/* Form Data */}
                            <div className="space-y-4">
                                {Object.entries(formData).map(([key, value]) => {
                                    if (!value || key === 'name' || key === 'email') return null;
                                    return (
                                        <div key={key}>
                                            <label className="text-xs font-mono uppercase tracking-widest text-white/40 mb-1 block">
                                                {key.replace(/_/g, ' ')}
                                            </label>
                                            <p className="text-white/80 text-sm">{value}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Contact Details */}
                            <div>
                                <label className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2 block">Service Interest</label>
                                <p className="text-white/80">{item.service_interest || 'General Inquiry'}</p>
                            </div>

                            <div>
                                <label className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2 block">Message</label>
                                <p className="text-white/80 whitespace-pre-wrap">{item.message}</p>
                            </div>

                            <div>
                                <label className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2 block">Received</label>
                                <p className="text-white/60 text-sm">{new Date(item.created_at).toLocaleString()}</p>
                            </div>

                            {/* Actions */}
                            <a
                                href={`mailto:${item.email}`}
                                className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Reply via Email
                            </a>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ===== PROJECTS VIEW =====
function ProjectsView({ projects, loading, onRefresh, toast, setProjects }) {
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const emptyForm = {
        title: '',
        description: '',
        image_url: '',
        tech_stack: [],
        type: 'web',
        status: 'concept',
        tag: '',
        display_order: 0
    };
    const [form, setForm] = useState(emptyForm);

    const openCreate = () => {
        setEditingProject(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEdit = (project) => {
        setEditingProject(project);
        setForm({
            title: project.title || '',
            description: project.description || '',
            image_url: project.image_url || '',
            tech_stack: project.tech_stack || [],
            type: project.type || 'web',
            status: project.status || 'concept',
            tag: project.tag || '',
            display_order: project.display_order || 0
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!form.title.trim()) {
            toast.error('Validation Error', 'Project title is required');
            return;
        }

        setSaving(true);
        const projectData = {
            ...form,
            tech_stack: typeof form.tech_stack === 'string'
                ? form.tech_stack.split(',').map(s => s.trim()).filter(Boolean)
                : form.tech_stack
        };

        let result;
        if (editingProject) {
            result = await updateProject(editingProject.id, projectData);
            if (result.success) {
                setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...projectData } : p));
                toast.success('Project Updated', `"${form.title}" has been updated`);
            }
        } else {
            result = await createProject(projectData);
            if (result.success) {
                setProjects(prev => [result.data, ...prev]);
                toast.success('Project Created', `"${form.title}" has been added`);
            }
        }

        setSaving(false);
        if (result.success) {
            setShowModal(false);
            setForm(emptyForm);
        } else {
            toast.error('Save Failed', result.error);
        }
    };

    const handleDelete = async (id) => {
        const result = await deleteProject(id);
        if (result.success) {
            setProjects(prev => prev.filter(p => p.id !== id));
            toast.success('Project Deleted', 'Project has been removed');
            setDeleteConfirm(null);
        } else {
            toast.error('Delete Failed', result.error);
        }
    };

    const statusColors = {
        deployed: 'bg-green-500/10 text-green-400 border-green-500/20',
        beta: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        concept: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        archived: 'bg-white/5 text-white/40 border-white/10'
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Projects</h1>
                    <p className="text-white/50 mt-1">{projects.length} projects in showroom</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Project
                </button>
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white/5 rounded-xl h-48 animate-pulse" />
                    ))}
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <Image className="w-8 h-8 text-white/20" />
                    </div>
                    <p className="text-white/40 mb-4">No projects yet</p>
                    <button
                        onClick={openCreate}
                        className="text-orange-500 text-sm hover:text-orange-400"
                    >
                        Create your first project →
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map(project => (
                        <div
                            key={project.id}
                            className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden group"
                        >
                            {/* Image */}
                            <div className="h-32 bg-white/5 relative">
                                {project.image_url ? (
                                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover opacity-70" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Image className="w-8 h-8 text-white/10" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded border ${statusColors[project.status] || statusColors.concept}`}>
                                        {project.status}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-white font-medium mb-1">{project.title}</h3>
                                <p className="text-white/40 text-sm line-clamp-2 mb-3">{project.description}</p>

                                {project.tech_stack && project.tech_stack.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {project.tech_stack.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="text-[9px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech_stack.length > 3 && (
                                            <span className="text-[9px] text-white/30">+{project.tech_stack.length - 3}</span>
                                        )}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => openEdit(project)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-white/5 rounded text-sm text-white/70 hover:bg-white/10"
                                    >
                                        <Pencil className="w-3 h-3" /> Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(project)}
                                        className="flex items-center justify-center px-3 py-1.5 bg-red-500/10 rounded text-sm text-red-400 hover:bg-red-500/20"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-white/10">
                                <h2 className="text-xl font-bold text-white">
                                    {editingProject ? 'Edit Project' : 'New Project'}
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Title *</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={e => setForm({ ...form, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50"
                                        placeholder="Project name"
                                    />
                                </div>

                                {/* Tag */}
                                <div>
                                    <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Tag/Category</label>
                                    <input
                                        type="text"
                                        value={form.tag}
                                        onChange={e => setForm({ ...form, tag: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50"
                                        placeholder="e.g. Open Source, SaaS Platform"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Description</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => setForm({ ...form, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 h-24 resize-none"
                                        placeholder="What does this project do?"
                                    />
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Image URL</label>
                                    <input
                                        type="url"
                                        value={form.image_url}
                                        onChange={e => setForm({ ...form, image_url: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50"
                                        placeholder="https://..."
                                    />
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Tech Stack (comma separated)</label>
                                    <input
                                        type="text"
                                        value={Array.isArray(form.tech_stack) ? form.tech_stack.join(', ') : form.tech_stack}
                                        onChange={e => setForm({ ...form, tech_stack: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50"
                                        placeholder="React, Node.js, PostgreSQL"
                                    />
                                </div>

                                {/* Type & Status */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Type</label>
                                        <select
                                            value={form.type}
                                            onChange={e => setForm({ ...form, type: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none"
                                        >
                                            <option value="web">Web</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="dashboard">Dashboard</option>
                                            <option value="api">API</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Status</label>
                                        <select
                                            value={form.status}
                                            onChange={e => setForm({ ...form, status: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none"
                                        >
                                            <option value="concept">Concept</option>
                                            <option value="beta">Beta</option>
                                            <option value="deployed">Deployed</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Display Order */}
                                <div>
                                    <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Display Order</label>
                                    <input
                                        type="number"
                                        value={form.display_order}
                                        onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="p-6 border-t border-white/10 flex gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-white/5 text-white/70 rounded-lg hover:bg-white/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {editingProject ? 'Save Changes' : 'Create Project'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setDeleteConfirm(null)}
                    >
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 max-w-sm text-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
                            <p className="text-white/50 text-sm mb-6">
                                Are you sure you want to delete "{deleteConfirm.title}"? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 px-4 py-2 bg-white/5 text-white/70 rounded-lg hover:bg-white/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm.id)}
                                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ===== COMING SOON VIEW =====
function ComingSoonView({ title, description }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-white/30" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-white/50 max-w-md">{description}</p>
            <p className="text-orange-500/60 text-sm mt-4">Coming Soon</p>
        </div>
    );
}

