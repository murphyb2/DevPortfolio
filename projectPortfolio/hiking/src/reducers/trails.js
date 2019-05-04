import { UPDATE_USER_LOC } from "../actions/types.js";

const initialState = {
  userLocation: [35.7796, -78.6382]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_LOC:
      return {
        ...state,
        userLocation: action.payload
      };
    default:
      return state;
  }
}
