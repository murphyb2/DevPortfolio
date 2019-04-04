import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
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
        <div>
          <h2>Projects</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>URL</th>
                <th>Description</th>
                <th>Thumbnail</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.projects.map(project => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.url}</td>
                  <td>{project.description}</td>
                  <td>
                    {/* <img src={project.cover_image} alt="Thumbnail" /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {this.props.projects.map(project => (
            <div key={project.id} className="card mb-3">
              <img src={project.cover_image} className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.description}</p>
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
