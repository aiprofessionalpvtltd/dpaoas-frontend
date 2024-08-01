import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import {
  NoticeSidebarItems,
  ResearchSideBarItems,
} from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import { useCallback, useEffect, useState } from "react";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useLocation, useNavigate } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import {
  DeleteResearchServices,
  UpdateResearchServices,
  getAllResarchServices,
} from "../../../../../api/APIs/Services/Notice.service";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { imagesUrl } from "../../../../../api/APIs";
import moment from "moment";

function ResearchBRServices() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [researchService, setResearchData] = useState([]);
  const [status, setStatus] = useState("All");
  const [changeStatus, setChangeStatus] = useState("");
  const [modalRemarks, setModalRemarks] = useState("");
  const [modalAttachment, setModalAttachment] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const pageSize = 10;
  const location = useLocation();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const transformresarchServicesData = (apiData) => {
    return apiData.map((item, index) => {
      const transformedItem = {
        isEditable: item.isEditable,
        SR: item?.id,
        memberName:item?.member?.memberName,
        serviceType: item?.service_type,
        details: item?.details,
        status: item?.isActive,
        SubmittedOn:moment(item?.createdAt).format("DD-MM-YYYY"),
        remarks: item?.remarks ? item.remarks : ""
      };
    
      if (item?.attachment) {
        transformedItem.attachmentInternal = item.attachment;
      }
  
      return transformedItem;
    });
  };  

  const getAllResarchServicesApi = async () => {
    try {
      const response = await getAllResarchServices(
        currentPage,
        pageSize,
        status
      );
      if (response?.success) {
        setCount(response?.data?.count);
        const trensferData = transformresarchServicesData(
          response?.data?.researchServiceData
        );
        setResearchData(trensferData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteResearchServices(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllResarchServicesApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const hendleCompleted = async (item, status, attachment) => {
    const formData = new FormData();
    formData.append('isActive', status ? status : item.status);
    formData.append('isEditable', status === "Delivered" ? false : true);
    formData.append('service_type', item?.serviceType);
    formData.append('details', item?.details);
    if (attachment) {
      formData.append('attachment', attachment ? attachment : item?.attachmentInternal);
    }
    if (modalRemarks) {
      formData.append('remarks', modalRemarks ? modalRemarks : item?.remarks);
    }
  
    try {
      const response = await UpdateResearchServices(item?.SR, formData);
      if (response.success) {
        setShowModal(false);
        setStatus("");
        showSuccessMessage(response.message);
        getAllResarchServicesApi();
      }
      setModalAttachment(null);
      setModalRemarks("");
      setChangeStatus("");
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };  

  useEffect(() => {
    setStatus(location?.state ? location?.state?.status : "");
  }, []);

  useEffect(() => {
    getAllResarchServicesApi();
  }, [currentPage, status]);

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleDownload = (fileUrl) => {
    // Check if fileUrl exists
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

  const handlePreview = (searchedData) => {
    // Assuming searchedData is the direct URL to the file
    // You can use different approaches based on the file type
    // For example, if it's a PDF, you might want to open it in a new tab or embed it in an iframe

    // For simplicity, let's assume it's an image or PDF file
    // If it's an image, it will be opened in a new tab
    // If it's a PDF, it will be downloaded (you can adjust this behavior as needed)

    // Check if searchedData exists
    if (!searchedData) return;

    // Extract the file extension
    const fileExtension = searchedData.split(".").pop().toLowerCase();

    // For simplicity, let's assume we are handling PDF and image files
    if (fileExtension === "pdf") {
      // For PDF files, let's open it in a new tab
      window.open(searchedData, "_blank");
    } else if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png" ||
      fileExtension === "gif"
    ) {
      // For image files, let's open it in a new tab
      window.open(searchedData, "_blank");
    } else {
      // For other file types, you might want to handle them differently (e.g., provide a message that the file type is not supported)
      console.log("Preview not supported for this file type");
    }
  };

  return (
    <Layout
      module={true}
      sidebarItems={ResearchSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/research/dashboard"}
        // addLink1={"/research/motion/new"}
        title1={"Research Services"}
      />

      <Modal show={showModal} size="lg" onHide={() => setShowModal(false)} centered>
        <div>
            <Modal.Header closeButton>
              <Modal.Title>
                Final Remarks
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    onChange={(e) => setChangeStatus(e.target.value)}
                    value={changeStatus ? changeStatus : selectedItem?.status}
                  >
                    <option value="" selected disabled hidden>
                      Select
                    </option>
                    <option value={"Received"}>Received</option>
                    <option value={"Request In Process"}>
                      Request In Process
                    </option>
                    <option value={"Delivered"}>Delivered</option>
                  </select>
                </div>

                <div className="col">
                    <label htmlFor="formFile" className="form-label">
                        Attachment
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      accept=".pdf, .jpg, .jpeg, .png"
                      id="Attachment"
                      name="Attachment"
                      onChange={(event) => {
                        setModalAttachment(event.target.files[0])
                      }}
                    />
                </div>
              </div>
              
              <div className="row">
                <div className="col">
                  <div>
                    <label className="form-label">Remarks</label>
                    <textarea
                      className={`form-control`}
                      id='remarks'
                      onChange={(e) => setModalRemarks(e.target.value)}
                      value={modalRemarks ? modalRemarks : selectedItem?.remarks}
                    ></textarea>
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button className="btn btn-primary" type="submit" onClick={() => hendleCompleted(selectedItem, changeStatus, modalAttachment)}>
                Submit
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </Modal.Footer>
        </div>
      </Modal>

      <div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-2">
              <div class="mb-3">
                {/* <label class="form-label">Status</label> */}
                <select
                  class="form-select"
                  id="active"
                  name="active"
                  onChange={handleStatus}
                  value={status}
                >
                  <option value={""}>All</option>
                  <option value={"Received"}>Received</option>
                  <option value={"Request In Process"}>
                    Request In Process
                  </option>
                  <option value={"Delivered"}>Delivered</option>
                </select>
              </div>
            </div>
          </div>

          <div class="card mt-1">
            <div class="row mt-5">
              <div class="col-12">
                <CustomTable
                  block={false}
                  data={researchService.length > 0 ? researchService : []}
                  // addBtnText={"Add Research Service"}
                  hidebtn1={true}
                  tableTitle="Research Services"
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  totalCount={count}
                  // handleAdd={() => navigate("/notice/research-services/addedit")}
                  handleEdit={(item) => {
                    setShowModal(true);
                    setSelectedItem(item);
                  }}
                  handleDelete={(item) => handleDelete(item.SR)}
                  showResolve={false}
                  hendleResolve={(item) => hendleCompleted(item)}
                  showEditIcon={true}
                  hideDeleteIcon={true}
                  showPrint={false}
                  handleView={(item) => handlePreview(`${imagesUrl}${item?.attachmentInternal}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default ResearchBRServices;
