import { useState } from "react";
import { Movie } from "@/lib/tmdb";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "@/lib/watchlist.util";
import { toast } from "react-hot-toast";

export function useWatchlist() {
  const [watchlistIds, setWatchlistIds] = useState<number[]>(() =>
    getWatchlist().map((m: Movie) => m.id),
  );

  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>(() =>
    getWatchlist(),
  );

  const refreshWatchlist = () => {
    const stored = getWatchlist();
    setWatchlistIds(stored.map((m: Movie) => m.id));
    setWatchlistMovies(stored);
  };

  const addMovie = (movie: Movie) => {
    if (watchlistIds.includes(movie.id)) return;
    addToWatchlist(movie);
    refreshWatchlist();
    toast.success("Movie added to watchlist!");
  };

  const removeMovie = (movieId: number) => {
    removeFromWatchlist(movieId);
    refreshWatchlist();
    toast.error("Movie removed from watchlist!");
  };

  const isInWatchlist = (movieId: number) => watchlistIds.includes(movieId);

  return { watchlistMovies, watchlistIds, addMovie, removeMovie, isInWatchlist };
}