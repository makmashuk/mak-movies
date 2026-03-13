"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-500">
          My Movies
        </Link>
        <nav className="flex space-x-4">
          <Link href="/" className="hover:text-yellow-500">
            Home
          </Link>
          <Link href="/movie/search" className="hover:text-yellow-500">
            Search
          </Link>
          {user && (
            <Link href="/watchlist" className="hover:text-yellow-500">
              Watchlist
            </Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="hover:text-yellow-500">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="hover:text-yellow-500">
                Login
              </Link>
              <Link href="/signup" className="hover:text-yellow-500">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
