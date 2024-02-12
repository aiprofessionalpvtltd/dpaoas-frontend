import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Layout } from "../../../../../../../components/Layout";
import { CMSsidebarItems } from "../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import {
  UpdateTonnerModel,
  createTonarModal,
} from "../../../../../../../api/APIs";
import { showSuccessMessage } from "../../../../../../../utils/ToastAlert";

function AddEditTonerModel() {
  const validationSchema = Yup.object({
    tonerModelName: Yup.string().required("Modal name is required"),
    tonerModelDescription: Yup.string().required("Description is required"),
    tonerModelStatus: Yup.string().required("Status is required"),
  });
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      tonerModelName: location.state ? location?.state?.tonerModel : "",
      tonerModelDescription: location.state ? location?.state?.description : "",
      tonerModelStatus: location.state ? location?.state?.status : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here

      if (location.state) {
        UpdateTonerModelAPi(values);
      } else {
        handleTonerModel(values);
      }
      formik.resetForm();
    },
  });

  
  // Creating Tonar Model
  const handleTonerModel = async (values) => {
    const Data = {
      tonerModel: values?.tonerModelName,
      description: values?.tonerModelDescription,
      status: values?.tonerModelStatus,
    };

    try {
      const response = await createTonarModal(Data);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Updating Tonar Model
  const UpdateTonerModelAPi = async (values) => {
    const data = {
      tonerModel: values?.tonerModelName,
      description: values?.tonerModelDescription,
      status: values?.tonerModelStatus,
    };

    try {
      const response = await UpdateTonnerModel(location.state.id, data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/cms/admin/toner-models"}
        addLink1={"/cms/admin/toner-models/addedit"}
        title1={
          location && location?.state ? "Edit Toner Model" : "Add Toner Model"
        }
      />
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            {location && location?.state ? (
              <h1>Edit Toner Model</h1>
            ) : (
              <h1>Add Toner Model </h1>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Tonar Modal Name</label>
                      <input
                        className={`form-control  ${
                          formik.touched.tonerModelName &&
                          formik.errors.tonerModelName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="tonerModelName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tonerModelName}
                      />
                      {formik.touched.tonerModelName &&
                        formik.errors.tonerModelName && (
                          <div className="invalid-feedback">
                            {formik.errors.tonerModelName}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Tonar Modal Description
                      </label>
                      <textarea
                        className={`form-control  ${
                          formik.touched.tonerModelDescription &&
                          formik.errors.tonerModelDescription
                            ? "is-invalid"
                            : ""
                        }`}
                        id="tonerModelDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tonerModelDescription}
                      ></textarea>
                      {formik.touched.tonerModelDescription &&
                        formik.errors.tonerModelDescription && (
                          <div className="invalid-feedback">
                            {formik.errors.tonerModelDescription}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Tonar Modal status</label>
                      <select
                        className={`form-select  ${
                          formik.touched.tonerModelStatus &&
                          formik.errors.tonerModelStatus
                            ? "is-invalid"
                            : ""
                        }`}
                        id="tonerModelStatus"
                        name="tonerModelStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tonerModelStatus}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddEditTonerModel;
