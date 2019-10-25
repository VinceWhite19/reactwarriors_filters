import React from "react";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";

class WatchlistBtn extends React.Component {
  state = {
    watchlist: false
  };
  setInitialState = () => {
    this.setState({
      watchlist: this.props.user.watchlist.includes(this.props.item.id)
    });
  };
  runApiCall = () => {
    return CallApi.post(`/account/${this.props.user.id}/watchlist`, {
      params: { session_id: this.props.session_id },
      body: {
        media_type: "movie",
        media_id: this.props.item.id,
        watchlist: this.state.watchlist
      }
    });
  };

  toggleBookmark = () => {
    this.setState(
      prevState => ({
        watchlist: !prevState.watchlist
      }),
      this.runApiCall
    );
  };
  componentDidMount() {
    this.setInitialState();
  }
  render() {
    const { toggleModal, session_id } = this.props;
    const { watchlist } = this.state;
    return (
      <Fab
        onClick={session_id ? this.toggleBookmark : toggleModal}
        size="small"
        color="secondary"
        aria-label="add"
      >
        {watchlist ? <Bookmark /> : <BookmarkBorder />}
      </Fab>
    );
  }
}

export default AppContextHOC(WatchlistBtn);
