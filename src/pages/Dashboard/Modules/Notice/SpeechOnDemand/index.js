import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import Header from "../../../../../components/Header";
import { NoticeSidebarItems } from "../../../../../utils/sideBarItems";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import {
  DeleteSpeachOnDemand,
  getAllSpeachOnDemand,
} from "../../../../../api/APIs/Services/Notice.service";
import moment from "moment";

function CMSSpeechOnDemandDashboard() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [speechOnDemand, setSpeechOnDemand] = useState([]);
  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformSpeechOnDemandData = (apiData) => {
    return apiData.map((item, index) => ({
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

  const getAllSpeachOnDemandAPi = useCallback(async () => {
    try {
      const response = await getAllSpeachOnDemand(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const trensferData = transformSpeechOnDemandData(
          response?.data?.speechOnDemand
        );
        setSpeechOnDemand(trensferData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setSpeechOnDemand]);

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

  useEffect(() => {
    getAllSpeachOnDemandAPi();
  }, [currentPage]);
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        addLink1={"/notice/speech-on-demand/addedit"}
        title1={"Speech On Demand"}
      />
      <div>
        <div class="container-fluid">
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
                  handleEdit={(item) =>
                    navigate("/notice/speech-on-demand/addedit", {
                      state: { id: item?.SR },
                    })
                  }
                  handleDelete={(item) => handleDelete(item.SR)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default CMSSpeechOnDemandDashboard;
