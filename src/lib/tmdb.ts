const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0f1b275b4494e12ae7cad6885ea15753';
// const API_KEY = process.env.EXT_PUBLIC_TMDB_API_KEY;

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
}

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};


export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
    console.log("Fetched movie details:", id);
  const response = await fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  console.log("Fetched movie details:", data);
  return data;
};