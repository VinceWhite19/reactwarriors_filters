import React, { Component } from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends Component {
  initialFiltersState = {
    sort_by: "vote_average.desc",
    primary_release_year: "2019",
    with_genres: []
  };

  state = {
    filters: this.initialFiltersState,
    page: 1,
    total_pages: 0
  };

  updateTotalPages = total_pages => {
    this.setState({
      total_pages
    });
  };
  onChangeFilters = event => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value
    };
    this.setState(prevState => ({
      filters: newFilters
    }));
  };

  onChangePage = page => {
    this.setState({
      // page: page
      page
    });
  };

  resetFilters = event => {
    event.preventDefault();
    const checkboxex = document.querySelectorAll('input[name="genre"]');
    checkboxex.forEach(checkbox => (checkbox.checked = false));
    this.setState(prevState => ({
      filters: this.initialFiltersState
    }));
  };
  render() {
    const { filters, page, total_pages } = this.state;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <Filters
                  filters={filters}
                  page={page}
                  total_pages={total_pages}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  resetFilters={this.resetFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              onChangePage={this.onChangePage}
              page={page}
              filters={filters}
              updateTotalPages={this.updateTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
