"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserRole, getLoggedInUser } from "@/utils/auth";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 

    const user = getLoggedInUser();
    if (!user) {
      router.replace("/login");
      return;
    }

    const role = getUserRole(user.email);
    if (role === "admin") {
      router.replace("/admin/rt-cycle");
    } else {
      router.replace("/dashboard");
    }

    setLoading(false);
  }, [router]);

  if (!isClient || loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
