"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  return (
    <header className="bg-black-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white-500">
          My Movies
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/" className="hover:text-white-500">
            Home
          </Link>
          <Link href="/movie/search" className="hover:text-white-500">
            Search
          </Link>
          {user && (
            <Link href="/watchlist" className="hover:text-white-500">
              Watchlist
            </Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="hover:text-white-500">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="hover:text-white-500">
                Login
              </Link>
              <Link href="/signup" className="hover:text-white-500">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
