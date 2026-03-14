"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "@/components/MovieCard";
import { useAuth } from "@/context/AuthContext";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Bookmark } from "lucide-react";

export default function WatchlistPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { watchlistMovies, removeMovie, isInWatchlist } = useWatchlist();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4">
      <div className="container mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Bookmark className="text-yellow-400" size={28} />
            <h1 className="text-3xl md:text-4xl font-bold">My Watchlist</h1>
          </div>
          <p className="text-gray-400 text-sm">
            {watchlistMovies.length}{" "}
            {watchlistMovies.length === 1 ? "movie" : "movies"} saved
          </p>
        </motion.div>

        <AnimatePresence>
          {watchlistMovies.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="bg-white/5 rounded-full p-6 mb-6">
                <Bookmark size={48} className="text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-300 mb-2">
                Your watchlist is empty
              </h2>
              <p className="text-gray-500 text-sm mb-6 max-w-xs">
                Start adding movies you want to watch and they will appear here.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full transition"
              >
                Browse Movies
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {watchlistMovies.map((movie, i) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <MovieCard
                  movie={movie}
                  isInWatchlist={isInWatchlist(movie.id)}
                  onRemoveFromWatchlist={removeMovie}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}