export default interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  video: boolean;
  adult: boolean;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number | null;
  budget?: number;
  revenue?: number;
  tagline?: string | null;
  status?: string;
}
