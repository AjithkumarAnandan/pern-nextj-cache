"use client";
import React, { useEffect } from "react";
import { useCustomDashboard } from "../stores/useDashboardStore";
import { DashboardType } from "../entiredata/_internal/type/type.dashboard";

function isDashboardType(product: unknown): product is DashboardType {
  if (typeof product === "object" && product !== null) {
    const p = product as Record<string, unknown>;

    return (
      (typeof p.id === "string" || typeof p.id === "number") &&
      typeof p.name === "string"
    );
  }
  return false;
}

function Page() {
  const dashboardStore = useCustomDashboard(`dashboard-single`);

  const { data, setData, hasHydrated } = dashboardStore((state) => state);

  useEffect(() => {
    if (hasHydrated && !data) {
      const dashboardItem = [
        {
          id: 1,
          name: "kjk",
          updated_at: new Date().toISOString(),
          // Add any other required fields here!
        },
      ] as Partial<DashboardType>[];

      setData(dashboardItem); // ✅ fully typed and safe
    }
  }, [data, hasHydrated, setData]);

  if (!hasHydrated) {
    return <div>Loading...</div>; // ✅ Prevents flicker / null access
  }

  console.log("Data changed:", data);

  return (
    <div>
      {(data as unknown[]).filter(isDashboardType).map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </div>
  );
}

export default Page;
