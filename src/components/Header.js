import React from "react";
import { Link } from "react-router-dom";
function Header({ dashboardLink, addLink1, addLink2, title1, title2, width, marginTop }) {
  return (
    <div className="bredcrumb-container" style={{ width: width ? width : "500px", marginTop: marginTop ? marginTop : "25px" }}>
      <div className="bredcrumb">
        <ul className="breadcrumb">
          <li>
            <Link to={dashboardLink}>Dashboard</Link>
          </li>
          {addLink2 && title2 ? (
            <li>
              <Link to={addLink1}>{title1}</Link>
            </li>
          ) : (
            <li>
              <span>{title1}</span>
            </li>
          )}
          {addLink2 && title2 && (
            <li>
              <span>{title2}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
