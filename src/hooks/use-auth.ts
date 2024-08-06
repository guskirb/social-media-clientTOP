import { create } from "zustand";

interface UseAuth {
  user: any;
  setUser: (user: any) => void;
  isLoggedIn: boolean;
}

const useAuth = create<UseAuth>((set) => ({
  user: null,
  setUser: (user: any) => set(() => ({ user })),
  isLoggedIn: false,
}));

export default useAuth;
