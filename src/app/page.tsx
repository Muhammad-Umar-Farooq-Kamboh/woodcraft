"use client";
import Logo from "@/components/custom/logo/Logo";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const logout = async () => {
    setIsLoading(true);
    await signOut({ redirect: false });
    toast.success("User signout");
    router.replace("/signin");
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main>
        <Logo />
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        {session?.user.name}
        {session?.user.role}
        <Button onClick={() => logout()} disabled={isLoading}>
          Logout
        </Button>
      </main>
    </div>
  );
}
