/** @format */

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "a9d20c13fdc6d93daa754d99a5f0cb70";
const tmbdEndpoint = "https://api.themoviedb.org/3/movie";
const tmbdEndpointSearch = "https://api.themoviedb.org/3/search/movie";

export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmbdEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) => `${tmbdEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmbdEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${tmbdEndpointSearch}/?api_key=${apiKey}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
};
