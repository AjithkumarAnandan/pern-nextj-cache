import { postgresConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import Pool from "@/utils/postgresql";

async function ensureTableExists() {
  await Pool.query(`CREATE SCHEMA IF NOT EXISTS fullstacknextjs`);
  await Pool.query(`CREATE TABLE IF NOT EXISTS fullstacknextjs."dashboards" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT null,
  created_at TIMESTAMP DEFAULT NOW()
 )
  `);
}

export const GET = async () => {
  try {
    await postgresConnect();
    await ensureTableExists();
    const existingData = await Pool.query(
      `SELECT * FROM fullstacknextjs."dashboards"`
    );
    if (existingData.rows.length > 0) {
      return NextResponse.json({
        status: 200,
        data: existingData.rows,
        message: "Data fetched successfully",
      });
    } else {
      return NextResponse.json({
        status: 200,
        data: [],
        message: "No data found",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message ?? "Server error" },
      { status: 500 }
    );
  }
};
