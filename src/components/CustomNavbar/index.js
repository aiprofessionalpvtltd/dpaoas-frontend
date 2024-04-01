import React from "react";
import Logo from "../../assets/logo.png";
import Profile from "../../assets/profile-img.jpg";
import { Dropdown } from "react-bootstrap";
import { getUserData, logout } from "../../api/Auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EFilingNotifications } from "../NotificationsHeaders/EFilingNotifications";

export const CustomNavbar = ({ module, centerlogohide, navItems }) => {
  const navigation = useNavigate();
  const userData = getUserData();
  const location = useLocation();
  const basePathEFiling = location.pathname.substring(0, location.pathname.lastIndexOf("/efiling") + 8);
  const shouldRenderEfiling = basePathEFiling === "/efiling";

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
              {shouldRenderEfiling ? (
              <>
              {navItems &&
                navItems?.map((item) => (
                  <>
                    {item?.subItems ? (
                      <li class="nav-item">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="default"
                            id="about-dropdown"
                            style={{ fontWeight: "bold", color: item.subItems.some(subItem => location.pathname === subItem.link) ? "#fff" : "#000", backgroundColor: item.subItems.some(subItem => location.pathname === subItem.link) ? "#14ae5c" : ""  }}
                          >
                            {item?.itemName}{" "}
                            <FontAwesomeIcon
                              icon={faSortDown}
                              style={{
                                fontSize: "20px",
                                color: item.subItems.some(subItem => location.pathname === subItem.link) ? "#fff" : "#000",
                                marginBottom: "1px",
                              }}
                            />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {item?.subItems.map((subItem) => (
                              <Link
                                style={{ fontWeight: "bold", color: location.pathname === subItem?.link ? "#fff" : "#000", backgroundColor: location.pathname === subItem?.link ? "#14ae5c" : "" }}
                                to={subItem?.link}
                                className="dropdown-item"
                                key={subItem?.itemName}
                              >
                                {subItem?.itemName}
                              </Link>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    ) : (
                      <li class="nav-item">
                        <Link
                          style={{ fontWeight: "bold", color: location.pathname === item?.link ? "#fff" : "#000", backgroundColor: location.pathname === item?.link ? "#14ae5c" : "", borderRadius: 5, paddingRight: 10, paddingLeft: 10 }}
                          class="nav-link"
                          aria-current="page"
                          to={item?.link}
                        >
                          {item?.itemName}
                        </Link>
                      </li>
                    )}
                  </>
                ))}
              </>
              ) : (
                <li class="nav-item">
                  <Link
                    style={{ fontWeight: "bold", color: "#000000" }}
                    class="nav-link"
                    aria-current="page"
                    to={'/'}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

      <EFilingNotifications notificationType="Notifications" />

        <Dropdown className="user-box dropdown px-3 float-end">
          <Dropdown.Toggle
            as="a"
            className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
            // href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* <img src={Profile} className="user-img" alt="user avatar" /> */}
            <div className="user-info">
              <p className="user-name mb-0">
                {userData && `${userData?.firstName} ${userData?.lastName}`}
              </p>
              <p className="designation mb-0">
                {userData &&
                  `${userData?.designation?.designationName} ${userData?.branch?.branchName}`}
              </p>
            </div>
          </Dropdown.Toggle>
          <div className="clearfix"></div>
          <Dropdown.Menu>
            <Dropdown.Item
              style={{ border: "none" }}
              onClick={async (e) => {
                e.preventDefault();
                await logout();
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
