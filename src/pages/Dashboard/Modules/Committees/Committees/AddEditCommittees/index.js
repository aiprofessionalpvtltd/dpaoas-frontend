import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../components/Layout";
import {
  CommitteesSideBarItems,
  LegislationSideBarItems,
} from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { getAllParliamentaryYears } from "../../../../../../api/APIs/Services/ManageQMS.service";
import {
  createNewOrdinance,
  getSingleOrdinanceByID,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import { getUserData } from "../../../../../../api/Auth";
import { showSuccessMessage } from "../../../../../../utils/ToastAlert";
import moment from "moment";
import Select from "react-select";
function AddEditCommittees() {
  const location = useLocation();
  const { members } = useContext(AuthContext);
  const navigate = useNavigate();

  const userData = getUserData();

  const formik = useFormik({
    initialValues: {
      committeeName: "",
      committeeType: "",
      committeeRoom: "",
      chairperson_convener: "",
      committeeSecretery: "",
      members: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
      if (location?.state?.id) {
        //   handleEditBill(values);
        console.log(values);
      } else {
        // CreateOrdinance(values);
      }
    },
  });

  //   const CreateCommittee = async (values) => {
  //     const data = {
  //       fkParliamentaryYearId: values?.parliamentaryYear,
  //       fkSessionId: values?.session,
  //       fkUserId: userData && userData?.id,
  //       ordinanceTitle: values?.title,
  //       dateOfLayingInTheSenate: values?.dateOfLayingSenate && moment(values?.dateOfLayingSenate).format("YYYY-MM-DD"),
  //       dateOfLayingInTheNA: values?.dateOfLayingNA && moment(values?.dateOfLayingNA).format("YYYY-MM-DD"),
  //       fkOrdinanceStatus:1
  //     };

  //     try {
  //       const response = await createNewOrdinance(data);
  //       if (response?.success) {
  //         showSuccessMessage(response?.message);
  //         formik.resetForm();
  //         setTimeout(() => {
  //           navigate("/lgms/dashboard/ordinances/ordinance-list");
  //         }, [3000]);
  //       }
  //       console.log(response?.data);
  //     } catch (error) {}
  //   };

  return (
    <Layout
      module={true}
      sidebarItems={CommitteesSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/committees/dashboard"}
        addLink1={"/committees/dashboard"}
        title1={location?.state ? "Edit Committee" : "Add Committee"}
      />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg">
            <h1>{location?.state ? "Edit Committee" : "Create Committee"}</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Committee Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.committeeName &&
                        formik.errors.committeeName
                          ? "is-invalid"
                          : ""
                      }`}
                      id="committeeName"
                      value={formik.values.committeeName}
                      // placeholder={formik.values.committeeName}
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

                <div className="col-6">
                  <div className="mb-3">
                    <label class="form-label">Committee Type</label>
                    <select
                      // className="form-select"
                      id="committeeType"
                      name="committeeType"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.committeeType}
                      className={`form-select  ${
                        formik.touched.committeeType &&
                        formik.errors.committeeType
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      <option>Standing Committees</option>
                      <option>Functional Committees</option>
                      <option>Domestics Committees</option>
                      <option>Other Committees</option>
                      <option>Special Committee</option>
                    </select>
                    {formik.touched.committeeType &&
                      formik.errors.committeeType && (
                        <div className="invalid-feedback">
                          {formik.errors.committeeType}
                        </div>
                      )}
                  </div>
                </div>

                {/* <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Parliamentary Year</label>
                    <select
                      id="parliamentaryYear"
                      name="parliamentaryYear"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.parliamentaryYear}
                    >
                      <option value="" disabled hidden>
                        Select Parliamentary Year
                      </option>
                      {parliamentaryYearData &&
                        parliamentaryYearData.map((item) => (
                          <option value={item.id}>
                            {item.parliamentaryTenure}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Session</label>
                    <select
                      id="session"
                      name="session"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.session}
                    >
                      <option value="" disabled hidden>
                        Select Session
                      </option>
                      {sessions &&
                        sessions.map((item) => (
                          <option value={item.id}>{item.sessionName}</option>
                        ))}
                    </select>
                  </div>
                </div> */}
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label class="form-label">Committee Room</label>
                    <select
                      // className="form-select"
                      id="committeeRoom"
                      name="committeeRoom"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.committeeRoom}
                      className={`form-select  ${
                        formik.touched.committeeRoom &&
                        formik.errors.committeeRoom
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      <option> Committee Room 1</option>
                      <option> Committee Room 2</option>
                      <option> Committee Room 3</option>
                      <option> Committee Room 4</option>
                      <option> Committee Room 5</option>
                    </select>
                    {formik.touched.committeeRoom &&
                      formik.errors.committeeRoom && (
                        <div className="invalid-feedback">
                          {formik.errors.committeeRoom}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label class="form-label">Committee Chairperson</label>
                    <select
                      // className="form-select"
                      id="chairperson_convener"
                      name="chairperson_convener"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.chairperson_convener}
                      className={`form-select  ${
                        formik.touched.chairperson_convener &&
                        formik.errors.chairperson_convener
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      <option>Chairman</option>
                      <option>Deputy Chairman</option>
                      <option>Secretary</option>
                    </select>
                    {formik.touched.chairperson_convener &&
                      formik.errors.chairperson_convener && (
                        <div className="invalid-feedback">
                          {formik.errors.chairperson_convener}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label class="form-label">Committee Secretary</label>
                    <select
                      // className="form-select"
                      id="committeeSecretery"
                      name="committeeSecretery"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.committeeSecretery}
                      className={`form-select  ${
                        formik.touched.committeeSecretery &&
                        formik.errors.committeeSecretery
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      <option>Saqib Ali Khan</option>
                      <option>Mohsin Ali</option>
                      <option>Fayyaz khan</option>
                    </select>
                    {formik.touched.committeeSecretery &&
                      formik.errors.committeeSecretery && (
                        <div className="invalid-feedback">
                          {formik.errors.committeeSecretery}
                        </div>
                      )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Members</label>
                    <Select
                      options={
                        members &&
                        members?.map((item) => ({
                          value: item.id,
                          label: item?.memberName,
                        }))
                      }
                      onChange={(selectedOptions) => {
                        formik.setFieldValue("members", selectedOptions);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.members}
                      name="members"
                      isMulti
                      isClearable={true}
                      className={`.form-select`}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default AddEditCommittees;
