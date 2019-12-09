import React from "react";
import FavoriteBtn from "../../Movies/FavoriteBtn";
import WatchlistBtn from "../../Movies/WatchlistBtn";
import { IMG_URL } from "../../../api/api";

import PropTypes from "prop-types";

const MovieDescription = ({ movie }) => {
  const { backdrop_path, poster_path, title, overview, vote_average } = movie;

  return (
    <div className="row mt-3">
      <div className="col-12 col-md-4">
        <img
          className="poster"
          src={`${IMG_URL}${backdrop_path || poster_path}`}
          alt=""
        />
      </div>
      <div className="col-12 col-md-8">
        <h2 className="movie-title">{title}</h2>
        <div className="movie-text pr-5">{overview}</div>
        <div className="mt-2"> Рейтинг Пользователей: {vote_average} </div>

        <div className="action-buttons mt-2  p-1 col-sm-2 d-flex justify-content-between">
          <FavoriteBtn item={movie} />
          <WatchlistBtn item={movie} />
        </div>
      </div>
    </div>
  );
};

MovieDescription.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieDescription;
