import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
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
import { createCommittees } from "../../../../../../../api/APIs/Services/Committees.service";

const validationSchema = Yup.object({
  committeeName: Yup.string().required("Committee name is required"),
  committeeType: Yup.string().required("Committee type is required"),
  formationDate: Yup.string().required("Formation Date is required"),
});
function LGMSAddEditCommitteesRecommendation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tenures, setTenures] = useState([]);

  const [memberById, setMemberById] = useState();
  const [allparties, setAllParties] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("formationDate", date);
    setIsCalendarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      committeeName: "",
      committeeType: "",
      formationDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state) {
        handleEditMembers(values);
      } else {
        handleCreateCommittee(values);
      }
    },
  });

  const handleCreateCommittee = async (values) => {
    const data = {
      committeeName: values?.committeeName,
      committeeType: values?.committeeType,
      formationDate: values?.formationDate,
    };

    try {
      const response = await createCommittees(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        // setTimeout(() => {
        //   navigate("/qms/manage/members");
        // }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleEditMembers = async (values) => {
    const data = {
      committeeName: values.committeeName,
      committeeType: values.committeeType,
      formationDate: values?.formationDate,
    };

    // try {
    //   const response = await updateMembers(location?.state?.id, data);
    //   if (response?.success) {
    //     showSuccessMessage(response?.message);
    //     // setTimeout(() => {
    //     //   navigate("/qms/manage/members");
    //     // }, 3000);
    //   }
    // } catch (error) {
    //   showErrorMessage(error?.response?.data?.message);
    // }
  };

  useEffect(() => {
    // Update form values when termsById changes
    if (memberById) {
      formik.setValues({
        committeeName: memberById.committeeName || "",
        committeeType: memberById.committeeType || "",
        formationDate: memberById?.formationDate,
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
        title1={"Committees Recommendation"}
        // addLink2={"/lgms/dashboard/manage/members/addedit"}
        title2={
          location && location?.state
            ? "Edit Committees Recommendation"
            : "Add Committees Recommendation"
        }
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Committees Recommendation</h1>
            ) : (
              <h1>Add Committees Recommendation</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Committee Name</label>
                      <input
                        type="text"
                        placeholder={"Committee Name"}
                        value={formik.values.committeeName}
                        className={`form-control ${
                          formik.touched.committeeName &&
                          formik.errors.committeeName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="committeeName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.committeeName &&
                        formik.errors.committeeName && (
                          <div className="invalid-feedback">
                            {formik.errors.committeeName}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="form-group col">
                    <label className="form-label">Committee Type</label>
                    <select
                      className={`form-select  ${
                        formik.touched.committeeType &&
                        formik.errors.committeeType
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.committeeType}
                      id="committeeType"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" selected disabled hidden>
                        Select
                      </option>
                      <option value="Sub Committees">Sub Committees</option>
                      <option value="Mediation Committees">
                        Mediation Committees
                      </option>
                      <option value="Functional Committees">
                        Functional Committees
                      </option>
                      <option value="Standing Committees">
                        Standing Committees
                      </option>
                      <option value="Committee on Rules of Procedure and Privileges">
                        Committee on Rules of Procedure and Privileges
                      </option>
                      <option value="Mediation">Mediation</option>
                      <option value="Special Committee">
                        Special Committee
                      </option>
                    </select>
                    {formik.touched.committeeType &&
                      formik.errors.committeeType && (
                        <div className="invalid-feedback">
                          {formik.errors.committeeType}
                        </div>
                      )}
                  </div>

                  <div className="col">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Formation Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                          cursor: "pointer",
                        }}
                        onClick={handleCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>

                      <DatePicker
                        selected={formik.values.formationDate}
                        onChange={handleDateSelect}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.formationDate &&
                          formik.errors.formationDate
                            ? "is-invalid"
                            : ""
                        }`}
                        open={isCalendarOpen}
                        onClickOutside={() => setIsCalendarOpen(false)}
                        onInputClick={handleCalendarToggle}
                        // onClick={handleCalendarToggle}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />

                      {formik.touched.formationDate &&
                        formik.errors.formationDate && (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {formik.errors.formationDate}
                          </div>
                        )}
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

export default LGMSAddEditCommitteesRecommendation;
