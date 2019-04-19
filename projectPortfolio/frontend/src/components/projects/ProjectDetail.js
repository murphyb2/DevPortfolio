import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjectDetail } from "../../actions/projects";

export class ProjectDetail extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    getProjectDetail: PropTypes.func.isRequired
  };
  state = {
    prevID: 0
  };
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.getProjectDetail(params.id);
    this.state.prevID = params.id;
    // console.log("componentDidMount - prevID = " + this.state.prevID);
  }
  componentDidUpdate() {
    const {
      match: { params }
    } = this.props;
    // If we select another project from the dropdown menu in the nav bar, make sure the project id is not the same as
    // the current ID so we dont continuously hit the server with requests
    if (this.state.prevID !== params.id) {
      this.props.getProjectDetail(params.id);
      this.state.prevID = params.id;
      // console.log("componentDidUpdate - prevID = " + this.state.prevID);
    }
  }

  render() {
    const {
      name,
      cover_image,
      description,
      inProgress,
      url
    } = this.props.project;
    return (
      <Fragment>
        <div className="row">
          <div className="col">
            {/* Title line row */}
            <div className="row">
              <div className="col">
                <h1>{name}</h1>
              </div>
            </div>

            {/* One column. Image to left. Links and description to right. */}
            <div className="container">
              <div className="row">
                {/* Left Column with image */}
                <div className="col">
                  <img src={cover_image} className="img-fluid" alt="" />
                </div>
                {/* Right column. Link on top. Description below. */}
                <div className="col">
                  {/* If In Progress, two columns with badge to left, link to right
                  Otherwise just one column with link */}
                  <div className="row justify-content-center">
                    <div className="col">
                      <a
                        className="btn btn-primary"
                        href={url}
                        target="_blank"
                        role="button"
                      >
                        Visit Site
                      </a>
                    </div>
                  </div>

                  <div className="row">
                    <p>
                      {inProgress > 0 && (
                        <span className="badge badge-secondary m-3">
                          In Progress
                        </span>
                      )}
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  project: state.projectReducer.projectDetail
});

export default connect(
  mapStateToProps,
  { getProjectDetail }
)(ProjectDetail);
