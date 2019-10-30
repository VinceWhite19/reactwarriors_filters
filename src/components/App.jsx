import React, { Component, createContext } from "react";
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
    loadedFavorites: false,
    loadedBookmarks: false,
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
        user: {
          ...prevState.user,
          favorites: result
        },
        loadedFavorites: true
      }));
    } catch (err) {
      console.log(err);
    }
  };

  getWatchlist = async user => {
    try {
      const data = await CallApi.get(`/account/${user.id}/watchlist/movies`, {
        params: { session_id: this.state.session_id }
      });
      const result = data.results.map(result => result.id);
      this.setState(prevState => ({
        user: {
          ...prevState.user,
          watchlist: result
        },
        loadedBookmarks: true
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

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null
    });
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

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", {
        params: { session_id }
      }).then(user => {
        this.updateUser(user);
        this.updateSessionId(session_id);
        this.getFavorites();
        this.getWatchlist(user);
      });
    }
  }

  render() {
    const {
      user,
      filters,
      session_id,
      loadedFavorites,
      loadedBookmarks,
      showModal,
      pagination: { page, total_pages }
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          user,
          updateUser: this.updateUser,
          session_id,
          loadedFavorites,
          loadedBookmarks,
          getFavorites: this.getFavorites,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
          toggleModal: this.toggleModal,
          showModal
        }}
      >
        <>
          <Header user={user} updateSessionId={this.updateSessionId} />
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
              <div className="col-8">
                <MoviesList
                  onChangePagination={this.onChangePagination}
                  page={page}
                  filters={filters}
                  loadedFavorites={loadedFavorites}
                  loadedBookmarks={loadedBookmarks}
                />
              </div>
            </div>
          </div>
        </>
      </AppContext.Provider>
    );
  }
}
