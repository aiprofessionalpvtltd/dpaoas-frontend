import React, { useEffect, useRef, useState } from "react";
import { getEfilingNotifications } from "../../api/APIs/Services/efiling.service";
import { getUserData } from "../../api/Auth";
import moment from "moment";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

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
        setCount(response?.data?.totalCount);
        // setNotificationData(response?.data?.frs);
        const filesNotifications = response?.data?.files.map((file) => ({
          notificationId: file?.notificationId,
          fileId: file?.fileId,
          message: file?.message,
          date: file?.date,
          caseId: file?.caseId,
        }));
        const frsNotifications = response?.data?.frs.map((fr) => ({
          notificationId: fr?.notificationId,
          frId: fr?.frId,
          message: fr?.message,
          date: fr?.date,
        }));
        const combinedNotifications = [
          ...filesNotifications,
          ...frsNotifications,
        ];
        setNotificationData(combinedNotifications);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getAllQuestionsApi();
  }, [count]);
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
        zIndex: 999,
        height: "75vh",
        overflow: "hidden",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {notificationData.length > 0 ? (
        notificationData.map((item, index) => (
          <ListGroup.Item
            key={index}
            className={notificationData.length === 1 ? "" : "border-bottom"}
            style={{ padding: "10px 0px" }}
          >
            {item?.frId ? (
              <Link
                to={"/efiling/dashboard/fresh-receipt/frdetail"}
                state={{
                  view: false,
                  id: item.frId,
                  notificationId: item.notificationId,
                }}
                style={{ color: "black" }}
                className="link"
              >
                <span>
                  {item?.message}
                  <br />
                  <span className="text-sm">
                    <i>{moment(item.date).format("DD/MM/YYYY")}</i>
                  </span>
                  <span className="float-end text-sm">
                    {new Date(item.date).toLocaleTimeString()}
                  </span>
                </span>
              </Link>
            ) : (
              <Link
                to={"/efiling/dashboard/fileDetail"}
                state={{
                  view: false,
                  fileId: item?.fileId,
                  id: item?.caseId,
                  notificationId: item?.notificationId,
                }}
                style={{ color: "black" }}
                className="link"
              >
                <span>
                  {item?.message}
                  <br />
                  <span className="text-sm">
                    <i>{moment(item.date).format("DD/MM/YYYY")}</i>
                  </span>
                  <span className="float-end text-sm">
                    {new Date(item.date).toLocaleTimeString()}
                  </span>
                </span>
              </Link>
            )}
          </ListGroup.Item>
        ))
      ) : (
        <span className="text-sm d-block text-center">
          No notifications found!
        </span>
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

      <Badge
        badgeContent={count ? count : 0}
        color="primary"
        onClick={() => handleButtonClick("Notifications")}
        style={{ marginRight: 20, cursor: "pointer" }}
      >
        <NotificationsIcon color="red" />
      </Badge>
    </>
  );
};
