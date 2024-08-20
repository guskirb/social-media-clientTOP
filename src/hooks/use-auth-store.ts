import { create } from "zustand";

export interface UseAuthStore {
  user: UserObject | null;
  setUser: (data: UserObject | null) => void;
  setIsLoggedIn: (data: boolean) => void;
  isLoggedIn: boolean;
}

export interface UserObject {
  username: string;
  name: string;
  profileImg: string;
  friends: Array<string>;
  requests: Array<string>;
  outgoingRequests: Array<string>;
  id: string;
}

const useAuthStore = create<UseAuthStore>((set) => ({
  user: null,
  setUser: (data: UserObject | null) => set(() => ({ user: data })),
  isLoggedIn: false,
  setIsLoggedIn: (data: boolean) => set(() => ({ isLoggedIn: data })),
}));

export default useAuthStore;
