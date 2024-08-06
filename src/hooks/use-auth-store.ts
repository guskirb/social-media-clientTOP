import { create } from "zustand";

interface UseAuthStore {
  setIsLoggedIn: (data: boolean) => void;
  isLoggedIn: boolean;
}

const useAuthStore = create<UseAuthStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (data: boolean) => set(() => ({ isLoggedIn: data })),
}));

export default useAuthStore;
