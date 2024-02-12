import { useFormik } from "formik";
import React from "react";
import Modal from "react-modal";
import * as Yup from "yup";
import { showSuccessMessage } from "../../utils/ToastAlert";
import { createTonarModal } from "../../api/APIs";

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

function AddTonarModal({ modaisOpan, hendleModal }) {
  const validationSchema = Yup.object({
    tonarname: Yup.string().required("Tonar Name is required"),
    tonardescription: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      tonarname: "",
      tonardescription: "",
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
            <h1>Add Tonar</h1>
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Tonar Modal Name</label>
                    <input
                      className={`form-control  ${
                        formik.touched.tonarname && formik.errors.tonarname
                          ? "is-invalid"
                          : ""
                      }`}
                      id="tonarname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.tonarname}
                    />
                    {formik.touched.tonarname && formik.errors.tonarname && (
                      <div className="invalid-feedback">
                        {formik.errors.tonarname}
                      </div>
                    )}
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
export default AddTonarModal;
