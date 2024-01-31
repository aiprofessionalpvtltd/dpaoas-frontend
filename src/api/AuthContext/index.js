import React, { createContext, useEffect, useState } from "react";
import {
  getAllEmployee,
  getAllMinistry,
  getAllResolutionStatus,
  getAllSessions,
  getallMembers,
  loginUser,
  retriveEmployeesAsEngineers,
} from "../APIs";
import { setAuthToken, setUserData } from "../Auth";
import { showErrorMessage } from "../../utils/ToastAlert";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [ministryData, setMinistryData] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [employeeData, setEmployeeData] = useState([])
  const [resolutionStatus, setResolutionStatus] = useState([]);
  const [employeesAsEngineersData, setemployeesAsEngineersData] = useState([]);


  const [members, setMembers] = useState([]);

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.data) {
        setAuthToken(response?.data?.token);
        setUserData(response.data?.user);
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
        console.log("response?.data, Dataa", response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSessionsApi = async () => {
    try {
      const response = await getAllSessions();
      if (response?.success) {
        setSessions(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const AllMembersData = async () => {
    const currentPage = 0;
    const pageSize = 100;
    try {
      const response = await getallMembers(currentPage, pageSize);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setMembers(response?.data?.rows);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
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

  useEffect(() => {
    getAllResolutionStatusApi();
    AllMembersData();
    AllMinistryData();
    // getAllSessionsApi();
    getEmployeeData()
    getretriveEmployeesAsEngineers()
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        setPermissions,
        permissions,
        ministryData,
        members,
        sessions,
        employeeData,
        resolutionStatus,
        employeesAsEngineersData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
