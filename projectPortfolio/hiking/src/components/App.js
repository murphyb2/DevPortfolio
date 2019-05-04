import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import MapContainer from "./MapContainer";
import Footer from "./Layout/Footer";
import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <MapContainer />
            <h1>Search Bar</h1>
            <h1>Results</h1>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
