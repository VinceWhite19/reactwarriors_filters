import React, { useState } from "react";
import { Star, StarBorder } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "../Header/Login/LoginForm";

const FavoriteBtn = ({
  favorites,
  user,
  session_id,
  item,
  fetchFavoriteMovies
}) => {
  const isFavorite = () => favorites.includes(item.id);
  const [isOpen, setIsOpen] = useState(false);

  const runApiCall = () => {
    return CallApi.post(`/account/${user.id}/favorite`, {
      params: { session_id: session_id },
      body: {
        media_type: "movie",
        media_id: item.id,
        favorite: !isFavorite()
      }
    });
  };

  const toggleFavorite = async () => {
    await runApiCall();
    fetchFavoriteMovies({ user, session_id });
  };

  return (
    <Fab
      onClick={session_id ? toggleFavorite : () => setIsOpen(!isOpen)}
      size="small"
      color="primary"
      aria-label="add"
    >
      {isOpen && (
        <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      )}
      {isFavorite() ? <Star /> : <StarBorder />}
    </Fab>
  );
};

FavoriteBtn.defaultProps = {
  user: {},
  session_id: null
};

FavoriteBtn.propTypes = {
  favorites: PropTypes.array,
  user: PropTypes.object,
  session_id: PropTypes.string,
  item: PropTypes.object.isRequired,
  fetchFavoriteMovies: PropTypes.func.isRequired
};
export default AppContextHOC(FavoriteBtn);
