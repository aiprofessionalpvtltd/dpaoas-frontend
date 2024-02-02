import React, { useCallback, useContext, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { Layout } from "../../../../../components/Layout";
import { CMSsidebarItems } from "../../../../../utils/sideBarItems";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import Header from "../../../../../components/Header";
import { useNavigate } from "react-router-dom";
import {
    SearchComplaint,
    assignedComplaintByAdmin,
    complaintDelete,
    getAllInventory,
    getallComplaint,
    getallcomplaintCategories,
    getallcomplaintRecordById,
    getallcomplaintTypes,
} from "../../../../../api/APIs";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";
import jsPDF from "jspdf";
import Modal from "react-modal";
import moment from "moment";
import LeaveCard from "../../../../../components/CustomComponents/LeaveCard";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../../../../api/AuthContext";
import { getUserData } from "../../../../../api/Auth";
import ComplaintAssignedEmployee from "../../../../../components/ComplaintAssignedEmployee";
import { CustomAlert } from "../../../../../components/CustomComponents/CustomAlert";

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

function CMSAdminDashboard() {
    const navigate = useNavigate();
    const { employeeData, employeesAsEngineersData } = useContext(AuthContext);

    const [complaintType, setComplaintType] = useState([]);
    const [inprogressCount, setInprogressCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [resolvedCount, setResolvedCount] = useState(0);
    const [repairing, setRepairing] = useState(0);
    const [instock, setInstock] = useState(0);
    const [outoforder, setOutOfOrder] = useState(0);
    const [issued, setIssued] = useState(0);
    const [disposeOf, setDisposeOf] = useState(0);




    const [count, setCount] = useState(null);
    const [complaintData, setComplaintData] = useState([]);
    const [complaintCategories, setComplaintCategories] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [printData, setPrintData] = useState(null);
    const [assignModalOpan, setAssignedModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [complaintId, setComplaintId] = useState(null);
    const pageSize = 4; // Set your desired page size

    const [selectedItem, setSelectedItem] = useState({
        id: 0,
    });

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleOkClick = () => {
        hendleDeleteApi(complaintId);
        handleClose();
    };

    const hendleDeleteApi = async (id) => {
        try {
            const response = await complaintDelete(id);
            if (response.success) {
                showSuccessMessage(response?.data?.message);
                getComplaint()
            }
        } catch (error) {
            showErrorMessage(error?.response.data.message);
        }
    };

    const openModal = (item) => {
        // Inside a function or event handler
        setSelectedItem({
            id: item.id,
        });
        setAssignedModal(true);
    };

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
        // onSubmit: (values) => {
        //     // Handle form submission here
        //     SearchComplaintApi(values);
        // },
    });

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformComplaintData = (apiData) => {
        return apiData.map((item) => ({
            id: item?.id,
            complaineeUser: `${item?.complaineeUser?.employee?.firstName}${item?.complaineeUser?.employee?.lastName}`,
            BranchOffice: item?.complaintType?.complaintTypeName,
            NatureofComplaint: item?.complaintCategory?.complaintCategoryName,
            AssigneTo: item?.resolverUser && `${item?.resolverUser?.employee?.firstName}${item?.resolverUser?.employee?.lastName}`,
            complaintDate: moment(item?.complaintIssuedDate).format("DD/MM/YYYY"),
            ResolvedDate: item?.complaintResolvedDate && moment(item?.complaintResolvedDate).format("DD/MM/YYY"),
            complaintStatus: item?.complaintStatus,
            status: item?.status,
        }));
    };
    const getComplaint = useCallback(async () => {
        try {
            const response = await getallComplaint(currentPage, pageSize);
            if (response?.success) {
                const transformedData = transformComplaintData(response?.data?.complaints);
                setCount(response?.data?.count);
                setComplaintData(transformedData);
            }
        } catch (error) {
            console.log(error);
        }
    }, [currentPage, pageSize, setCount, setComplaintData]);

    const CountComplaints = async () => {
        try {
            const response = await getallComplaint(0, 100);
            if (response?.success) {
                const countInProgress = response?.data?.complaints.filter(
                    (item) => item.complaintStatus === "in-progress"
                ).length;
                const countPending = response?.data?.complaints.filter((item) => item.complaintStatus === "pending").length;
                const countresolved = response?.data?.complaints.filter((item) => item.complaintStatus === "closed").length;
                setInprogressCount(countInProgress);
                setPendingCount(countPending);
                setResolvedCount(countresolved);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const HandlePrint = async (id) => {
        try {
            const response = await getallcomplaintRecordById(id);
            if (response.success) {
                setPrintData(response?.data);
                setIsOpen(true);
            }
            // console.log("response", response?.data?.complaintAttachment);
            // const url = `http://172.16.170.8:5252${response?.data?.complaintAttachment}`;
            // window.open(url, "_blank");
            // // setPdfUrl(url)
        } catch (error) {
            console.log(error);
        }
    };

    const HendleEdit = async (id) => {
        try {
            const response = await getallcomplaintRecordById(id);
            if (response.success) {
                navigate("/cms/admin/dashboard/addedit", { state: response.data })
            }

        } catch (error) {
            console.log(error);
        }
    };

    const SearchComplaintApi = async (values, { resetForm }) => {
        const Data = {
            complaineeUser: values?.complaineeUser?.value,
            resolverUser: values?.resolverUser?.value,
            keyword: values.keyword,
            complaintType: values?.complaintType,
            complaintCategory: values?.complaintCategory,
            complaintIssuedDate: values?.complaintIssuedDate,
            complaintResolvedDate: values?.complaintResolvedDate,
        };
        try {
            const response = await SearchComplaint(Data);
            if (response?.success) {
                const transformedData = transformComplaintData(response?.data);
                setCount(1);
                setComplaintData(transformedData);
                showSuccessMessage(response.message);
                formik.resetForm()
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

    //Create Pdf Template
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
        const img = await loadImage(`http://172.16.170.8:5252${printData?.complaintAttachment}`);

        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");

        // Add complaint details as text
        pdf.text(`ID: ${printData?.id}`, 10, 10);
        pdf.text(`Complaint Issued Date: ${new Date(printData?.complaintIssuedDate).toLocaleString()}`, 10, 20);
        pdf.text(`Description: ${printData?.complaintDescription}`, 10, 30);
        pdf.text(`ComplaintType: ${printData?.complaintType?.complaintTypeName}`, 10, 40);
        pdf.text(`ComplaintCategory: ${printData?.complaintCategory?.complaintCategoryName}`, 10, 50);

        // Add complaint image
        pdf.addImage(img, "PNG", 10, 60, pdf.internal.pageSize.getWidth() - 20, 0);

        // Save PDF to file
        pdf.save("complaint-details.pdf");
    };

    const CountInventory = async () => {
        try {
            const response = await getAllInventory(0, 100);
            if (response?.success) {

                const countPending = response?.data?.inventories.filter((item) => item.status === "in-stock/store").length;
                const countresolved = response?.data?.inventories.filter((item) => item.status === "repairing").length;
                const countoutoforder = response?.data?.inventories.filter((item) => item.status === "out of order").length;
                const issuedCount = response?.data?.inventories.filter((item) => item.status === "issued").length;
                const disposeOfCount = response?.data?.inventories.filter((item) => item.status === "disposed of").length;

                setDisposeOf(disposeOfCount)
                setIssued(issuedCount)
                setRepairing(countresolved)
                setInstock(countPending)
                setOutOfOrder(countoutoforder)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        AllComplaintTypeApi();
        AllComplaintCategoriesApi();
        CountInventory()
    }, []);

    useEffect(() => {
        CountComplaints()
        getComplaint();
    }, [getComplaint]);

    return (
        <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/cms/admin/dashboard"}
            //   addLink1={"/cms/dashboard"}
            //   title1={"User Complaint"}
            />
            <ToastContainer />
            {assignModalOpan ? (
                <ComplaintAssignedEmployee
                    assignModalOpan={assignModalOpan}
                    hendleModal={() => setAssignedModal(!assignModalOpan)}
                    ComplaintUserData={selectedItem}
                />
            ) : null}
            {/* Print Pdf Modal */}
            <CustomAlert showModal={showModal} handleClose={handleClose} handleOkClick={handleOkClick} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ background: "white" }}>
                    <div id="complaint-details">
                        <h1>Complaint Details</h1>
                        <p>ID: {printData?.id}</p>
                        <p>Complaint Issued Date: {new Date(printData?.complaintIssuedDate).toLocaleString()}</p>
                        <p>Description: {printData?.complaintDescription}</p>
                        <p>ComplaintType: {printData?.complaintType?.complaintTypeName}</p>
                        <p>ComplaintCategory: {printData?.complaintCategory?.complaintCategoryName}</p>
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
                        <button className="btn btn-primary mx-2" onClick={() => setIsOpen(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-primary mx-2" onClick={() => generatePDF()}>
                            Print
                        </button>
                    </div>
                </div>
            </Modal>
            {/* Assigned Engineer  */}

            <div class="row">
                <div style={{ padding: "0 30px 0 24px" }}>
                    <div class="mt-5 mb-3">
                        <div class="row">
                            <LeaveCard
                                available={"06"}
                                used={"05"}
                                title={"New Complaint"}
                                percentage={"60"}
                                value={pendingCount < 10 ? `0${pendingCount}` : pendingCount}
                            />
                            <LeaveCard
                                available={"05"}
                                used={"04"}
                                title={"Resolved Complaint"}
                                percentage={"80"}
                                value={resolvedCount < 10 ? `0${resolvedCount}` : resolvedCount}
                            />
                            <LeaveCard
                                available={"05"}
                                used={"04"}
                                title={"In-progress Complaint"}
                                percentage={"100"}
                                value={inprogressCount < 10 ? `0${inprogressCount}` : inprogressCount}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div style={{ padding: "0 30px 0 24px" }}>
                    <div class="mt-5 mb-3">
                        <div class="row">
                            <LeaveCard
                                available={"06"}
                                used={"05"}
                                title={"In-Stock Items"}
                                percentage={"60"}
                                value={instock < 10 ? `0${instock}` : instock}
                                bgblue={true}
                            />
                            <LeaveCard
                                available={"05"}
                                used={"04"}
                                title={"Send For Repairing"}
                                percentage={"80"}
                                value={repairing < 10 ? `0${repairing}` : repairing}
                                bgblue={true}
                            />
                            <LeaveCard
                                available={"05"}
                                used={"04"}
                                title={"Out Of Order Items"}
                                percentage={"100"}
                                value={outoforder < 10 ? `0${outoforder}` : outoforder}
                                bgblue={true}
                            />

                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div style={{ padding: "0 30px 0 24px" }}>
                    <div class="mt-5 mb-3">
                        <div class="row">
                            <LeaveCard
                                available={"06"}
                                used={"05"}
                                title={"Issued Items"}
                                percentage={"60"}
                                value={issued < 10 ? `0${issued}` : issued}
                                bgblue={true}
                            />
                            <LeaveCard
                                available={"05"}
                                used={"04"}
                                title={"Dispose Of Items"}
                                percentage={"80"}
                                value={disposeOf < 10 ? `0${disposeOf}` : disposeOf}
                                bgblue={true}
                            />


                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div class="container-fluid ">
                    <div className="dash-detail-container">
                        <form onSubmit={formik.handleSubmit}>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Complainee</label>
                                        {/* <input
                                            type="text"
                                            className={"form-control"}
                                            id="complaineeUser"
                                            placeholder={formik.values.complaineeUser}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        /> */}
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
                                </div>
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
                                            onChange={(selectedOptions) => formik.setFieldValue("resolverUser", selectedOptions)}
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
                                                complaintType.map((item) => <option value={item.id}>{item.complaintTypeName}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
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
                                                    <option value={item.id}>{item.complaintCategoryName}</option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
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
                                            onChange={(date) => formik.setFieldValue("complaintIssuedDate", date)}
                                            className={"form-control"}
                                        />
                                    </div>
                                </div>
                                <div class="col">
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
                                            onChange={(date) => formik.setFieldValue("complaintResolvedDate", date)}
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
                                    tableTitle="Admin Complaint"
                                    hideBtn={true}
                                    hendleResolve={(item) => HendleEdit(item.id)}
                                    // handleEdit={(item) => navigate("/cms/admin/dashboard/addedit", { state: item })}
                                    handlePageChange={handlePageChange}
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    headertitlebgColor={"#666"}
                                    headertitletextColor={"#FFF"}
                                    totalCount={count}
                                    ActionHide={false}
                                    handlePrint={(item) => HandlePrint(item.id)}
                                    handleDelete={(item) => {
                                        handleShow();
                                        setComplaintId(item.id);
                                    }}
                                    showResolve={true}
                                    showEditIcon={true}
                                    hideDeleteIcon={false}
                                    showPrint={true}
                                    showAssigned={true}
                                    hendleAssigned={(item) => openModal(item)}
                                />
                                <div class="d-grid gap-2 d-md-flex justify-content-md-start col">
                                    <button class="btn btn-primary" type="submit">
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

export default CMSAdminDashboard;
