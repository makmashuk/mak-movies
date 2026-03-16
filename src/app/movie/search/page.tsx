"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, Film } from "lucide-react";
import { Movie, searchMovies } from "@/lib/tmdb";
import MovieSearchCard from "@/components/MovieSearchCard";

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSuggestionsLoading(true);
      try {
        const movies = await searchMovies(query);
        setSuggestions(movies.slice(0, 6));
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggestions(false);
    setLoading(true);
    setError(null);
    setResults([]);
    setHasSearched(true);
    try {
      const movies = await searchMovies(query);
      setResults(movies);
    } catch {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (movie: Movie) => {
    setQuery(movie.title);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSuggestions([]);
    setShowSuggestions(false);
    setHasSearched(false);
    setError(null);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-yellow-400">Search</span> Movies
          </h1>
          <p className="text-gray-400 text-sm">
            Find your next favourite film
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          ref={wrapperRef}
          className="relative max-w-2xl mx-auto mb-10"
        >
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                {suggestionsLoading ? (
                  <Loader2 size={18} className="animate-spin text-yellow-400" />
                ) : (
                  <Search size={18} />
                )}
              </div>

              <input
                ref={inputRef}
                type="text"
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                className="w-full pl-11 pr-10 py-3.5 bg-gray-800 border border-gray-700 focus:border-yellow-500 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
              />

              <AnimatePresence>
                {query && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl transition-colors"
            >
              Search
            </motion.button>
          </form>

          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                {suggestions.map((movie, i) => (
                  <motion.button
                    key={movie.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleSuggestionClick(movie)}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left border-b border-gray-700/50 last:border-0"
                  >
                    <Search size={14} className="text-gray-500 flex-shrink-0" />
                    <span className="text-white text-sm truncate flex-1">
                      {movie.title}
                    </span>
                    {movie.release_date && (
                      <span className="text-gray-500 text-xs flex-shrink-0">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <Loader2 size={40} className="animate-spin text-yellow-400" />
              <p className="text-gray-400 text-sm">Searching movies...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl py-4 px-6 max-w-md mx-auto mb-8"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!loading && !error && hasSearched && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="bg-white/5 rounded-full p-6 mb-4">
                <Film size={40} className="text-gray-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-300 mb-1">
                No results for &quot;{query}&quot;
              </h2>
              <p className="text-gray-500 text-sm">
                Try a different title or check your spelling.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!loading && results.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-sm mb-6 text-center"
            >
              Found{" "}
              <span className="text-yellow-400 font-semibold">
                {results.length}
              </span>{" "}
              results for &quot;{query}&quot;
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div
          layout
          className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {results.map((movie, i) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <MovieSearchCard movie={movie} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default MovieSearch;