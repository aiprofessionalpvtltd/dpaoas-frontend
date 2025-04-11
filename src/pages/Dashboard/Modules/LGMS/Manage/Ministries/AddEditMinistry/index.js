import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { Layout } from "../../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../components/Header";
import { UpdateCommittees } from "../../../../../../../api/APIs/Services/Committees.service";
import moment from "moment";
import Select from "react-select";
import { getAllTenures } from "../../../../../../../api/APIs/Services/ManageQMS.service";
import {
  createMinistery,
  getAllMinisterTenures,
  getSingleMinisteryByID,
  updateMinistery,
} from "../../../../../../../api/APIs/Services/LegislationModule.service";
const validationSchema = Yup.object({
  ministryName: Yup.string().required("Ministry name is required"),
  fkTenureId: Yup.string().required("Tenure is required"),
  // ministryStatus: Yup.string().required("Formation Date is required"),
});
function LGMSAddEditMinistries() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tenuresData, setTenuresData] = useState([]);
  const [singleMinsitryData, setSingleMinistryData] = useState([]);
  const [memberById, setMemberById] = useState();
  const [allparties, setAllParties] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("ministryStatus", date);
    setIsCalendarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      ministryName: "",
      fkTenureId: "",
      ministryStatus: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state?.id) {
        handleEditMinistry(values);
      } else {
        handleCreateMinsitry(values);
      }
    },
  });

  // Handle Tenures

  const handleTenures = async () => {
    try {
      const response = await getAllMinisterTenures(0, 5000, "Ministers");
      if (response?.success) {
        setTenuresData(response?.data?.tenures);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleCreateMinsitry = async (values) => {
    const data = {
      ministryName: values?.ministryName,
      fkMinisterTenureId: values?.fkTenureId?.value,
      ministryStatus: "Active",
    };

    try {
      const response = await createMinistery(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/lgms/dashboard/manage/ministries/list");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getSingleMinistryAPI = async () => {
    try {
      const response = await getSingleMinisteryByID(
        location.state?.id && location.state?.id
      );
      if (response?.success) {
        setSingleMinistryData(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    handleTenures();
    if (location?.state?.id) {
      getSingleMinistryAPI();
    }
  }, [location?.state?.id]);

  useEffect(() => {
    // Update form values when termsById changes
    if (singleMinsitryData) {
      formik.setValues({
        ministryName: singleMinsitryData[0]?.ministryName || "",
        fkTenureId: singleMinsitryData[0]?.tenuresMinisters
          ? {
              value: singleMinsitryData[0]?.tenuresMinisters?.id,
              label: singleMinsitryData[0]?.tenuresMinisters?.tenureName,
            }
          : "",
        ministryStatus: singleMinsitryData[0]?.ministryStatus || "",
      });
    }
  }, [singleMinsitryData, formik.setValues]);

  //  Handle Update Ministry
  const handleEditMinistry = async (values) => {
    const data = {
      ministryName: values.ministryName,
      fkMinisterTenureId: values.fkTenureId?.value,
      ministryStatus: values?.ministryStatus,
    };

    try {
      const response = await updateMinistery(
        location?.state?.id && location?.state?.id,
        data
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/lgms/dashboard/manage/ministries/list");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    // Update form values when termsById changes
    if (location?.state && location?.state) {
      formik.setValues({
        ministryName: location?.state?.ministryName || "",
        fkTenureId: location?.state?.CommitteeType || "",
        ministryStatus:
          (location?.state?.ministryStatus &&
            moment(location?.state?.ministryStatus, "DD-MM-YYYY").toDate()) ||
          "",
      });
    }
  }, [memberById, formik.setValues]);

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/lgms/dashboard"}
        // addLink1={"/lgms/dashboard/manage/members/list"}
        title1={"Minstries List"}
        // addLink2={"/lgms/dashboard/manage/members/addedit"}
        title2={location && location?.state ? "Edit Ministry" : "Add Ministry"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Ministry</h1>
            ) : (
              <h1>Add Ministry</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Ministry Name</label>
                      <input
                        type="text"
                        placeholder={"Minsitry Name"}
                        value={formik.values.ministryName}
                        className={`form-control ${
                          formik.touched.ministryName &&
                          formik.errors.ministryName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="ministryName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.ministryName &&
                        formik.errors.ministryName && (
                          <div className="invalid-feedback">
                            {formik.errors.ministryName}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="form-group col">
                    <label className="form-label">Ministrie's Tenure </label>
                    <Select
                      options={
                        Array.isArray(tenuresData) && tenuresData?.length > 0
                          ? tenuresData.map((item) => ({
                              value: item?.id,
                              label: `${item?.tenureName} (${item?.tenureType})`,
                              tenureType: item?.tenureType,
                            }))
                          : []
                      }
                      onChange={(selectedOptions) =>
                        formik.setFieldValue("fkTenureId", selectedOptions)
                      }
                      onBlur={formik.handleBlur}
                      value={formik.values.fkTenureId}
                      id="fkTenureId"
                      name="fkTenureId"
                      isClearable={true}
                    />
                    {formik.touched.fkTenureId && formik.errors.fkTenureId && (
                      <div className="invalid-feedback">
                        {formik.errors.fkTenureId}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  {location?.state?.id && (
                    <div className="form-group col-6">
                      <label className="form-label">Select Status</label>
                      <select
                        // className="form-select"
                        id="ministryStatus"
                        name="ministryStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ministryStatus}
                        className={`form-select  ${
                          formik.touched.ministryStatus &&
                          formik.errors.ministryStatus
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value={"active"}>Active</option>
                        <option value={"inactive"}>InActive</option>
                      </select>
                      {formik.touched.ministryStatus &&
                        formik.errors.ministryStatus && (
                          <div className="invalid-feedback">
                            {formik.errors.ministryStatus}
                          </div>
                        )}
                    </div>
                  )}
                </div>

                <div class="row">
                  <div class="col">
                    <button class="btn btn-primary float-end" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LGMSAddEditMinistries;
