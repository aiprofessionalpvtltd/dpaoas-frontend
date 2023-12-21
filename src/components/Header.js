import React from "react";
function Header({ dashboardLink, addLink1, addLink2, title1, title2 }) {
  return (
    <div className="bredcrumb-container">
      <div className="bredcrumb">
        <ul className="breadcrumb">
          <li>
            <a href={dashboardLink}>Dashboard</a>
          </li>
          {addLink2 && title2 ? (
            <li>
              <a href={addLink1}>{title1}</a>
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
