import React, { Component, createContext } from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import CallApi from "../api/api";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
  actionCreatorFavsUpdate,
  actionCreatorWatchlistUpdate
} from "../actions/actions";
import { connect } from "react-redux";

export const AppContext = createContext();

class App extends Component {
  getFavorites = async () => {
    const { session_id, user } = this.props;

    try {
      const data = await CallApi.get(`/account/${user.id}/favorite/movies`, {
        params: { session_id: session_id }
      });
      const result = data.results.map(result => result.id);
      this.props.actionCreatorFavsUpdate(result);
    } catch (err) {
      console.log(err);
    }
  };

  getWatchlist = async () => {
    const { session_id, user } = this.props;

    try {
      const data = await CallApi.get(`/account/${user.id}/watchlist/movies`, {
        params: { session_id: session_id }
      });
      const result = data.results.map(result => result.id);
      this.props.actionCreatorWatchlistUpdate(result);
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    const { session_id } = this.props;
    if (session_id) {
      CallApi.get("/account", {
        params: { session_id }
      })
        .then(user => {
          this.props.updateAuth(user, session_id);
        })
        .then(() => {
          this.getFavorites();
          this.getWatchlist();
        });
    }
  }

  render() {
    const {
      user,
      session_id,
      updateAuth,
      onLogOut,
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
            getFavorites: this.getFavorites,
            getWatchlist: this.getWatchlist,
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
  const {
    reducerAuth: { user, session_id, isAuth },
    reducerFavourites,
    reducerWatchlist
  } = state;
  return {
    user,
    session_id,
    isAuth,
    favorites: reducerFavourites,
    watchlist: reducerWatchlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAuth: (user, session_id) =>
      dispatch(actionCreatorUpdateAuth({ user, session_id })),
    onLogOut: () => dispatch(actionCreatorLogOut()),
    actionCreatorFavsUpdate: favourites =>
      dispatch(actionCreatorFavsUpdate(favourites)),
    actionCreatorWatchlistUpdate: watchlist =>
      dispatch(actionCreatorWatchlistUpdate(watchlist))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
