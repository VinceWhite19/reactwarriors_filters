import React from "react";
import { Star, StarBorder } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";
import PropTypes from "prop-types";

const FavoriteBtn = ({
  favorites,
  user,
  session_id,
  item,
  getFavorites,
  toggleModal
}) => {
  const isFavorite = () => favorites.includes(item.id);

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

  const toggleFavorite = () => {
    runApiCall();
    getFavorites();
    isFavorite();
  };

  return (
    <Fab
      onClick={session_id ? toggleFavorite : toggleModal}
      size="small"
      color="primary"
      aria-label="add"
    >
      {isFavorite() ? <Star /> : <StarBorder />}
    </Fab>
  );
};

FavoriteBtn.propTypes = {
  favorites: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  session_id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  getFavorites: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};
export default AppContextHOC(FavoriteBtn);
