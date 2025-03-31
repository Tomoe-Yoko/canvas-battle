import { CreateMonsterPostRequestBody } from "@/app/_types/monsters";
import { getAuthenticatedUser } from "@/app/_utils/auth";
import { buildPrisma } from "@/app/_utils/prisma";
// import { supabase } from "@/app/_utils/supabase";
// import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
const prisma = await buildPrisma();

export const POST = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { user, errorResponse } = await getAuthenticatedUser(token);
  if (errorResponse) return errorResponse;

  try {
    const body: CreateMonsterPostRequestBody = await request.json();
    const { name, thumbnailImageKey } = body;
    const data = await prisma.monster.create({
      data: {
        userId: user.id,
        name,
        thumbnailImageKey,
      },
    });
    return NextResponse.json({
      status: "OK",
      message: "The monster created successfully",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const GET = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { user, errorResponse } = await getAuthenticatedUser(token);
  if (errorResponse) return errorResponse;
  try {
    const monstersView = await prisma.monster.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    console.log("API Response:", {
      status: "OK",
      monstersView,
    });
    return NextResponse.json(
      {
        status: "OK",
        monstersView,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
