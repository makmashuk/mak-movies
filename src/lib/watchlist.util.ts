import { Movie } from "./tmdb";

const WATCHLIST_KEY = "watchlist";

export const getWatchlist = (): Movie[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]");
};

export const addToWatchlist = (movie: Movie): void => {
    const list = getWatchlist();
    if (!list.some((m) => m.id === movie.id)) {
        list.push(movie);
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
    }
};

export const removeFromWatchlist = (movieId: number): void => {
    const list = getWatchlist().filter((m) => m.id !== movieId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
};

export const isMovieInWatchlist = (movieId: number): boolean => {
    return getWatchlist().some((m) => m.id === movieId);
};