import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Header from "../../../../../../../components/Header";
import { Layout } from "../../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import Select from "react-select";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import {
  createMember,
  getAllPoliticalParties,
  getAllTenures,
  getMembersByID,
  updateMembers,
} from "../../../../../../../api/APIs/Services/ManageQMS.service";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../../api/AuthContext";
import { createMinister } from "../../../../../../../api/APIs/Services/LegislationModule.service";

const validationSchema = Yup.object({
  mnaName: Yup.string().required("Member name is required"),
  politicalParty: Yup.string().required("political party is required"),
  phone: Yup.string().required("Phone no is required"),
  constituency: Yup.string().required("Constituency is required"),
  //   ministryIds: Yup.array().required("Ministry is required"),
});
function LGMSMinisterAddEditForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tenures, setTenures] = useState([]);
  const [memberById, setMemberById] = useState();
  const [allparties, setAllParties] = useState([]);
  const { ministryData } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      mnaName: "",
      constituency: "",
      politicalParty: "",
      phone: "",
      address: "",
      ministryIds: [],
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
      mnaData: {
        mnaName: values?.mnaName,
        politicalParty: Number(values?.politicalParty),
        phone: String(values?.phone),
        constituency: values?.constituency,
        address: values?.address,
      },
      ministryIds:
        values?.ministryIds?.map((ministry) => ministry?.value) || [],
    };

    try {
      const response = await createMinister(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/lgms/dashboard/manage/ministers/list");
        }, 3000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleEditMembers = async (values) => {
    const data = {
      mnaName: values.mnaName,
      politicalParty: Number(values.politicalParty),
      phone: values.phone,
      constituency: values?.constituency,
      address: values?.address,
    };

    try {
      const response = await updateMembers(location?.state?.id, data);
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

  useEffect(() => {
    AllPoliticalPartiesList();
    if (location.state?.id) {
      getMemberByIdApi();
    }
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    if (memberById) {
      formik.setValues({
        mnaName: memberById.mnaName || "",
        memberTenure: memberById.fkTenureId || "",
        memberStatus: memberById.memberStatus || "",
        politicalParty: memberById.politicalParty || "",
        electionType: memberById.electionType || "",
        gender: memberById.gender || "",
        isMinister: memberById.isMinister || "",
        phone: memberById.phone || "",
        constituency: memberById?.constituency || "",
        governmentType: memberById?.governmentType || "",
        memberProvince: memberById?.memberProvince || "",
        reason: memberById?.reason || "",
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
        addLink1={"/lgms/dashboard/manage/members/list"}
        title1={"Minister List"}
        addLink2={"/lgms/dashboard/manage/ministers/list"}
        title2={location && location?.state ? "Edit Minister" : "Add Minister"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state ? (
              <h1>Edit Minister</h1>
            ) : (
              <h1>Add Minister</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Minister Name</label>
                      <input
                        type="text"
                        placeholder={"Minister Name"}
                        value={formik.values.mnaName}
                        className={`form-control ${
                          formik.touched.mnaName && formik.errors.mnaName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="mnaName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.mnaName && formik.errors.mnaName && (
                        <div className="invalid-feedback">
                          {formik.errors.mnaName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Constituency</label>
                      <input
                        type="text"
                        placeholder={"Constituency"}
                        value={formik.values.constituency}
                        className={`form-control ${
                          formik.touched.constituency &&
                          formik.errors.constituency
                            ? "is-invalid"
                            : ""
                        }`}
                        id="constituency"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.constituency &&
                        formik.errors.constituency && (
                          <div className="invalid-feedback">
                            {formik.errors.constituency}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Political Party</label>
                      <select
                        className={`form-select ${
                          formik.touched.politicalParty &&
                          formik.errors.politicalParty
                            ? "is-invalid"
                            : ""
                        }`}
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
                      {formik.touched.politicalParty &&
                        formik.errors.politicalParty && (
                          <div className="invalid-feedback">
                            {formik.errors.politicalParty}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Phone No</label>
                      <input
                        type="number"
                        placeholder={"Phone Number"}
                        value={formik.values.phone}
                        className={`form-control ${
                          formik.touched.phone && formik.errors.phone
                            ? "is-invalid"
                            : ""
                        }`}
                        id="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="invalid-feedback">
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label class="form-label">Select Ministries</label>
                      <Select
                        options={
                          ministryData &&
                          ministryData?.map((item) => ({
                            value: item.id,
                            label: item?.ministryName,
                          }))
                        }
                        id="ministryIds"
                        name="ministryIds"
                        onChange={(selectedOptions) =>
                          formik.setFieldValue("ministryIds", selectedOptions)
                        }
                        className={`${
                          formik.touched.ministryIds &&
                          formik.errors.ministryIds
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.ministryIds}
                        isMulti={true}
                      />
                      {formik.touched.ministryIds &&
                        formik.errors.ministryIds && (
                          <div className="invalid-feedback">
                            {formik.errors.ministryIds}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col">
                    <label className="form-label">Address</label>
                    <textarea
                      className={`form-control  ${
                        formik.touched.address && formik.errors.address
                          ? "is-invalid"
                          : ""
                      } mb-3`}
                      id="address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                    ></textarea>
                    {formik.touched.address && formik.errors.address && (
                      <div className="invalid-feedback">
                        {formik.errors.address}
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

export default LGMSMinisterAddEditForm;
