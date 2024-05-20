import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import {
  NoticeSidebarItems,
  TelecastingSideBarItems,
} from "../../../../../utils/sideBarItems";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import {
  DeleteSpeachOnDemand,
  UpdateSpeachOnDemand,
  getAllSpeachOnDemand,
  getSpeachOnDemandById,
} from "../../../../../api/APIs/Services/Notice.service";
import moment from "moment";
import { getUserData } from "../../../../../api/Auth";
import axios from "axios";
import { Modal } from "react-bootstrap";

function TelecastingSpeechOnDemand() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [speechOnDemand, setSpeechOnDemand] = useState([]);
  const [demandStatus, setDemandStatus] = useState("All");
  const [changeStatus, setChangeStatus] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 10;
  const location = useLocation();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformSpeechOnDemandData = (apiData) => {
    return apiData.map((item, index) => ({
      isEditable: item.isEditable,
      internalId: item?.session?.id ? item?.session?.id : "",
      SR: item?.id,
      sessionno: item?.session?.sessionName ? item?.session?.sessionName : "",
      fromdate: item?.date_from
        ? moment(item?.date_from).format("DD-MM-YYYY")
        : "",
      todate: item?.date_to ? moment(item?.date_to).format("DD-MM-YYYY") : "",
      deliverOn: item?.delivery_on ? item?.delivery_on : "",
      whatsappnumber: item?.whatsapp_number ? item?.whatsapp_number : "",
      justification: item?.justification ? item?.justification : "",
      status: item?.isActive ? item?.isActive : "",
    }));
  };

  const getAllSpeachOnDemandAPi = async () => {
    try {
      const response = await getAllSpeachOnDemand(
        currentPage,
        pageSize,
        demandStatus
      );
      if (response?.success) {
        setCount(response?.data?.count);
        const speechData = response?.data?.speechOnDemand || []; // If empty, set to empty array
        const transferData = transformSpeechOnDemandData(speechData);
        setSpeechOnDemand(transferData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteSpeachOnDemand(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllSpeachOnDemandAPi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };
  const HendleCompleted = async (item, status) => {
    const data = {
      isActive: status,
      isEditable: status === "Delivered" ? false : true,
      fkSessionNo: item?.internalId,
      date_to: item?.todate,
      date_from: item?.fromdate,
      delivery_on: item?.deliverOn,
      whatsapp_number: item?.whatsappnumber,
      justification: item?.justification,
      is_certified: true,
    };
    try {
      const response = await UpdateSpeachOnDemand(item?.SR, data);
      if (response.success) {
        setShowModal(false);
        setDemandStatus("")
        showSuccessMessage(response.message);
        getAllSpeachOnDemandAPi();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setDemandStatus(location?.state ? location?.state?.status : "");
  }, []);

  useEffect(() => {
    getAllSpeachOnDemandAPi();
  }, [demandStatus, currentPage]);

  const handleDownload = async (fileUrl) => {
    // Check if fileUrl exists
    if (!fileUrl) return;
  
    // Extract the filename from the fileUrl
    const filename = fileUrl.split('/').pop();
  
    try {
      // Perform the download
      const response = await axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'blob', // Important for handling binary data like files
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Set the filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up after download
  
    } catch (error) {
      // If there's an error (e.g., URL not found), show an alert message
      showErrorMessage('The URL is not correct or the file could not be found.');
    }
  };

  const handleStatus = (e) => {
    setDemandStatus(e.target.value);
  };

  const printFile = async (id) =>  {
    try {
      const response = await getSpeachOnDemandById(id);
      if (response.success) {
        handleDownload(`http://172.16.170.8:5252${response?.data?.fileLink}`)
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  return (
    <Layout
      module={true}
      sidebarItems={TelecastingSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/speech-on-demand/addedit"}
        title1={"Speech On Demand"}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <div>
            <Modal.Header closeButton>
              <Modal.Title>
                Edit Status
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
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
                  <option value={"Waiting For Approval"}>
                    Waiting For Approval
                  </option>
                  <option value={"Request In Process"}>
                    Request In Process
                  </option>
                  <option value={"Delivered"}>Delivered</option>
                </select>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button className="btn btn-primary" type="submit" onClick={() => HendleCompleted(selectedItem, changeStatus)}>
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
                  value={demandStatus}
                >
                  <option value={""}>All</option>
                  <option value={"Waiting For Approval"}>
                    Waiting For Approval
                  </option>
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
                  data={speechOnDemand}
                  hidebtn1={true}
                  // addBtnText={"Create Speech On Demand"}
                  tableTitle="Speech On Demand"
                  handlePageChange={handlePageChange}
                  hideBtn={true}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  totalCount={count}
                  // handleAdd={() => navigate("/notice/speech-on-demand/addedit")}
                  handleEdit={(item) =>{
                    setShowModal(true);
                    setSelectedItem(item);
                  }}
                  showResolve={false}
                  showEditIcon={true}
                  hideDeleteIcon={true}
                  hendleResolve={(item) => HendleCompleted(item)}
                  handleDelete={(item) => handleDelete(item.SR)}
                  showPrint={true}
                  handlePrint={(item) =>
                    printFile(item?.SR)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default TelecastingSpeechOnDemand;
