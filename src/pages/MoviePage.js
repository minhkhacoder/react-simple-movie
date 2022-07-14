/** @format */

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { MovieCardSkeleton } from "../components/movie/MovieCardSkeleton";
import { v4 } from "uuid";
import Button from "../components/button/Button";

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>
const itemsPerPage = 20;
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    `${tmdbAPI.getMovieList("popular", nextPage)}`
  );

  // Filter delay 500
  const filterDebounce = useDebounce(filter, 500);

  // Get value input when change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  // Fetch data api from url
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  const movies = data?.results || [];
  return (
    <div className="py-5 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-3 text-white outline-none bg-slate-800"
            placeholder="Type here to search..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="px-6 py-3 text-white bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div className="w-10 h-10 mx-auto mb-5 border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      )} */}
      {loading && (
        <div className="grid grid-cols-4 gap-5 mb-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-5 mb-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;
