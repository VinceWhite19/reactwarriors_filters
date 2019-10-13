import React, { Component, Fragment, createContext } from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = createContext();

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
    },
    showModal: false
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

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null
    });
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
      CallApi.get("/account", {
        params: { session_id }
      }).then(user => {
        this.updateUser(user);
        this.updateSessionId(session_id);
      });
    }
  }

  render() {
    const {
      user,
      filters,
      session_id,
      showModal,
      pagination: { page, total_pages }
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          user,
          updateUser: this.updateUser,
          session_id,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
          toggleModal: this.toggleModal,
          showModal
        }}
      >
        <Fragment>
          <Header user={user} updateSessionId={this.updateSessionId} />
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
      </AppContext.Provider>
    );
  }
}
