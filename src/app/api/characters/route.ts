import { Character } from "@/characters";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.JSON_SERVER_URL!;
    const res = await fetch(`${baseUrl}/characters`);

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch characters" },
        { status: res.status }
      );
    }

    const data: Character[] = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}