import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import {
  LegislationSideBarItems,
  QMSSideBarItems,
} from "../../../../../../../utils/sideBarItems";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import {
  createMember,
  getAllParliamentaryYears,
  getAllPoliticalParties,
  getAllTenures,
  getMembersByID,
  getParliamentaryYearsByTenureID,
  updateMembers,
} from "../../../../../../../api/APIs/Services/ManageQMS.service";
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
function LGMSMembersAddEditForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tenures, setTenures] = useState([]);
  const [tenureID, setTenureID] = useState(null);
  const [memberById, setMemberById] = useState();
  const [allparties, setAllParties] = useState([]);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  console.log("parliamentaryYearData", parliamentaryYearData);

  const formik = useFormik({
    initialValues: {
      memberName: "",
      memberUrduName: "",
      memberTenure: "",
      fkParliamentaryYearId: "",
      memberStatus: "",
      politicalParty: "",
      governmentType: "",
      memberProvince: "",
      electionType: "",
      gender: "",
      isMinister: "",
      reason: "",
      phoneNo: "",
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
      memberName: values?.memberName,
      fkTenureId: Number(values?.memberTenure),
      fkParliamentaryYearId: Number(values?.fkParliamentaryYearId),
      memberStatus: values.memberStatus,
      politicalParty: Number(values?.politicalParty),
      electionType: values?.electionType,
      gender: values?.gender,
      isMinister: Boolean(values?.isMinister),
      phoneNo: values?.phoneNo,
      memberUrduName: values?.memberUrduName,
      governmentType: values?.governmentType,
      memberProvince: values?.memberProvince,
      reason: values?.reason,
    };

    try {
      const response = await createMember(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate("/lgms/dashboard/manage/members/list");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleEditMembers = async (values) => {
    const data = {
      memberName: values.memberName,
      fkTenureId: Number(values.memberTenure),
      fkParliamentaryYearId: values?.fkParliamentaryYearId,
      memberStatus: values.memberStatus,
      politicalParty: Number(values.politicalParty),
      electionType: values.electionType,
      gender: values.gender,
      isMinister: Boolean(values.isMinister),
      phoneNo: values.phoneNo,
      memberUrduName: values?.memberUrduName,
      governmentType: values?.governmentType,
      memberProvince: values?.memberProvince,
      reason: values?.reason,
    };
    // return false;
    try {
      const response = await updateMembers(location?.state?.id, data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate("/lgms/dashboard/manage/members/list");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleTenures = async () => {
    try {
      const response = await getAllTenures(0, 1000);
      if (response?.success) {
        setTenures(response?.data?.tenures);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

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

  //Get Political Party
  const AllPoliticalPartiesList = async () => {
    try {
      const response = await getAllPoliticalParties(0, 100);
      if (response?.success) {
        // const transformedData = transformTonerModelsData(
        //   response?.data?.tonerModels
        // );
        setAllParties(response?.data?.politicalParties);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Get Political Party
  const getParliamentaryYearsonTheBaseOfTenure = async (id) => {
    try {
      const response = await getParliamentaryYearsByTenureID(id);
      if (response?.success) {
        console.log(response?.data?.data);
        setParliamentaryYearData(response?.data);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleTenures();
    AllPoliticalPartiesList();
    if (location.state?.id) {
      getMemberByIdApi();
    }
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    if (memberById) {
      formik.setValues({
        memberName: memberById.memberName || "",
        memberTenure: memberById.fkTenureId || "",
        fkParliamentaryYearId: memberById?.parliamentaryYears?.id,
        memberStatus: memberById.memberStatus || "",
        politicalParty: memberById.politicalParty || "",
        electionType: memberById.electionType || "",
        gender: memberById.gender || "",
        isMinister: memberById.isMinister || "",
        phoneNo: memberById.phoneNo || "",
        memberUrduName: memberById?.memberUrduName || "",
        governmentType: memberById?.governmentType || "",
        memberProvince: memberById?.memberProvince || "",
        reason: memberById?.reason || "",
      });

      getParliamentaryYearsonTheBaseOfTenure(memberById?.fkTenureId);
    }
  }, [memberById, formik.setValues]);

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/qms/dashboard"}
        addLink1={"/lgms/dashboard/manage/members/list"}
        title1={"Members List"}
        addLink2={"/lgms/dashboard/manage/members/addedit"}
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
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Member Urdu Name</label>
                      <input
                        type="text"
                        placeholder={"Member Urdu Name"}
                        value={formik.values.memberUrduName}
                        className={`form-control ${
                          formik.touched.memberUrduName &&
                          formik.errors.memberUrduName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="memberUrduName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.memberUrduName &&
                        formik.errors.memberUrduName && (
                          <div className="invalid-feedback">
                            {formik.errors.memberUrduName}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Member Tenure</label>
                      <select
                        class="form-select"
                        id="memberTenure"
                        name="memberTenure"
                        onBlur={formik.handleBlur}
                        value={formik.values.memberTenure}
                        // onChange={formik.handleChange}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          formik.handleChange(e);
                          getParliamentaryYearsonTheBaseOfTenure(
                            e.target.value
                          );
                          console.log("id", selectedId);
                          // setTenureID(e.target.value);
                        }}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {tenures.length > 0 &&
                          tenures.map((tenure) => (
                            <option value={tenure?.id}>
                              {tenure?.tenureName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Parliamentary Year</label>
                      <select
                        class="form-select"
                        id="fkParliamentaryYearId"
                        name="fkParliamentaryYearId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkParliamentaryYearId}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {parliamentaryYearData &&
                          parliamentaryYearData?.length > 0 &&
                          parliamentaryYearData.map((parliamentaryYear) => (
                            <option value={parliamentaryYear?.id}>
                              {parliamentaryYear?.parliamentaryTenure}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Member Status</label>
                      <select
                        class="form-select"
                        id="memberStatus"
                        name="memberStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.memberStatus}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="Active">Active</option>
                        <option value="Active/Oath Not Administered">
                          Active/Oath Not Administered
                        </option>
                        <option value="Deceased">Deceased</option>
                        <option value="Disqualified">Disqualified</option>
                        <option value="Resigned">Resigned</option>
                        <option value="Retired">Retired</option>
                        <option value="Tenure Completed">
                          Tenure Completed
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Political Party</label>
                      <select
                        class="form-select"
                        id="politicalParty"
                        name="politicalParty"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.politicalParty}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        {allparties &&
                          allparties.map((item) => (
                            <option value={item.id}>{item.shortName}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div class="mb-3">
                      <label class="form-label">Government Type</label>
                      <select
                        class="form-select"
                        id="governmentType"
                        name="governmentType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.governmentType}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="Opposition">Opposition</option>
                        <option value="Government">Government</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Election Type</label>
                      <select
                        class="form-select"
                        id="electionType"
                        name="electionType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.electionType}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="Bye Election">Bye Election</option>
                        <option value="Scheduled Election">
                          Scheduled Election
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Gender</label>
                      <select
                        class="form-select"
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

                  <div className="col">
                    <div class="mb-3">
                      <label class="form-label">Member Province</label>
                      <select
                        class="form-select"
                        id="memberProvince"
                        name="memberProvince"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.memberProvince}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="Khyber Pakhtunkhwa">
                          Khyber Pakhtunkhwa
                        </option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Sindh">Sindh</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Erstwhile FATA">Erstwhile FATA</option>
                        <option value="Federal Capital Area Islamabad">
                          Federal Capital Area Islamabad
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
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
                      {formik.touched.phoneNo && formik.errors.phoneNo && (
                        <div className="invalid-feedback">
                          {formik.errors.phoneNo}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col">
                    <div class="form-check" style={{ marginTop: "40px" }}>
                      <input
                        class={`form-check-input ${
                          formik.touched.isMinister && formik.errors.isMinister
                            ? "is-invalid"
                            : ""
                        }`}
                        type="checkbox"
                        id="flexCheckDefault"
                        checked={formik.values.isMinister}
                        onChange={() =>
                          formik.setFieldValue(
                            "isMinister",
                            !formik.values.isMinister
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
                <div className="row">
                  <div class="col">
                    <label className="form-label">Reason</label>
                    <textarea
                      className={`form-control  ${
                        formik.touched.reason && formik.errors.reason
                          ? "is-invalid"
                          : ""
                      } mb-3`}
                      id="reason"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.reason}
                    ></textarea>
                    {formik.touched.reason && formik.errors.reason && (
                      <div className="invalid-feedback">
                        {formik.errors.reason}
                      </div>
                    )}
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

export default LGMSMembersAddEditForm;
