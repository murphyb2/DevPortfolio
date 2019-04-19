import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Dashboard from "./projects/Dashboard";
import Splash from "./projects/Splash";
import ProjectDetail from "./projects/ProjectDetail";
import About from "./About";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Splash} />
                  <Route path="/projects/:id" component={ProjectDetail} />
                  <Route path="/about" component={About} />
                  {/* <Route exact path="/admin" component={Dashboard} /> */}
                  {/* <Route exact path="/register" component={Register} /> */}
                  {/* <Route exact path="/login" component={Login} /> */}
                </Switch>
              </div>
              <Footer />
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
