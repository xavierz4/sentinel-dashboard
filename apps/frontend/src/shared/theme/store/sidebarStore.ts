import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  isExpanded: true,
  isMobileOpen: false,
  isMobile: false,
  isHovered: false,
  activeItem: null,
  openSubmenu: null,

  setIsExpanded: (value) => set({ isExpanded: value }),
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setIsMobileOpen: (value) => set({ isMobileOpen: value }),
  toggleMobileSidebar: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  setIsMobile: (value) => set({ isMobile: value }),
  setIsHovered: (value) => set({ isHovered: value }),
  setActiveItem: (item) => set({ activeItem: item }),
  setOpenSubmenu: (submenu) => set({ openSubmenu: submenu }),
  toggleSubmenu: (item) => set((state) => ({ openSubmenu: state.openSubmenu === item ? null : item })),
}));

export default useSidebarStore;
