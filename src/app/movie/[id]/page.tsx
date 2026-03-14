"use client";

import Image from "next/image";
import { fetchMovieDetails, Movie } from "@/lib/tmdb";
import { useState, useEffect } from "react";
import { getMovieImageUrl } from "@/lib/util";
import { useAuth } from "@/context/AuthContext";
import { useWatchlist } from "@/hooks/useWatchlist";

interface MovieDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();

  const { user } = useAuth();

  useEffect(() => {
    const loadMovie = async () => {
      const { id } = await params;
      const movieId = Number(id);
      if (isNaN(movieId)) return;
      const fetchedMovie = await fetchMovieDetails(movieId);
      setMovie(fetchedMovie);
    };
    loadMovie();
  }, [params]);

  const handleToggleWatchlist = () => {
    if (!movie) return;
    if (isInWatchlist(movie.id)) {   
      removeMovie(movie.id);         
    } else {
      addMovie(movie);               
    }
  };

  if (!movie) return <div>Loading...</div>;

  const bannerUrl = getMovieImageUrl(movie.backdrop_path, "original");
  const posterUrl = getMovieImageUrl(movie.poster_path, "w500");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src={bannerUrl}
          alt={`Banner for ${movie.title}`}
          fill
          className="object-cover w-full h-full opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          {user && (
            <button
              onClick={handleToggleWatchlist}
              className={`p-2 rounded-full text-white font-bold ${
                isInWatchlist(movie.id)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {isInWatchlist(movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          )}
        </div>
        <div className="absolute left-0 bottom-0 p-8 flex items-end gap-8">
          <Image
            src={posterUrl}
            alt={`Poster for ${movie.title}`}
            width={200}
            height={300}
            className="rounded-lg shadow-lg hidden md:block"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-yellow-400 font-semibold text-lg">
                ★ {movie.vote_average?.toFixed(1)}
              </span>
              <span>
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </span>
              <span>
                {movie.genres?.map((g) => g.name).join(", ") || "Genres"}
              </span>
            </div>
            <button
              className="mt-4 px-6 py-3 bg-yellow-500 text-black font-bold rounded-full shadow-lg hover:bg-yellow-600 transition"
              aria-label="Play Trailer"
            >
              ▶ Play
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-gray-200 mb-8">{movie.overview}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Release Date</h3>
            <p>{movie.release_date || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Genres</h3>
            <p>{movie.genres?.map((g) => g.name).join(", ") || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Average Vote</h3>
            <p>{movie.vote_average?.toFixed(1) || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Movie ID</h3>
            <p>{movie.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
