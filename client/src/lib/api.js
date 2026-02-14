import { supabase } from './supabase';

/**
 * Submit a student application
 * @param {Object} formData - Student form data
 * @returns {Promise<{success: boolean, error?: string, data?: Object}>}
 */
export async function submitStudentApplication(formData) {
    try {
        const { data, error } = await supabase
            .from('student_applications')
            .insert([{
                name: formData.name,
                email: formData.email,
                university: formData.university || '',
                linkedin: formData.linkedin || '',
                github: formData.github || '',
                skills: formData.skills || '',
                interests: formData.interests || '',
                source: formData.source || '',
                reason: formData.reason || '',
                impact: formData.impact || '',
            }])
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error submitting student application:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Submit a client brief
 * @param {Object} formData - Client form data
 * @returns {Promise<{success: boolean, error?: string, data?: Object}>}
 */
export async function submitClientBrief(formData) {
    try {
        const { data, error } = await supabase
            .from('client_briefs')
            .insert([{
                name: formData.name,
                company: formData.company || '',
                email: formData.email,
                phone: formData.phone || '',
                project_type: formData.projectType || '',
                description: formData.description || '',
                budget: formData.budget || '',
                timeline: formData.timeline || '',
                tech_stack: formData.techStack || '',
            }])
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error submitting client brief:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Submit a contact/project inquiry from The Forge page
 * @param {Object} data - Contact form data
 * @returns {Promise<{success: boolean, error?: string, data?: Object}>}
 */
export async function submitContact(contactData) {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .insert([
                {
                    name: contactData.name,
                    email: contactData.email,
                    service_interest: contactData.service || null,
                    message: contactData.message,
                    is_read: false,
                    created_at: new Date().toISOString(),
                }
            ])
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error submitting contact:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Fetch all projects for the Showroom
 * @returns {Promise<{success: boolean, error?: string, data?: Array}>}
 */
export async function getProjects() {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Create a new project
 * @param {Object} projectData - Project data
 * @returns {Promise<{success: boolean, error?: string, data?: Object}>}
 */
export async function createProject(projectData) {
    try {
        const { data, error } = await supabase
            .from('projects')
            .insert([{
                ...projectData,
                created_at: new Date().toISOString(),
            }])
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error creating project:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Update an existing project
 * @param {string} id - Project ID
 * @param {Object} projectData - Updated project data
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function updateProject(id, projectData) {
    try {
        const { error } = await supabase
            .from('projects')
            .update({
                ...projectData,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id);

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error('Error updating project:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Delete a project
 * @param {string} id - Project ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteProject(id) {
    try {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error('Error deleting project:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// ADMIN FUNCTIONS (for future admin dashboard)
// ============================================

/**
 * Get all applications (merges student_applications + client_briefs)
 * @param {Object} filters - Optional filters (type)
 * @returns {Promise<{success: boolean, error?: string, data?: Array}>}
 */
export async function getApplications(filters = {}) {
    try {
        let students = [];
        let clients = [];

        // Fetch student applications unless filtering to clients only
        if (!filters.type || filters.type === 'student') {
            const { data, error } = await supabase
                .from('student_applications')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            students = (data || []).map(row => ({
                ...row,
                type: 'student',
            }));
        }

        // Fetch client briefs unless filtering to students only
        if (!filters.type || filters.type === 'client') {
            const { data, error } = await supabase
                .from('client_briefs')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            clients = (data || []).map(row => ({
                ...row,
                type: 'client',
            }));
        }

        // Merge and sort by created_at descending
        const merged = [...students, ...clients].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        return { success: true, data: merged };
    } catch (error) {
        console.error('Error fetching applications:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Update application status (no-op — tables don't have status columns yet)
 */
export async function updateApplicationStatus(id, status) {
    console.warn('updateApplicationStatus: status columns not yet added to DB');
    return { success: false, error: 'Status tracking not yet available' };
}

/**
 * Get all contacts
 * @returns {Promise<{success: boolean, error?: string, data?: Array}>}
 */
export async function getContacts() {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Mark contact as read
 * @param {string} id - Contact ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function markContactAsRead(id) {
    try {
        const { error } = await supabase
            .from('contacts')
            .update({ is_read: true })
            .eq('id', id);

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error('Error marking contact as read:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get dashboard statistics
 * @returns {Promise<{success: boolean, error?: string, data?: Object}>}
 */
export async function getDashboardStats() {
    try {
        // Get student application count
        const { data: students, error: studentError } = await supabase
            .from('student_applications')
            .select('id');
        if (studentError) throw studentError;

        // Get client brief count
        const { data: clients, error: clientError } = await supabase
            .from('client_briefs')
            .select('id');
        if (clientError) throw clientError;

        // Get contact counts
        const { data: contacts, error: contactError } = await supabase
            .from('contacts')
            .select('is_read');
        if (contactError) throw contactError;

        const studentCount = students?.length || 0;
        const clientCount = clients?.length || 0;

        const stats = {
            totalApplications: studentCount + clientCount,
            studentApplications: studentCount,
            clientApplications: clientCount,
            pendingApplications: studentCount + clientCount, // all are "pending" since no status column
            totalContacts: contacts?.length || 0,
            unreadContacts: contacts?.filter(c => !c.is_read).length || 0,
        };

        return { success: true, data: stats };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Update admin notes (no-op — tables don't have admin_notes columns yet)
 */
export async function updateApplicationNotes(id, notes) {
    console.warn('updateApplicationNotes: admin_notes columns not yet added to DB');
    return { success: false, error: 'Notes tracking not yet available' };
}

/**
 * Export data to CSV format
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Filename for the CSV
 * @param {Object} headers - Optional mapping of keys to header names
 */
export function exportToCSV(data, filename, headers = null) {
    if (!data || data.length === 0) {
        console.warn('No data to export');
        return;
    }

    // Get all keys from the first item, or use custom headers
    const keys = headers ? Object.keys(headers) : Object.keys(data[0]);
    const headerRow = headers ? Object.values(headers) : keys;

    // Build CSV content
    const csvContent = [
        headerRow.join(','),
        ...data.map(row => {
            return keys.map(key => {
                let value = row[key];

                // Handle nested objects (like form_data)
                if (typeof value === 'object' && value !== null) {
                    value = JSON.stringify(value);
                }

                // Handle null/undefined
                if (value === null || value === undefined) {
                    value = '';
                }

                // Escape quotes and wrap in quotes if contains comma or newline
                value = String(value);
                if (value.includes(',') || value.includes('\n') || value.includes('"')) {
                    value = `"${value.replace(/"/g, '""')}"`;
                }

                return value;
            }).join(',');
        })
    ].join('\n');

    // Download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

