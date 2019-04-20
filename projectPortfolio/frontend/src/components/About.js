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
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                {/* Smaller text for smaller screens */}
                <h1 className="d-none d-lg-block">About</h1>
                <h3 className="d-lg-none">About</h3>
                <div className="row">
                  <div className="col-1" />
                  <div className="col-5">
                    <img src={prof_pic} className="img-fluid" alt="" />
                  </div>
                  <div className="col-5">
                    <div>{description}</div>
                  </div>
                </div>
                <div className="col-1" />
                {/* <div className="row">
                  
                </div> */}
              </div>
            </div>
          </div>
        </div>
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
