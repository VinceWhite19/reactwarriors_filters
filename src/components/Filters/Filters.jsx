import React, { Component, Fragment } from "react";
import SortBy from "./SortBy";
import Year from "./Year";
import Pagination from "./Pagination";
import Genres from "./Genres";

export default class Filters extends Component {
  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres },
      onChangeFilters,
      onChangePagination,
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

          <Genres with_genres={with_genres} onChangeFilters={onChangeFilters} />
          <Pagination
            page={page}
            total_pages={total_pages}
            onChangePagination={onChangePagination}
            resetFilters={resetFilters}
          />
        </form>
      </Fragment>
    );
  }
}
