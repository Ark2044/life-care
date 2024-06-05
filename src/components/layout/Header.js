"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
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
          <Link href="/">Login</Link>
          <Link href="/">Register</Link>
        </nav>
      </div>
    </header>
  );
}
