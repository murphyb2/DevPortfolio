import { UPDATE_USER_LOC, GET_TRAILS } from "../actions/types.js";

const initialState = {
  userLocation: [35.7796, -78.6382], //Default is Raleigh NC
  nearbyTrails: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_LOC:
      return {
        ...state,
        userLocation: action.payload
      };
    case GET_TRAILS:
      return {
        ...state,
        nearbyTrails: action.payload
      };

    default:
      return state;
  }
}
