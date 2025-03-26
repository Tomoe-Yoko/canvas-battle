import { CreateMonsterPostRequestBody } from "@/app/_types/monsters";
import { buildPrisma } from "@/app/_utils/prisma";
import { supabase } from "@/app/_utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  const token = request.headers.get("Authorization") ?? "";
  const { error, data } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });
  const supabaseUserId = data.user.id;
  const user = await prisma.user.findUnique({ where: { supabaseUserId } });
  if (!user)
    return NextResponse.json(
      { message: "ユーザーが見つかりませんでした" },
      { status: 404 }
    );

  try {
    const body: CreateMonsterPostRequestBody = await request.json();
    const { userId, name, thumbnailImageKey } = body;
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
//builderror作るところから！
