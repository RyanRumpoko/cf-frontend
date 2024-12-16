import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const checkToken = localStorage.getItem("jwtToken");
  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("threadId");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">TODO LIST</span>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"></li>
          </ul>
          <a className="nav-link me-4" href="/#/">
            HOME
          </a>
          <a className="nav-link me-4" href="/#/todo">
            TO-DO
          </a>
          {path !== "/login" && path !== "/register" && checkToken && (
            <button className="btn btn-outline-dark" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
