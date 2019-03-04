import axios from "axios";

import { GET_PROJECTS, DELETE_PROJECT, ADD_PROJECT, GET_ERRORS } from "./types";

// These actions are dispatched between the reducer and the backend
// The get, post, and delete functions talk to the server, the dispatch
// does the corresponding action on the UI

// GET PROJECTS
export const getProjects = () => dispatch => {
  axios
    .get("/api/projects")
    .then(res => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// DELETE PROJECT
export const deleteProject = id => dispatch => {
  axios
    .delete(`/api/projects/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD PROJECT
export const addProject = project => dispatch => {
  axios
    .post("/api/projects/", project)
    .then(res => {
      dispatch({
        type: ADD_PROJECT,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};
