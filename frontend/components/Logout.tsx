"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("access_token", { path: "/" }); // Clear token cookie
    router.push("/login"); // Redirect to login page
  };

  return <span onClick={handleLogout}>Logout</span>;
}
