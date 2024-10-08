"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { SignupButton } from "@/components/buttons/signup-button";
import { LoginButton } from "@/components/buttons/login-button";
import { LogoutButton } from "@/components/buttons/logout-button";
import Link from "next/link";

export const AuthButtons = () => {
  const { user } = useUser();
  return (
    <div>
      {!user && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {user && (
        <>
          <Link href="/profile">Profile</Link>
          <LogoutButton />
        </>
      )}
    </div>
  );
};
