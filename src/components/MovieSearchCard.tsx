"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import { Movie } from "@/lib/tmdb";
import { getMovieImageUrl } from "@/lib/util";

interface MovieSearchCardProps {
  movie: Movie;
}

export default function MovieSearchCard({ movie }: MovieSearchCardProps) {

  const posterUrl = movie.poster_path
    ? getMovieImageUrl(movie.poster_path, "w500")
    : null;

  const voteColor =
    movie.vote_average >= 7
      ? "text-green-400"
      : movie.vote_average >= 5
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="relative w-full aspect-[2/3] bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-colors group"
    >

      {posterUrl ? (
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gray-700 flex flex-col items-center justify-center text-gray-500 gap-2">
          <Star size={32} className="opacity-30" />
          <span className="text-sm">No Image</span>
        </div>
      )}

      {movie.vote_average > 0 && (
        <div className={`absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold ${voteColor}`}>
          <Star size={11} fill="currentColor" />
          {movie.vote_average.toFixed(1)}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        
        <h3 className="text-white font-semibold text-sm line-clamp-1 mb-0.5">
          {movie.title}
        </h3>


        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
          {movie.release_date && (
            <div className="flex items-center gap-1">
              <Calendar size={11} />
              {movie.release_date.slice(0, 4)}
            </div>
          )}
        </div>

        <p className="text-gray-300 text-xs line-clamp-2 mb-3">
          {movie.overview || "No description available."}
        </p>

        <Link
          href={`/movie/${movie.id}`}
          className="block text-center py-2 bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-bold rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}