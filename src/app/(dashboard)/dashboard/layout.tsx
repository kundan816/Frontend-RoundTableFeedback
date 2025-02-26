"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, setLoggedInUser } from "@/utils/auth";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = getLoggedInUser();
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8097/api/employees/login", {
          method: "POST",  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email, password: user.password }), 
        });

        if (!response.ok) throw new Error(`Failed to fetch user details: ${response.status}`);

        const userData = await response.json();

        
        setLoggedInUser({
          ...user,
          bandLevel: userData.bandLevel, // This will be B6, B7, or B8
        });

      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default DashboardLayout;
