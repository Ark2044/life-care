"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Bars2 from "../icons/Bars2";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <div className="text-center flex flex-col gap-4">
        <Link href={"/profile"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </div>
    );
  }
  if (status === "unauthenticated") {
    return (
      <div className="text-center flex flex-col gap-4">
        <Link href="/login">Login</Link>
        <Link href="/register" className="bg-primary rounded-full justify-center text-white px-8 py-2">
          Register
        </Link>
      </div>
    );
  }
}

export default function Header() {
  const { data: session, status } = useSession();
  const userData = session?.user;
  let userName = userData?.name || userData?.fname || userData?.email;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header className="fixed top-0 left-0 h-screen w-64 bg-violet-950 text-white flex flex-col">
      {/* Logo and Title */}
      <div className="flex flex-col items-center justify-center p-4 space-y-2">
        <Link href="/" className="text-2xl flex items-center space-x-2">
          <Image src={"/heart-logo.png"} alt="heart-logo" width={30} height={30} />
          <span>Life Care</span>
        </Link>
        <p className="text-sm text-center">CLOUD-BASED HEALTHCARE SOFTWARE AND SERVICES</p>
      </div>
      <button
        className="md:hidden p-1 border mt-4 mx-auto"
        onClick={() => setMobileNavOpen((prev) => !prev)}
      >
        <Bars2 />
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-4 p-4 font-semibold text-center">
        <Link href="/" className="py-2 hover:bg-violet-700 rounded">Home</Link>
        <Link href="/" className="py-2 hover:bg-violet-700 rounded">About Us</Link>
        <Link href="/" className="py-2 hover:bg-violet-700 rounded">Schemes</Link>
        <Link href="/" className="py-2 hover:bg-violet-700 rounded">Contact Us</Link>
      </nav>

      {/* Auth Links */}
      <div className="p-4">
        <AuthLinks status={status} userName={userName} />
      </div>
    </header>
  );
}
