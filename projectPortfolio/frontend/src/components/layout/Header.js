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
          <NavLink
            className="nav-link text-secondary"
            // activeClassName="active"
            to="/"
          >
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

    const socialButtons = (
      <div className="float-right">
        <a
          target="_blank"
          href="https://www.linkedin.com/in/bryan-murphy-664020a0/"
          role="button"
          className="btn btn-primary mx-2"
        >
          <i className="fab fa-linkedin-in" />
        </a>
        <a
          target="_blank"
          href="https://github.com/murphyb2"
          role="button"
          className="btn btn-secondary mx-2"
        >
          <i className="fab fa-github" />
        </a>

        <a
          target="_blank"
          href="https://www.instagram.com/thecrimsonnchin/"
          role="button"
          className="btn btn-success mx-2"
        >
          <i className="fab fa-instagram" />
        </a>
      </div>
    );

    return (
      <div className="jumbotron">
        <div className="container">
          <a className="text-decoration-none" href="/">
            <h2 className="text-primary font-weight-bold">Bryan Murphy</h2>
          </a>
          {socialButtons}
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
