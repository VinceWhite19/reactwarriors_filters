import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
import _ from "lodash";

export default class MovieList extends Component {
  state = {
    movies: []
  };
  getMovies = page => {
    const { sort_by, primary_release_year, with_genres } = this.props.filters;

    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&&primary_release_year=${primary_release_year}&page=${page}${
      with_genres.length > 0 ? `&with_genres=${with_genres.join()}` : ""
    }`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        this.props.onChangePagination({
          name: "total_pages",
          value: data.total_pages
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.page);
  }

  componentDidUpdate(prevProps) {
    const { filters, onChangePagination, page } = this.props;

    if (!_.isEqual(filters, prevProps.filters)) {
      onChangePagination({
        name: "page",
        value: 1
      });
      this.getMovies(1);
    }
    if (page !== prevProps.page) {
      this.getMovies(page);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
