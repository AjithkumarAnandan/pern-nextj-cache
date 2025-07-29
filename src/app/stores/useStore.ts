import { StateCreator } from "zustand";

export interface CounterSlice {
  count: number;
  increment: () => void;
}

// Accept all three arguments Zustand provides (set, get, api)
export const createCounterSlice: StateCreator<
  CounterSlice, // this slice's state
  [], // middleware (e.g., [] or [["zustand/immer"]])
  [], // store extensions
  CounterSlice // return type
> = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
});

export interface User {
  name: string;
}

export interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
});
