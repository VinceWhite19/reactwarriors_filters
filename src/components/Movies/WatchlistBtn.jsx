import React, { useState } from "react";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "../Header/Login/LoginForm";

const WatchlistBtn = ({ watchlist, item, user, session_id, getWatchlist }) => {
  const isWatchlist = () => watchlist.includes(item.id);
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleBookmark = async () => {
    await runApiCall();
    getWatchlist();
  };

  return (
    <Fab
      onClick={session_id ? toggleBookmark : () => setIsOpen(!isOpen)}
      size="small"
      color="secondary"
      aria-label="add"
    >
      {isOpen && (
        <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      )}
      {isWatchlist() ? <Bookmark /> : <BookmarkBorder />}
    </Fab>
  );
};

WatchlistBtn.defaultProps = {
  user: {},
  session_id: null
};

WatchlistBtn.propTypes = {
  watchlist: PropTypes.array,
  user: PropTypes.object,
  session_id: PropTypes.string,
  item: PropTypes.object.isRequired,
  getWatchlist: PropTypes.func.isRequired
};
export default AppContextHOC(WatchlistBtn);
