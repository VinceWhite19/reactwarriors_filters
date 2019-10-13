import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";
import MoviesActionButtons from "./MoviesActionButtons";

const MoviesList = ({ movies }) => {
  return (
    <div className="row">
      {movies.map(movie => {
        return (
          <div key={movie.id} className="col-6 mb-4">
            <div style={{ width: "100%" }} className="card">
              <MovieItem item={movie} />
              <MoviesActionButtons item={movie} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

MoviesList.defaultProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesHOC(MoviesList);
