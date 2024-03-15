import React, { useEffect, useRef, useState } from "react";
import { getEfilingNotifications } from "../../api/APIs/Services/efiling.service";
import { getUserData } from "../../api/Auth";
import moment from "moment";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export const EFilingNotifications = (notificationType) => {
  const [count, setCount] = useState(null);
  const [modal, setModal] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [activeNotificationType, setActiveNotificationType] = useState(null);
  const notificationRef = useRef();
  const UserData = getUserData();

  const getAllQuestionsApi = async () => {
    try {
      const response = await getEfilingNotifications(UserData?.fkUserId);
      if (response?.success) {
        setCount(response?.data?.count);
        setNotificationData(response?.data?.files);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getAllQuestionsApi();
  }, []);

  const notificationModal = () => (
    <div
      ref={notificationRef}
      style={{
        position: "absolute",
        top: "98px", // Adjust the distance from the buttons
        right: "3%",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        borderRadius: "8px",
        width: "380px", // Adjust the width as needed
        zIndex: 999, // Ensure it's above other elements
      }}
    >
      {notificationData.length > 0 ? notificationData.map((item, index) => (
        <ListGroup.Item key={index} className={notificationData.length === 1 ? "" : "border-bottom"}>
      <Link
        to={"/efiling/dashboard/fileDetail"}
        state={{ view: false, fileId: item.fileId, id: item.caseId }}
        style={{ color: "black" }}
        className="link"
      >
        <span>
          {item?.message}
          <br />
          <span className="text-sm">
            <i>{moment(item.date).format('DD/MM/YYYY')}</i>
          </span>
          <span className="float-end text-sm">{new Date(item.date).toLocaleTimeString()}</span>
        </span>
      </Link>
    </ListGroup.Item>
    )) : (
        <span className="float-end text-sm d-block text-center">No notifications found!</span>
    )}
    </div>
  );

  const handleCloseModal = () => {
    setModal(false);
    setActiveNotificationType(null);
  };

  const handleButtonClick = (notificationType) => {
    // Handle the button click and open the notification modal
    openNotificationModal(notificationType);
  };

  const openNotificationModal = (notificationType) => {
    if (modal && activeNotificationType === notificationType) {
      // If yes, close the modal
      setModal(false);
      setActiveNotificationType(null);
    } else {
      // Set the active notification type
      setActiveNotificationType(notificationType);

      // Open the modal
      setModal(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!notificationRef?.current?.contains(e.target)) {
        // console.log("This one gets called because of the button click", e);
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

  return (
    <>
      {modal && notificationModal()}

      <div class="tab-right me-4">
        <button onClick={() => handleButtonClick("Notifications")}>
          <span style={{ backgroundColor: "#FFA500", marginRight: 10 }}>
            {count ? count : 0}
          </span>
          Notifications
        </button>
      </div>
    </>
  );
};