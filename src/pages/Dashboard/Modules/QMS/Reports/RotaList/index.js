import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import {
  allRotaList,
  generatedRotaList,
  getRotaListById,
} from "../../../../../../api/APIs/Services/Question.service";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { imagesUrl } from "../../../../../../api/APIs";
import moment from "moment";

const validationSchema = Yup.object({
  groupNo: Yup.string().required("Group No is required"),
  allotmentType: Yup.string().required("Allotment Type is required"),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
});

function QMSRotaList() {
  const { sessions } = useContext(AuthContext);
  const [resData, setResData] = useState([]);
  const [printFile, setPrintFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [groupIdVal, setGroupIdVal] = useState(null);
  const [allotmentTypeVal, setAllotmentTypeVal] = useState(null);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  const transformLeavesData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      sessionName:item?.sessionDetails?.sessionName,
      startDate:moment(item?.startDate).format("DD/MM/YYYY"),
      endDate:moment(item?.endDate).format("DD/MM/YYYY"),
      allowedDates: item?.allowedDates
      ? item.allowedDates.map(date => moment(date).format("DD/MM/YYYY")).join(", ")
      : "--",
      weekDays:item.weekDays,
      // startGroup:item?.startGroup ? item?.startGroup :"--",
      skipGroups:item?.skipGroups[0] ? item?.skipGroups[0]?.groupId :"--",
      skipGroupsDate:item?.skipGroups[0] ? moment(item?.skipGroups[0]?.date ).format("DD/MM/YYYY"):"--",
      internalAttachment:item?.pdfLink
      // DateOfCreation: item?.DateOfCreation,
      // DateOfAnswering: item?.DateOfAnswering,
      // Group: item?.Group,
      // Divisions:item.divisions
    }))}

  const GetALlRotaListApi = async () => {
    try {
      const response = await allRotaList(currentPage,pageSize);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setCount(response?.count)
        const transformedData = transformLeavesData(
          response.data
        );
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const hendleEdit = async (id) => {
    try {
      const response = await getRotaListById(id);
      showSuccessMessage(response?.message)
        navigate("/qms/reports/rota-list/addedit", {
          state: response.data,
        });
    
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

useEffect(()=> {
  GetALlRotaListApi()
},[currentPage])
  //   Handle Download
  const handleDownload = (url) => {
    // Check if fileUrl exists
    const fileUrl = `${imagesUrl}${url}`
    if (!fileUrl) return;

    // Extract the filename from the fileUrl
    const filename = fileUrl.split("/").pop();

    // Perform the download
    axios({
      url: fileUrl,
      method: "GET",
      responseType: "blob", // Important for handling binary data like files
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Set the filename for download
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/reports/rota-list"}
        title1={"Rota List"}
      />
      <ToastContainer />

      <div class="container-fluid dash-detail-container">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Rota List</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <CustomTable
                block={false}
                hideBtn={true}
                addBtnText={"Create Rota List"}
                handleAdd={() => navigate("/qms/reports/rota-list/addedit")}
                // hidebtn1={true}
                data={resData}
                tableTitle="Rota List"
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                hideDeleteIcon={true}
                showEditIcon={false}
                showView={false}
                // handleView={(item) =>
                //   navigate("/qms/reports/rota-list/further-details", {
                //     state: {
                //       fkSessionId: sessionId,
                //       fkGroupId: groupIdVal,
                //       allotmentType: allotmentTypeVal,
                //       listId: item?.id,
                //     },
                //   })
                // } // pass selected sessionNo, allotmentType and GroupNo too along with itemId
                handleEdit={(item) => hendleEdit(item?.id)}
                showPrint={true}
                handlePrint={(item) => handleDownload(item?.internalAttachment)}
                totalCount={count}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSRotaList;
