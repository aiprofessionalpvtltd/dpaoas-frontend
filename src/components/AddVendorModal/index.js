import { useFormik } from 'formik';
import React, { useContext } from 'react'
import Modal from "react-modal";
import Select from "react-select";
import { assignedComplaintByAdmin, createVandor } from '../../api/APIs';
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

function AddVendorModal({ modaisOpan, hendleModal }) {

  const formikAssigned = useFormik({
    initialValues: {
        description: "",
        vendorName: "",
    },

    onSubmit: (values) => {
      // Handle form submission here
      hendleVandor(values)
    },

  })

  const hendleVandor = async (values) => {
    const Data = {
        vendorName: values?.vendorName,
        description: values?.description,
        staus:"active"

    }
    try {
      const response = await createVandor(Data)
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
        isOpen={modaisOpan}
        onRequestClose={() => hendleModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="card">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Add Vendor</h1>
          </div>
          <div class="card-body">
            <form onSubmit={formikAssigned.handleSubmit}>

              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Vendor Name</label>
                    <input
                      className={`form-control`}
                      id='vendorName'
                      onChange={formikAssigned.handleChange}
                      onBlur={formikAssigned.handleBlur}
                      value={formikAssigned.values.vendorName}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div>
                    <label className="form-label">Description</label>
                    <textarea
                      className={`form-control`}
                      id='description'
                      onChange={formikAssigned.handleChange}
                      onBlur={formikAssigned.handleBlur}
                      value={formikAssigned.values.description}
                    ></textarea>
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

export default AddVendorModal