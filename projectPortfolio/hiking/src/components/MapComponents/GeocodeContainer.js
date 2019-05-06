import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUserOptions } from "../../actions/trails";

import Geocode from "react-geocode";

export class GeocodeContainer extends Component {
  static propTypes = {
    userLocation: PropTypes.array.isRequired,
    updateUserOptions: PropTypes.func.isRequired,
    maxResults: PropTypes.number.isRequired,
    maxDistance: PropTypes.number.isRequired
  };

  state = {
    address: "",
    localMaxDistance: this.props.maxDistance,
    localMaxResults: this.props.maxResults
  };

  onSubmit = e => {
    const { localMaxDistance, localMaxResults } = this.state;
    e.preventDefault();

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyDJmck0cGFO7NBL1YV2bUkYyCetBlOp1-Y");
    // Geocode.enableDebug();
    // Get latidude & longitude from address.
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        // Update search box with formatted address
        this.setState({ address: response.results[0].formatted_address });

        var location = [lat, lng];
        var options = [location, localMaxDistance, localMaxResults];

        this.props.updateUserOptions(options);
      },
      error => {
        console.log(error);
      }
    );
  };

  // Update local state with typed address
  onChange = e => {
    this.setState({ address: e.target.value });
  };

  // Update max distance option
  setMaxDist = e => {
    e.preventDefault();
    this.setState({ localMaxDistance: Number(e.target.innerHTML) });
  };
  // Update max results option
  setMaxResults = e => {
    e.preventDefault();
    this.setState({ localMaxResults: Number(e.target.innerHTML) });
  };

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
        <div className="dropdown mt-2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Max Results:{" "}
            {this.state.localMaxResults ? this.state.localMaxResults : " "}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" onClick={this.setMaxResults}>
              10
            </a>
            <a className="dropdown-item" onClick={this.setMaxResults}>
              25
            </a>
            <a className="dropdown-item" onClick={this.setMaxResults}>
              50
            </a>
            <a className="dropdown-item" onClick={this.setMaxResults}>
              100
            </a>
          </div>
        </div>
        <div className="dropdown mt-2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Max Distance:{" "}
            {this.state.localMaxDistance > 0
              ? this.state.localMaxDistance
              : " "}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" onClick={this.setMaxDist}>
              10
            </a>
            <a className="dropdown-item" onClick={this.setMaxDist}>
              25
            </a>
            <a className="dropdown-item" onClick={this.setMaxDist}>
              50
            </a>
            <a className="dropdown-item" onClick={this.setMaxDist}>
              100
            </a>
          </div>
        </div>
        <input
          type="submit"
          value="Submit"
          className="btn btn-info mt-2"
          style={{ flex: "1", zIndex: "1" }} // Need zIndex so submit button renders on top and allows click
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  userLocation: state.trailsReducer.userLocation,
  maxResults: state.trailsReducer.maxResults,
  maxDistance: state.trailsReducer.maxDistance
});

export default connect(
  mapStateToProps,
  { updateUserOptions }
)(GeocodeContainer);
