import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { supabase } from "@/app/_utils/supabase";

export const POST = async (request: NextRequest) => {
  try {
    const prisma = await buildPrisma();
    const token = request.headers.get("Authorization");
    if (!token) {
      return NextResponse.json({ error: "認証エラー" }, { status: 401 });
    }
    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      console.error("SupabaseError:", error.message);
      return NextResponse.json({ error: "認証エラー" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { supabaseUserId: data.user?.id || "" },
    });
    if (user)
      return NextResponse.json(
        { message: "既存ユーザー", isNewUser: false },
        { status: 200 }
      );
    const newUser = await prisma.user.create({
      data: {
        supabaseUserId: data.user?.id || "",
        email: data.user?.email || "",
        name: data.user?.user_metadata.full_name || "",
      },
    });
    return NextResponse.json(
      { message: "新規ユーザー", isNewUser: true, user: newUser },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "エラー" }, { status: 500 });
  }
};
