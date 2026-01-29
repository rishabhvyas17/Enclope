import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

// Cache key for admin status
const ADMIN_CACHE_KEY = 'enclope_admin_status';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Get cached admin status for instant load
    const getCachedAdminStatus = (userId) => {
        try {
            const cached = sessionStorage.getItem(ADMIN_CACHE_KEY);
            if (cached) {
                const { userId: cachedId, isAdmin: cachedAdmin, timestamp } = JSON.parse(cached);
                // Cache valid for 5 minutes
                if (cachedId === userId && Date.now() - timestamp < 5 * 60 * 1000) {
                    return cachedAdmin;
                }
            }
        } catch (e) {
            // Ignore cache errors
        }
        return null;
    };

    // Cache admin status
    const setCachedAdminStatus = (userId, isAdminStatus) => {
        try {
            sessionStorage.setItem(ADMIN_CACHE_KEY, JSON.stringify({
                userId,
                isAdmin: isAdminStatus,
                timestamp: Date.now()
            }));
        } catch (e) {
            // Ignore cache errors
        }
    };

    // Clear cache on logout
    const clearAdminCache = () => {
        try {
            sessionStorage.removeItem(ADMIN_CACHE_KEY);
        } catch (e) {
            // Ignore
        }
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                // Check cache first for instant response
                const cachedStatus = getCachedAdminStatus(session.user.id);
                if (cachedStatus !== null) {
                    setIsAdmin(cachedStatus);
                    setLoading(false);
                    // Refresh cache in background
                    checkAdminStatus(session.user.id, true);
                } else {
                    checkAdminStatus(session.user.id);
                }
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                if (session?.user) {
                    // On sign in, always check fresh
                    if (event === 'SIGNED_IN') {
                        await checkAdminStatus(session.user.id);
                    } else {
                        // For other events, use cache if available
                        const cachedStatus = getCachedAdminStatus(session.user.id);
                        if (cachedStatus !== null) {
                            setIsAdmin(cachedStatus);
                            setLoading(false);
                        } else {
                            await checkAdminStatus(session.user.id);
                        }
                    }
                } else {
                    setIsAdmin(false);
                    clearAdminCache();
                    setLoading(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    // Check if user is in admin_users table
    const checkAdminStatus = async (userId, isBackgroundRefresh = false) => {
        try {
            if (!isBackgroundRefresh) {
                setLoading(true);
            }

            // Add timeout to prevent hanging
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 5000)
            );

            const queryPromise = supabase
                .from('admin_users')
                .select('role')
                .eq('user_id', userId)
                .single();

            const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

            if (error && error.code !== 'PGRST116') {
                console.error('Error checking admin status:', error);
            }

            const adminStatus = !!data;
            setIsAdmin(adminStatus);
            setCachedAdminStatus(userId, adminStatus);
        } catch (err) {
            // On timeout or error, assume admin if user exists (will be validated on API calls)
            console.error('Admin check failed:', err);
            setIsAdmin(false);
        } finally {
            if (!isBackgroundRefresh) {
                setLoading(false);
            }
        }
    };

    // Sign in with email/password
    const signIn = async (email, password) => {
        setLoading(true);
        clearAdminCache(); // Clear old cache on new login attempt

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setLoading(false);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    };

    // Sign out
    const signOut = async () => {
        clearAdminCache();
        await supabase.auth.signOut();
        setUser(null);
        setIsAdmin(false);
    };

    const value = {
        user,
        isAdmin,
        loading,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

