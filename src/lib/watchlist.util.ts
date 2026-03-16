import Movie from "@/interface/movie";

const getKey = (userId: string) => `watchlist_${userId}`;

export const getWatchlist = (userId: string): Movie[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(getKey(userId));
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addToWatchlist = (userId: string, movie: Movie): void => {
  const current = getWatchlist(userId);
  if (current.some((m) => m.id === movie.id)) return;
  localStorage.setItem(getKey(userId), JSON.stringify([...current, movie]));
};

export const removeFromWatchlist = (userId: string, movieId: number): void => {
  const current = getWatchlist(userId);
  localStorage.setItem(
    getKey(userId),
    JSON.stringify(current.filter((m) => m.id !== movieId)),
  );
};

export const isMovieInWatchlist = (userId: string, movieId: number): boolean => {
  return getWatchlist(userId).some((m) => m.id === movieId);
};