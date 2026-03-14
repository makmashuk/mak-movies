"use client";

import MoviesPanel from "@/components/Home/MoviesPanel";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "@/lib/tmdb";

export default function Home() {
  return (
    <>
      <MoviesPanel title="Trending Movies" fetchMovies={fetchTrendingMovies} />
      <MoviesPanel title="Top Rated Movies" fetchMovies={fetchTopRatedMovies} />
      <MoviesPanel title="Popular Movies" fetchMovies={fetchPopularMovies} />
      <MoviesPanel title="Upcoming Movies" fetchMovies={fetchUpcomingMovies} />
    </>
  );
}
