"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "../lib/tmdb";
import { getMovieImageUrl } from "@/lib/util";
import { useAuth } from "@/context/AuthContext";

interface MovieCardProps {
  movie: Movie;
  isInWatchlist?: boolean;
  onAddToWatchlist?: (movie: Movie) => void;
  onRemoveFromWatchlist?: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  onAddToWatchlist,
  isInWatchlist = false,
  onRemoveFromWatchlist,
}: MovieCardProps) {

    const posterUrl = getMovieImageUrl(movie.poster_path, 'w500');
     const { user } = useAuth();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative">
        <Image
          src={posterUrl}
          alt={movie.title}
          width={300}
          height={450}
          className="w-full h-64 object-cover"
        />
        {user && <div className="absolute top-2 right-2 flex space-x-2">
          {isInWatchlist ? (
            <button
              onClick={() => onRemoveFromWatchlist?.(movie.id)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              - Remove from Watchlist
            </button>
          ) : (
            <button
              onClick={() => onAddToWatchlist?.(movie)}
              className="bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-600"
            >
              + Add to Watchlist
            </button>
          )}
        </div>}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 truncate">{movie.title}</h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-2">★</span>
          <span className="text-white">{movie.vote_average.toFixed(1)}</span>
        </div>
        <p className="text-gray-400 text-sm mb-2">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "N/A"}{" "}
          • {movie.genres?.map((g) => g.name).join(", ") || "Genres"}
        </p>
        <Link
          href={`/movie/${movie.id}`}
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 block text-center"
        >
          Watch Now
        </Link>
      </div>
    </div>
  );
}
