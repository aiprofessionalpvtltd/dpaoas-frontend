import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { Layout } from "../../../../../components/Layout";
import { CMSsidebarItems, SMSsidebarItems } from "../../../../../utils/sideBarItems";
import Header from "../../../../../components/Header";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import { showErrorMessage, showSuccessMessage } from "../../../../../utils/ToastAlert";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { getAllInventory, searchInventory } from "../../../../../api/APIs";

function SMSInventoryDashboard() {
  const navigation = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [inventoryData, setInventoryData] = useState([]);
  const pageSize = 4; // Set your desired page size

  const formik = useFormik({
    initialValues: {
      productName: "",
      assignedToUser: "",
      keyword: "",
      labelNo: "",
      assignedDate: "",
    },
    onSubmit: (values) => {
      SearchInventoryApi(values);
    },
  });

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformInventoryData = (apiData) => {
    console.log(apiData);
    return apiData.map((leave) => ({
      id: leave?.id,
      productName: leave?.productName,
      serialNo: leave?.serialNo,
      assignedToUser: `${leave?.assignedToUser?.employee?.firstName}${leave?.assignedToUser?.employee?.lastName}`,
      description: leave?.description,
      quantity: leave?.quantity,
      status: JSON.stringify(leave?.status),
      assignedDate: moment(leave?.assignedDate).format("YYYY/MM/DD"),
      //   contactMembers: leave?.contactMembers[0]?.member.memberName
    }));
  };

  const getInventoryApi = useCallback(async () => {
    try {
      const response = await getAllInventory(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformInventoryData(response?.data?.inventories);
        setCount(response?.data?.count);
        setInventoryData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setInventoryData]);

  const SearchInventoryApi = async (values) => {
    const Data = {
      productName: values.productName,
      assignedToUser: values.assignedToUser.value,
      keyword: values.keyword,
      serialNo: values.labelNo,
      assignedDate: values.assignedDate,
    };
    try {
      const response = await searchInventory(Data);
      if (response?.success) {
        const transformedData = transformInventoryData(response?.data);
        setCount(response?.count);
        setInventoryData(transformedData);
        showSuccessMessage(response?.message);
        console.log("Datattattata", response?.message);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.error);
    }
  };

  useEffect(
    () => {
      getInventoryApi();
    },
    { getInventoryApi }
  );
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
                      id="productName "
                      placeholder={formik.values.productName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Assigned User</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder={formik.values.assignedToUser}
                      className={"form-control"}
                      id="assignedToUser "
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Keyword</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder={formik.values.keyword}
                      className={"form-control"}
                      id="keyword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-4">
                  <div class="mb-3" style={{ position: "relative" }}>
                    <label class="form-label">Assigned Date</label>
                    <span
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "36px",
                        zIndex: 1,
                        fontSize: "20px",
                        zIndex: "1",
                        color: "#666",
                      }}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                    <DatePicker
                      minDate={new Date()}
                      selected={formik.values.assignedDate}
                      onChange={(date) => formik.setFieldValue("assignedDate", date)}
                      className={"form-control"}
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Serial No</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder={formik.values.labelNo}
                      className={"form-control"}
                      id="labelNo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end col">
                  <button class="btn btn-primary" type="submit">
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
                  //   hideBtn={true}
                  addBtnText={"Add Inventory"}
                  singleDataCard={true}
                  ActionHide={true}
                  hideDeleteIcon={true}
                  hideEditIcon={true}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalCount={count}
                  handleAdd={() => navigation("/cms/admin/inventory/dashboard/add")}
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
