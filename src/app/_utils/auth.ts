import { NextResponse } from "next/server";
import { buildPrisma } from "./prisma";
import { supabase } from "./supabase";

const prisma = await buildPrisma();
// 認証チェック関数（汎用化）

export const getAuthenticatedUser = async (token: string) => {
  if (!token) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { message: "認証トークンがありません" },
        { status: 401 }
      ),
    };
  }

  const { error, data } = await supabase.auth.getUser(token);
  if (error) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { message: error.message },
        { status: 400 }
      ),
    };
  }

  const supabaseUserId = data.user.id;
  const user = await prisma.user.findUnique({ where: { supabaseUserId } });

  if (!user) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { message: "ユーザーが見つかりませんでした" },
        { status: 404 }
      ),
    };
  }

  return { user, errorResponse: null };
};
