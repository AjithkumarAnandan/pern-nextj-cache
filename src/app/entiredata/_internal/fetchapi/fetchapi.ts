import { HTTP } from "@/utils/http";
import { DashboardType } from "@/app/entiredata/_internal/type/type.dashboard";

export const fetchDashboard = async (): Promise<DashboardType[]> => {
  const res = await HTTP.doGet("/api/dashboard");
  return res.data.data;
};
