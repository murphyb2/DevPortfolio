import React, { Component } from "react";
import PropTypes from "prop-types";

import { Map, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  static propTypes = {
    userLocation: PropTypes.array.isRequired
  };

  componentDidMount() {
    console.log(
      "Location from parent: " +
        this.props.userLocation[0] +
        ", " +
        this.props.userLocation[1]
    );
  }
  render() {
    const mapStyles = {
      height: "33vh",
      width: "100vw"
    };

    return (
      // Need to put map styles here so it the map's container is not 0 height
      <div style={mapStyles}>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{
            lat: this.props.userLocation[0],
            lng: this.props.userLocation[1]
          }}
          center={{
            lat: this.props.userLocation[0],
            lng: this.props.userLocation[1]
          }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDJmck0cGFO7NBL1YV2bUkYyCetBlOp1-Y"
})(MapContainer);
