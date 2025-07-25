"use client";
import React, { useEffect } from "react";
import { useCustomDashboard } from "../stores/useDashboardStore";
import { DashboardType } from "../dashboard/_internal/type/type.dashboard";

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
      {data
        ?.filter((user): user is DashboardType => user !== undefined)
        .map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
    </div>
  );
}

export default Page;
