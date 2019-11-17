import React, { Component, createContext } from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route } from "react-router-dom";

const cookies = new Cookies();

export const AppContext = createContext();

export default class App extends Component {
  state = {
    user: null,
    session_id: null,
    favorites: [],
    watchlist: [],
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

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null
    });
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
        this.getWatchlist();
      });
    }
  }

  render() {
    const { user, session_id, favorites, watchlist, showModal } = this.state;

    return (
      <Router>
        <AppContext.Provider
          value={{
            user,
            updateUser: this.updateUser,
            session_id,
            favorites,
            watchlist,
            getFavorites: this.getFavorites,
            getWatchlist: this.getWatchlist,
            updateSessionId: this.updateSessionId,
            onLogOut: this.onLogOut,
            toggleModal: this.toggleModal,
            showModal
          }}
        >
          <Header user={user} updateSessionId={this.updateSessionId} />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
        </AppContext.Provider>
      </Router>
    );
  }
}
