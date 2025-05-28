"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace("/authentication");
  };
  return (
    <div>
      <Button onClick={handleSignOut}>Sair da conta</Button>
    </div>
  );
};

export default SignOutButton;
