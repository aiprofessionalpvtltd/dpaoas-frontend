import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from "react-router-dom";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";

export const Sidebar = ({ sidebarItems }) => {
  const location = useLocation();

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
        {sidebarItems && sidebarItems.map((item, index) => (
          <React.Fragment key={index}>
            {item?.subItems ? (
              <Dropdown show={dropdownStates[index]} onToggle={() => toggleDropdown(index)}>
                <Dropdown.Toggle className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                  <FontAwesomeIcon icon={item.icon} size="lg" width={24} />
                  <span className="text">{item.itemName}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className='dashboard-nav-dropdown-menu'>
                  {item.subItems.map((sub, subIndex) => (
                    <div key={subIndex} style={{ display: 'flex', flexDirection: 'row' }}>
                      <Dropdown.Item className="dashboard-nav-dropdown-item" href={sub.link}><FontAwesomeIcon icon={sub.icon} size="lg" width={24} style={{ marginRight: 10 }} />{sub.itemName}</Dropdown.Item>
                    </div>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <a href={item.link} className={`dashboard-nav-item ${location.pathname === item.link ? "active" : ""}`}>
                <FontAwesomeIcon icon={item.icon} size="lg" width={24} />
                <span className="text">{item.itemName}</span>
              </a>
            )}
          </React.Fragment>
        ))}


        <div className="nav-item-divider"></div>
        <a href="/login" className="dashboard-nav-item">
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" width={24} />
          <span className="text">Logout</span>
        </a>
      </nav>
    </nav>
  );
};
