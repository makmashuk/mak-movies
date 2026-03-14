"use client";

import BannerSlider from "@/components/Home/BannerSlider";
import MoviesPanel from "@/components/Home/MoviesPanel";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  Movie,
} from "@/lib/tmdb";
import { useState, useEffect } from "react";

export default function Home() {
  const [bannerMovies, setBannerMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchPopularMovies().then((movies) => setBannerMovies(movies.slice(0, 5)));
  }, []);

  return (
    <>
      <BannerSlider movies={bannerMovies} />
      
      <div className="relative z-10">
        <div className="h-24 bg-gradient-to-b from-transparent to-gray-900" />
        <div className="bg-gray-900">
          <MoviesPanel title="Trending Movies" fetchMovies={fetchTrendingMovies} />
          <MoviesPanel title="Top Rated Movies" fetchMovies={fetchTopRatedMovies} />
          <MoviesPanel title="Popular Movies" fetchMovies={fetchPopularMovies} />
          <MoviesPanel title="Upcoming Movies" fetchMovies={fetchUpcomingMovies} />
        </div>
      </div>
      
    </>
  );
}
