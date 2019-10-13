import React from "react";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";

const GenresList = ({ genres, onChangeGenres, with_genres }) => {
  return (
    <div className="genres">
      {genres.map(genre => {
        const id = +genre.id;
        return (
          <div key={id} className="form-check">
            <input
              value={id}
              type="checkbox"
              name="with_genres"
              checked={with_genres.includes(id)}
              className="form-check-input"
              id={genre.name}
              onChange={onChangeGenres}
            />
            <label className="form-check-label" htmlFor={genre.name}>
              {genre.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};

GenresList.defaultProps = {
  genres: [],
  with_genres: []
};
GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
  onChangeGenres: PropTypes.func.isRequired,
  with_genres: PropTypes.array.isRequired
};

export default GenresHOC(GenresList);
