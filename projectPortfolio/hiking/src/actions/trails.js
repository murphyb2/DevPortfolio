import { UPDATE_USER_LOC } from "./types";

// CREATE MESSAGE
export const updateUserLocation = location => dispatch => {
  dispatch({
    type: UPDATE_USER_LOC,
    payload: location
  });
};
