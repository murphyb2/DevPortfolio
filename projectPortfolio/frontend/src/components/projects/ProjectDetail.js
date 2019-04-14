import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjectDetail } from "../../actions/projects";

export class ProjectDetail extends Component {
  static propTypes = {
    project: PropTypes.any.isRequired,
    getProjectDetail: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.getProjectDetail(params.id);
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          {/* <div className="align-items-center mt-3"> */}
          {/* {this.props.project.map(project => ( */}
          {/* <div key={project.id} className="col w-auto my-3"> */}
          <div className="card">
            {/* <Link to={`/api/projects/${project.id}`}> */}
            <img
              src={this.props.project.cover_image}
              className="card-img-top"
              alt=""
            />
            {/* </Link> */}
            <div className="card-body">
              <h5 className="card-title">{this.props.project.name}</h5>
              {/* <p className="card-text">{project.description}</p> */}
            </div>
          </div>
          {/* </div> */}
          {/* ))} */}
          {/* </div> */}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  project: state.projectReducer.projects
});

export default connect(
  mapStateToProps,
  { getProjectDetail }
)(ProjectDetail);
