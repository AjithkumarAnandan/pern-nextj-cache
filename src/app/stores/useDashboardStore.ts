// stores/createDashboardStore.ts

import { createStore, get, set, del } from "idb-keyval";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { DashboardType } from "@/app/entiredata/_internal/type/type.dashboard";

// ---------- Types ----------

type DashboardState = {
  data: Partial<DashboardType[]> | null;
  setData: (data: Partial<DashboardType[]>) => void;
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
};

// ---------- Helpers ----------

function deepCloneWithoutFunctions<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCloneWithoutFunctions(item)) as unknown as T;
  }

  const cloned: { [key: string]: unknown } = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value !== "function") {
      cloned[key] = deepCloneWithoutFunctions(value);
    }
  }

  return obj as T;
}

const createCustomStorage = ({
  expiration,
  storageName,
}: {
  expiration: number;
  storageName: string;
}) => {
  const dashboardStore = createStore(storageName, storageName);

  return {
    getItem: async (key: string): Promise<unknown> => {
      const item = await get(key, dashboardStore);
      if (!item || typeof item !== "object") return null;

      const { timestamp, state } = item as {
        timestamp: number;
        state: unknown;
      };
      const now = Date.now();

      if (!timestamp || now - timestamp > expiration) {
        await del(key, dashboardStore);
        return null;
      }

      return state ?? null;
    },

    setItem: async (key: string, value: unknown): Promise<void> => {
      if (!value) return;
      const cleaned = deepCloneWithoutFunctions(value);
      if (cleaned && typeof cleaned === "object" && !Array.isArray(cleaned)) {
        const wrapped = { timestamp: Date.now(), ...cleaned };
        return await set(key, wrapped, dashboardStore);
      }
    },

    removeItem: async (key: string): Promise<void> => {
      return await del(key, dashboardStore);
    },
  };
};

// ---------- Reusable Store Factory ----------

const createDashboardStore = ({
  storageName,
  expiration = 1000 * 60 * 60 * 24, // default: 24 hours
}: {
  storageName: string;
  expiration?: number;
}) =>
  create<DashboardState>()(
    persist(
      (set) => ({
        data: null,
        setData: (data) => set({ data }),
        hasHydrated: false,
        setHasHydrated: (v) => set({ hasHydrated: v }),
      }),
      {
        name: `dashboard-store-${storageName}`, // unique key
        storage: createCustomStorage({ expiration, storageName }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
        partialize: (state) =>
          ({
            data: state.data,
            hasHydrated: state.hasHydrated,
          } as Partial<DashboardState>),
      } as PersistOptions<DashboardState>
    )
  );

const storeCache = new Map<string, ReturnType<typeof createDashboardStore>>();
export const useCustomDashboard = (
  storageName: string,
  expiration?: number
) => {
  if (!storeCache.has(storageName)) {
    storeCache.set(
      storageName,
      createDashboardStore({ storageName, expiration })
    );
  }
  return storeCache.get(storageName)!;
};
