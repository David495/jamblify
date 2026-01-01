"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "../../app/utils/appwrite";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
        setAuthenticated(true);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
  if (!authenticated) return null;

  return (
    <>
      <main className="min-h-[calc(100vh-80px)] px-4">{children}</main>
    </>
  );
}
