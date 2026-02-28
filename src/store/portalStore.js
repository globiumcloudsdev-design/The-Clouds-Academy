import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePortalStore = create(
  persist(
    (set) => ({
      portalUser: null,
      portalType: null, // 'PARENT' | 'STUDENT'
      setPortalUser: (user, type) => set({ portalUser: user, portalType: type }),
      clearPortal: () => set({ portalUser: null, portalType: null }),
    }),
    {
      name: 'portal-session',
    },
  ),
);

export default usePortalStore;
