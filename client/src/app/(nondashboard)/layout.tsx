"use client";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/common/navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";


export default function Layout({ children }: { children: React.ReactNode }) {
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
