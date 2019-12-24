import React, { Component, createContext } from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  updateAuth,
  onLogOut,
  fetchAuth,
  fetchWatchlistMovies,
  fetchFavoriteMovies
} from "../redux/auth/auth.actions";
import { connect } from "react-redux";

export const AppContext = createContext();

class App extends Component {
  componentDidMount() {
    const { session_id, fetchAuth } = this.props;
    if (session_id) {
      fetchAuth(session_id);
    }
  }

  render() {
    const {
      user,
      session_id,
      updateAuth,
      onLogOut,
      fetchFavoriteMovies,
      fetchWatchlistMovies,
      favorites,
      watchlist
    } = this.props;
    return (
      <Router>
        <AppContext.Provider
          value={{
            user,
            updateAuth,
            session_id,
            favorites,
            watchlist,
            fetchFavoriteMovies,
            fetchWatchlistMovies,
            onLogOut
          }}
        >
          <Header user={user} />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
        </AppContext.Provider>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    showLoginModal: state.auth.showLoginModal,
    favorites: state.auth.favorites,
    watchlist: state.auth.watchlist
  };
};

const mapDispatchToProps = {
  updateAuth,
  onLogOut,
  fetchWatchlistMovies,
  fetchAuth,
  fetchFavoriteMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
