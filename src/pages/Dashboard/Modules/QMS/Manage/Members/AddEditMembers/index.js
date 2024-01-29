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
import { showErrorMessage, showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import { createMember, getAllTenures, getMembersByID, updateMembers } from "../../../../../../../api/APIs";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  memberName: Yup.string().required("Member name is required"),
  memberTenure: Yup.string().required("Member tenure is required"),
  memberStatus: Yup.string().required("Member status is required"),
  politicalParty: Yup.string().required("political party is required"),
  electionType: Yup.string().required("Election type is required"),
  gender: Yup.string().required("Gender is required"),
  phoneNo: Yup.string().required("Phone no is required"),
});
function QMSMembersAddEditForm() {
  const location = useLocation();

  const [tenures, setTenures] = useState([]);
  const [memberById, setMemberById] = useState();

  const formik = useFormik({
    initialValues: {
      memberName: "",
      memberTenure: "",
      memberStatus: "",
      politicalParty: "",
      electionType: "",
      gender: "",
      isMinister: "",
      phoneNo: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state) {
        handleEditMembers(values);
      } else {
        handleCreateMembers(values);
      }
    },
  });

  const handleCreateMembers = async (values) => {
    const data = {
      memberName: values.memberName,
      fkTenureId: Number(values.memberTenure),
      memberStatus: values.memberStatus,
      politicalParty: Number(values.politicalParty),
      electionType: values.electionType,
      gender: values.gender,
      isMinister: Boolean(values.isMinister),
      phoneNo: values.phoneNo
    }

    try {
      const response = await createMember(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleEditMembers = async (values) => {
    const data = {
      memberName: values.memberName,
      fkTenureId: Number(values.memberTenure),
      memberStatus: values.memberStatus,
      politicalParty: Number(values.politicalParty),
      electionType: values.electionType,
      gender: values.gender,
      isMinister: Boolean(values.isMinister),
      phoneNo: values.phoneNo
    }

    try {
      const response = await updateMembers(location?.state?.id, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleTenures = async () => {
    try {
      const response = await getAllTenures(0, 100);
      if (response?.success) {
        setTenures(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  const getMemberByIdApi = async () => {
    try {
      const response = await getMembersByID(location.state?.id);
      if (response?.success) {
        setMemberById(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleTenures();
    if (location.state?.id) {
      getMemberByIdApi();
    }
  }, [])

  useEffect(() => {
    // Update form values when termsById changes
    if (memberById) {
      formik.setValues({
        memberName: memberById.memberName || "",
        memberTenure: memberById.fkTenureId || "",
        memberStatus: memberById.memberStatus || "",
        politicalParty: memberById.politicalParty || "",
        electionType: memberById.electionType || "",
        gender: memberById.gender || "",
        isMinister: memberById.isMinister || "",
        phoneNo: memberById.phoneNo || "",
      });
    }
  }, [memberById, formik.setValues]);

  return (
    <Layout
      module={true}
      sidebarItems={QMSSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/qms/dashboard"}
        addLink1={"/qms/manage/members"}
        title1={"Members"}
        addLink2={"/qms/manage/members/addedit"}
        title2={location && location?.state ? "Edit Members" : "Add Members"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Members</h1>
            ) : (
              <h1>Add Members</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Member Name</label>
                      <input
                        type="text"
                        placeholder={"Member Name"}
                        value={formik.values.memberName}
                        className={`form-control ${
                          formik.touched.memberName && formik.errors.memberName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="memberName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.memberName &&
                        formik.errors.memberName && (
                          <div className="invalid-feedback">
                            {formik.errors.memberName}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Member Tenure</label>
                        <select class="form-select"
                          id="memberTenure"
                          name="memberTenure"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.memberTenure}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            {tenures.length > 0 && tenures.map((tenure) => (
                              <option value={tenure?.id}>{tenure?.tenureName}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                </div>
                
                <div class="row">
                  <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Member Status</label>
                        <select class="form-select"
                          id="memberStatus"
                          name="memberStatus"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.memberStatus}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option value="Active">Active</option>
                            <option value="Active/Oath Not Administered">Active/Oath Not Administered</option>
                            <option value="Deceased">Deceased</option>
                            <option value="Disqualified">Disqualified</option>
                            <option value="Resigned">Resigned</option>
                            <option value="Retired">Retired</option>
                            <option value="Tenure Completed">Tenure Completed</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Political Party</label>
                        <select class="form-select"
                          id="politicalParty"
                          name="politicalParty"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.politicalParty}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option value="1">PTI</option>
                            <option value="2">PMLN</option>
                        </select>
                      </div>
                    </div>
                </div>

                <div class="row">

                <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Election Type</label>
                        <select class="form-select"
                          id="electionType"
                          name="electionType"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.electionType}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option value="Bye Election">Bye Election</option>
                            <option value="Scheduled Election">Scheduled Election</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Gender</label>
                        <select class="form-select"
                          id="gender"
                          name="gender"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.gender}
                        >
                          <option value={""} selected disabled hidden>
                            select
                          </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Phone No</label>
                      <input
                        type="text"
                        placeholder={"Phone Number"}
                        value={formik.values.phoneNo}
                        className={`form-control ${
                          formik.touched.phoneNo && formik.errors.phoneNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="phoneNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.phoneNo &&
                        formik.errors.phoneNo && (
                          <div className="invalid-feedback">
                            {formik.errors.phoneNo}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-6" style={{ marginTop: "40px" }}>
                      <div class="form-check">
                        <input
                          class={`form-check-input ${
                            formik.touched.isMinister &&
                            formik.errors.isMinister
                              ? "is-invalid"
                              : ""
                          }`}
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={formik.values.isMinister}
                          onChange={() =>
                            formik.setFieldValue(
                              "isMinister",
                              !formik.values.isMinister,
                            )
                          }
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Is Minister
                        </label>
                        {formik.touched.isMinister &&
                          formik.errors.isMinister && (
                            <div className="invalid-feedback">
                              {formik.errors.isMinister}
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

export default QMSMembersAddEditForm;
