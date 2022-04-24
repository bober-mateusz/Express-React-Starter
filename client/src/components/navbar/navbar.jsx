import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">Navbar</a>
        <ul className="navbar-nav mr-auto">
          <Link to="/register">
            <li className="nav-item">
              <span className="nav-link">Register</span>
            </li>
          </Link>
          <li className="nav-item">
            <Link to="/login">
              <span className="nav-link">Login</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Navbar;
