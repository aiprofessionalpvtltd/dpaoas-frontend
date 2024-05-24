import { useFormik } from "formik";
import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../../../../../../components/Layout";
import { CMSsidebarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { UpdateComplaintByAdmin } from "../../../../../../api/APIs/Services/Complaint.service";
import moment from "moment";
import * as Yup from "yup";


const validationSchema = Yup.object({
    complaintRemark: Yup.string().required("Complaint Remark is required"),
    complaintStatus: Yup.string().required("Complaint Status is required")
});


function CMSAdminEditComplaint() {
  
  const location = useLocation();
  console.log("location",location.state);
  const formik = useFormik({
    initialValues: {
      fkResolverUserId: "",
      complaintRemark: "",
      complaintStatus: "",
      complaintResolvedDate: new Date(),
      complaintAttachmentFromResolver: "",
    },

    validationSchema:validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      UpdateComplaintAPi(values);
    },
  });

  const UpdateComplaintAPi = async (values) => {
    const formData = new FormData();

    formData.append("fkResolverUserId", location?.state?.fkAssignedResolverId);
    formData.append("complaintResolvedDate", values?.complaintResolvedDate);
    formData.append("complaintRemark", values?.complaintRemark);
    formData.append("complaintStatus", values?.complaintStatus);
    formData.append(
      "complaintAttachmentFromResolver",
      values.complaintAttachmentFromResolver
    );
    formData.append("tonerQuantity", location?.state?.tonerQuantity)
    formData.append("fkTonerModelId", location?.state?.fkTonerModelId)


    try {
      const response = await UpdateComplaintByAdmin(
        location?.state?.id,
        formData
      );
      if (response.success) {
        showSuccessMessage(response.message);
        formik.resetForm()
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/cms/admin/dashboard"}
        addLink1={"/cms/admin/dashboard/addedit"}
        title1={"Resolved Admin Complaint"}
      />
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            <h1>Resolved Admin Complaint</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div
                  style={{
                    background: "#f2f2f2",
                    padding: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Complainee</label>
                        <input
                          type="text"
                          className={`form-control`}
                          id="productName"
                          placeholder={location?.state?.complaineeUser ? `${location?.state?.complaineeUser?.employee?.firstName} ${location?.state?.complaineeUser?.employee?.lastName}` : location?.state?.userName}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Complaint Issued Date
                        </label>
                        <input
                          type="text"
                          className={`form-control`}
                          id="productName"
                          placeholder={moment(
                            location?.state?.complaintIssuedDate
                          ).format("MM/DD/YYYY")}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Branch/Office</label>
                        <input
                          type="text"
                          className={`form-control`}
                          id="productName"
                          placeholder={
                            location?.state?.complaintType?.branchName
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Nature Of Complaint
                        </label>
                        <input
                          type="text"
                          className={`form-control`}
                          id="productName"
                          placeholder={
                            location?.state?.complaintCategory
                              ?.complaintCategoryName
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Assigned To (IT Engineer)
                        </label>
                        <input
                          type="text"
                          className={`form-control`}
                          id="productName"
                          placeholder={
                            location?.state.resolverUser &&
                            `${location?.state.resolverUser?.employee?.firstName} ${location?.state?.resolverUser?.employee?.lastName}`
                          }
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Complaint Remarks</label>
                      <textarea
                        className={`form-control ${formik.touched.complaintRemark &&
                            formik.errors.complaintRemark
                            ? "is-invalid"
                            : ""
                            }`}
                        id="complaintRemark"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.complaintRemark}
                      ></textarea>
                      {formik.touched.complaintRemark &&
                        formik.errors.complaintRemark && (
                          <div className="invalid-feedback">
                            {formik.errors.complaintRemark}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">
                        Complaint Resolved Date
                      </label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          color: "#666",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.complaintResolvedDate}
                        // minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("complaintResolvedDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Attachment
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        id="complaintAttachmentFromResolver"
                        name="complaintAttachmentFromResolver"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "complaintAttachmentFromResolver",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Complaint Status</label>
                      <select
                        class={`form-select ${formik.touched.complaintStatus &&
                            formik.errors.complaintStatus
                            ? "is-invalid"
                            : ""
                            }`}
                        id="complaintStatus"
                        name="complaintStatus"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.complaintStatus}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Resolved</option>
                      </select>
                      {formik.touched.complaintStatus &&
                        formik.errors.complaintStatus && (
                          <div className="invalid-feedback">
                            {formik.errors.complaintStatus}
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

export default CMSAdminEditComplaint;
