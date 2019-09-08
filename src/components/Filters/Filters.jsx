import React, { Component, Fragment } from "react";
import SortBy from "./SortBy";
import Year from "./Year";
import Pagination from "./Pagination";
import Genres from "./Genres";

export default class Filters extends Component {
  state = {
    genres: []
  };

  getGenres = () => {
    const link = `${process.env.REACT_APP_API_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY_3}&language=en-US`;
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

  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres },
      onChangeFilters,
      onChangePage,
      resetFilters,
      page,
      total_pages
    } = this.props;

    return (
      <Fragment>
        <h3>Фильтры:</h3>

        <form className="mb-3">
          <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
          <Year
            primary_release_year={primary_release_year}
            onChangeFilters={onChangeFilters}
          />

          <Genres
            with_genres={with_genres}
            genres={this.state.genres}
            onChangeFilters={onChangeFilters}
          />
          <Pagination
            page={page}
            total_pages={total_pages}
            onChangePage={onChangePage}
            resetFilters={resetFilters}
          />
        </form>
      </Fragment>
    );
  }
}
