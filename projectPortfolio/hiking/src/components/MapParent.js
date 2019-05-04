import React, { Component } from "react";
import { connect } from "react-redux";
import MapContainer from "./MapContainer";
import PropTypes from "prop-types";

export class MapParent extends Component {
  static propTypes = {
    userLocation: PropTypes.array.isRequired
  };
  render() {
    // Pass the user entered location to the map for rendering.
    // This separates connect with the Google Maps API and avoids
    // the need for exporting multiple wrappers in one component
    return <MapContainer userLocation={this.props.userLocation} />;
  }
}
const mapStateToProps = state => ({
  userLocation: state.trailsReducer.userLocation
});
export default connect(mapStateToProps)(MapParent);
