import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { getAuthenticatedUser } from "@/app/_utils/auth";
import { supabase } from "@/app/_utils/supabase";

const prisma = await buildPrisma();

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const token = request.headers.get("Authorization") ?? "";
  const { user, errorResponse } = await getAuthenticatedUser(token);
  if (errorResponse) return errorResponse;

  const monsterId = parseInt(context.params.id);
  const { name } = await request.json();

  try {
    const updated = await prisma.monster.updateMany({
      where: { id: monsterId, userId: user.id },
      data: { name },
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { error: "更新対象が見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "OK", message: "名前を更新しました" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const token = request.headers.get("Authorization") ?? "";
  const { user, errorResponse } = await getAuthenticatedUser(token);
  if (errorResponse) return errorResponse;

  const monsterId = parseInt(context.params.id);

  try {
    const monster = await prisma.monster.findUnique({
      where: { id: monsterId },
    });

    if (!monster || monster.userId !== user.id) {
      return NextResponse.json(
        { error: "対象のモンスターが存在しないか、権限がありません" },
        { status: 403 }
      );
    }

    // Supabaseの画像も削除
    const { error: storageError } = await supabase.storage
      .from("post-monster")
      .remove([monster.thumbnailImageKey]);

    if (storageError) {
      console.warn("画像削除エラー:", storageError.message);
    }

    await prisma.monster.delete({
      where: { id: monsterId },
    });

    return NextResponse.json({
      status: "OK",
      message: "モンスターを削除しました",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
