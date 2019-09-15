import React, { Component } from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends Component {
  state = {
    filters: {
      sort_by: "vote_average.desc",
      primary_release_year: "2019",
      with_genres: []
    },
    pagination: {
      page: 1,
      total_pages: 0
    }
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

  onChangePagination = ({ name, value }) => {
    this.setState(prevState => ({
      pagination: { ...prevState.pagination, [name]: value }
    }));
  };

  resetFilters = event => {
    event.preventDefault();
    this.setState(prevState => ({
      filters: {
        sort_by: "vote_average.desc",
        primary_release_year: "2019",
        with_genres: []
      },
      pagination: {
        page: 1,
        total_pages: 0
      }
    }));
  };
  render() {
    const {
      filters,
      pagination: { page, total_pages }
    } = this.state;

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
                  onChangePagination={this.onChangePagination}
                  resetFilters={this.resetFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              onChangePagination={this.onChangePagination}
              page={page}
              filters={filters}
            />
          </div>
        </div>
      </div>
    );
  }
}
