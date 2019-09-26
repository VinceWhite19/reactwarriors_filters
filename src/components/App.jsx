import React, { Component, Fragment } from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class App extends Component {
  state = {
    user: null,
    session_id: null,
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

  updateUser = user => {
    this.setState({ user });
  };
  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2952000
    });
    this.setState({ session_id });
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

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
      });
    }
  }

  render() {
    const {
      user,
      filters,
      pagination: { page, total_pages }
    } = this.state;

    return (
      <Fragment>
        <Header
          user={user}
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
        />
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
      </Fragment>
    );
  }
}
