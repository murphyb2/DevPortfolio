import { combineReducers } from "redux";
import projects from "./projects";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  projectReducer: projects,
  errorReducer: errors,
  messagesReducer: messages
});
