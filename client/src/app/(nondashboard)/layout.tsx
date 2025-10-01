"use client";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    fetchAuthSession().then((s) =>
      console.log("Session in browser:", s.tokens?.idToken?.toString())
    );
  }, []);
  return (
    <div className="flex min-h-screen flex-col w-full">
      <Navbar />
      <main className="flex-1 w-full" style={{ marginTop: NAVBAR_HEIGHT }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
