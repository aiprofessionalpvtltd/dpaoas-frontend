import React from "react";
import Modal from "react-bootstrap/Modal";
import {
  createBillNewStatus,
  updatedBillNewStatus,
} from "../../api/APIs/Services/LegislationModule.service";
import { useFormik } from "formik";
import { showSuccessMessage } from "../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

function AddEditBillsStatusModal({
  showModal,
  closeModal,
  editStatusData,
  GetBillStatusesAPi,
}) {
  const formik = useFormik({
    initialValues: {
      description:
        editStatusData && editStatusData ? editStatusData?.billStatusName : "",
      status:
        editStatusData && editStatusData ? editStatusData?.billStatus : "",
    },

    onSubmit: async (values) => {
      // Handle form submission here
      if (editStatusData?.id) {
        console.log(values);
        updateNewBillStuseApi(values);
      } else {
        createNewBillStuseApi(values);
      }
    },
  });

  const createNewBillStuseApi = async (values) => {
    const data = {
      billStatusName: values?.description,
    };
    try {
      const response = await createBillNewStatus(data);
      if (response.success) {
        showSuccessMessage(response?.message);
        GetBillStatusesAPi();
        closeModal();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateNewBillStuseApi = async (values) => {
    const data = {
      billStatusName: values?.description,
      billStatus: values?.status,
    };
    try {
      const response = await updatedBillNewStatus(
        editStatusData && editStatusData?.id,
        data
      );
      if (response.success) {
        showSuccessMessage(response?.message);
        GetBillStatusesAPi();
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
                {editStatusData && editStatusData?.id
                  ? "Edit Status"
                  : "New Status"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  placeholder={"description"}
                  class={`form-control`}
                  value={formik?.values?.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="description"
                  name="description"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
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

export default AddEditBillsStatusModal;
