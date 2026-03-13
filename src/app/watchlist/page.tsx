"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import { useAuth } from "@/context/AuthContext";
import { Movie } from "@/lib/tmdb";
import { getWatchlist, isMovieInWatchlist, removeFromWatchlist } from "@/lib/watchlist.util";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    console.log("Checking authentication status...", user);

    if (!user) {
      router.push("/login");
      return;
    }

    setTimeout(() => {
      setWatchlist(getWatchlist());
    }, 0);
  }, [user, router]);

  const handleRemoveFromWatchlist = (movieId: number) => {
    removeFromWatchlist(movieId);
    setWatchlist(getWatchlist());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {watchlist.map((movie) => (
          <div key={movie.id}>
            <MovieCard
              movie={movie}
              isInWatchlist={isMovieInWatchlist(movie.id)}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          </div>
        ))}
      </div>
    </div>
  );
}