import { create } from "zustand";

interface UseAuthStore {
  user: any;
  setUser: (user: any) => void;
  isLoggedIn: boolean;
}

const useAuthStore = create<UseAuthStore>((set) => ({
  user: null,
  setUser: (user: any) => set(() => ({ user })),
  isLoggedIn: false,
}));

export default useAuthStore;
