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
  getAllBillStatus,
  getAllCommitteeRecommendation,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import AddEditCommitteeRecommendationModal from "../../../../../../components/AddEditCommitteeRecoomendationModal";
const AllManageCommitteeRecoomendation = () => {
  const navigate = useNavigate();
  const [commiteeRecommendations, setCommitteeRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [billStatusesData, setBillStatusesData] = useState([]);
  const [editRecommendationData, setEditRecommendationData] = useState(null);
  const [count, setCount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 10;
  console.log("editRecommendationData", editRecommendationData);
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
  // Transform COmmittee Recommendation
  const CommitteesRecommendationTransformData = (apiData) => {
    return apiData?.map((item) => ({
      id: item.id,
      committeeRecommendation: item?.committeeRecomendation,
      status: item?.committeeStatus,
    }));
  };

  //   Get Committee Recommendations
  const getCommitteeRecommendations = useCallback(async () => {
    try {
      const response = await getAllCommitteeRecommendation(
        currentPage,
        pageSize
      );

      const committeeRecommendationData = CommitteesRecommendationTransformData(
        response?.data?.manageCommitteeRecomendation
      );
      setCommitteeRecommendations(committeeRecommendationData);
      setCount(response?.data?.count);
    } catch (error) {
      console.log("Error", error);
    }
  }, [count, setCount, pageSize, currentPage]);

  useEffect(() => {
    getCommitteeRecommendations();
  }, [currentPage]);

  const handleEdit = (item) => {
    // console.log("edig", id);
    setEditRecommendationData(item);
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
        title1={"Committee Recomendation"}
      />
      {showModal && showModal && (
        <AddEditCommitteeRecommendationModal
          closeModal={closeModal}
          editRecommendationData={editRecommendationData}
          showModal={showModal}
          getCommitteeRecommendation={getCommitteeRecommendations}
        />
      )}

      <div className="row">
        <div className="col-12">
          <CustomTable
            singleDataCard={true}
            data={commiteeRecommendations}
            tableTitle="Committe Recommendation Data"
            addBtnText={"Add Committe Recommendation"}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            hideDeleteIcon={true}
            handleAdd={() => {
              setEditRecommendationData(null);
              openModal();
            }}
            handleEdit={(item) => {
              handleEdit(item);
            }}
            // handleDelete={() => {}}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllManageCommitteeRecoomendation;
