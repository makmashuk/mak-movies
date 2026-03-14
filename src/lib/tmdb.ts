const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "0f1b275b4494e12ae7cad6885ea15753";
// const API_KEY = process.env.EXT_PUBLIC_TMDB_API_KEY;

export const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export interface Movie {
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
}

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  console.log("Fetched movie details:", id);
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}`,
  );
  const data = await response.json();
  console.log("Fetched movie details:", data);
  return data;
};
