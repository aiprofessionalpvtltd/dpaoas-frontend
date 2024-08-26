import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  createCommitteesRecommendation,
  UpdateCommitteeRecommendation,
} from "../../api/APIs/Services/LegislationModule.service";
import { useFormik } from "formik";
import { showErrorMessage, showSuccessMessage } from "../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import {
  getAllTenures,
  getMembersByID,
  getParliamentaryYearsByTenureID,
  updateMemberParliamentaryYear,
  updateMembers,
} from "../../api/APIs/Services/ManageQMS.service";
import { useNavigate } from "react-router-dom";

function UpdateMemberParliamentaryYear({
  showModal,
  closeModal,
  UpdateMemberId,
  //   toUpdateMemberData,
}) {
  const navigate = useNavigate();
  const [memberById, setMemberById] = useState();
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [tenures, setTenures] = useState([]);

  const formik = useFormik({
    initialValues: {
      memberName: "",
      memberTenure: "",
      fkParliamentaryYearId: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values) {
        handleUpdateMemberParliamentaryYear(values);
      }
    },
  });

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

  console.log("UpdateMemberId", UpdateMemberId);
  useEffect(() => {
    handleTenures();
    getMemberByIdApi();
  }, []);
  useEffect(() => {
    // Update form values when termsById changes
    if (memberById) {
      formik.setValues({
        memberName: memberById?.memberName || "",
        memberTenure: memberById?.fkTenureId || "",
        fkParliamentaryYearId: memberById?.parliamentaryYears?.id,
      });

      getParliamentaryYearsonTheBaseOfTenure(memberById?.fkTenureId);
    }
  }, [memberById, formik.setValues]);

  const handleUpdateMemberParliamentaryYear = async (values) => {
    const data = {
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
                  "Update Member Parliamentary Year"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
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
                        getParliamentaryYearsonTheBaseOfTenure(e.target.value);
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
              </div>
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
