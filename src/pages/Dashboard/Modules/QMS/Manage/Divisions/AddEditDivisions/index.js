import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../../utils/sideBarItems";
import { createDivision, getDivisionsByID, updateDivisions } from "../../../../../../../api/APIs/Services/ManageQMS.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  ministry: Yup.string().required("Ministry is required"),
  division: Yup.string().required("Division is required"),
  active: Yup.boolean().required("Status is required"),
});
function QMSAddEditDivisionsForm() {
  const location = useLocation();
  const [divisionById, setDivisionById] = useState();

  const formik = useFormik({
    initialValues: {
      ministry: '',
      division: '',
      active: false
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state) {
        handleEditDivision(values);
      } else {
        handleCreateDivision(values);
      }
    },
  });

  const handleCreateDivision = async (values) => {
    const data = {
      fkMinistryId: Number(values.ministry),
      divisionName: values.division,
      divisionStatus: values.active
    }

    try {
      const response = await createDivision(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleEditDivision = async (values) => {
    const data = {
      fkMinistryId: Number(values.ministry),
      divisionName: values.division,
      divisionStatus: values.active
    }

    try {
      const response = await updateDivisions(location?.state?.id, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const getDivisionByIdApi = async () => {
    try {
      const response = await getDivisionsByID(location.state?.id);
      if (response?.success) {
        setDivisionById(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getDivisionByIdApi();
    }
  }, [])

  useEffect(() => {
    // Update form values when termsById changes
    if (divisionById) {
      formik.setValues({
        ministry: divisionById.fkMinistryId || "",
        division: divisionById.divisionName || "",
        active: divisionById.divisionStatus || false,
      });
    }
  }, [divisionById, formik.setValues]);

  return (
    <Layout
      module={true}
      sidebarItems={QMSSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/qms/dashboard"}
        addLink1={"/qms/manage/divisions"}
        title1={"Divisions"}
        addLink2={"/qms/manage/divisions/addedit"}
        title2={location && location?.state ? "Edit Divisions" : "Add Divisions"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Divisions</h1>
            ) : (
              <h1>Add Divisions</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Division</label>
                      <input
                        type="text"
                        placeholder={"Division"}
                        value={formik.values.division}
                        className={`form-control ${
                          formik.touched.division && formik.errors.division ? "is-invalid" : ""
                        }`}
                        id="division"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.division && formik.errors.division && (
                        <div className="invalid-feedback">{formik.errors.division}</div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Ministry</label>
                      <select class="form-select"
                        id="ministry"
                        name="ministry"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ministry}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                          <option value="1">Ministry1</option>
                          <option value="2">Ministry2</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Active</label>
                      <select class="form-select"
                        id="active"
                        name="active"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.active}
                      >
                        <option value={""} selected disabled hidden>
                          select
                        </option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                      </select>
                    </div>
                  </div>
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

export default QMSAddEditDivisionsForm;
