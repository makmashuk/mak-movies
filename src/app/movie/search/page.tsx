"use client";

import React, { useState } from "react";
import { Movie, searchMovies } from "@/lib/tmdb";
import MovieSearchCard from "@/components/MovieSearchCard";
import { addToWatchlist } from "@/lib/watchlist.util";


const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        setResults([]);
        try {
            const movies = await searchMovies(query);
            setResults(movies);
        } catch (err) {
            setError("Failed to fetch movies. Please try again.");
        } finally {
            setLoading(false);
        }
    };

     const handleAddToWatchlist = (movie: Movie) => {
        addToWatchlist(movie);
        // setNotification(`${movie.title} added to watchlist!`);
        // setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">
                <span className="text-yellow-500">Search</span> Movies
            </h1>
            <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors duration-300 font-medium"
                >
                    Search
                </button>
            </form>

            {loading && <div className="text-center text-yellow-500">Loading...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            {!loading && !error && results.length === 0 && query && (
                <div className="text-center text-gray-500">No results found.</div>
            )}

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {results.map((movie) => (
                    <MovieSearchCard
                        key={movie.id}
                        movie={movie}
                        onAddToWatchlist={handleAddToWatchlist}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;