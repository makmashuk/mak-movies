import { GENRE_MAP } from "./tmdb";

export const getMovieImageUrl = (path: string | null, size: string = 'w500'): string => {
    if (!path) return '/placeholder-image.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getVoteColor = (vote?: number): string => {
  if (!vote) return "text-gray-400";
  if (vote >= 7) return "text-green-400";
  if (vote >= 5) return "text-yellow-400";
  return "text-red-400";
};

export const formatRuntime = (minutes?: number | null): string => {
  if (!minutes) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

export const getYear = (dateStr?: string | null): string => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).getFullYear().toString();
};

export const formatDate = (dateStr?: string | null): string => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getGenreNames = (
  genres?: { id: number; name: string }[],
  genreIds?: number[],
): string[] => {
  if (genres && genres.length > 0) {
    return genres.map((g) => g.name);
  }
  if (genreIds && genreIds.length > 0) {
    return genreIds.map((id) => GENRE_MAP[id]).filter(Boolean);
  }
  return [];
};