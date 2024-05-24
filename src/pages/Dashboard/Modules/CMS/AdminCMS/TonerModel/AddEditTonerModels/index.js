import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Layout } from "../../../../../../../components/Layout";
import { CMSsidebarItems } from "../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import { showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import {
  UpdateTonnerModel,
  createTonarModal,
} from "../../../../../../../api/APIs/Services/TonerInstallation.service";

function AddEditTonerModel() {
  const validationSchema = Yup.object({
    tonerModelName: Yup.string().required("Modal name is required"),
    quantity: Yup.string().required("Quantity is required"),
  });
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      tonerModelName: location.state ? location?.state?.tonerModel : "",
      quantity: location.state ? location?.state?.quantity : "",

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
      quantity: values?.quantity,
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
      quantity: values?.quantity,
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
                  <div className="col-6">
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
                <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="text"
                        // className={`form-control`}
                        id="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.quantity &&
                          formik.errors.quantity
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                       {formik.touched.quantity &&
                        formik.errors.quantity && (
                          <div className="invalid-feedback">
                            {formik.errors.quantity}
                          </div>
                        )}
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
