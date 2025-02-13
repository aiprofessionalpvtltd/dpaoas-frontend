import React, { useCallback, useEffect, useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../utils/sideBarItems";
import {
  DeleteLegislativeBill,
  getAllLegislativeBill,
} from "../../../../../api/APIs/Services/Notice.service";
import Header from "../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import BillAttachedDocsModal from "../../../../../components/BillAttachedDocsModal";
import { SendNoticePrivateBillToTransaltion } from "../../../../../api/APIs/Services/LegislationModule.service";

function LGMSPrivateBill() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [billData, setBillData] = useState([]);
  const pageSize = 10;
  const [selectedbillFrom, setSelectedFrom] = useState(null);
  const [remarksAttachmentVal, setRemarksAttachmentVal] = useState();
  const [showModal, setShowModal] = useState(false);
  const [attachDocs, setAttachDocs] = useState([]);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformNoticePrivateMemberBillSenate = (apiData) => {
    const docs = apiData?.map((item) => item?.billDocumentsLegis);
    if (docs?.length > 0) {
      setRemarksAttachmentVal(true);
    } else {
      setRemarksAttachmentVal(false);
    }
    return apiData?.map((item, index) => ({
      SNo: index + 1,
      id: item.id,
      fileNumber: item?.fileNumber,
      TitleOfTheBill: item?.title,
      nameOfMovers:
        item?.legislationMovers?.[0]?.mna?.mnaName ||
        item?.legislationMovers
          ?.map((mover) => mover?.member?.memberName)
          .join(", ") ||
        "",
      dateOfNotice: item?.noticeDate
        ? moment(item?.noticeDate, "YYYY-MM-DD").format("DD-MM-YYYY")
        : "---",
      dateOfIntroductionReferenceToStandingCommittee: item
        ?.introducedInHousesLegis?.introducedInHouseDate
        ? moment(
            item?.introducedInHousesLegis?.introducedInHouseDate,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",

      dateOfPresentationOfTheReport: item?.introducedInHousesLegis
        ?.reportPresentationDate
        ? moment(
            item?.introducedInHousesLegis?.reportPresentationDate,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",
      dateOfNoticeForPassageUnderRule100: item?.memberPassagesLegis
        ?.memeberNoticeDate
        ? moment(
            item?.memberPassagesLegis?.memeberNoticeDate,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",
      dateOfConsiderationOfTheBillBySenate: item?.memberPassagesLegis
        ?.dateOfConsiderationBill
        ? moment(
            item?.memberPassagesLegis?.dateOfConsiderationBill,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY")
        : "---",
      dateOfPassingTheBillByTheSenate: item?.dateOfPassageBySenate
        ? moment(item?.dateOfPassageBySenate, "YYYY-MM-DD").format("DD-MM-YYYY")
        : "---",
      dateOnWhichTheBillTransmittedToNA: item?.dateOfTransmissionToNA
        ? moment(item?.dateOfTransmissionToNA, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )
        : "---",
      billCategory: item?.billCategory,
      billFrom: item?.billFrom,
      remarks: item?.billRemarks,
      billDocuments: item?.billDocumentsLegis,
    }));
  };
  const getAllLegislativeBillApi = useCallback(async () => {
    try {
      const response = await getAllLegislativeBill(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const trensferData = transformNoticePrivateMemberBillSenate(
          response?.data?.legislativeBills
        );
        setBillData(trensferData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setBillData]);

  // Handle Edit Senate Bills
  const handleEditNoticeSenateBill = (id, item) => {
    navigate("/lgms/dashboard/notice-office/bills/edit-private-senate-bills", {
      state: { id, item, forPerson: "Senators" },
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteLegislativeBill(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllLegislativeBillApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllLegislativeBillApi();
  }, [currentPage]);

  const handleViewAttach = (item) => {
    setAttachDocs(item?.billDocuments);
    openModal();
  };

  const sendBilltoTranslation = async (id) => {
    try {
      const response = await SendNoticePrivateBillToTransaltion(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllLegislativeBillApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/"}
        title1={"Private Member Bills"}
      />
      {showModal && showModal && (
        <BillAttachedDocsModal
          showModal={showModal}
          AttachDocsData={attachDocs}
          closeModal={closeModal}
        />
      )}
      <div class="row mt-5">
        <div class="col-12">
          <CustomTable
            singleDataCard={true}
            block={false}
            data={billData}
            hidebtn1={true}
            // addBtnText={"Create Speech On Demand"}
            tableTitle="Private Member Bills"
            handlePageChange={handlePageChange}
            hideBtn={true}
            currentPage={currentPage}
            pageSize={pageSize}
            remarksAttachmentVal={remarksAttachmentVal}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            // handleAdd={() => navigate("/notice/speech-on-demand/addedit")}
            // handleEdit={(item) =>
            //   navigate(
            //     "/lgms/dashboard/notice-office/bills/edit-private-senate-bills",
            //     {
            //       state: { id: item?.SR },
            //     }
            //   )
            // }
            handleEdit={(item) => {
              item?.billFrom === "From Senate"
                ? handleEditNoticeSenateBill(item?.id, item)
                : handleEditNoticeSenateBill(item?.id, item);
            }}
            // handleDelete={(item) => handleDelete(item.SR)}
            hideDeleteIcon={true}
            ActionHide={false}
            isRemarksAttachhments={remarksAttachmentVal}
            handleViewAttachment={(item) => {
              handleViewAttach(item);
            }}
            showSent={true}
            handleSent={(item) => sendBilltoTranslation(item?.id)}
          />
        </div>
      </div>
    </Layout>
  );
}
export default LGMSPrivateBill;
