"use client";
import { useEffect } from "react";
import { useCustomDashboard } from "../stores/useDashboardStore";
import { fetchDashboard } from "./_internal/fetchapi/fetchapi";
import { useQuery } from "@tanstack/react-query";
import { DashboardType } from "./_internal/type/type.dashboard";

function DashboardClient() {
  const { data, isLoading, error } = useQuery<DashboardType[]>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });

  const dashboardStore = useCustomDashboard(`dashboard-store`);

  const {
    data: productData,
    setData,
    hasHydrated,
  } = dashboardStore((state) => state);

  useEffect(() => {
    if (hasHydrated && data) {
      setData(data); // ✅ Won't be overwritten by persist hydration
    }
  }, [data, hasHydrated, setData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!productData) return <p>Data not found</p>;

  return (
    <>
      <ul>
        {productData
          .filter((product): product is DashboardType => product !== undefined)
          .map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
      </ul>
      <button>
        <a href="/singledata">click</a>
      </button>
    </>
  );
}

export default DashboardClient;
