import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProjects } from "../../actions/projects";

export class Projects extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    getProjects: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          {this.props.projects.map(project => (
            <div key={project.id} className="col w-auto my-3">
              <div className="card">
                <Link to={`/api/projects/${project.id}`}>
                  <img
                    src={project.cover_image}
                    className="card-img-top"
                    alt=""
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                  {/* <p className="card-text">{project.description}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projectReducer.projects
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Projects);
