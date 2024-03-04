import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../../../api/AuthContext'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { EfilingSideBarItem } from '../../../../../../utils/sideBarItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { ToastContainer } from 'react-toastify'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { UpdateFIleHeading, createFIleHeading, getSingleHeadingbyId } from '../../../../../../api/APIs/Services/efiling.service'


const validationSchema = Yup.object({
    mainHeading: Yup.string().required("Heading is required"),
    fkBranchId: Yup.string().required("Branch is required"),
    mainHeadingNumber: Yup.string().required("Heading Number is required"),
  });

function AddEditFIleHeading() {
    const location = useLocation()
    const navigate = useNavigate()
  const { allBranchesData } = useContext(AuthContext)
  const [filesData, setFileData] = useState([])
  const [fileId, setFIleId] = useState(location?.state?.id);

  const formik = useFormik({
    initialValues: {
      mainHeading:  "",
      fkBranchId: "",
      mainHeadingNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if(fileId){
        hendleUpdateFileHeading(values)
      }else{
          hendleCreateFileHeading(values)
      }
    },
  });

  const hendleCreateFileHeading = async (values) => {
    const Data = {
      fkBranchId: values?.fkBranchId,
      mainHeading: values?.mainHeading,
      mainHeadingNumber: values?.mainHeadingNumber
    }
    try {
      const response = await createFIleHeading(Data)
      if (response.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
        setTimeout(() => {
            navigate("/efiling/dashboard/file-heading-list");
          }, 1000)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const hendleUpdateFileHeading = async (values) => {
    const Data = {
      fkBranchId: values?.fkBranchId,
      mainHeading: values?.mainHeading,
      mainHeadingNumber: values?.mainHeadingNumber
    }
    try {
      const response = await UpdateFIleHeading(filesData?.id, Data)
      if (response.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
        setTimeout(() => {
            navigate("/efiling/dashboard/file-heading-list");
          }, 1000)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const getSingleHeadingAPi = async () => {
   
    try {
      const response = await getSingleHeadingbyId(fileId)
      if (response.success) {
        showSuccessMessage(response?.message)
        setFileData(response?.data)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (fileId) {
        getSingleHeadingAPi();
    }
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    if (filesData) {
      formik.setValues({
        fkBranchId: filesData?.fkBranchId || "",
        mainHeading: filesData?.mainHeading || "",
        mainHeadingNumber: filesData?.mainHeadingNumber || "",
      });
    }
  }, [filesData, formik.setValues]);

  return (
    <Layout sidebarItems={EfilingSideBarItem} module={true}>
    <Header dashboardLink={"/efiling/dashboard/file-heading-list"} addLink1={"/efiling/dashboard/addedit-file-register"} title1={"Add File Register"} width={"500px"} />
    <ToastContainer />
    <div class="container-fluid">
      <div class="card">
        <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {fileId ? <h1>Edit File Heading</h1> :  <h1>Add File Heading</h1>}
        </div>
        <div class="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div class="container-fluid">
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Heading</label>
                    <input
                      type="text"
                      placeholder={"Heading"}
                      value={formik.values.mainHeading}
                      className={`form-control ${formik.touched.mainHeading &&
                          formik.errors.mainHeading
                          ? "is-invalid"
                          : ""
                        }`}
                      id="mainHeading"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.mainHeading &&
                      formik.errors.mainHeading && (
                        <div className="invalid-feedback">
                          {formik.errors.mainHeading}
                        </div>
                      )}
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Branch</label>
                    <select
                      className={`form-select ${formik.touched.fkBranchId && formik.errors.fkBranchId
                          ? "is-invalid"
                          : ""
                        }`}
                      id="fkBranchId"
                      name="fkBranchId"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fkBranchId}
                    >
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      {allBranchesData && allBranchesData.map((item) => (
                        <option value={item?.id}>{item?.branchName}</option>
                      ))}
                    </select>
                    {formik.touched.fkBranchId && formik.errors.fkBranchId && (
                      <div className="invalid-feedback">
                        {formik.errors.fkBranchId}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              <div class="row">

                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Heading Number</label>
                     <input
                      type="text"
                      placeholder={"Heading Number"}
                      value={formik.values.mainHeadingNumber}
                      className={`form-control ${formik.touched.mainHeadingNumber &&
                          formik.errors.mainHeadingNumber
                          ? "is-invalid"
                          : ""
                        }`}
                      id="mainHeadingNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.mainHeadingNumber &&
                      formik.errors.mainHeadingNumber && (
                        <div className="invalid-feedback">
                          {formik.errors.mainHeadingNumber}
                        </div>
                      )}
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
  )
}

export default AddEditFIleHeading