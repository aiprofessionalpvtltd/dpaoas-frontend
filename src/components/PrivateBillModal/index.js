import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
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

function PrivateBillModal({ assignModalOpan, hendleModal, billData }) {
  console.log(billData, "billData");
  const { allBranchesData } = useContext(AuthContext);
  const UserData = getUserData();

  const formikAssigned = useFormik({
    initialValues: {
      fkAssignedResolverId: "",
    },

    onSubmit: async (values) => {
      // Handle form submission here
      await hendleAssigned(values);
    },
  });

  const hendleAssigned = async (values) => {
    const Data = {
      fkBranchesId: values?.fkAssignedResolverId?.value,
      SerialNo: billData?.SerialNo,
      fileNo: billData?.fileNo,
      date: billData?.date,
      fromReceived: billData?.fromReceived,
      briefSubject: billData?.briefSubject,
      remarks: billData?.remarks,
      status: billData?.status,
    };
    try {
      const response = await updatePrivateBill(billData?.id, Data);
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

  // const getBillByIdApi = async () => {
  //     try {
  //       const response = await getPrivateBillById(location.state?.id);
  //       if (response?.success) {
  //         setBillById(response?.data[0]);
  //       }
  //     } catch (error) {
  //       // showErrorMessage(error?.response?.data?.message);
  //     }
  //   };

  //   useEffect(() => {
  //     if (location.state?.id) {
  //       getBillByIdApi();
  //     }
  //   }, [])

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
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Branch</label>
                    <Select
                      options={
                        allBranchesData &&
                        allBranchesData?.map((item) => ({
                          value: item.id,
                          label: item?.branchName,
                        }))
                      }
                      onChange={(selectedOptions) =>
                        formikAssigned.setFieldValue(
                          "fkAssignedResolverId",
                          selectedOptions
                        )
                      }
                      // onBlur={formikAssigned.handleBlur}
                      value={formikAssigned.values.fkAssignedResolverId}
                      name="fkAssignedResolverId"
                      isClearable={true}
                    />
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

export default PrivateBillModal;