import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import { ToastContainer } from "react-toastify";
import Header from "../../../../../../components/Header";
import Modal from "react-bootstrap/Modal";
import {
  createBillNewStatus,
  getAllBillStatus,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import { useFormik } from "formik";
import AddEditBillsStatusModal from "../../../../../../components/AddEditBillsStatusModal";
const AllBillStatuses = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [billStatusesData, setBillStatusesData] = useState([]);
  const [editStatusData, setEditStatusData] = useState(null);
  const [count, setCount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 10;
  console.log("editStatusData", editStatusData);
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const billTransfromData = (apiData) => {
    return apiData?.map((item) => ({
      id: item.id,
      billStatusName: item.billStatusName,
      billStatus: item.billStatus,
    }));
  };

  const GetBillStatusesAPi = useCallback(async () => {
    try {
      const response = await getAllBillStatus(currentPage, pageSize);

      const billData = billTransfromData(response?.data?.billStatus);
      setBillStatusesData(billData);
      setCount(response?.data?.count);
    } catch (error) {
      console.log("Error", error);
    }
  }, [count, setCount, pageSize, currentPage]);

  useEffect(() => {
    GetBillStatusesAPi();
  }, [currentPage]);

  const handleEdit = (item) => {
    // console.log("edig", id);
    setEditStatusData(item);
    openModal();
  };

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/lis/dashboard"}
        addLink1={"/lis/dashboard/manage/bill-statuses"}
        title1={"Bill Statuses"}
      />

      {/* <Modal show={showModal} onHide={closeModal} centered>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editStatusData && editStatusData?.id
                  ? "Edit Status"
                  : "New Status"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  placeholder={"description"}
                  class={`form-control`}
                  value={formik?.values?.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="description"
                  name="description"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.status}
                >
                  <option value="" selected disabled hidden>
                    Select
                  </option>
                  <option value={"Active"}>Active</option>
                  <option value={"InActive"}>InActive</option>
                </select>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
            </Modal.Footer>
          </form>
        </div>
      </Modal> */}
      {showModal && showModal && (
        <AddEditBillsStatusModal
          closeModal={closeModal}
          editStatusData={editStatusData}
          showModal={showModal}
          GetBillStatusesAPi={GetBillStatusesAPi}
        />
      )}

      <div className="row">
        <div className="col-12">
          <CustomTable
            singleDataCard={true}
            data={billStatusesData}
            tableTitle="Bill Status"
            addBtnText={"Add Bill Status"}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            handleAdd={() => {
              setEditStatusData(null);
              openModal();
            }}
            handleEdit={(item) => {
              handleEdit(item);
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllBillStatuses;
