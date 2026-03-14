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

  const refreshWatchlist = () => {
    setWatchlistIds(getWatchlist().map((m: Movie) => m.id));
  };

  const addMovie = (movie: Movie) => {
    if (watchlistIds.includes(movie.id)) return;
    addToWatchlist(movie);
    refreshWatchlist();
    toast.success("Movie added to watchlist!", { duration: 1000 });
  };

  const removeMovie = (movieId: number) => {
    removeFromWatchlist(movieId);
    refreshWatchlist();
    toast.error("Movie removed from watchlist!", { duration: 1000 });
  };

  const isInWatchlist = (movieId: number) => watchlistIds.includes(movieId);

  return { watchlistIds, addMovie, removeMovie, isInWatchlist };
}