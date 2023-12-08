import React from "react";
import { useFormik } from "formik";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function CustomModal({
  isOpen,
  initialValues,
  validationSchema,
  onRequestClose,
  handleSubmit,
}) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { id, ...dataToSubmit } = values;

      console.log("values without id", dataToSubmit);
      handleSubmit(dataToSubmit);
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div class="card">
        <div
          class="card-header red-bg"
          style={{ background: "#14ae5c !important" }}
        >
          <h1>ADD Duplicate Visitors</h1>
        </div>
        <div class="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Visitor Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.name && formik.errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                      id="name"
                      placeholder={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">CNIC</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.cnic && formik.errors.cnic
                          ? "is-invalid"
                          : ""
                      }`}
                      id="cnic"
                      placeholder={formik.values.cnic}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cnic}
                    />
                    {formik.touched.cnic && formik.errors.cnic && (
                      <div className="invalid-feedback">
                        {formik.errors.cnic}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Visitor Details</label>

                    <textarea
                      cols="30"
                      rows="10"
                      placeholder={formik.values.details}
                      className={`form-control ${
                        formik.touched.details && formik.errors.details
                          ? "is-invalid"
                          : ""
                      }`}
                      id="details"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details}
                    ></textarea>
                    {formik.touched.details && formik.errors.details && (
                      <div className="invalid-feedback">
                        {formik.errors.details}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;
