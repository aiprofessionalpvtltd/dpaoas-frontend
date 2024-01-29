import { useFormik } from 'formik';
import React, { useContext } from 'react'
import Modal from "react-modal";
import Select from "react-select";
import { assignedComplaintByAdmin } from '../../api/APIs';
import { AuthContext } from '../../api/AuthContext';
import { getUserData } from '../../api/Auth';
import { showSuccessMessage } from '../../utils/ToastAlert';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: "40%",
    transform: 'translate(-50%, -50%)',
  },
};

function ComplaintAssignedEmployee({ assignModalOpan, hendleModal, ComplaintUserData }) {
  const { employeeData } = useContext(AuthContext)
  const UserData = getUserData()

  const formikAssigned = useFormik({
    initialValues: {
      fkAssignedResolverId: "",
      assignmentRemarks: ""
    },

    onSubmit: (values) => {
      // Handle form submission here
      hendleAssigned(values)
    },

  })

  const hendleAssigned = async (values) => {
    const Data = {
      fkAssignedById: UserData?.fkUserId,
      fkAssignedResolverId: values?.fkAssignedResolverId?.value,
      assignmentRemarks: values?.assignmentRemarks,

    }
    try {
      const response = await assignedComplaintByAdmin(ComplaintUserData?.id, Data)
      if (response?.success) {
        showSuccessMessage(response?.message)
        hendleModal()
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
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
            <h1>Assigned Employee</h1>
          </div>
          <div class="card-body">
            <form onSubmit={formikAssigned.handleSubmit}>

              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Employee Name</label>
                    <Select
                      options={employeeData && employeeData?.map((item) => ({
                        value: item.fkUserId,
                        label: `${item.firstName}${item.lastName}`,
                      }))}

                      onChange={(selectedOptions) =>
                        formikAssigned.setFieldValue("fkAssignedResolverId", selectedOptions)
                      }
                      // onBlur={formikAssigned.handleBlur}
                      value={formikAssigned.values.fkAssignedResolverId}
                      name="fkAssignedResolverId"
                      isClearable={true}

                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div>
                    <label className="form-label">Remarks</label>
                    <input
                      className={`form-control`}
                      id='assignmentRemarks'
                      onChange={formikAssigned.handleChange}
                      onBlur={formikAssigned.handleBlur}
                      value={formikAssigned.values.assignmentRemarks}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex row justify-content-center align-items-center">
                <div className="col-4" style={{ marginTop: "30px" }}>
                  <button className="btn btn-primary" type="button" onClick={() => hendleModal()}>
                    Cancel
                  </button>
                </div>
                <div className="col-4" style={{ marginTop: "30px" }}>
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>

  )
}

export default ComplaintAssignedEmployee