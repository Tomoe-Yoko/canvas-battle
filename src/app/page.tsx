// import Image from "next/image";

import { Button } from "./_components/Button";

export default function Home() {
  return (
    <div className="flex min-h-svh justify-center items-center">
      <a href="/login">
        <Button variant="bg-333">はじめる</Button>
      </a>
    </div>
  );
}
