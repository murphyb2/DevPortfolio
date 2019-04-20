import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
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
                <NavLink to={`/projects/${project.id}`}>
                  <img
                    src={project.cover_image}
                    className="card-img-top"
                    alt=""
                  />
                </NavLink>
                <div className="card-body mx-auto">
                  <NavLink
                    key={project.id}
                    className="btn btn-success mx-2 d-inline"
                    role="button"
                    to={`/projects/${project.id}`}
                  >
                    Details
                  </NavLink>
                  <a
                    className="btn btn-primary d-none d-lg-inline"
                    href={project.url}
                    target="_blank"
                    role="button"
                  >
                    Visit Site
                  </a>
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
