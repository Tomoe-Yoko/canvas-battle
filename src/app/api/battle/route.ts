import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { getAuthenticatedUser } from "@/app/_utils/auth";
import { CreateBattleRequestBody } from "@/app/_types/battle";

const prisma = await buildPrisma();
export const POST = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { user, errorResponse } = await getAuthenticatedUser(token);
  if (errorResponse) return errorResponse;
  try {
    const body: CreateBattleRequestBody = await request.json();
    const { monsterId, enemyId } = body;
    // const {  monsterId, enemyId } = BattleRequestSchema.parse(body);

    const data = await prisma.battle.create({
      data: {
        userId: user.id,
        monsterId,
        enemyId,
        result: null, // 初期状態では未対戦
      },
    });

    return NextResponse.json({
      status: "OK",
      message: "The battleMonster set successfully",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
