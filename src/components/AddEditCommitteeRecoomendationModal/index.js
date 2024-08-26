import React from "react";
import Modal from "react-bootstrap/Modal";
import {
  createCommitteesRecommendation,
  UpdateCommitteeRecommendation,
} from "../../api/APIs/Services/LegislationModule.service";
import { useFormik } from "formik";
import { showErrorMessage, showSuccessMessage } from "../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

function AddEditCommitteeRecommendationModal({
  showModal,
  closeModal,
  editRecommendationData,
  getCommitteeRecommendation,
}) {
  const formik = useFormik({
    initialValues: {
      committeeRecomendation:
        editRecommendationData && editRecommendationData
          ? editRecommendationData?.committeeRecommendation
          : "",
      committeeStatus:
        editRecommendationData && editRecommendationData
          ? editRecommendationData?.status
          : "",
    },

    onSubmit: async (values) => {
      // Handle form submission here
      if (editRecommendationData?.id) {
        console.log(values);
        updateRecommendation(values);
      } else {
        handleCreateCommitteeRecommendation(values);
      }
    },
  });

  //   const createNewBillStuseApi = async (values) => {
  //     const data = {
  //       billStatusName: values?.committeeRecomendation,
  //     };
  //     try {
  //       const response = await createBillNewStatus(data);
  //       if (response.success) {
  //         showSuccessMessage(response?.message);
  //         getCommitteeRecommendation();
  //         closeModal();
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  const handleCreateCommitteeRecommendation = async (values) => {
    const data = {
      committeeRecomendation: values?.committeeRecomendation,
      committeeStatus: values?.committeeStatus,
    };

    try {
      const response = await createCommitteesRecommendation(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        getCommitteeRecommendation();
        closeModal();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  const updateRecommendation = async (values) => {
    const data = {
      committeeRecomendation: values?.committeeRecomendation,
      committeeStatus: values?.committeeStatus,
    };
    try {
      const response = await UpdateCommitteeRecommendation(
        editRecommendationData && editRecommendationData?.id,
        data
      );
      if (response?.success) {
        showSuccessMessage(response?.message);
        getCommitteeRecommendation();
        closeModal();
      }
    } catch (error) {
      console.log("error", error);
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
                {editRecommendationData && editRecommendationData?.id
                  ? "Edit Recommendation"
                  : "Add New Recommendation"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label className="form-label">Committee Recomendation</label>
                <textarea
                  placeholder={"Recommendation"}
                  class={`form-control`}
                  value={formik?.values?.committeeRecomendation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="committeeRecomendation"
                  name="committeeRecomendation"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  id="committeeStatus"
                  name="committeeStatus"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.committeeStatus}
                >
                  <option value="" selected disabled hidden>
                    Select
                  </option>
                  <option value={"active"}>Active</option>
                  <option value={"inactive"}>InActive</option>
                </select>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default AddEditCommitteeRecommendationModal;
