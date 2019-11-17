import React, { Component } from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import CallApi from "../../../api/api";

export default class MoviesPage extends Component {
  state = {
    filters: {
      sort_by: "popularity.desc",
      primary_release_year: "2019",
      with_genres: []
    },
    pagination: {
      page: 1,
      total_pages: 0
    },
    favorites: [],
    watchlist: [],
    showModal: false
  };

  onChangeFilters = event => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value
    };
    this.setState({
      filters: newFilters
    });
  };
  getFavorites = async () => {
    try {
      const data = await CallApi.get(
        `/account/${this.state.user.id}/favorite/movies`,
        {
          params: { session_id: this.state.session_id }
        }
      );
      const result = data.results.map(result => result.id);
      this.setState(prevState => ({
        ...prevState,
        favorites: result
      }));
    } catch (err) {
      console.log(err);
    }
  };

  getWatchlist = async () => {
    try {
      const data = await CallApi.get(
        `/account/${this.state.user.id}/watchlist/movies`,
        {
          params: { session_id: this.state.session_id }
        }
      );
      const result = data.results.map(result => result.id);
      this.setState(prevState => ({
        ...prevState,
        watchlist: result
      }));
    } catch (err) {
      console.log(err);
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  onChangePagination = ({
    page,
    total_pages = this.state.pagination.total_pages
  }) => {
    this.setState({
      pagination: { page, total_pages }
    });
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
            <div className="card">
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
          <div className="col-8 d-flex align-items-center">
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
