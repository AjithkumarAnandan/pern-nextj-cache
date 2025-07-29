"use client";
import { useEffect } from "react";
import { useCustomDashboard } from "../stores/useDashboardStore";
import { fetchDashboard } from "./_internal/fetchapi/fetchapi";
import { useQuery } from "@tanstack/react-query";
import { DashboardType } from "@/app/entiredata/_internal/type/type.dashboard";

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

function DashboardClient() {
  const { data, isLoading, error } = useQuery<DashboardType[]>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });

  const dashboardStore = useCustomDashboard("dashboard-store");
  const {
    data: productData,
    setData,
    hasHydrated,
  } = dashboardStore((state) => state);

  useEffect(() => {
    if (hasHydrated && data) {
      setData(data);
    }
  }, [data, hasHydrated, setData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!productData) return <p>Data not found</p>;

  return (
    <>
      <ul>
        {(productData as unknown[]).filter(isDashboardType).map((product) => (
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
