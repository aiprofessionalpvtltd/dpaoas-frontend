import React from "react";

export const QuickLinks = () => {
  return (
    <div class="col">
      <div class="quick-links mb-4">
        <ul class="navbar-nav navbar-nav-highlight ml-md-auto">
          <p>Quick Links:</p>
          <li class="nav-item nav-item-levels mega-menu-full">
            <a href="/" class="navbar-nav-link">
              Dashboard
            </a>
          </li>
          <li class="nav-item nav-item-levels mega-menu-full">
            <a href="/" class="navbar-nav-link">
              E-filling
            </a>
          </li>
          <li class="nav-item nav-item-levels mega-menu-full">
            <a href="/" class="navbar-nav-link">
              Senators
            </a>
          </li>
          <li class="nav-item nav-item-levels mega-menu-full">
            <a href="/" class="navbar-nav-link">
              Contacts
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
