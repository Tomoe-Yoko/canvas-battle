import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { getAuthenticatedUser } from "@/app/_utils/auth";
// import { CreateBattleResponseBody } from "@/app/_types/battle";

const prisma = await buildPrisma();

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const token = request.headers.get("Authorization") ?? "";
  const { errorResponse } = await getAuthenticatedUser(token);
  if (errorResponse) return errorResponse;
  const { id } = params;
  const battleId = parseInt(id, 10);
  if (isNaN(battleId))
    return NextResponse.json(
      { message: "モンスターが指定されていません。" },
      { status: 400 }
    );
  try {
    const battleView = await prisma.battle.findUnique({
      // where: { userId: user.id },
      where: { id: battleId },
      include: {
        monster: true, // ← これでモンスターのデータも取得
        enemy: true, // ← 敵モンスターも取得
      },
    });
    return NextResponse.json(
      {
        status: "OK",
        battleView,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
