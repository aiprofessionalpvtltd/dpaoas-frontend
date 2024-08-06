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
  DeleteBillStatus,
  createBillNewStatus,
  getAllBillStatus,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import { useFormik } from "formik";
import AddEditBillsStatusModal from "../../../../../../components/AddEditBillsStatusModal";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { getCommittees } from "../../../../../../api/APIs/Services/Committees.service";
const LGMSCommitteess = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [committeesData, setCommitteesData] = useState([]);
  const [editStatusData, setEditStatusData] = useState(null);
  const [count, setCount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 10;
  console.log("editStatusData", editStatusData);
  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const CommitteesTransformData = (apiData) => {
    return apiData?.map((item) => ({
      id: item.id,
      committeeName: item.committeeName,
      CommitteeType: item.committeeType,
      formationDate:
        item.fromationDate && moment(item?.fromationDate).format("DD-MM-YYYY"),
      committeeStatus: item?.committeeStatus,
    }));
  };

  const getCommitteesApi = useCallback(async () => {
    try {
      const response = await getCommittees(currentPage, pageSize);

      const committeeData = CommitteesTransformData(
        response?.data?.manageCommittees
      );
      setCommitteesData(committeeData);
      setCount(response?.data?.count);
    } catch (error) {
      console.log("Error", error);
    }
  }, [count, setCount, pageSize, currentPage]);

  useEffect(() => {
    getCommitteesApi();
  }, [currentPage]);

  //   const handleEdit = (item) => {
  //     // console.log("edig", id);
  //     setEditStatusData(item);
  //     openModal();
  //   };

  //   const handleDeleteBillStatus = async (id) => {
  //     try {
  //       const resposne = await DeleteBillStatus(id);
  //       if (resposne?.success) {
  //         showSuccessMessage(resposne?.message);
  //         getCommitteesApi();
  //       }
  //     } catch (error) {
  //       showErrorMessage(error?.message);
  //     }
  //   };

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard/manage/committees/list"}
        title1={"Committees"}
      />

      <div className="row">
        <div className="col-12">
          <CustomTable
            singleDataCard={true}
            data={committeesData}
            tableTitle="Committees"
            addBtnText={"Add Committee"}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            hideDeleteIcon={true}
            handleAdd={() => {
              navigate("/lgms/dashboard/bill/manage-committeess/addedit");
            }}
            handleEdit={(item) => {
              navigate("/lgms/dashboard/bill/manage-committeess/addedit", {
                state: item,
              });
              //   handleEdit(item);
            }}
            // handleDelete={(item) => {
            //   handleDeleteBillStatus(item?.id);
            // }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default LGMSCommitteess;
