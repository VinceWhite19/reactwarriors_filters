import React from "react";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";
import PropTypes from "prop-types";

const WatchlistBtn = ({
  watchlist,
  item,
  user,
  session_id,
  getWatchlist,
  toggleModal
}) => {
  const isWatchlist = () => watchlist.includes(item.id);

  const runApiCall = () => {
    return CallApi.post(`/account/${user.id}/watchlist`, {
      params: { session_id: session_id },
      body: {
        media_type: "movie",
        media_id: item.id,
        watchlist: !isWatchlist()
      }
    });
  };

  const toggleBookmark = () => {
    runApiCall();
    getWatchlist();
    isWatchlist();
  };

  return (
    <Fab
      onClick={session_id ? toggleBookmark : toggleModal}
      size="small"
      color="secondary"
      aria-label="add"
    >
      {isWatchlist() ? <Bookmark /> : <BookmarkBorder />}
    </Fab>
  );
};
WatchlistBtn.propTypes = {
  watchlist: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  session_id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  getWatchlist: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};
export default AppContextHOC(WatchlistBtn);
