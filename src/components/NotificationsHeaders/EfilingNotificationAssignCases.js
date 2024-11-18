import React, { useContext, useEffect, useRef, useState } from "react";
import {
  getEfilingNotifications,
  getNotificationsByUserId,
} from "../../api/APIs/Services/efiling.service";
import { getUserData } from "../../api/Auth";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { Badge } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "../../api/AuthContext";

export const EFilingNotificationAssignCases = (notificationType) => {
  const navigate = useNavigate();
  const { setFileDetail, notificationCaseData } = useContext(AuthContext);
  const location = useLocation();
  const [key, setKey] = React.useState(Date.now());

  const [modal, setModal] = useState(false);
  const [activeNotificationType, setActiveNotificationType] = useState(null);
  const notificationRef = useRef();
  const UserData = getUserData();
  const [notificationCaseLocalData, setNotificationCaseLocalData] = useState(
    []
  );
  const [count, setCount] = useState("0");

  // Load notification cases from localStorage
  useEffect(() => {
    // const storedNotifications = localStorage.getItem("notificationCaseData");
    const fetchData = async () => {
      const res = await getNotificationsByUserId(UserData?.fkUserId);
      if (res?.success) {
        setNotificationCaseLocalData(res?.data);
        setCount(res?.data?.length ? res?.data?.length : "0");
      }
    };

    fetchData();
  }, [notificationCaseData]);
  console.log("Notification Case Data in Efileing", notificationCaseLocalData);

  const handleClick = (item, event) => {
    event.preventDefault();
    navigate("/efiling/dashboard/fileDetail", {
      state: {
        view: false,
        fileId: item?.data[0]?.fkFileId,
        id: item?.data[0]?.fkCaseId,
        notificationId: item?.notificationId,
      },
    });
    setKey(Date.now());
    setModal(false);
  };

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
      {notificationCaseLocalData.length > 0 ? (
        notificationCaseLocalData.map((item, index) => (
          <ListGroup.Item
            key={index}
            className="border-bottom"
            style={{ padding: "10px 0px" }}
          >
            <Link
              to={"/efiling/dashboard/fileDetail"}
              state={{
                view: false,
                fileId: item?.data[0]?.fkFileId,
                id: item?.data[0]?.fkCaseId,
                notificationId: item?.notificationId,
              }}
              style={{ color: "black" }}
              onClick={(e) => handleClick(item, e)}
              className="link"
            >
              <span>
                <span
                  className={`mb-2 ${
                    item?.data[0]?.priority === "Routine"
                      ? "label-pending"
                      : item?.data[0]?.priority === "Immediate"
                        ? "label-inprogress"
                        : item?.data[0]?.priority === "Confidential"
                          ? "label-danger"
                          : "label-default"
                  }`}
                >
                  {item?.data[0]?.priority}
                </span>
                <br />
                {item?.message}
                <br />
                <span className="text-sm">
                  <i>{moment(item?.data[0]?.createdAt).format("DD/MM/YYYY")}</i>
                </span>
                <span className="float-end text-sm">
                  {new Date(item?.data[0]?.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </span>
            </Link>
          </ListGroup.Item>
        ))
      ) : (
        <span className="text-sm d-block text-center">
          {notificationCaseLocalData && notificationCaseLocalData?.length > 0
            ? "Assigned Cases Notification"
            : " No Assigned Cases Notifications found!"}
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
      <Tooltip title="Assigned Cases Notifications">
        <Badge
          badgeContent={count}
          color="primary"
          onClick={() => handleButtonClick("Notifications")}
          style={{ marginRight: 20, cursor: "pointer" }}
        >
          <NotificationsIcon color="red" />
        </Badge>
      </Tooltip>
    </>
  );
};
