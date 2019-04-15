import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.username}` : ""}</strong>
        </span>
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-info btn-sm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        {/* <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li> */}
      </ul>
    );

    const navLinks = (
      <ul className="nav text-secondary justify-content-center">
        <li className="nav-item">
          <a className="nav-link active" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
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
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
