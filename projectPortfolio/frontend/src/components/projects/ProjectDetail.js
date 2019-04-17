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
    console.log("componentDidMount - prevID = " + this.state.prevID);
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
      console.log("componentDidUpdate - prevID = " + this.state.prevID);
    }
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="card">
            <img
              src={this.props.project.cover_image}
              className="card-img-top"
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title">{this.props.project.name}</h5>
              {/* <p className="card-text">{project.description}</p> */}
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
