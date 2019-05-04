import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUserLocation } from "../actions/trails";

import Geocode from "react-geocode";

export class GeocodeContainer extends Component {
  static propTypes = {
    userLocation: PropTypes.array.isRequired,
    updateUserLocation: PropTypes.func.isRequired
  };
  componentDidMount() {}

  state = {
    address: ""
  };

  onSubmit = e => {
    e.preventDefault();

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyDJmck0cGFO7NBL1YV2bUkYyCetBlOp1-Y");
    Geocode.enableDebug();
    // Get latidude & longitude from address.
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        // Update search box with formatted address
        this.setState({ address: response.results[0].formatted_address });
        // Update redux state with latitude and logitude so map can re render
        var location = [lat, lng];
        this.props.updateUserLocation(location);
      },
      error => {
        console.error(error);
      }
    );
  };

  // Update local state with typed address
  onChange = e => this.setState({ address: e.target.value });

  render() {
    return (
      <form style={{ display: "flex" }} onSubmit={this.onSubmit}>
        <input
          type="text"
          name="address"
          style={{ flex: "10", padding: "5px", zIndex: "1" }} // Need zIndex so textbox renders on top and allows typing
          placeholder="Enter address, zip code, city or state..."
          value={this.state.address}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ flex: "1", zIndex: "1" }} // Need zIndex so submit button renders on top and allows click
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  userLocation: state.trailsReducer.userLocation
});

export default connect(
  mapStateToProps,
  { updateUserLocation }
)(GeocodeContainer);
