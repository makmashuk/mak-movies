"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { Movie, fetchTrendingMovies } from "@/lib/tmdb";
import { isMovieInWatchlist, removeFromWatchlist } from "@/lib/watchlist.util";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  const handleAddToWatchlist = (movie: Movie) => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const isAlreadyInWatchlist = watchlist.some(
      (m: Movie) => m.id === movie.id,
    );
    if (!isAlreadyInWatchlist) {
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      setNotification(`${movie.title} added to watchlist!`);
      setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
    } else {
      setNotification(`${movie.title} is already in your watchlist.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRemoveFromWatchlist = (movieId: number) => {
      removeFromWatchlist(movieId);
      setNotification(`Movie removed from watchlist!`);
    };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Trending Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isInWatchlist={isMovieInWatchlist(movie.id)}
            onAddToWatchlist={handleAddToWatchlist}
            onRemoveFromWatchlist={handleRemoveFromWatchlist}
          />
        ))}
      </div>
      {notification && (
        <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
          {notification}
        </div>
      )}
    </div>
  );
}
