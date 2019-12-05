import React from "react";
import { NavLink, Link } from "react-router-dom";

const navBarStyle = {
  backgroundColor: "#90bb5f"
};

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={navBarStyle}>
      {!user && (
        <Link className="navbar-brand" to="/register">
          <img
            src={require("../CourseCorrectLogo.png")}
            height="90"
            width="90"
            alt="Course Correct"
          />
        </Link>
      )}
      {user && (
        <Link className="navbar-brand" to="/home">
          <img
            src={require("../CourseCorrectLogo.png")}
            height="90"
            width="90"
            alt="Course Correct"
          />
        </Link>
      )}
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav mr-auto">
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/courses">
                Registration
              </NavLink>
              <NavLink className="nav-item nav-link" to="/courses">
                Grades
              </NavLink>
              <NavLink className="nav-item nav-link" to="/courses">
                Transcript
              </NavLink>
              <NavLink className="nav-item nav-link" to="/courses">
                Payments
              </NavLink>
              <NavLink className="nav-item nav-link" to="/courses">
                Graduation
              </NavLink>
            </React.Fragment>
          )}
        </div>
        <div className="navbar-nav ml-auto">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
