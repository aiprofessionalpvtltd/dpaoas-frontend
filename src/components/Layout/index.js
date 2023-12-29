import React, { useEffect, useRef, useState } from "react";
import { CustomNavbar } from "../CustomNavbar";
import { Sidebar } from "../Sidebar";
import { useLocation } from "react-router";
import {
  getAllQuestion,
  getAllResolutions,
} from "../../api/APIs";
import { getAuthToken, logout } from "../../api/Auth";
import { useNavigate } from "react-router-dom";

export const Layout = ({ children, module, sidebarItems, centerlogohide }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [modal, setModal] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [activeNotificationType, setActiveNotificationType] = useState(null);
  const notificationRef = useRef();

  const openNotificationModal = (notificationType) => {
    if (modal && activeNotificationType === notificationType) {
      // If yes, close the modal
      setModal(false);
      setActiveNotificationType(null);
    } else {
      // Logic to set notification data based on notificationType
      let data = null;
      if (notificationType === 'Resolution') {
        data = [{name: "Resolution"}, {name: "Resolution2"}];
      } else if (notificationType === 'Translations') {
        data = [{name: "Translations"}, {name: "Translations2"}];
      } else if (notificationType === 'Motion') {
        data = [{name: "Motion"}, {name: "Motion2"}];
      } else if (notificationType === 'Questions') {
        data = [{name: "Question"}, {name: "Question2"}];
      }

      // Set the notification data
      setNotificationData(data);

      // Set the active notification type
      setActiveNotificationType(notificationType);

      // Open the modal
      setModal(true);
    }
  };

  const handleButtonClick = (notificationType) => {
    // Handle the button click and open the notification modal
    openNotificationModal(notificationType);
  };

  const handleCloseModal = () => {
    setModal(false);
    setActiveNotificationType(null);
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!notificationRef?.current?.contains(e.target)) {
        console.log("This one gets called because of the button click", e);
        handleCloseModal();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleOutsideClick, false);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleOutsideClick, false);
    };
  });

  const navigation = useNavigate();
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

  useEffect(() => {
    const token = getAuthToken();
    if (token === undefined || token === null) {
      logout();
      navigation("/login");
    }
  }, []);

  const notificationModal = () => (
    <div
      ref={notificationRef}
      style={{
        position: 'absolute',
        top: '98px', // Adjust the distance from the buttons
        right: '3%',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        borderRadius: '8px',
        width: '380px', // Adjust the width as needed
        zIndex: 999, // Ensure it's above other elements
      }}
    >
      {notificationData.map((item, index) => (
        <ul key={index}>
          <li>
            <span>
              {item.name}
              <br />
              <span className="text-sm">
                <i>25/10/2023</i>
              </span>
              <span className="float-end text-sm">10:25pm</span>
            </span>
          </li>
        </ul>
      ))}
    </div>
  );

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
                        <button onClick={() => handleButtonClick("Motion")}>
                          Motion{count?.motion && <span>{count.motion}</span>}
                        </button>
                        <button onClick={() => handleButtonClick("Resolution")}>
                          Resolution
                          {count?.resolution && <span>{count.resolution}</span>}
                        </button>
                        <button onClick={() => handleButtonClick("Questions")}>
                          Questions
                          {count?.question && <span>{count.question}</span>}
                        </button>
                    </div>
                    <div class="clearfix"></div>
                  </>
                ) : shouldRenderMotion ? (
                  <>
                    <div class="tab-right me-4 mt-1 mb-4">
                      <button onClick={() => handleButtonClick("Translations")}>
                        Translations
                        {count?.question && <span>{count?.question}</span>}
                      </button>
                      <button onClick={() => handleButtonClick("Motion")}>
                        Notice Motions
                        {count?.motion && <span>{count.motion}</span>}
                      </button>
                    </div>
                    <div class="clearfix"></div>
                  </>
                ) : (
                  shouldRenderQuestion && (
                    <>
                      <div class="tab-right me-4 mt-1 mb-4">
                        <button onClick={() => handleButtonClick("Translations")}>
                          Translations
                          {count?.motion && <span>{count?.motion}</span>}
                        </button>
                        <button onClick={() => handleButtonClick("Resolution")}>
                          Notice Resolutions
                          {count?.resolution && (
                            <span>{count.resolution}</span>
                          )}
                        </button>
                        <button onClick={() => handleButtonClick("Questions")}>
                          Notice Questions
                          {count?.question && <span>{count.question}</span>}
                        </button>
                      </div>
                      <div class="clearfix"></div>
                    </>
                  )
                )}
                {modal && notificationModal()}
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
