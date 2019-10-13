import React, { Fragment } from "react";
import PropTypes from "prop-types";

const MovieItem = ({ item }) => {
  return (
    <Fragment>
      <img
        className="card-img-top card-img--height"
        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
          item.poster_path}`}
        alt=""
      />
      <div className="card-body">
        <h6 className="card-title">{item.title}</h6>
        <div className="card-text">Рейтинг: {item.vote_average}</div>
      </div>
    </Fragment>
  );
};

MovieItem.propTypes = {
  item: PropTypes.object.isRequired
};
export default MovieItem;
