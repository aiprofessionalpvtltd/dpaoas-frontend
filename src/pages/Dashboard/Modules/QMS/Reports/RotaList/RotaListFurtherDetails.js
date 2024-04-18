import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import { deleteSuppList, getAllSupplementaryLists, getGeneratedSuppList, printSuppFromList, saveSuppList } from "../../../../../../api/APIs/Services/Question.service";
import { ToastContainer } from "react-toastify";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getUserData } from "../../../../../../api/Auth";
import { useLocation } from "react-router-dom";

const validationSchema = Yup.object({
  sessionNumber: Yup.string(),
  category: Yup.string(),
  groupNo: Yup.string(),
  startListNo: Yup.string(),
  listName: Yup.string(),
  houseLayDate: Yup.string(),
  include: Yup.boolean(),
});

function RotaListFurtherDetails() {
  const location = useLocation();
  console.log("hsjdjj", location.state?.listId);
  const { sessions } = useContext(AuthContext);
  const userData = getUserData();
  const [generatedData, setGeneratedData] = useState([]);
  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [generatedItem, setGeneratedItem] = useState(false);
  const pageSize = 10; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: ""
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      generateSupplementaryList(values);
    },
  });
  const navigate = useNavigate();

  const transformData = (apiData) => {
    return apiData.map((res, index) => {
      const rowData = {
        SrNo: index,
        id: res?.id, // Show id as the second column
        houseLayDate: res?.houseLayDate,
        listName: res?.listName,
        supplementaryListStatus: res.supplementaryListStatus ? res?.supplementaryListStatus : "active",
      };
    
      // Remove id key from rowData if it's null or undefined
      if (rowData.id == null) {
        delete rowData.id;
      }
    
      return rowData;
    });
  };

  const generateSupplementaryList = async (values) => {
    const Data = {
      listName: formik.values.listName,
      houseLayDate: moment(formik.values.houseLayDate).format("YYYY-MM-DD"),
      fkUserId: userData.fkUserId,
    }

    try {
      const response = await getGeneratedSuppList(location.state?.listId, Data);
      if (response?.success) {
        // showSuccessMessage(response?.message);
        // setCount(response?.count);
        const transformedData = transformData(response.data?.supplementaryList);
        setGeneratedItem(true);
        setGeneratedData(response.data);
        setResData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleSessionChange = async (e) => {
    setSessionId(e.target.value);
  }

  const getSupplementaryListsApi = async () => {
    try {
      const response = await getAllSupplementaryLists(location.state?.listId);
      if (response?.success) {  
        // setCount(response?.count);
        setGeneratedItem(false);
        const transformedData = transformData(response.data?.supplementaryList);
        setResData(transformedData)
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getSupplementaryListsApi();
  }, [])

  const handleSaveList = async () => {
    const questionIds = generatedData.supplementaryQuestions.map(question => ({ id: question.id }));
  
    const requestData = {
      supplementaryList: {
        listName: formik.values.listName,
        houseLayDate: moment(formik.values.houseLayDate).format("YYYY-MM-DD"),
        fkUserId: userData.fkUserId,
        supplementaryQuestionsIds: questionIds
      }
    };
  
    try {
      const response = await saveSuppList(location.state?.listId, requestData);
      if (response?.success) {
        setGeneratedItem(false);
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };  

  const printList = async (data) => {
    try {
      const response = await printSuppFromList(data);
      if (response?.success) {
       showSuccessMessage(response.data.message);
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };

  const deleteList = async (data) => {
    try {
      const response = await deleteSuppList(data);
      if (response?.success) {
       showSuccessMessage(response.message);
       getSupplementaryListsApi();
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
    }
  };

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/reports/rota-list"}
        title1={"Rota List"}
        addLink2={"/qms/reports/rota-list/further-details"}
        title2={"Rota List Further Details"}
      />
      <ToastContainer />

      <div class="container-fluid dash-detail-container">
        <div class="card mt-4">
          <div class="card-header red-bg" style={{ background: "#14ae5c !important" }}>
            <h1>Rota List</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Start Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          zIndex: "1",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.startDate}
                        onChange={(date) =>
                          formik.setFieldValue("startDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.startDate && formik.errors.startDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.startDate && formik.errors.startDate && (
                        <div className="invalid-feedback">
                          {formik.errors.startDate}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">End Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          zIndex: "1",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.endDate}
                        onChange={(date) =>
                          formik.setFieldValue("endDate", date)
                        }
                        onBlur={formik.handleBlur}
                        minDate={new Date()}
                        className={`form-control ${
                          formik.touched.endDate && formik.errors.endDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.endDate && formik.errors.endDate && (
                        <div className="invalid-feedback">
                          {formik.errors.endDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                      Generate
                    </button>
                    <button class="btn btn-primary" type="" onClick={handleSaveList}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
              <CustomTable
                block={false}
                hideBtn={true}
                hidebtn1={true}
                data={resData}
                tableTitle="Rota List Further Details"
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                showEditIcon={true}
                ActionHide={true}
                handleDelete={(item) => deleteList(item.id)}
                showPrint={true}
                handlePrint={(item) => printList(item.id)}
                totalCount={count}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RotaListFurtherDetails;