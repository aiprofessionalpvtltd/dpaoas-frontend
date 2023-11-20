import React from "react";
import Logo from "../../assets/logo.png"
import Profile from "../../assets/profile-img.jpg"

export const CustomNavbar = ({ toggleSidebar, module }) => {
  return (
    <header class='dashboard-toolbar' style={{ marginLeft: module ? "260px" : "0px" }}>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="user-box dropdown px-3 float-end">
          <a
            class="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
            href="/"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={Profile}
              class="user-img"
              alt="user avatar"
            />
            <div class="user-info">
              <p class="user-name mb-0">Muhammad</p>
              <p class="designattion mb-0">Director</p>
            </div>
          </a>
          <div class="clearfix"></div>
          <ul class="dropdown-menu">
            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                href="/"
              >
                <i class="bx bx-user fs-5"></i>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                href="/"
              >
                <i class="bx bx-cog fs-5"></i>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="clearfix"></div>
      <div class="circle">
        <img src={Logo} alt="" srcset="" />
      </div>
    </header>
  );
};
