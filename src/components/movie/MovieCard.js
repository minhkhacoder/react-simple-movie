/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";
import PropType from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieCard = ({ item }) => {
  const { title, poster_path, vote_average, release_date, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movies-card bg-slate-800">
      <img
        src={tmdbAPI.imageOriginal(poster_path)}
        alt=""
        className="rounded-lg w-full h-[250px] object-cover object-top mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="h-full mt-auto mb-3 text-xl font-bold">{title}</h3>
        <div className="flex items-center justify-between mb-8 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)} className="w-full">
          Watch Now
        </Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropType.shape({
    title: PropType.string,
    poster_path: PropType.string,
    vote_average: PropType.number,
    release_date: PropType.string,
    id: PropType.number,
  }),
};

function ErrorBoundaryFallbackMovieCard() {
  return (
    <p className="text-red-500 bg-red-300">
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent: ErrorBoundaryFallbackMovieCard,
  // onError(error, info) {

  // },
});
