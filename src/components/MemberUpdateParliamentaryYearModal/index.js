import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  createCommitteesRecommendation,
  getSingleMinisterByID,
  UpdateCommitteeRecommendation,
} from "../../api/APIs/Services/LegislationModule.service";
import { useFormik } from "formik";
import { showErrorMessage, showSuccessMessage } from "../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import {
  getAllTenures,
  getMembersByID,
  getParliamentaryYearsByTenureID,
  getParliamentaryYearsByTermID,
  getTermByTenureID,
  updateMemberParliamentaryYear,
  updateMembers,
} from "../../api/APIs/Services/ManageQMS.service";
import { useNavigate } from "react-router-dom";
import { updateMinisterParliamentaryYear } from "../../api/APIs/Services/Motion.service";
import Select from "react-select";
function UpdateMemberParliamentaryYear({
  showModal,
  closeModal,
  UpdateMemberId,
  member,
  handleMembers,
  getAllMinisterApi,
  //   toUpdateMemberData,
}) {
  const navigate = useNavigate();
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [tenures, setTenures] = useState([]);
  const [tenuresTerms, setTenuresTerms] = useState([]);
  const [memberById, setMemberById] = useState();
  const [ministerByID, setMinisterByID] = useState();
  const formik = useFormik({
    initialValues: {
      memberName: "",
      memberTenure: "",
      fkTermId: "",
      fkParliamentaryYearId: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values) {
        if (member === "Senators") {
          handleUpdateMemberParliamentaryYear(values);
        } else if (member === "Ministers") {
          handleUpdateMinisterParliamentaryYear(values);
        }
      }
    },
  });
  console.log("Tenures on Single", tenures);
  console.log("Update Member ID", UpdateMemberId);
  const getMemberByIdApi = async () => {
    try {
      const response = await getMembersByID(UpdateMemberId);
      if (response?.success) {
        setMemberById(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };
  const getMinisterByIdApi = async () => {
    try {
      const response = await getSingleMinisterByID(UpdateMemberId);
      if (response?.success) {
        setMinisterByID(response?.data[0]);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  //Get Parliamentary Year
  const getParliamentaryYearsonTheBaseOfTerm = async (id) => {
    try {
      const response = await getParliamentaryYearsByTermID(id);
      if (response?.success) {
        setParliamentaryYearData(response?.data);
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

  const handleTenures = async (memberTenure) => {
    try {
      const response = await getAllTenures(0, 1000, memberTenure);
      if (response?.success) {
        setTenures(response?.data?.tenures);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleTenuresTerms = async (id) => {
    try {
      const response = await getTermByTenureID(id);
      if (response?.success) {
        setTenuresTerms(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  console.log("UpdateMemberId", UpdateMemberId);
  useEffect(() => {
    if (member && member === "Senators") {
      getMemberByIdApi();
    } else if (member && member === "Ministers") {
      getMinisterByIdApi();
    }
    handleTenures(member);
  }, []);
  useEffect(() => {
    // Update form values when termsById changes
    if (memberById) {
      formik.setValues({
        memberName: memberById?.memberName || "",
        memberTenure: memberById?.fkTenureId || "",
        fkTermId: memberById?.terms
          ? {
              value: memberById?.terms?.id,
              label: memberById?.terms?.termName,
            }
          : "",
        fkParliamentaryYearId: memberById?.parliamentaryYears?.id,
      });

      if (memberById?.fkTenureId) {
        handleTenuresTerms(memberById?.fkTenureId);
      }
      if (memberById?.fkTermId) {
        getParliamentaryYearsonTheBaseOfTerm(memberById?.fkTermId);
      }
      // getParliamentaryYearsonTheBaseOfTerm(memberById?.fkTenureId);
    } else if (ministerByID) {
      console.log("ministerByID", ministerByID);
      formik.setValues({
        memberName: ministerByID?.mnaName || "",
        memberTenure: ministerByID?.fkTenureId || "",
        fkParliamentaryYearId: ministerByID?.parliamentaryYears?.id,
      });
    }
    if (ministerByID?.fkTenureId) {
      getParliamentaryYearsonTheBaseOfTenure(ministerByID?.fkTenureId);
    }
  }, [memberById, ministerByID, formik.setValues]);

  const handleUpdateMemberParliamentaryYear = async (values) => {
    const data = {
      newTermId: values?.fkTermId.value,
      newParliamentaryYearId: values?.fkParliamentaryYearId,
    };
    // return false;
    try {
      const response = await updateMemberParliamentaryYear(
        UpdateMemberId,
        data
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        closeModal();
        handleMembers();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  const handleUpdateMinisterParliamentaryYear = async (values) => {
    const data = {
      newParliamentaryYearId: values?.fkParliamentaryYearId,
    };
    // return false;
    try {
      const response = await updateMinisterParliamentaryYear(
        UpdateMemberId,
        data
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        closeModal();
        getAllMinisterApi();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <Modal show={showModal} onHide={closeModal} centered>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {UpdateMemberId &&
                  UpdateMemberId &&
                  "Promote Member Parliamentary Year"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
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
                      readOnly
                    />
                    {formik.touched.memberName && formik.errors.memberName && (
                      <div className="invalid-feedback">
                        {formik.errors.memberName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Member Tenure</label>
                    <select
                      className="form-select"
                      id="memberTenure"
                      name="memberTenure"
                      onBlur={formik.handleBlur}
                      value={formik.values.memberTenure}
                      // onChange={formik.handleChange}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        formik.handleChange(e);
                        getParliamentaryYearsonTheBaseOfTenure(e.target.value);

                        // setTenureID(e.target.value);
                      }}
                      disabled
                    >
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      {tenures && tenures?.length > 0
                        ? tenures.map((tenure) => (
                            <option key={tenure?.id} value={tenure?.id}>
                              {tenure?.tenureName}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
              </div>

              {member === "Senators" && (
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Member Term</label>
                      <Select
                        options={
                          Array.isArray(tenuresTerms) &&
                          tenuresTerms?.length > 0
                            ? tenuresTerms.map((item) => ({
                                value: item?.id,
                                label: `${item?.termName}`,
                              }))
                            : []
                        }
                        onChange={(selectedOption) => {
                          formik.setFieldValue("fkTermId", selectedOption);
                          if (selectedOption?.value) {
                            getParliamentaryYearsonTheBaseOfTerm(
                              selectedOption?.value
                            );
                          }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.fkTermId}
                        id="fkTermId"
                        name="fkTermId"
                        isClearable={true}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="row">
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
            </Modal.Body>

            <Modal.Footer>
              <button
                className="btn btn-primary"
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default UpdateMemberParliamentaryYear;
