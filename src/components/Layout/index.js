import React, { useState } from "react";
import { CustomNavbar } from "../CustomNavbar";
import { Sidebar } from "../Sidebar";

export const Layout = ({ children, module, sidebarItems }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };


  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          {module && (
            <Sidebar sidebarItems={sidebarItems} />
          )}
          {module ? (
            <main className={`col-lg-${sidebarVisible ? 9 : 12} ms-sm-auto col-lg-${sidebarVisible ? 10 : 12} px-md-0`}>
              <CustomNavbar toggleSidebar={toggleSidebar} module={module} />
              <div className='dashboard-content'>
                {children}
              </div>
            </main>
          ) : (

            <main>
              <CustomNavbar toggleSidebar={toggleSidebar} />
              <div className='dashboard-content'>
                {children}
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
};