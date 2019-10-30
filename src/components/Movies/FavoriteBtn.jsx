import React from "react";
import { Star, StarBorder } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";

class FavoriteBtn extends React.Component {
  state = {
    favorite: false
  };

  setInitialState = () => {
    this.setState({
      favorite: this.props.user.favorites.includes(this.props.item.id)
    });
  };

  runApiCall = () => {
    return CallApi.post(`/account/${this.props.user.id}/favorite`, {
      params: { session_id: this.props.session_id },
      body: {
        media_type: "movie",
        media_id: this.props.item.id,
        favorite: !this.state.favorite
      }
    });
  };

  toggleFavorite = () => {
    this.setState(
      prevState => ({
        favorite: !prevState.favorite
      }),
      this.runApiCall
    );
    this.props.getFavorites();
  };
  componentDidMount() {
    this.setInitialState();
  }
  render() {
    const { toggleModal, session_id } = this.props;
    const { favorite } = this.state;
    return (
      <Fab
        onClick={session_id ? this.toggleFavorite : toggleModal}
        size="small"
        color="primary"
        aria-label="add"
      >
        {favorite ? <Star /> : <StarBorder />}
      </Fab>
    );
  }
}

export default AppContextHOC(FavoriteBtn);
