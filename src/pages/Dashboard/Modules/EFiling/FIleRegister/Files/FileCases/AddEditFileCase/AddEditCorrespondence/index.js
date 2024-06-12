import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import { getUserData } from "../../../../../../../../../api/Auth";
import {
  createTerm,
  getAllTenures,
  getTermByID,
  updateTerm,
} from "../../../../../../../../../api/APIs/Services/ManageQMS.service";
import { Layout } from "../../../../../../../../../components/Layout";
import Header from "../../../../../../../../../components/Header";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../../../utils/ToastAlert";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../../../../../utils/sideBarItems";
import { DeleteAttachedFiles, UpdateCorrespondence, createCorrespondence, getCorrespondenceById } from "../../../../../../../../../api/APIs/Services/efiling.service";
import { imagesUrl } from "../../../../../../../../../api/APIs";

const validationSchema = Yup.object({
  termName: Yup.string().required("Term name is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  tenureId: Yup.string().required("Tenure ID is required"),
});
function AddEditCorrespondence() {
  const location = useLocation();
  const [tenures, setTenures] = useState([]);
  const [corrById, setCorrById] = useState();
  const [corrTitle, setCorrTitle] = useState("");
  const UserData = getUserData();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      correspondenceName: "",
      correspondenceDescription: "",
      attachment: null
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location?.state?.item?.internalId) {
        handleEditCorrespondence(values);
      } else {
        handleCreateCorrespondence(values);
      }
    },
  });

  const handleCreateCorrespondence = async (values) => {
    const formData = new FormData();
    formData.append("name", corrTitle === "Other" ? values.correspondenceName : corrTitle);
    formData.append("description", values.correspondenceDescription);
    if (values.attachment) {
      Array.from(values.attachment).forEach((file) => {
        formData.append('file', file);
      });
    }
    formData.append("fkBranchId", UserData.fkBranchId);
    formData.append("fkFileId", location?.state?.fileId);

    try {
      const response = await createCorrespondence(formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate(location.state?.fileDetail ? '/efiling/dashboard/fileDetail' : '/efiling/dashboard/file-register-list/files-list/addedit-case');
        }, 2000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleEditCorrespondence = async (values) => {
    const formData = new FormData();
    formData.append("name", corrTitle === "Other" ? values.correspondenceName : corrTitle);
    formData.append("description", values.correspondenceDescription);
    if (values.attachment) {
      Array.from(values.attachment).forEach((file) => {
        formData.append('file', file);
      });
    }
    formData.append("fkBranchId", UserData.fkBranchId);
    formData.append("fkFileId", location?.state?.fileId);

    try {
      const response = await UpdateCorrespondence(location.state?.item?.internalId, formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        setTimeout(() => {
          navigate(location.state?.fileDetail ? '/efiling/dashboard/fileDetail' : '/efiling/dashboard/file-register-list/files-list/addedit-case');
        }, 2000);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const getCorrespondenceByIdApi = async () => {
    try {
      const response = await getCorrespondenceById(location.state?.item?.internalId);
      if (response?.success) {
        setCorrById(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (location.state?.item?.internalId) {
      getCorrespondenceByIdApi();
    }
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    if (corrById) {
      if(corrById.name !== "Sanction" && corrById.name !== "Objection" && corrById.name !== "Letter") {
        setCorrTitle("Other");
      } else {
        setCorrTitle(corrById.name);
      }
      formik.setValues({
        correspondenceName: corrById.name,
        correspondenceDescription: corrById.description,
        attachment: corrById.attachment
      });
    }
  }, [corrById, formik.setValues]);

  const hendleRemoveImage = async (item) => {
    try {
      const response = await DeleteAttachedFiles(item?.internalId);
      if (response?.success) {
        showSuccessMessage(response.message);
        getCorrespondenceByIdApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const HandlePrint = async (urlimage) => {
    const url = `${imagesUrl}${urlimage}`;
    window.open(url, "_blank");
    // setPdfUrl(url)
  };

  return (
    <Layout
      module={true}
      sidebarItems={
        UserData && UserData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
      centerlogohide={true}
    >
      <Header
        dashboardLink={"lgms/dashboard"}
        addLink1={location.state?.fileDetail ? "/efiling/dashboard/fileDetail" : "/efiling/dashboard/file-register-list/files-list/addedit-case"}
        title1={location.state?.fileDetail ? "File Detail" : "Correspondence"}
        addLink2={"/efiling/dashboard/file-register-list/files-list/addedit-case"}
        title2={location && location.state?.item?.internalId ? "Edit Correspondence" : "Add Correspondence"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {location && location.state?.item?.internalId ? (
              <h1>Edit Correspondence</h1>
            ) : (
              <h1>Add Correspondence</h1>
            )}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Select Correspondence Type</label>
                      <select
                        class="form-select"
                        id="corrTitle"
                        name="corrTitle"
                        onChange={(e) => setCorrTitle(e.target.value)}
                        value={corrTitle}
                      >
                        <option value={""}>Select</option>
                        <option value={"Sanction"}>Sanction</option>
                        <option value={"Objection"}>Objection</option>
                        <option value={"Letter"}>Letter</option>
                        <option value={"Other"}>Other</option>
                      </select>
                    </div>
                  </div>

                  {corrTitle === "Other" && (
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Correspondence Name</label>
                        <input
                          type="text"
                          placeholder={"Correspondence Name"}
                          value={formik.values.correspondenceName}
                          className={`form-control ${
                            formik.touched.correspondenceName && formik.errors.correspondenceName
                              ? "is-invalid"
                              : ""
                          }`}
                          id="correspondenceName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.correspondenceName && formik.errors.correspondenceName && (
                          <div className="invalid-feedback">
                            {formik.errors.correspondenceName}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">
                        Correspondence Description
                      </label>
                      <input
                        type="text"
                        placeholder={"Correspondence Description"}
                        value={formik.values.correspondenceDescription}
                        className={`form-control ${
                          formik.touched.correspondenceDescription && formik.errors.correspondenceDescription
                            ? "is-invalid"
                            : ""
                        }`}
                        id="correspondenceDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.correspondenceDescription && formik.errors.correspondenceDescription && (
                        <div className="invalid-feedback">
                          {formik.errors.correspondenceDescription}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="attachment" className="form-label">
                        Attachment
                      </label>
                      <input
                        className={`form-control`}
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        id="attachment"
                        name="attachment"
                        multiple
                        onChange={(event) => {
                          console.log(event.currentTarget.files);
                          formik.setFieldValue(
                            "attachment",
                            event.currentTarget.files
                          );
                        }}
                      />

                      {corrById &&
                        corrById?.correspondenceAttachments?.map((item) => (
                          <div class="MultiFile-label mt-3">
                            <a
                              class="MultiFile-remove"
                              style={{
                                marginRight: "10px",
                                color: "red",
                                cursor: "pointer",
                              }}
                              onClick={() => hendleRemoveImage(item)}
                            >
                              x
                            </a>
                            <span
                              class="MultiFile-label"
                              title={item?.file
                                ?.split("\\")
                                .pop()
                                .split("/")
                                .pop()}
                            >
                              <span class="MultiFile-title">
                                <a
                                  onClick={() => HandlePrint(item?.file)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {item?.file
                                    ?.split("\\")
                                    .pop()
                                    .split("/")
                                    .pop()}
                                </a>
                              </span>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <button class="btn btn-primary float-end" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddEditCorrespondence;
