import React, { Component } from "react";
import MovieItem from "./MovieItem";

export default class MovieList extends Component {
  state = {
    movies: []
  };
  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;

    const link = `${process.env.REACT_APP_API_URL}/discover/movie?api_key=${
      process.env.REACT_APP_API_KEY_3
    }&language=ru-RU&sort_by=${sort_by}&&primary_release_year=${primary_release_year}&page=${page}${
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
        this.props.updateTotalPages(data.total_pages);
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    const { filters, onChangePage, page } = this.props;

    if (filters.sort_by !== prevProps.filters.sort_by) {
      onChangePage(1);
      this.getMovies(filters, 1);
    }
    if (
      filters.primary_release_year !== prevProps.filters.primary_release_year
    ) {
      onChangePage(1);
      this.getMovies(filters, 1);
    }
    if (filters.with_genres !== prevProps.filters.with_genres) {
      onChangePage(1);
      this.getMovies(filters, 1);
    }
    if (page !== prevProps.page) {
      this.getMovies(filters, page);
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
