"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/lib/tmdb";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function MoviesPanel({ title, fetchMovies }: { title: string; fetchMovies: () => Promise<Movie[]> }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await fetchMovies();
        setMovies(movies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  
  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isInWatchlist={isInWatchlist(movie.id)}
            onAddToWatchlist={addMovie}
            onRemoveFromWatchlist={removeMovie}
          />
        ))}
      </div>
    </div>
  );
}
