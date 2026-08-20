"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null avoids initial hydration flicker
  const [userName, setUserName] = useState<string>("");

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserName(user.name || user.email || "");
        } catch {
          setUserName("");
        }
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]); // Re-check whenever route changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    router.push("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1e293b",
        padding: "1rem 2rem",
        color: "#ffffff",
      }}
    >
      <Link
        href={isLoggedIn ? "/dashboard" : "/login"}
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
      >
        MyApp
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {/* Render nothing until client state is initialized */}
        {isLoggedIn === null ? null : isLoggedIn ? (
          /* SHOW ONLY WHEN LOGGED IN */
          <>
            {userName && (
              <span style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>
                Welcome, <strong>{userName}</strong>
              </span>
            )}
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#ef4444",
                color: "#ffffff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          /* SHOW ONLY WHEN LOGGED OUT */
          <>
            <Link
              href="/login"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Login
            </Link>
            <Link
              href="/register"
              style={{
                backgroundColor: "#3b82f6",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;