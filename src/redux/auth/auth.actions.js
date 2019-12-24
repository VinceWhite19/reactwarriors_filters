import CallApi from "../../api/api";
import * as types from "./auth.types";

export const fetchAuth = session_id => dispatch => {
  dispatch({
    type: types.FETCH_REQUEST_AUTH
  });
  CallApi.get("/account", {
    params: {
      session_id
    }
  })
    .then(user => {
      dispatch(updateAuth({ user, session_id }));
      dispatch(fetchFavoriteMovies({ user, session_id }));
      dispatch(fetchWatchlistMovies({ user, session_id }));
    })
    .catch(error => {
      dispatch({
        type: types.FETCH_ERROR_AUTH,
        payload: error
      });
    });
};

export const updateAuth = ({ user, session_id }) => ({
  type: types.FETCH_SUCCESS_AUTH,
  payload: {
    user,
    session_id
  }
});

export const fetchFavoriteMovies = ({ user, session_id }) => dispatch => {
  CallApi.get(`/account/${user.id}/favorite/movies`, {
    params: {
      session_id: session_id
    }
  }).then(data => {
    dispatch(favsUpdate(data.results.map(result => result.id)));
  });
};

export const favsUpdate = payload => {
  return {
    type: types.UPDATE_FAV,
    payload: payload
  };
};

export const fetchWatchlistMovies = ({ user, session_id }) => dispatch => {
  CallApi.get(`/account/${user.id}/watchlist/movies`, {
    params: {
      session_id: session_id
    }
  }).then(data => {
    dispatch(watchlistUpdate(data.results.map(result => result.id)));
  });
};
export const watchlistUpdate = payload => {
  return {
    type: types.UPDATE_WATCH,
    payload
  };
};

export const onLogOut = () => {
  return {
    type: types.LOGOUT
  };
};
