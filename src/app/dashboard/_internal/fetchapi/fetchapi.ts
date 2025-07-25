import { DashboardType } from "@/app/dashboard/_internal/type/type.dashboard";
import { HTTP } from "@/utils/http";

export const fetchDashboard = async (): Promise<DashboardType[]> => {
  const res = await HTTP.doGet("/api/dashboard");
  return res.data.data;
};
