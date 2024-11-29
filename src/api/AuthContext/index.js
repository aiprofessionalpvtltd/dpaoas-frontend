import React, { createContext, useEffect, useState } from "react";
import {
  getAllDivisions,
  getAllParliamentaryYears,
  getAllSessions,
  retriveEmployeesAsEngineers,
} from "../APIs/Services/ManageQMS.service";
import { getallMembers, getAllMinistry } from "../APIs/Services/Motion.service";
import { getAllResolutionStatus } from "../APIs/Services/Resolution.service";
import { getAllEmployee } from "../APIs/Services/organizational.service";
import { getUserData, setAuthToken, setUserData } from "../Auth";
import { showErrorMessage } from "../../utils/ToastAlert";
import { loginUser } from "../APIs/Services/basicAuth.service";
import { getBranches } from "../APIs/Services/Branches.services";
import { io } from "socket.io-client";
import notificationSound from "./../../assets/notification.mp3";
import {
  createNotificationAPI,
  createNotificationApprovedCasesAPI,
  createNotificationFRsAPI,
} from "../APIs/Services/efiling.service";
// const socket = io("http://10.10.40.220:5152");
const socket = io("http://172.16.170.8:2424");

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const UserData = getUserData();
  const [permissions, setPermissions] = useState([]);
  const [ministryData, setMinistryData] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  const [employeeData, setEmployeeData] = useState([]);
  const [resolutionStatus, setResolutionStatus] = useState([]);
  const [employeesAsEngineersData, setemployeesAsEngineersData] = useState([]);
  const [allBranchesData, setallBranchesData] = useState([]);
  const [members, setMembers] = useState([]);
  const [parliamentaryYear, setParliamentaryYear] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [fileIdINRegister, setFileIdInRegister] = useState(null);
  const [fildetailsAqain, setFileDetail] = useState(null);
  const [notificationCaseData, setNotificationCaseData] = useState([]);
  const [notificationFRsData, setNotificationFRsData] = useState([]);
  const [notificationApprovedCaseData, setNotificationApprovedCaseData] =
    useState([]);

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.data) {
        setAuthToken(response?.data?.token);
        const updatedUserData = {
          ...response.data?.user,
          fkBranchId: response.data?.user?.branches[0]?.id,
          branch: {id: response.data?.user?.branches[0]?.id, branchName: response.data?.user?.branches[0]?.branchName},
        };
        setUserData(response.data?.user?.branches?.length > 0 ? updatedUserData : response.data?.user);

        setPermissions(response?.data?.permissions);
      }
      return response?.data;
    } catch (error) {
      throw error;
    }
  };

  const AllMinistryData = async () => {
    try {
      const response = await getAllMinistry();
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setMinistryData(response?.data);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const getEmployeeData = async () => {
    try {
      const response = await getAllEmployee(0, 1000);
      if (response?.success) {
        setEmployeeData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSessionsApi = async () => {
    try {
      const response = await getAllSessions();
      if (response?.success) {
        setCurrentSession(response?.data?.sessions[0]);
        setSessions(response?.data?.sessions);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const AllMembersData = async () => {
    const currentPage = 1;
    const pageSize = 100;
    try {
      const response = await getallMembers(currentPage, pageSize);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setMembers(response?.data?.members);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const handleDivisionsAPi = async () => {
    try {
      const response = await getAllDivisions(0, 1000);
      if (response?.success) {
        setDivisions(response.data?.divisions);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const getAllResolutionStatusApi = async () => {
    try {
      const response = await getAllResolutionStatus();
      if (response?.success) {
        setResolutionStatus(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getretriveEmployeesAsEngineers = async () => {
    try {
      const response = await retriveEmployeesAsEngineers();
      if (response?.success) {
        setemployeesAsEngineersData(response?.data?.employees);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AllBranchesData = async () => {
    try {
      const response = await getBranches(0, 200);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setallBranchesData(response?.data?.rows);
      }
    } catch (error) {
      // console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };
  const getAllParliamnetaryYears = async () => {
    try {
      const response = await getAllParliamentaryYears(0, 200);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setParliamentaryYear(response?.data);
      }
    } catch (error) {
      // console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  // Function to handle notification click and remove it from localStorage

  const playSound = () => {
    const audio = new Audio(notificationSound);
    audio.play();
  };
  useEffect(() => {
    // Listen for connection success
    socket.on("connect", () => {
      console.log("Connected to the server");
    });
    // Assign Case Notification
    socket.on(`notificationCases:${UserData?.fkUserId}`, async (data) => {
      try {
        // Call the API with received data
        await createNotificationAPI(data, UserData?.fkUserId);

        // Update the notification data in state and local storage
        setNotificationCaseData((prev) => {
          const updatedNotifications = [...prev, data];
          return updatedNotifications;
        });

        // Optional: Play notification sound
        // playSound();
      } catch (error) {
        console.error("Failed to create notification:", error);
      }
    });

    // Assign FRs Notification
    socket.on(`notificationFRs:${UserData?.fkUserId}`, async (data) => {
      try {
        // Call the API with received data
        await createNotificationFRsAPI(data, UserData?.fkUserId);

        // Update the notification data in state and local storage
        setNotificationFRsData((prev) => {
          const updatedNotifications = [...prev, data];
          return updatedNotifications;
        });

        // Optional: Play notification sound
        // playSound();
      } catch (error) {
        console.error("Failed to create notification:", error);
      }
    });

    //  Approved Case Notification
    socket.on(
      `notificationApprovedCase:${UserData?.fkUserId}`,
      async (data) => {
        try {
          // Call the API with received data
          const response = await createNotificationApprovedCasesAPI(
            data,
            UserData?.fkUserId
          );
          // Update the notification data in state and local storage
          setNotificationApprovedCaseData((prev) => {
            const updatedNotifications = [...prev, data];
            return updatedNotifications;
          });

          // Optional: Play notification sound
          // playSound();
        } catch (error) {
          console.error("Failed to create notification:", error);
        }
      }
    );

    // Cleanup on component unmount
    return () => {
      socket.off(`notificationCases:${UserData?.fkUserId}`);
      socket.off(`notificationFRs:${UserData?.fkUserId}`);
      socket.off(`notificationApprovedCase:${UserData?.fkUserId}`);
    };
  }, [UserData?.fkUserId]);

  useEffect(() => {
    getEmployeeData();
  }, []);
  useEffect(() => {
    getAllResolutionStatusApi();
    AllMembersData();
    AllMinistryData();
    getAllSessionsApi();
    getretriveEmployeesAsEngineers();
    AllBranchesData();
    getAllParliamnetaryYears();
    handleDivisionsAPi();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        setPermissions,
        setEmployeeData,
        setUserData,
        permissions,
        ministryData,
        members,
        sessions,
        employeeData,
        resolutionStatus,
        employeesAsEngineersData,
        allBranchesData,
        parliamentaryYear,
        setFileIdInRegister,
        fileIdINRegister,
        fildetailsAqain,
        setFileDetail,
        divisions,
        currentSession,
        notificationCaseData,
        notificationFRsData,
        notificationApprovedCaseData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
