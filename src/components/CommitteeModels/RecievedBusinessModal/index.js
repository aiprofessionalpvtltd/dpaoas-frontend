import { useFormik } from "formik";
import React from "react";
import Modal from "react-modal";
import * as Yup from "yup";
import { showSuccessMessage } from "../../../utils/ToastAlert";
import { createTonarModal } from "../../../api/APIs/Services/TonerInstallation.service";
// import { createTonarModal } from "../../api/APIs";

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

function CommitteeReceievedBusinessModal({
  modalisOpan,
  hendleModal,
  modalBusinessName,
}) {
  const validationSchema = Yup.object({
    tonarname: Yup.string().required("Tonar Name is required"),
    tonardescription: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      committeeName: "",
      committeeDescription: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleTonerModel(values);
    },
  });

  const handleTonerModel = async (values) => {
    const Data = {
      tonerModel: values?.tonarname,
      description: values?.tonardescription,
      status: "active",
    };
    try {
      const response = await createTonarModal(Data);
      console.log("tonar creation response", response);
      if (response?.success) {
        showSuccessMessage(response?.message);
        hendleModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        isOpen={modalisOpan}
        onRequestClose={() => hendleModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="card">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>{modalBusinessName}</h1>
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Select Committee</label>

                    <select
                      class="form-select"
                      placeholder={formik.values.committeeName}
                      id="committeeName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" selected disabled hidden>
                        Select
                      </option>
                      <option>Senate House Committee</option>
                      <option>Senate Finance Committee</option>
                      <option>Business Advisory Committee</option>
                      <option>Finance and Revenue</option>
                      <option>Foreign Affairs</option>
                      <option>Climate Change</option>
                      <option>Federal Education, Professional Training</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div>
                    <label className="form-label">Description</label>
                    <textarea
                      className={`form-control  ${
                        formik.touched.tonardescription &&
                        formik.errors.tonardescription
                          ? "is-invalid"
                          : ""
                      }`}
                      id="tonardescription"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.tonardescription}
                    ></textarea>
                    {formik.touched.tonardescription &&
                      formik.errors.tonardescription && (
                        <div className="invalid-feedback">
                          {formik.errors.tonardescription}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="d-flex row justify-content-center align-items-center">
                <div className="col-4" style={{ marginTop: "30px" }}>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => hendleModal()}
                  >
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
  );
}
export default CommitteeReceievedBusinessModal;
