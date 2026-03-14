"use client";

import Image from "next/image";
import Link from "next/link";
import { fetchMovieDetails } from "@/lib/tmdb";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Calendar,
  Clock,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  Globe,
} from "lucide-react";
import {
  getMovieImageUrl,
  getYear,
  formatDate,
  formatRuntime,
  getVoteColor,
  getGenreNames,
} from "@/lib/movie.util";
import { useAuth } from "@/context/AuthContext";
import { useWatchlist } from "@/hooks/useWatchlist";
import Movie from "@/interface/movie";

interface MovieDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();
  const { user } = useAuth();

  useEffect(() => {
    const loadMovie = async () => {
      const { id } = await params;
      const movieId = Number(id);
      if (isNaN(movieId)) return;
      const fetchedMovie = await fetchMovieDetails(movieId);
      setMovie(fetchedMovie);
      setLoading(false);
    };
    loadMovie();
  }, [params]);

  const handleToggleWatchlist = () => {
    if (!movie) return;
    isInWatchlist(movie.id) ? removeMovie(movie.id) : addMovie(movie);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="w-full h-[50vh] bg-gray-800 animate-pulse" />
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
          <div className="h-8 bg-gray-800 rounded animate-pulse w-2/3" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-1/3" />
          <div className="h-24 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const bannerUrl = getMovieImageUrl(movie.backdrop_path, "original");
  const posterUrl = getMovieImageUrl(movie.poster_path, "w500");
  const genreNames = getGenreNames(movie.genres, movie.genre_ids);
  const inWatchlist = isInWatchlist(movie.id);
  const voteColor = getVoteColor(movie.vote_average);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-900 text-white"
      >
        <div className="relative w-full h-[55vh] md:h-[70vh]">
          <Image
            src={bannerUrl}
            alt={`Banner for ${movie.title}`}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-gray-900/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-20 left-4 md:left-8"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full transition-colors"
            >
              <ChevronLeft size={16} />
              Back
            </Link>
          </motion.div>

          {user && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-20 right-4 md:right-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleWatchlist}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm transition-colors ${
                  inWatchlist
                    ? "bg-yellow-500 text-black"
                    : "bg-black/50 text-white hover:bg-yellow-500 hover:text-black border border-white/20"
                }`}
              >
                {inWatchlist ? (
                  <BookmarkCheck size={16} />
                ) : (
                  <Bookmark size={16} />
                )}
                {inWatchlist ? "Saved" : "Save"}
              </motion.button>
            </motion.div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block flex-shrink-0"
            >
              <Image
                src={posterUrl}
                alt={`Poster for ${movie.title}`}
                width={160}
                height={240}
                className="rounded-xl shadow-2xl border border-white/10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1 min-w-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">
                  {movie.status || "Now Showing"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 line-clamp-2">
                {movie.title}
              </h1>

              <div className="flex items-center gap-2 flex-wrap mb-4">
                <div className={`flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold ${voteColor}`}>
                  <Star size={13} fill="currentColor" />
                  {movie.vote_average?.toFixed(1)}
                </div>
                {movie.release_date && (
                  <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-300">
                    <Calendar size={13} />
                    {getYear(movie.release_date)}
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-300">
                    <Clock size={13} />
                    {formatRuntime(movie.runtime)}
                  </div>
                )}
                {movie.original_language && movie.original_language !== "en" && (
                  <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-300">
                    <Globe size={13} />
                    {movie.original_language.toUpperCase()}
                  </div>
                )}
              </div>

              {genreNames.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {genreNames.map((name) => (
                    <span
                      key={name}
                      className="text-xs bg-white/10 hover:bg-yellow-500/20 hover:text-yellow-400 text-gray-300 px-3 py-1 rounded-full border border-white/10 transition-colors"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={`/movie/${movie.id}`}
                  className="flex items-center gap-2 px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full transition-colors text-sm"
                >
                  ▶ Watch Now
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-sm transition-colors text-sm"
                >
                  More Like This
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto px-4 py-10"
        >
          {movie.tagline && (
            <p className="text-yellow-400/70 italic text-lg mb-6">
              &quot;{movie.tagline}&quot;
            </p>
          )}

          <h2 className="text-xl font-bold mb-3">Overview</h2>
          <p className="text-gray-300 leading-relaxed mb-10">
            {movie.overview || "No overview available."}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Release Date", value: formatDate(movie.release_date) },
              { label: "Runtime",      value: formatRuntime(movie.runtime) },
              { label: "Rating",       value: movie.vote_average?.toFixed(1) ?? "N/A" },
              { label: "Votes",        value: movie.vote_count?.toLocaleString() ?? "N/A" },
              ...(movie.budget
                ? [{ label: "Budget", value: `$${(movie.budget / 1e6).toFixed(1)}M` }]
                : []),
              ...(movie.revenue
                ? [{ label: "Revenue", value: `$${(movie.revenue / 1e6).toFixed(1)}M` }]
                : []),
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-800 border border-white/5 rounded-xl p-4 hover:border-yellow-500/30 transition-colors"
              >
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                  {item.label}
                </p>
                <p className="text-white font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {genreNames.length > 0 && (
            <div className="mb-6">
              <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-3">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {genreNames.map((name) => (
                  <span
                    key={name}
                    className="text-sm bg-white/10 text-gray-300 px-4 py-1.5 rounded-full border border-white/10 hover:border-yellow-500/40 hover:text-yellow-400 transition-colors"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}