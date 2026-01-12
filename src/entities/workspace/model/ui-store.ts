import { create } from 'zustand';

interface WorkspaceUIState {
    activeTab: string;
    isSidebarExpanded: boolean;
    setActiveTab: (tab: string) => void;
    toggleSidebar: () => void;
}

export const useWorkspaceUIStore = create<WorkspaceUIState>((set) => ({
    activeTab: 'boards',
    isSidebarExpanded: true,
    setActiveTab: (tab) => set({ activeTab: tab }),
    toggleSidebar: () => set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
}));
