import Movie from "@/interface/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

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

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    if (response.status === 401) throw new Error("Invalid API key.");
    if (response.status === 404) throw new Error("Resource not found.");
    if (response.status === 429) throw new Error("Too many requests. Please slow down.");
    if (response.status >= 500) throw new Error("TMDB server error. Try again later.");
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  );
  const data = await handleResponse<{ results: Movie[] }>(response);
  return data.results;
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`,
  );
  const data = await handleResponse<{ results: Movie[] }>(response);
  return data.results;
};

export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  );
  const data = await handleResponse<{ results: Movie[] }>(response);
  return data.results;
};

export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
  );
  const data = await handleResponse<{ results: Movie[] }>(response);
  return data.results;
};

export const fetchNowPlayingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
  );
  const data = await handleResponse<{ results: Movie[] }>(response);
  return data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await handleResponse<{ results: Movie[] }>(response);
  return data.results;
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}`,
  );
  const data = await handleResponse<Movie>(response);
  return data;
};