"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Home,
  Search,
  Bookmark,
  LogIn,
  LogOut,
  UserPlus,
  UserCircle,
} from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home", icon: <Home size={15} /> },
    { href: "/movie/search", label: "Search", icon: <Search size={15} /> },
    ...(user
      ? [{ href: "/watchlist", label: "Watchlist", icon: <Bookmark size={15} /> }]
      : []),
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="text-xl font-bold text-yellow-400 tracking-wide">
            🎬 MyMovies
          </Link>
        </motion.div>

        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.icon}
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            {user ? (
              <motion.div
                key="user"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu((p) => !p)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all"
                >
                  <UserCircle size={18} className="text-yellow-400" />
                  <span className="hidden sm:block max-w-[100px] truncate">
                    {user.email?.split("@")[0]}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 bg-gray-800 border border-white/10 rounded-xl shadow-xl overflow-hidden"
                    >
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition-colors"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="auth"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <LogIn size={15} />
                    Login
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/signup"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-all"
                  >
                    <UserPlus size={15} />
                    Sign Up
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}