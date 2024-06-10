"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </>
    );
  }
}

export default function Header() {
  const { data: session, status } = useSession();
  const userData = session?.user;
  let userName = userData?.name || userData?.fname || userData?.email;

  return (
    <header>
      {/* Desktop Header */}
      <div className="md:flex items-center justify-between bg-violet-950 p-4 text-white">
        <Link href="/" className="text-2xl">
          <div className="flex gap-2 ml-5">
            <Image
              src={"/heart-logo.png"}
              alt="heart-logo"
              width={30}
              height={30}
            />
            Life Care
          </div>
          <p className="text-sm">Health Care Management System</p>
        </Link>
        <nav className="flex items-center gap-8 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/">About Us</Link>
          <Link href="/">Schemes</Link>
          <Link href="/">Contact Us</Link>
        </nav>
        <nav className="flex items-center gap-4 font-semibold">
          <AuthLinks status={status} userName={userName} />
        </nav>
      </div>
    </header>
  );
}
