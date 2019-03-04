import { combineReducers } from "redux";
import projects from "./projects";
import errors from "./errors";

export default combineReducers({
  projectReducer: projects,
  errorReducer: errors
});
