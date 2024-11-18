import React, { useContext, useEffect, useRef, useState } from "react";
import { getEfilingNotifications } from "../../api/APIs/Services/efiling.service";
import { getUserData } from "../../api/Auth";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { Badge } from "@mui/material";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import { AuthContext } from "../../api/AuthContext";

export const EFilingNotificationAssignFrs = (notificationType) => {
  const navigate = useNavigate();
  const { setFileDetail, notificationFRsData } = useContext(AuthContext);
  const location = useLocation();
  const [key, setKey] = React.useState(Date.now());

  const [modal, setModal] = useState(false);
  const [activeNotificationType, setActiveNotificationType] = useState(null);
  const notificationRef = useRef();
  const UserData = getUserData();
  const [notifcationFrsLocalData, setNotificationFrsLocalData] = useState([]);
  const [count, setCount] = useState("0");

  // Load notification cases from localStorage
  useEffect(() => {
    const storedNotifications = localStorage.getItem("notificationFRsData");
    if (storedNotifications) {
      const parsedNotifications = JSON.parse(storedNotifications);
      console.log("parsedNotifications", parsedNotifications);
      setNotificationFrsLocalData(parsedNotifications);
      setCount(parsedNotifications?.length ? parsedNotifications?.length : "0");
    }
  }, [notificationFRsData]);
  console.log("Notification Case Data in Efileing", notifcationFrsLocalData);

  const handleClick = (item) => {
    navigate("/efiling/dashboard/fresh-receipt/frdetail", {
      state: {
        view: false,
        id: item?.data?.fkFreshReceiptId,
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
      {notifcationFrsLocalData.length > 0 ? (
        notifcationFrsLocalData.map((item, index) => (
          <ListGroup.Item
            key={index}
            className={
              notifcationFrsLocalData.length === 1 ? "" : "border-bottom"
            }
            style={{ padding: "10px 0px" }}
          >
            <Link
              to={"/efiling/dashboard/fresh-receipt/frdetail"}
              state={{
                view: false,
                id: item?.data?.fkFreshReceiptId,
                notificationId: item.notificationId,
              }}
              style={{ color: "black" }}
              onClick={(item) => handleClick(item)}
              className="link"
            >
              <span>
                <span
                  className={`mb-2 ${
                    item?.data?.priority === "Routine"
                      ? "label-pending"
                      : item?.data?.priority === "Immediate"
                        ? "label-inprogress"
                        : item?.data?.priority === "Confidential"
                          ? "label-danger"
                          : "label-default"
                  }`}
                >
                  {item?.data?.priority}
                </span>
                <br />
                {item?.message}
                <br />
                <span className="text-sm">
                  <i>{moment(item?.data?.createdAt).format("DD/MM/YYYY")}</i>
                </span>
                <span className="float-end text-sm">
                  {new Date(item?.data?.createdAt).toLocaleTimeString([], {
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
          No FRs Notifications Found!
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
        badgeContent={count}
        color="primary"
        onClick={() => handleButtonClick("Notifications")}
        style={{ marginRight: 20, cursor: "pointer" }}
      >
        <MarkUnreadChatAltIcon color="red" />
      </Badge>
    </>
  );
};
