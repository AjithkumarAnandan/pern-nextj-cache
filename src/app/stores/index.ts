import { create } from "zustand";
import {
  createCounterSlice,
  CounterSlice,
  UserSlice,
  createUserSlice,
} from "./useStore";

type StoreState = CounterSlice & UserSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createCounterSlice(...a),
  ...createUserSlice(...a),
}));
