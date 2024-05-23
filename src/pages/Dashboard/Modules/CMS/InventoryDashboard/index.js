import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { Layout } from "../../../../../components/Layout";
import { CMSsidebarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import {
  getAllInventory,
  getInventoryById,
  inventoryDelete,
  searchInventory,
} from "../../../../../api/APIs/Services/Complaint.service";

function SMSInventoryDashboard() {
  const navigation = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [inventoryData, setInventoryData] = useState([]);
  const pageSize = 10; // Set your desired page size

  const formik = useFormik({
    initialValues: {
      productName: "",
      labelNo: "",
    },
    onSubmit: async (values, { resetForm }) => {
      // Handle form submission here
      await SearchInventoryApi(values, { resetForm });
    },
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformInventoryData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      productName: item?.productName,
      serialNo: item?.serialNo,
      invoiceNumber: item?.invoiceNumber?.invoiceNumber,
      manufacturer: item?.manufacturer,
      productCategories: item?.productCategories,
      barCodeLable: item?.barCodeLable,
      barCodeLable: item?.barCodeLable,
      purchasedDate: moment(item?.purchasedDate).format("MM/DD/YYYY"),
      warrantyExpiredDate: moment(item?.warrantyExpiredDate).format(
        "MM/DD/YYYY"
      ),
      status: item?.status,
    }));
  };

  const getInventoryList = useCallback(async () => {
    try {
      const response = await getAllInventory(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const transformedData = transformInventoryData(
          response?.data?.inventories
        );
        setInventoryData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setInventoryData]);

  const SearchInventoryApi = async (values) => {
    const Data = {
      productName: values.productName,
      serialNo: values.labelNo,
    };
    try {
      const response = await searchInventory(Data);
      if (response?.success) {
        const transformedData = transformInventoryData(response?.data);
        setCount(1);
        setInventoryData(transformedData);
        showSuccessMessage(response?.message);
        formik.resetForm();
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  const hendleDelete = async (id) => {
    try {
      const response = await inventoryDelete(id);
      if (response?.success) {
        showSuccessMessage(response?.message);
        getInventoryList();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const hendleEdit = async (id) => {
    try {
      const response = await getInventoryById(id);
      if (response?.success) {
        navigation("/cms/admin/inventory/dashboard/add", {
          state: response.data,
        });
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getInventoryList();
  }, [getInventoryList]);
  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header dashboardLink={"/sms/dashboard"} />
      <ToastContainer />
      <div class="mt-3">
        <div class="container-fluid ">
          <div className="dash-detail-container" style={{ padding: "25px" }}>
            <form onSubmit={formik.handleSubmit}>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Product Name</label>
                    <input
                      type="text"
                      className={"form-control"}
                      id="productName"
                      value={formik.values.productName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Serial No</label>
                    <input
                      class="form-control"
                      type="text"
                      value={formik.values.labelNo}
                      className={"form-control"}
                      id="labelNo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                  <button className="btn btn-primary" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>

            <div class="row mt-5">
              <div class="col-12">
                <CustomTable
                  data={inventoryData}
                  tableTitle={"Inventory Information"}
                  addBtnText={"Add Inventory"}
                  hideDeleteIcon={false}
                  hideEditIcon={false}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalCount={count}
                  handleAdd={() =>
                    navigation("/cms/admin/inventory/dashboard/add")
                  }
                  handleDelete={(item) => hendleDelete(item.id)}
                  handleEdit={(item) => hendleEdit(item.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SMSInventoryDashboard;
