"use client";
import Image from "next/image";

export default function Home() {
  const sendreq = async () => {
    const res = await fetch("/api/create-user", { method: "POST" });
    if (res.ok) {
      console.log(res);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <button onClick={() => sendreq()}>Create user </button>
      </main>
    </div>
  );
}
