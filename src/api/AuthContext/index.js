import React, { createContext, useEffect, useState } from "react";
import { getAllMinistry, getAllResolutionStatus, getAllSessions, getallMembers, loginUser } from "../APIs";
import { setAuthToken, setUserData } from "../Auth";
import { showErrorMessage } from "../../utils/ToastAlert";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [ministryData, setMinistryData] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [resolutionStatus, setResolutionStatus] = useState([]);

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

  useEffect(() => {
    getAllResolutionStatusApi()
    AllMembersData();
    AllMinistryData();
    getAllSessionsApi();
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
        resolutionStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
