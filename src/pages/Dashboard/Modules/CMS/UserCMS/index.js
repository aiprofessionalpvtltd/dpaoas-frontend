import React, { useCallback, useContext, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { Layout } from "../../../../../components/Layout";
import { CMSsidebarItems } from "../../../../../utils/sideBarItems";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import Header from "../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  SearchComplaint,
  getallcomplaintCategories,
  getallcomplaintRecordById,
  getallcomplaintRecordByUserId,
  getallcomplaintTypes,
} from "../../../../../api/APIs/Services/Complaint.service";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import jsPDF from "jspdf";
import Modal from "react-modal";
import moment from "moment";
import { getUserData } from "../../../../../api/Auth";
import { AuthContext } from "../../../../../api/AuthContext";
import Select from "react-select";
import * as XLSX from "xlsx";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "40%",
    transform: "translate(-50%, -50%)",
  },
};

function CMSUserDashboard() {
  const navigate = useNavigate();
  const userData = getUserData();
  const { employeeData, employeesAsEngineersData } = useContext(AuthContext);
  const [complaintType, setComplaintType] = useState([]);

  const [count, setCount] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [printData, setPrintData] = useState(null);

  const [complaintData, setComplaintData] = useState([]);
  const [complaintCategories, setComplaintCategories] = useState([]);

  const formik = useFormik({
    initialValues: {
      complaineeUser: "",
      resolverUser: "",
      keyword: "",
      complaintType: "",
      complaintCategory: "",
      complaintIssuedDate: "",
      complaintResolvedDate: "",
    },
    onSubmit: async (values, { resetForm }) => {
      // Handle form submission here
      await SearchComplaintApi(values, { resetForm });
    },
  });

  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformDepartmentData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      complaineeUser: `${item?.complaineeUser?.employee?.firstName}${item?.complaineeUser?.employee?.lastName}`,
      BranchOffice: item?.complaintType?.complaintTypeName,
      NatureofComplaint: item?.complaintCategory?.complaintCategoryName,
      AssigneTo:
        item?.resolverUser &&
        `${item?.resolverUser?.employee?.firstName}${item?.resolverUser?.employee?.lastName}`,
      complaintIssuedDate:
        item?.complaintIssuedDate &&
        moment(item?.complaintIssuedDate).format("DD/MM/YYYY"),
      complaintStatus: item?.complaintStatus,
    }));
  };
  const getComplaint = useCallback(async () => {
    try {
      const response = await getallcomplaintRecordByUserId(
        userData.fkUserId,
        currentPage,
        pageSize
      );
      if (response?.success) {
        setCount(response?.data?.count);
        const transformedData = transformDepartmentData(
          response?.data?.complaints
        );
        setComplaintData(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setComplaintData]);

  const generatePDF = async () => {
    const element = document.getElementById("complaint-details");
    const canvas = await html2canvas(element);

    // Create a Promise to wait for the image to load
    const loadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });

    // Wait for the image to load
    const img = await loadImage(
      `http://172.16.170.8:5252${printData?.complaintAttachment}`
    );

    const pdf = new jsPDF();
    const imgData = canvas.toDataURL("image/png");

    // Add complaint details as text
    pdf.text(`ID: ${printData?.id}`, 10, 10);
    pdf.text(
      `Complaint Issued Date: ${new Date(
        printData?.complaintIssuedDate
      ).toLocaleString()}`,
      10,
      20
    );
    pdf.text(`Description: ${printData?.complaintDescription}`, 10, 30);
    pdf.text(
      `ComplaintType: ${printData?.complaintType?.complaintTypeName}`,
      10,
      40
    );
    pdf.text(
      `ComplaintCategory: ${printData?.complaintCategory?.complaintCategoryName}`,
      10,
      50
    );

    // Add complaint image
    pdf.addImage(img, "PNG", 10, 60, pdf.internal.pageSize.getWidth() - 20, 0);

    // Save PDF to file
    pdf.save("complaint-details.pdf");
  };

  const HandlePrint = async (id) => {
    try {
      const response = await getallcomplaintRecordById(id);
      if (response.success) {
        setPrintData(response?.data);
        setIsOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SearchComplaintApi = async (values, { resetForm }) => {
    const Data = {
      complaineeUser: values.complaineeUser.value,
      resolverUser: values.resolverUser.value,
      keyword: values.keyword,
      complaintType: values.complaintType,
      complaintCategory: values.complaintCategory,
      complaintIssuedDate: values.complaintIssuedDate,
      complaintResolvedDate: values.complaintResolvedDate,
    };
    try {
      const response = await SearchComplaint(Data);
      if (response?.success) {
        const transformedData = transformDepartmentData(response?.data);
        setCount(1);
        setComplaintData(transformedData);
        showSuccessMessage(response.message);
        formik.resetForm();
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const AllComplaintTypeApi = async () => {
    try {
      const response = await getallcomplaintTypes();
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setComplaintType(response?.data);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const AllComplaintCategoriesApi = async () => {
    try {
      const response = await getallcomplaintCategories();
      if (response?.success) {
        // showSuccessMessage(response?.message);
        setComplaintCategories(response?.data);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const hendleExportExcel = async () => {
    try {
      const response = await getallcomplaintRecordByUserId(
        userData.fkUserId,
        0,
        100
      );
      if (response?.success) {
        // Export to Excel logic
        const worksheet = XLSX.utils.json_to_sheet(response?.data?.complaints);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    AllComplaintTypeApi();
    AllComplaintCategoriesApi();
  }, []);

  useEffect(() => {
    getComplaint();
  }, [getComplaint]);
  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/cms/dashboard"}
        //   addLink1={"/cms/dashboard"}
        //   title1={"User Complaint"}
      />
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ background: "white" }}
        >
          <div id="complaint-details">
            <h1>Complaint Details</h1>
            <p>ID: {printData?.id}</p>
            <p>
              Complaint Issued Date:{" "}
              {new Date(printData?.complaintIssuedDate).toLocaleString()}
            </p>
            <p>Description: {printData?.complaintDescription}</p>
            <p>ComplaintType: {printData?.complaintType?.complaintTypeName}</p>
            <p>
              ComplaintCategory:{" "}
              {printData?.complaintCategory?.complaintCategoryName}
            </p>
          </div>
          <img
            src={`http://172.16.170.8:5252${printData?.complaintAttachment}`}
            alt="Complaint Image"
            style={{
              display: "block",
              margin: "20px auto", // Adjust margin for spacing
              width: "40%", // Adjust the width as needed
              height: "10%", // Maintain aspect ratio
            }}
          />
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button
              className="btn btn-primary mx-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={() => generatePDF()}
            >
              Print
            </button>
          </div>
        </div>
      </Modal>
      <div class="mt-4">
        <div class="container-fluid ">
          <div className="dash-detail-container">
            <form onSubmit={formik.handleSubmit}>
              <div class="row">
                {/* <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Complainee</label>
                     
                    <Select
                      options={
                        employeeData &&
                        employeeData?.map((item) => ({
                          value: item.fkUserId,
                          label: `${item.firstName}${item.lastName}`,
                        }))
                      }
                      onChange={(selectedOptions) => formik.setFieldValue("complaineeUser", selectedOptions)}
                      onBlur={formik.handleBlur}
                      value={formik.values.complaineeUser}
                      name="complaineeUser"
                      isClearable={true}
                    />
                  </div>
                </div> */}
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Resolve By</label>

                    <Select
                      options={
                        employeesAsEngineersData &&
                        employeesAsEngineersData?.map((item) => ({
                          value: item.id,
                          label: `${item.firstName}${item.lastName}`,
                        }))
                      }
                      onChange={(selectedOptions) =>
                        formik.setFieldValue("resolverUser", selectedOptions)
                      }
                      onBlur={formik.handleBlur}
                      value={formik.values.resolverUser}
                      name="resolverUser"
                      isClearable={true}
                    />
                  </div>
                </div>
                {/* <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Keyword</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder={formik.values.keyword}
                      className={"form-control"}
                      id="keyword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div> */}
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Branch/Office</label>
                    <select
                      class="form-select"
                      placeholder={formik.values.complaintType}
                      onChange={formik.handleChange}
                      id="complaintType"
                      onBlur={formik.handleBlur}
                    >
                      <option selected disabled hidden>
                        Select
                      </option>
                      {complaintType &&
                        complaintType.map((item) => (
                          <option value={item.id}>
                            {item.complaintTypeName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Nature of Complaint</label>
                    <select
                      class="form-select"
                      placeholder={formik.values.complaintCategory}
                      id="complaintCategory"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option selected disabled hidden>
                        Select
                      </option>
                      {complaintCategories &&
                        complaintCategories.map((item) => (
                          <option value={item.id}>
                            {item.complaintCategoryName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-4">
                  <div class="mb-3" style={{ position: "relative" }}>
                    <label class="form-label">Complaint Issued Date</label>
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
                      minDate={new Date()}
                      selected={formik.values.complaintIssuedDate}
                      onChange={(date) =>
                        formik.setFieldValue("complaintIssuedDate", date)
                      }
                      className={"form-control"}
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3" style={{ position: "relative" }}>
                    <label class="form-label">Complaint Resolved Date</label>
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
                      selected={formik.values.complaintResolvedDate}
                      minDate={new Date()}
                      onChange={(date) =>
                        formik.setFieldValue("complaintResolvedDate", date)
                      }
                      className={"form-control"}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end col">
                  <button class="btn btn-primary" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>

            <div class="row mt-5">
              <div class="col-12">
                <CustomTable
                  block={false}
                  data={complaintData}
                  tableTitle="User Complaint"
                  addBtnText="Add User Complaint"
                  ActionHide={true}
                  handleAdd={() => navigate("/cms/dashboard/addedit")}
                  // handleEdit={(item) => navigate("/cms/dashboard/addedit", { state: item })}
                  handlePageChange={handlePageChange}
                  hideEditIcon={true}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  totalCount={count}
                  hideDeleteIcon={true}
                  showPrint={true}
                  handlePrint={(item) => HandlePrint(item.id)}
                />
                <div class="d-grid gap-2 d-md-flex justify-content-md-start col">
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={() => hendleExportExcel()}
                  >
                    Export Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CMSUserDashboard;
