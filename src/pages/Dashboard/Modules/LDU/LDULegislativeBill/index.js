import React, { useCallback, useEffect, useState } from 'react'
import { Layout } from '../../../../../components/Layout';
import { ToastContainer } from 'react-toastify';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';
import Header from '../../../../../components/Header';
import { showErrorMessage, showSuccessMessage } from '../../../../../utils/ToastAlert';
import moment from 'moment';
import { DeleteLegislativeBill, getAllLegislativeBill } from '../../../../../api/APIs/Services/Notice.service';
import { useNavigate } from 'react-router-dom';
import { LDUSideBarItems } from '../../../../../utils/sideBarItems';

const LDULegislativeBill = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [billData, setBillData] = useState([]);
    const pageSize = 10;
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    const transformLegislativeData = (apiData) => {
      return apiData.map((item, index) => ({
        SR: item?.id,
        title: item?.title ? item?.title : "",
        sessionno: item?.session?.sessionName ? item?.session?.sessionName : "",
        date: item?.date ? moment(item?.date).format("DD-MM-YYYY") : "",
        description: item?.description ? item?.description : "",
        device: item?.device ? item?.device : "",
        status: item?.isActive ? item?.isActive : "",
      }));
    };
  
    const getAllLegislativeBillApi = useCallback(async () => {
      try {
        const response = await getAllLegislativeBill(currentPage, pageSize);
        if (response?.success) {
          setCount(response?.data?.count);
          const trensferData = transformLegislativeData(
            response?.data?.legislativeBills
          );
          setBillData(trensferData);
        }
      } catch (error) {
        showErrorMessage(error?.response?.data?.message);
      }
    }, [currentPage, pageSize, setCount, setBillData]);
  
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
    return (
      <Layout
        module={true}
        sidebarItems={LDUSideBarItems}
        centerlogohide={true}
      >
        <ToastContainer />
        <Header
          dashboardLink={"/ldu/dashboard"}
          addLink1={"/"}
          title1={"Legislative Bill"}
        />
        <div class="row mt-5">
          <div class="col-12">
            <CustomTable
              singleDataCard={true}
              block={false}
              data={billData}
              hidebtn1={false}
              addBtnText={"Create Legislative Bill"}
              tableTitle="Legislative Bill"
              handlePageChange={handlePageChange}
              hideBtn={false}
              currentPage={currentPage}
              pageSize={pageSize}
              headertitlebgColor={"#666"}
              headertitletextColor={"#FFF"}
              totalCount={count}
              // handleAdd={() => navigate("/notice/speech-on-demand/addedit")}
              handleEdit={(item) =>
                navigate("/ldu/legislative/ldu-legislative-bill/edit-bill", {
                  state: { id: item?.SR },
                })
              }
              handleDelete={(item) => handleDelete(item.SR)}
              ActionHide={false}
            />
          </div>
        </div>
      </Layout>
    );
}

export default LDULegislativeBill
