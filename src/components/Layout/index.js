import React, { useState } from "react";
import { CustomNavbar } from "../CustomNavbar";
import { Sidebar } from "../Sidebar";

export const Layout = ({ children, module, sidebarItems, centerlogohide }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };


  return (
    <div className="container-fluid">
      {module && (
        <Sidebar sidebarItems={sidebarItems} />
      )}
      {module ? (
        <main className="dashboard-app" style={{ marginLeft: "220px" }}>
          <CustomNavbar toggleSidebar={toggleSidebar} module={module} centerlogohide={centerlogohide} />
          <div className='dashboard-content'>
            <div className="container-fluid">
              {children}
            </div>
          </div>
        </main>
      ) : (

        <main>
          <CustomNavbar toggleSidebar={toggleSidebar} />
          <div className='dashboard-content'>
            <div className="container-fluid">
              {children}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};