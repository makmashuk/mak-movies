"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Calendar, BookmarkCheck, Bookmark } from "lucide-react";
import { getMovieImageUrl, getVoteColor } from "@/lib/movie.util";
import Movie from "@/interface/movie";
import { useAuth } from "@/context/AuthContext";
import { useWatchlist } from "@/hooks/useWatchlist";

interface MovieSearchCardProps {
  movie: Movie;
}

export default function MovieSearchCard({ movie }: MovieSearchCardProps) {
  const { user } = useAuth();
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();

  const posterUrl = getMovieImageUrl(movie.poster_path, "w500");
  const voteColor = getVoteColor(movie.vote_average);

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

      {user && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            isInWatchlist(movie.id) ? removeMovie(movie.id) : addMovie(movie)
          }
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-colors z-10 ${
            isInWatchlist(movie.id)
              ? "bg-yellow-500 text-black"
              : "bg-black/50 text-white hover:bg-yellow-500 hover:text-black"
          }`}
        >
          {isInWatchlist(movie.id) ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
        </motion.button>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent
        opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="absolute bottom-0 left-0 right-0 p-3
        translate-y-0 opacity-100
        md:translate-y-2 md:opacity-0
        md:group-hover:translate-y-0 md:group-hover:opacity-100
        transition-all duration-300"
      >
        <h3 className="text-white font-semibold text-sm line-clamp-1 mb-0.5">
          {movie.title}
        </h3>

        {movie.release_date && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-1.5">
            <Calendar size={11} />
            {movie.release_date.slice(0, 4)}
          </div>
        )}

        <p className="text-gray-300 text-xs line-clamp-2 mb-2 hidden md:block">
          {movie.overview || "No description available."}
        </p>

        <Link
          href={`/movie/${movie.id}`}
          className="block text-center py-1.5 bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-bold rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}