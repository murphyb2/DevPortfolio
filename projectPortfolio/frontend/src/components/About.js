import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAbout } from "../actions/about";

export class About extends Component {
  static propTypes = {
    about: PropTypes.object.isRequired,
    getAbout: PropTypes.func.isRequired
  };

  componentDidMount() {
    // Argument is 1 so that we can make a request that will
    // only return the single About object with a primary key of 1
    this.props.getAbout(1);
  }
  render() {
    const { description, prof_pic } = this.props.about;
    return (
      <Fragment>
        <div>About</div>
        <img src={prof_pic} />
        <div>{description}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  about: state.aboutReducer.aboutContent
});

export default connect(
  mapStateToProps,
  { getAbout }
)(About);
