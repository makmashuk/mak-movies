"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Movie } from "@/lib/tmdb";
import { getMovieImageUrl } from "@/lib/movie.util";
import Link from "next/link";

interface BannerSliderProps {
  movies: Movie[];
  autoPlayInterval?: number;
}

export default function BannerSlider({
  movies,
  autoPlayInterval = 5000,
}: BannerSliderProps) {
  const [current, setCurrent] = useState(0);
  const movie = movies[current];
  console.log("Current banner movie:", movie);

  useEffect(() => {
    if (movies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [movies.length, autoPlayInterval]);

  if (!movie) return null;

  const bannerUrl = getMovieImageUrl(movie.backdrop_path, "original");

  return (
    <>
      <div className="fixed top-16 left-0 w-full h-[75vh] lg:h-[90vh] overflow-hidden z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={bannerUrl}
              alt={`Banner for ${movie.title}`}
              fill
              className="object-cover opacity-60"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent z-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${movie.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="absolute left-0 bottom-40 p-4 md:p-8 lg:p-16 max-w-2xl z-20"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <p className="text-yellow-400 text-lg font-semibold uppercase tracking-widest">
                Featured Movie
              </p>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 line-clamp-2">
              {movie.title}
            </h1>

            <div className="flex items-center gap-3 flex-wrap mb-4">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-white text-sm font-medium">
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <span className="text-white text-sm">
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </span>
              </div>

            </div>

            <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-6 max-w-lg hidden sm:block">
              {movie.overview}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full transition"
              >
                ▶ Watch Now
              </Link>
              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-sm transition"
              >
                More Info
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {movies.length > 1 && (
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex gap-2 z-20">
            {movies.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-yellow-400 w-6 h-2.5"
                    : "bg-gray-400 hover:bg-gray-200 w-2.5 h-2.5"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="h-[75vh] lg:h-screen" />
    </>
  );
}
