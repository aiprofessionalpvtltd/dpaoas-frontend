import React, { useEffect, useState } from "react";
import { CustomNavbar } from "../CustomNavbar";
import { Sidebar } from "../Sidebar";
import { useLocation } from "react-router";
import {
  getAllMotion,
  getAllQuestion,
  getAllResolutions,
} from "../../api/APIs";

export const Layout = ({ children, module, sidebarItems, centerlogohide }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [count, setCount] = useState({
    motion: null,
    question: null,
    resolution: null,
  });
  const location = useLocation();

  const basePathNotice = location.pathname.substring(
    0,
    location.pathname.lastIndexOf("/notice") + 7,
  );
  const basePathMotion = location.pathname.substring(
    0,
    location.pathname.indexOf("/mms") + 4,
  );
  const basePathQuestion = location.pathname.substring(
    0,
    location.pathname.lastIndexOf("/qms") + 4,
  );

  const shouldRenderNotice = basePathNotice === "/notice";
  const shouldRenderMotion = basePathMotion === "/mms";
  const shouldRenderQuestion = basePathQuestion === "/qms";

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
        setCount((prevCount) => ({
          ...prevCount,
          resolution: response?.data?.count,
        }));
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
      })
      .catch((error) => {
        // Handle error
      });
  }, [shouldRenderNotice, shouldRenderQuestion, shouldRenderMotion]);

  return (
    <>
      <div className="container-fluid">
        {module && <Sidebar sidebarItems={sidebarItems} />}
        {module ? (
          <>
            <main className="dashboard-app" style={{ marginLeft: "220px" }}>
              <CustomNavbar
                toggleSidebar={toggleSidebar}
                module={module}
                centerlogohide={centerlogohide}
              />
              <div className="dashboard-content">
                {shouldRenderNotice ? (
                  <>
                    <div class="tab-right me-4 mt-1 mb-4">
                      <a href={"/notice/motion/sent"}>
                        <button>
                          Motion{count?.motion && <span>{count.motion}</span>}
                        </button>
                      </a>
                      <a href={"/notice/resolution/sent"}>
                        <button>
                          Resolution
                          {count?.resolution && <span>{count.resolution}</span>}
                        </button>
                      </a>
                      <a href={"/notice/question/sent"}>
                        <button>
                          Questions
                          {count?.question && <span>{count.question}</span>}
                        </button>
                      </a>
                    </div>
                    <div class="clearfix"></div>
                  </>
                ) : shouldRenderMotion ? (
                  <>
                    <div
                      class="tab-right me-4 mt-1 mb-4"
                      style={{ width: "310px" }}
                    >
                      <button>
                        Translations
                        {count?.question && <span>{count?.question}</span>}
                      </button>
                      <a href={"/mms/motion/list"}>
                        <button>
                          Notice Motions
                          {count?.motion && <span>{count.motion}</span>}
                        </button>
                      </a>
                    </div>
                    <div class="clearfix"></div>
                  </>
                ) : (
                  shouldRenderQuestion && (
                    <>
                      <div
                        class="tab-right me-4 mt-1 mb-4"
                        style={{ width: "528px" }}
                      >
                        <button>
                          Translations
                          {count?.motion && <span>{count?.motion}</span>}
                        </button>
                        <a href={"/qms/resolution/list"}>
                          <button>
                            Notice Resolutions
                            {count?.resolution && (
                              <span>{count.resolution}</span>
                            )}
                          </button>
                        </a>
                        <a href={"/qms/question/list"}>
                          <button>
                            Notice Questions
                            {count?.question && <span>{count.question}</span>}
                          </button>
                        </a>
                      </div>
                      <div class="clearfix"></div>
                    </>
                  )
                )}
                <div className="container-fluid">{children}</div>
              </div>
            </main>
          </>
        ) : (
          <>
            <main>
              <CustomNavbar toggleSidebar={toggleSidebar} />
              <div className="dashboard-content">
                <div className="container-fluid">{children}</div>
              </div>
            </main>
          </>
        )}
      </div>
      <div class="footer">© Copyright AI Professionals</div>
    </>
  );
};
