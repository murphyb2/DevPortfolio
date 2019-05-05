import axios from "axios";
import { UPDATE_USER_LOC, GET_TRAILS } from "./types";

// Update user entered location
export const updateUserLocation = location => dispatch => {
  dispatch({
    type: UPDATE_USER_LOC,
    payload: location
  });
};

// Get trails based on user entered location
export const getNearbyTrails = location => dispatch => {
  axios
    .get("https://www.hikingproject.com/data/get-trails", {
      params: {
        lat: location[0],
        lon: location[1],
        maxDistance: 50,
        maxResults: 20,
        key: "200462394-f52578031e3e05e015044245f248eff4"
      }
    })
    .then(res => {
      dispatch({
        type: GET_TRAILS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
