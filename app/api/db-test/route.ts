import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      "SELECT NOW() AS server_time, current_database() AS database"
    );

    return NextResponse.json({
      success: true,
      message: "Database PostgreSQL collegato!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Connessione al database fallita",
      },
      { status: 500 }
    );
  }
}
