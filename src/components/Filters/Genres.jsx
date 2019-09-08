import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Genres extends Component {
  onChangeGenres = event => {
    const values = Array.from(document.querySelectorAll('input[name="genre"]'))
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: values
      }
    });
  };

  render() {
    const { genres } = this.props;
    return (
      <div className="genres">
        {genres.map(genre => {
          return (
            <div key={genre.id} className="form-check">
              <input
                value={genre.id}
                type="checkbox"
                name="genre"
                className="form-check-input"
                id={genre.name}
                onChange={this.onChangeGenres}
              />
              <label className="form-check-label" htmlFor={genre.name}>
                {genre.name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
Genres.propTypes = {
  genres: PropTypes.array.isRequired
};
