import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";
import { Spinner } from "reactstrap";

const MoviesList = ({ movies, loading }) => {
  return (
    <>
      {loading ? (
        <Spinner style={{ width: "5rem", height: "5rem", margin: "0 auto" }} />
      ) : (
        <div className="row">
          {movies.map(movie => {
            return (
              <div key={movie.id} className="col-6 mb-4">
                <MovieItem item={movie} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

MoviesList.defaultProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesHOC(MoviesList);
