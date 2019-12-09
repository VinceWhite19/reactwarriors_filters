import Cookies from "universal-cookie";
import { combineReducers } from "redux";

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  isAuth: false
};

const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTH":
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2952000
      });
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true
      };
    case "LOGOUT":
      cookies.remove("session_id");
      return {
        ...state,
        user: null,
        session_id: null,
        isAuth: false
      };
    default:
      return state;
  }
};

const reducerFavourites = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_FAV":
      return action.payload;
    default:
      return state;
  }
};
const reducerWatchlist = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_WATCH":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  reducerAuth,
  reducerFavourites,
  reducerWatchlist
});
