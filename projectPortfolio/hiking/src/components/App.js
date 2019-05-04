import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import MapParent from "./MapParent";
import GeocodeContainer from "./GeocodeContainer";

import Footer from "./Layout/Footer";
import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <MapParent />
            <div className="container">
              <h1>Search Bar</h1>
              <GeocodeContainer />
              <h1>Results</h1>
            </div>

            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
