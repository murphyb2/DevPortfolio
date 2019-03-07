import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProject } from "../../actions/projects";

export class Form extends Component {
  state = {
    name: "",
    url: "",
    description: ""
  };

  static propTypes = {
    addProject: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { name, url, description } = this.state;
    const project = { name, url, description };
    this.props.addProject(project);
    this.setState({
      name: "",
      url: "",
      description: ""
    });
  };

  render() {
    const { name, url, description } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Project</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>URL</label>
            <input
              className="form-control"
              type="url"
              name="url"
              onChange={this.onChange}
              value={url}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              onChange={this.onChange}
              value={description}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addProject }
)(Form);
