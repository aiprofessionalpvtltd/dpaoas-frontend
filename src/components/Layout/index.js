import React, { useEffect, useState } from "react";
import { CustomNavbar } from "../CustomNavbar";
import { Sidebar } from "../Sidebar";
import { useLocation } from "react-router";
import { getAllMotion, getAllQuestion, getAllResolutions } from "../../api/APIs";

export const Layout = ({ children, module, sidebarItems, centerlogohide }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [count, setCount] = useState({
    motion: null,
    question: null,
    resolution: null,
  });
  const location = useLocation();
  const basePathNotice = location.pathname.substring(0, location.pathname.lastIndexOf("/notice") + 7);
  const basePathMotion = location.pathname.substring(0, location.pathname.indexOf('/mms') + 4);
  const basePathQuestion = location.pathname.substring(0, location.pathname.lastIndexOf("/qms") + 4);

  const shouldRenderNotice = basePathNotice.includes('/notice');
  const shouldRenderMotion = basePathMotion.includes('/mms');
  const shouldRenderQuestion = basePathQuestion.includes('/qms');

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // const getAllMotionsApi = async () => {
  //   try {
  //     const response = await getAllMotion(0, 4);
  //     if (response?.success) {
  //       setCount(response?.count);
  //     }
  //   } catch (error) {
  //   }
  // };

  const getAllQuestionsApi = async () => {
    try {
      const response = await getAllQuestion(0, 4);
      if (response?.success) {
        setCount((prevCount) => ({ ...prevCount, question: response?.count }));
      }
    } catch (error) {
      // Handle error
    }
  };

  const getAllResolutionsApi = async () => {
    try {
      const response = await getAllResolutions(0, 4);
      if (response?.success) {
        setCount((prevCount) => ({ ...prevCount, resolution: response?.data?.count }));
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    const apiRequests = [];

    if (shouldRenderNotice || shouldRenderQuestion || shouldRenderMotion) {
      apiRequests.push(getAllResolutionsApi());
      apiRequests.push(getAllQuestionsApi());
      // apiRequests.push(getAllMotionsApi());
    }

    // Execute all API requests concurrently
    Promise.all(apiRequests)
      .then(() => {
        // All requests are completed
        console.log("Requests completed");
      })
      .catch((error) => {
        // Handle error
      });
  }, [shouldRenderNotice, shouldRenderQuestion, shouldRenderMotion]);


  return (
    <div className="container-fluid">
      {module && (
        <Sidebar sidebarItems={sidebarItems} />
      )}
      {module ? (
        <main className="dashboard-app" style={{ marginLeft: "220px" }}>
          <CustomNavbar toggleSidebar={toggleSidebar} module={module} centerlogohide={centerlogohide} />
          <div className='dashboard-content'>
          {(shouldRenderNotice || shouldRenderMotion || shouldRenderQuestion) && (
            <>
          <div class="tab-right me-3 mt-1 mb-4">
                    <button>Motion{count?.motion && <span>{count.motion}</span>}</button>
                    <button>Resolution{count?.resolution && <span>{count.resolution}</span>}</button>
                    <button>Questions{count?.question && <span>{count.question}</span>}</button>
                </div>
                <div class="clearfix"></div>
                </>
          )}
            <div className="container-fluid">
              {children}
            </div>
          </div>
          <div class="footer">© Copyright AI Professionals</div>
        </main>
      ) : (
        <main>
          <CustomNavbar toggleSidebar={toggleSidebar} />
          <div className='dashboard-content'>
            <div className="container-fluid">
              {children}
            </div>
          </div>
          <div class="footer">© Copyright AI Professionals</div>
        </main>
      )}
    </div>
  );
};