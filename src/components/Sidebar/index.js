import React from "react";
// import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from "react-router-dom";

export const Sidebar = ({ sidebarItems }) => {
  const location = useLocation();

  return (
    <nav
      id="sidebar"
      className="dashboard-nav"
      style={{ width: "240px" }}
    >
      <header>
        <a href="/" className="menu-toggle">
          <i className="fas fa-bars"></i>
        </a>
        <a href="/" className="brand-logo mt-3">
          <img src={Logo} alt="" srcSet="" />
        </a>
      </header>
      <nav className="dashboard-nav-list">
        {sidebarItems && sidebarItems.map(item => (

          <a href={item.link} className={`${location.pathname === item.link ? "dashboard-nav-item active" : "dashboard-nav-item"}`}>
            <FontAwesomeIcon icon={item.icon} size="lg" width={24} />
            <span className="text">{item.itemName}</span>
          </a>
        ))}


        <div className="nav-item-divider"></div>
        {/* <a href="dashboard.html" className="dashboard-nav-item">
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" width={24} />
          <span className="text">Logout</span>
        </a> */}
      </nav>
    </nav>
  );
};
