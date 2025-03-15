// import Image from "next/image";
"use client";
import Link from "next/link";
import { Button } from "./_components/Button";

export default function Home() {
  return (
    <div className="flex min-h-svh justify-center items-center">
      <div>
        <Link href="/login" className="block">
          <Button variant="bg-333">はじめる</Button>
        </Link>

        <Link href="/signup" className="block mt-8">
          <Button variant="bg-333">新規登録</Button>
        </Link>
      </div>
    </div>
  );
}
