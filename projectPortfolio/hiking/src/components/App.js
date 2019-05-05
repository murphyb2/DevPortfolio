import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import MapParent from "./MapComponents/MapParent";
import GeocodeContainer from "./MapComponents/GeocodeContainer";
import TrailResults from "./Trails/TrailResults";

import Footer from "./Layout/Footer";
import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    const containerStyles = {
      position: "sticky",
      top: "0",
      zIndex: "2"
    };
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <div className="sticky-top">
              <MapParent />
            </div>
            <div className="container">
              <h1>Discover Hiking Near You</h1>
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
