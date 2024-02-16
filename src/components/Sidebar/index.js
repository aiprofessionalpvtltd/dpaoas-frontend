import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import { logout } from "../../api/Auth";

export const Sidebar = ({ sidebarItems }) => {
  const location = useLocation();
  const basePath = location.pathname.substring(
    0,
    location.pathname.lastIndexOf("/")
  ); // For dropdowns
  const navigation = useNavigate();

  // Create an object to store the state for each dropdown
  const [dropdownStates, setDropdownStates] = useState({});

  // Create a toggle function to handle all dropdowns
  const toggleDropdown = (dropdownKey) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [dropdownKey]: !prevStates[dropdownKey],
    }));
  };

  return (
    <nav id="sidebar" className="dashboard-nav" style={{ width: "240px" }}>
      <header>
        <Link to="/" className="menu-toggle">
          <i className="fas fa-bars"></i>
        </Link>
        <Link to="/" className="brand-logo mt-3">
          <img src={Logo} alt="" srcSet="" />
        </Link>
      </header>
      <nav className="dashboard-nav-list">
        {sidebarItems &&
          sidebarItems.map((item, index) => (
            <React.Fragment key={index}>
              {item?.subItems ? (
                <Dropdown
                  show={dropdownStates[index]}
                  onToggle={() => toggleDropdown(index)}
                >
                  <Dropdown.Toggle
                    className={`dashboard-nav-item dashboard-nav-dropdown-toggle ${
                      basePath === item.link ? "active" : ""
                    }`}
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: 0,
                      border: "none",
                      color: "#666",
                      hover: { color: "white" },
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} size="lg" width={24} />
                    <span
                      style={{
                        color: basePath === item.link ? "#fff" : "#666",
                        background: "none",
                      }}
                      className="text"
                    >
                      {item.itemName}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dashboard-nav-dropdown-menu">
                    {item.subItems.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <Link
                          className={`dashboard-nav-dropdown-item ${
                            location.pathname === sub.link ? "active" : ""
                          }`}
                          to={sub.link}
                          target={sub?.target}
                          style={{ width: "100%", display: "block" }} // Set width to 100%
                        >
                          <FontAwesomeIcon
                            icon={sub.icon}
                            size="lg"
                            width={24}
                            style={{ marginRight: 10 }}
                          />
                          {sub.itemName}
                        </Link>
                      </div>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link
                  to={item.link}
                  className={`dashboard-nav-item ${
                    location.pathname === item.link ? "active" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} size="lg" width={24} />
                  <span className="text">{item.itemName}</span>
                </Link>
              )}
            </React.Fragment>
          ))}

        <div className="nav-item-divider"></div>
        <Link
          to="/"
          className="dashboard-nav-item"
          onClick={(e) => {
            e.preventDefault();
            logout();
            navigation("/login");
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" width={24} />
          <span className="text">Logout</span>
        </Link>
      </nav>
    </nav>
  );
};
