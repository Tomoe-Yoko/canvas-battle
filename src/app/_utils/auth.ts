import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "./prisma";
import { supabase } from "./supabase";

// 認証チェック関数（汎用化）
export const getAuthenticatedUser = async (request: NextRequest) => {
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
  return { error, user };
};
