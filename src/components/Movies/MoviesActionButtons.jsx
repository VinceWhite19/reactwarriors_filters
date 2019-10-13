import React from "react";
import { Star, StarBorder, Bookmark, BookmarkBorder } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";

class MoviesActionButtons extends React.Component {
  state = {
    favorite: false,
    watchlist: false
  };

  runApiCall = (list, url, movie_id, session_id) => {
    return CallApi.post(`/account/${url}`, {
      params: { session_id },
      body: {
        media_type: "movie",
        media_id: movie_id,
        [list]: !this.state[list]
      }
    });
  };

  updateButtonState = button => {
    this.setState(prevState => ({
      [button]: !prevState[button]
    }));
  };

  toggleFavourite = (movie_id, user_id, session_id) => {
    if (!this.state.favorite) {
      this.updateButtonState("favorite");
      this.runApiCall("favorite", `${user_id}/favorite`, movie_id, session_id);
    } else {
      this.updateButtonState("favorite");
      this.runApiCall("favorite", `${user_id}/favorite`, movie_id, session_id);
    }
  };

  toggleBookmark = (movie_id, user_id, session_id) => {
    if (!this.state.watchlist) {
      this.updateButtonState("watchlist");
      this.runApiCall(
        "watchlist",
        `${user_id}/watchlist`,
        movie_id,
        session_id
      );
    } else {
      this.updateButtonState("watchlist");
      this.runApiCall(
        "watchlist",
        `${user_id}/watchlist`,
        movie_id,
        session_id
      );
    }
  };

  render() {
    const { item, toggleModal, session_id, user } = this.props;
    const { favorite, watchlist } = this.state;
    return (
      <div className="action-buttons p-1 d-flex justify-content-around">
        <Fab
          onClick={
            session_id
              ? () => this.toggleFavourite(item.id, user.id, session_id)
              : toggleModal
          }
          size="small"
          color="primary"
          aria-label="add"
        >
          {favorite ? <Star /> : <StarBorder />}
        </Fab>
        <Fab
          onClick={
            session_id
              ? () => this.toggleBookmark(item.id, user.id, session_id)
              : toggleModal
          }
          size="small"
          color="secondary"
          aria-label="add"
        >
          {watchlist ? <Bookmark /> : <BookmarkBorder />}
        </Fab>
      </div>
    );
  }
}

export default AppContextHOC(MoviesActionButtons);
