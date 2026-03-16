import { useState } from "react";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "@/lib/watchlist.util";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import Movie from "@/interface/movie";

export function useWatchlist() {
  const { user } = useAuth();
  const userId = user?.uid ?? "guest";

  const [watchlistIds, setWatchlistIds] = useState<number[]>(() =>
    getWatchlist(userId).map((m: Movie) => m.id),
  );

  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>(() =>
    getWatchlist(userId),
  );

  const refreshWatchlist = () => {
    const stored = getWatchlist(userId);
    setWatchlistIds(stored.map((m: Movie) => m.id));
    setWatchlistMovies(stored);
  };

  const addMovie = (movie: Movie) => {
    if (watchlistIds.includes(movie.id)) return;
    addToWatchlist(userId, movie);
    refreshWatchlist();
    toast.success("Movie added to watchlist!");
  };

  const removeMovie = (movieId: number) => {
    removeFromWatchlist(userId, movieId);
    refreshWatchlist();
    toast.error("Movie removed from watchlist!");
  };

  const isInWatchlist = (movieId: number) => watchlistIds.includes(movieId);

  return { watchlistMovies, watchlistIds, addMovie, removeMovie, isInWatchlist };
}