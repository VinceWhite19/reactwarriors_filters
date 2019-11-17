import React from "react";
import FavoriteBtn from "./FavoriteBtn";
import WatchlistBtn from "./WatchlistBtn";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieItem = ({ item }) => {
  return (
    <div style={{ width: "100%" }} className="card">
      <img
        className="card-img-top card-img--height"
        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
          item.poster_path}`}
        alt=""
      />
      <div className="card-body">
        <Link to={`/movie/${item.id}/details`} className="card-title">
          {item.title}
        </Link>
        <div className="card-text">Рейтинг: {item.vote_average}</div>
      </div>
      <div className="action-buttons p-1 d-flex justify-content-around">
        <FavoriteBtn item={item} />
        <WatchlistBtn item={item} />
      </div>
    </div>
  );
};

MovieItem.propTypes = {
  item: PropTypes.object.isRequired
};
export default MovieItem;
