import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import { assignedComplaintByAdmin } from "../../api/APIs/Services/Complaint.service";
import { AuthContext } from "../../api/AuthContext";
import { getUserData } from "../../api/Auth";
import { showErrorMessage, showSuccessMessage } from "../../utils/ToastAlert";
import {
  getPrivateBillById,
  updatePrivateBill,
} from "../../api/APIs/Services/Legislation.service";
import { ToastContainer } from "react-toastify";
import { getEmployeeByCurrentUserId } from "../../api/APIs/Services/organizational.service";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "40%",
    transform: "translate(-50%, -50%)",
  },
};

function FreshReceiptModal({ assignModalOpan, hendleModal, data }) {
  console.log(data, "data");
  const { allBranchesData } = useContext(AuthContext);
  const UserData = getUserData();
  const [employeeData, setEmployeeData] = useState([]);

  const formikAssigned = useFormik({
    initialValues: {
      fkAssignedResolverId: "",
      assignedTo: "",
      CommentStatus: "",
      comment: "",
    },

    onSubmit: async (values) => {
      // Handle form submission here
      await hendleAssigned(values);
    },
  });

  const hendleAssigned = async (values) => {
    const Data = {
      fkBranchesId: values?.fkAssignedResolverId?.value,
      SerialNo: data?.SerialNo,
      fileNo: data?.fileNo,
      date: data?.date,
      fromReceived: data?.fromReceived,
      briefSubject: data?.briefSubject,
      remarks: data?.remarks,
      status: data?.status,
    };
    try {
      const response = await updatePrivateBill(data?.id, Data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        formikAssigned.resetForm();
        hendleModal();
      }
    } catch (error) {
      showErrorMessage(error.response?.data?.message);
      console.log(error);
    }
  };

  const getEmployeeData = async () => {
    try {
      const response = await getEmployeeByCurrentUserId(UserData?.fkUserId);
      if (response?.success) {
        setEmployeeData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Modal
        isOpen={assignModalOpan}
        onRequestClose={() => hendleModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="card">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Assign</h1>
          </div>
          <div class="card-body">
            <form onSubmit={formikAssigned.handleSubmit}>
            <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Action</label>
                        <select
                          class="form-select"
                          id="CommentStatus"
                          name="CommentStatus"
                          onChange={formikAssigned.handleChange}
                          onBlur={formikAssigned.handleBlur}
                          value={formikAssigned.values.CommentStatus}
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value={"Approved"}>Approved</option>
                          <option value={"Rejected"}>Rejected</option>
                          <option value={"Discuss"}>Discuss</option>
                        </select>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Mark To</label>
                        <select
                          class="form-select"
                          id="assignedTo"
                          name="assignedTo"
                          onChange={formikAssigned.handleChange}
                          onBlur={formikAssigned.handleBlur}
                          value={formikAssigned.values.assignedTo}
                        >
                          <option value={""} selected disabled hidden>
                            Select
                          </option>
                          {employeeData &&
                            employeeData?.map((item) => (
                              <option
                                value={item.id}
                              >{`${item.designations?.designationName}`}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Remarks</label>
                        <textarea
                          class="form-control"
                          id="comment"
                          name="comment"
                          onChange={formikAssigned.handleChange}
                          onBlur={formikAssigned.handleBlur}
                          value={formikAssigned.values.comment}
                        ></textarea>
                      </div>
                    </div>
                  </div>

              <div className="d-flex justify-content-center">
                <div className="col-3" style={{ marginTop: "30px" }}>
                  <button
                    className="btn btn-primary w-100"
                    type="button"
                    onClick={() => hendleModal()}
                  >
                    Cancel
                  </button>
                </div>
                <div
                  className="col-3"
                  style={{ marginTop: "30px", marginLeft: "5px" }}
                >
                  <button className="btn btn-primary w-100" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FreshReceiptModal;