import { NextResponse } from "next/server";
import { staticProducts } from "@/lib/staticProducts";

export async function GET() {
  return NextResponse.json(staticProducts);
}