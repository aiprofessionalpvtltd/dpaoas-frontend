import React from "react";
import Logo from "../../assets/logo.png";
import Profile from "../../assets/profile-img.jpg";
import { Dropdown } from "react-bootstrap";
import { logout } from "../../api/Auth";
import { Link, useNavigate } from "react-router-dom";

export const CustomNavbar = ({ toggleSidebar, module, centerlogohide }) => {
  const navigation = useNavigate();
  return (
    <header
      class="dashboard-toolbar"
      style={{
        marginLeft: module ? "240px" : "0px",
        top: centerlogohide ? "0px" : "22px",
      }}
    >
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link
                  style={{ fontWeight: "bold" }}
                  class="nav-link"
                  aria-current="page"
                  to="/"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Dropdown className="user-box dropdown px-3 float-end">
          <Dropdown.Toggle
            as="a"
            className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={Profile} className="user-img" alt="user avatar" />
            <div className="user-info">
              <p className="user-name mb-0">Muhammad</p>
              <p className="designation mb-0">Director</p>
            </div>
          </Dropdown.Toggle>
          <div className="clearfix"></div>
          <Dropdown.Menu>
            <Dropdown.Item
              style={{ border: "none" }}
              onClick={() => {
                logout();
                navigation("/login");
              }}
            >
              <i className="bx bx-user fs-5"></i>
              <span>Logout</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>

      <div class="clearfix"></div>
      {!centerlogohide && !centerlogohide && (
        <div class="circle">
          <img src={Logo} alt="" srcSet="" />
        </div>
      )}
    </header>
  );
};
