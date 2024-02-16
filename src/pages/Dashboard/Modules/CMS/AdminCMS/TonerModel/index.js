import { useCallback, useEffect, useState } from "react";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { CMSsidebarItems } from "../../../../../../utils/sideBarItems";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { useFormik } from "formik";
import { date } from "yup";
import {
  getAllTonerModels,
  getTonersModelById,
  searchTonerModels,
  tonerModelDelete,
} from "../../../../../../api/APIs/Services/TonerInstallation.service";

function CMSTonerModels() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [tonerModels, setTonerModels] = useState([]);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  //Getting Toner Models

  const transformTonerModelsData = (apiData) => {
    return apiData.map((model) => ({
      id: model?.id,
      TonerName: model?.tonerModel,
      TonnerDescription: model?.description,
      Status: model?.status,
    }));
  };

  // Searching Toner Model
  // const formik = useFormik({
  //   initialValues: {
  //     tonerModel: "",
  //   },
  //   onSubmit: (values) => {
  //     SearchTonerModelApi(values);
  //   },
  // });
  // //  Getting All Toner Models Here
  const getTonerModelApi = useCallback(async () => {
    try {
      const response = await getAllTonerModels(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformTonerModelsData(
          response?.data?.tonerModels
        );
        setCount(response?.data?.count);
        setTonerModels(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setTonerModels]);

  useEffect(() => {
    getTonerModelApi();
  }, [getTonerModelApi]);

  //   Getting Single Toner Model BY ID For Update
  const hendleEdit = async (id) => {
    try {
      const response = await getTonersModelById(id);
      if (response?.success) {
        navigate("/cms/admin/toner-models/addedit", {
          state: response?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Single Record of Toner Model

  const handleDelete = async (id) => {
    try {
      const response = await tonerModelDelete(id);
      if (response?.success) {
        showSuccessMessage(response?.message);
        getTonerModelApi();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  // Searching Tonner Model
  const SearchTonerModelApi = useCallback(
    async (data) => {
      try {
        const response = await searchTonerModels(data); // Add await here
        if (response?.success) {
          if (response?.data.length > 0) {
            const transformedData = transformTonerModelsData(response?.data);
            setTonerModels(transformedData);
          } else {
            getTonerModelApi();
          }
        }
      } catch (error) {
        showErrorMessage(error?.response?.data?.message);
      }
    },
    [setTonerModels]
  );

  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header dashboardLink={"/cms/admin/toner-models"} />
      <ToastContainer />
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={tonerModels}
            tableTitle={"Toner Model Information"}
            hideBtn={false}
            addBtnText={"Add Toner Model"}
            handleAdd={() => navigate("/cms/admin/toner-models/addedit")}
            singleDataCard={true}
            ActionHide={false}
            // hideDeleteIcon={true}
            hideEditIcon={false}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            handlePageChange={handlePageChange}
            seachBarShow={true}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={count}
            handleEdit={(item) => hendleEdit(item.id)}
            handleDelete={(item) => handleDelete(item.id)}
            searchonchange={(e) => SearchTonerModelApi(e.target.value)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default CMSTonerModels;
