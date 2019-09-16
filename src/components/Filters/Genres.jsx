import React, { PureComponent } from "react";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class Genres extends PureComponent {
  state = {
    genres: []
  };

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=en-US`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  };
  componentDidMount() {
    this.getGenres();
  }

  onChangeGenres = e => {
    const value = +e.target.value;
    const name = e.target.name;
    const { with_genres, onChangeFilters } = this.props;

    onChangeFilters({
      target: {
        name,
        value: with_genres.includes(value)
          ? with_genres.filter(item => item !== value)
          : [...with_genres, value]
      }
    });
  };

  render() {
    return (
      <div className="genres">
        {this.state.genres.map(genre => {
          const id = +genre.id;
          return (
            <div key={id} className="form-check">
              <input
                value={id}
                type="checkbox"
                name="with_genres"
                checked={this.props.with_genres.includes(id)}
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
