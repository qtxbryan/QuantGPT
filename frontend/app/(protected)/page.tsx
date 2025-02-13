"use client";
import Header from "@/components/Header";
import { StatsCards } from "@/components/StatsCard";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import GradientText from "@/components/GradientText";

const Home = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user's email from the backend
    const fetchUserEmail = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`, // Send the token
          },
        });

        if (res.ok) {
          const data = await res.json();
          setEmail(data.email);
        } else {
          console.error("Failed to fetch user email");
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, []);
  return (
    <>
      <Header />
      <main className="p-4 md:p-6">
        <div className="space-y-4 md:space-y-6">
          {email && (
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={9}
              showBorder={false}
              className="text-2xl md:text-3xl text-left font-bold"
            >
              Welcome, {email}
            </GradientText>
          )}
          <StatsCards />
        </div>
      </main>
    </>
  );
};

export default Home;
