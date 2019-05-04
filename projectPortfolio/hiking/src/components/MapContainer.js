import React, { Component, Fragment } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
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
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 35.7796,
            lng: -78.6382
          }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDJmck0cGFO7NBL1YV2bUkYyCetBlOp1-Y"
})(MapContainer);
