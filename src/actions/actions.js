export const actionCreatorUpdateAuth = payload => {
  return {
    type: "UPDATE_AUTH",
    payload
  };
};

export const actionCreatorLogOut = () => {
  return {
    type: "LOGOUT"
  };
};

export const actionCreatorFavsUpdate = payload => {
  return {
    type: "UPDATE_FAV",
    payload
  };
};

export const actionCreatorWatchlistUpdate = payload => {
  return {
    type: "UPDATE_WATCH",
    payload
  };
};
