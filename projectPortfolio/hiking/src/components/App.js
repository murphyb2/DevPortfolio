import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import GeocodeContainer from "./MapComponents/GeocodeContainer";
import TrailResults from "./Trails/TrailResults";
import MapParent from "./MapComponents/MapParent";
import Footer from "./Layout/Footer";
import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <div className="container mt-4">
              <div className="sticky-top my-3">
                <MapParent />
              </div>
              <h1 className="d-none d-lg-inline">Discover Trails Near You</h1>
              <h3 className="d-lg-none">Discover Trails Near You</h3>
              <GeocodeContainer />
              <TrailResults />
            </div>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
