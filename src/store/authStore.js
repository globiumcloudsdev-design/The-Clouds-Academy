/**
 * The Clouds Academy — Auth Store (Zustand)
 *
 * Holds the currently logged-in user, their permissions array,
 * and school/branch context.
 *
 * Shape of `user`:
 * {
 *   id, first_name, last_name, email, role_code,
 *   school_id, branch_id,
 *   school: { id, name, code, has_branches, ... },
 *   role:   { id, name, code },
 *   permissions: ['student.create', 'fee.read', ...]   ← flat array of codes
 * }
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setAccessToken, setSchoolCode, clearAuthData } from '@/lib/auth';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // ── Setters ─────────────────────────────────────────────────────────
      setUser: (user, accessToken) => {
        if (accessToken) setAccessToken(accessToken);
        if (user?.school?.code) setSchoolCode(user.school.code);
        set({ user, isAuthenticated: true });
      },

      setLoading: (val) => set({ isLoading: val }),

      // ── Logout ───────────────────────────────────────────────────────────
      logout: () => {
        clearAuthData();
        set({ user: null, isAuthenticated: false });
      },

      // ── Getters (derived) ────────────────────────────────────────────────
      isMasterAdmin: () => get().user?.role_code === 'MASTER_ADMIN',

      permissions: () => get().user?.permissions || [],

      canDo: (permissionCode) => {
        const u = get().user;
        if (!u) return false;
        if (u.role_code === 'MASTER_ADMIN') return true;
        return (u.permissions || []).includes(permissionCode);
      },

      canDoAny: (codes = []) => {
        const u = get().user;
        if (!u) return false;
        if (u.role_code === 'MASTER_ADMIN') return true;
        return codes.some((code) => (u.permissions || []).includes(code));
      },

      schoolHasBranches: () => get().user?.school?.has_branches === true,
    }),
    {
      name: 'clouds-auth',
      // Only persist non-sensitive fields
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
