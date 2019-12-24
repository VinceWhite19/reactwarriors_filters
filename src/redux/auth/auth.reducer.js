import * as types from "./auth.types";
import { cookies } from "../../utils/cookies";

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  isAuth: false,
  favorites: [],
  watchlist: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_AUTH:
    case types.FETCH_SUCCESS_AUTH:
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true
      };
    case types.LOGOUT:
      return {
        ...state,
        user: null,
        session_id: null,
        isAuth: false
      };
    case types.UPDATE_FAV:
      return { ...state, favorites: action.payload };
    case types.UPDATE_WATCH:
      return { ...state, watchlist: action.payload };
    default:
      return state;
  }
};

export default authReducer;
