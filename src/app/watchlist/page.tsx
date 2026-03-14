"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import { useAuth } from "@/context/AuthContext";
import { useWatchlist } from "@/hooks/useWatchlist";
import { getWatchlist } from "@/lib/watchlist.util";

export default function WatchlistPage() {
  
  const router = useRouter();
  const { user } = useAuth();
  const { removeMovie, isInWatchlist } = useWatchlist();
  

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, router]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {getWatchlist().map((movie) => (
          <div key={movie.id}>
            <MovieCard
              movie={movie}
              isInWatchlist={isInWatchlist(movie.id)}
              onRemoveFromWatchlist={removeMovie}
            />
          </div>
        ))}
      </div>
    </div>
  );
}