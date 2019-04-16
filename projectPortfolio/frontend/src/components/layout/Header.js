import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { getProjects } from "../../actions/projects";

export class Header extends Component {
  static propTypes = {
    // auth: PropTypes.object.isRequired,
    // logout: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    getProjects: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    // const { isAuthenticated, user } = this.props.auth;

    // const authLinks = (
    //   <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
    //     <span className="navbar-text mr-3">
    //       <strong>{user ? `Welcome ${user.username}` : ""}</strong>
    //     </span>
    //     <li className="nav-item">
    //       <button
    //         onClick={this.props.logout}
    //         className="nav-link btn btn-info btn-sm text-light"
    //       >
    //         Logout
    //       </button>
    //     </li>
    //   </ul>
    // );

    // const guestLinks = (
    //   <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
    //     <li className="nav-item">
    //       <Link to="/register" className="nav-link">
    //         Register
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link to="/login" className="nav-link">
    //         Login
    //       </Link>
    //     </li>
    //   </ul>
    // );

    const navLinks = (
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <NavLink className="nav-link active text-secondary" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle text-secondary"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Projects
          </a>
          <div className="dropdown-menu">
            {this.props.projects.map(project => (
              <NavLink
                key={project.id}
                className="dropdown-item text-secondary"
                to={`/api/projects/${project.id}`}
              >
                {project.name}
              </NavLink>
            ))}
          </div>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-secondary" to="/">
            About
          </NavLink>
        </li>
      </ul>
    );

    return (
      <div className="jumbotron">
        <div className="container">
          <a className="text-decoration-none" href="/">
            <h2 className="text-primary font-weight-bold">Bryan Murphy</h2>
          </a>
          <p className="lead">Software Engineer</p>
          <hr className="my-2" />
          {navLinks}
        </div>
        {/* {isAuthenticated ? authLinks : guestLinks} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // auth: state.authReducer,
  projects: state.projectReducer.projects
});

export default connect(
  mapStateToProps,
  // { logout },
  { getProjects }
)(Header);
