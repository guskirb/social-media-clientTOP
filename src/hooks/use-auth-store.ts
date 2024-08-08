import { create } from "zustand";

interface UseAuthStore {
  user: UserObject | null;
  setUser: (data: UserObject | null) => void;
  setIsLoggedIn: (data: boolean) => void;
  isLoggedIn: boolean;
}

type UserObject = {
  username: string;
  name: string;
  profileImg: string;
  id: string;
};

const useAuthStore = create<UseAuthStore>((set) => ({
  user: null,
  setUser: (data: UserObject | null) => set(() => ({ user: data })),
  isLoggedIn: false,
  setIsLoggedIn: (data: boolean) => set(() => ({ isLoggedIn: data })),
}));

export default useAuthStore;
