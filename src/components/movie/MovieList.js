/** @format */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import MovieCard from "./MovieCard";
import { MovieCardSkeleton } from "./MovieCardSkeleton";

// https://api.themoviedb.org/3/movie/now_playing?api_key=a9d20c13fdc6d93daa754d99a5f0cb70
const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;

  const movies = data?.results || [];
  return (
    <div className="movies-list">
      {isLoading && (
        <>
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            {movies.length > 0 &&
              movies.splice(0, 5).map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCardSkeleton item={item}></MovieCardSkeleton>
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieList;
