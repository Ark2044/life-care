"use client";
import { SessionProvider } from "next-auth/react";
import toast from "react-hot-toast";

export function AppProvider({ children }) {
  return (
    <SessionProvider>

        {children}

    </SessionProvider>
  );
}
