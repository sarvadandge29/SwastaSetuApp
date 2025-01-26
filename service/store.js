import { create } from 'zustand';

const useStore = create((set) => ({
    currentUser: null,
    updateCurrentUser: (newValue) => set({ currentUser : newValue }),
}));

export default useStore;