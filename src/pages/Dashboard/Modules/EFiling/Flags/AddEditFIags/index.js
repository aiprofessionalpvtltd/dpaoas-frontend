import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../../../api/AuthContext'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { EfilingSideBarBranchItem, EfilingSideBarItem } from '../../../../../../utils/sideBarItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { ToastContainer } from 'react-toastify'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { UpdateFIleHeading, UpdateFlagApi, createFIleHeading, createFlagApi, getSingleFlagById, getSingleHeadingbyId } from '../../../../../../api/APIs/Services/efiling.service'
import { getUserData } from '../../../../../../api/Auth'


const validationSchema = Yup.object({
    flagName: Yup.string().required("Flag is required"),
  });

function AddEditFlags() {
    const location = useLocation();
  const userData = getUserData()

    const navigate = useNavigate()
  const [filesData, setFileData] = useState([])
  const [fileId, setFIleId] = useState(location?.state?.SrNo);

  const formik = useFormik({
    initialValues: {
      flagName:  "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if(fileId){
        handleUpdateFlag(values)
      }else{
        console.log("Please enter", values);
        handleCreateFlag(values)
      }
    },
  });

  const handleCreateFlag = async (values) => {
    const Data = {
      fkBranchId: userData?.fkBranchId,
      flag: values?.flagName
    }
    try {
      const response = await createFlagApi(Data)
      if (response.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
        setTimeout(() => {
            navigate("/efiling/dashboard/flags");
          }, 1000)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleUpdateFlag = async (values) => {
    const Data = {
      fkBranchId: userData?.fkBranchId,
      flag: values?.flagName
    }
    try {
      const response = await UpdateFlagApi(filesData?.id, Data)
      if (response.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
        setTimeout(() => {
            navigate("/efiling/dashboard/flags");
          }, 1000)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const getSingleHeadingAPi = async () => {
   
    try {
      const response = await getSingleFlagById(fileId)
      if (response.success) {
        // showSuccessMessage(response?.message)
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
        flagName: filesData?.flag || ""
      });
    }
  }, [filesData, formik.setValues]);

  // const offcerType = getUserData()

  return (
    <Layout sidebarItems={userData && userData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem} centerlogohide={true} module={false}>
    {/* <Header dashboardLink={"/efiling/dashboard"} addLink1={"/efiling/dashboard/file-heading-list"} title1={"File Headings"} addLink2={"/"} title2={location?.state ? "Update Heading" : "Create Heading"} width={"500px"} /> */}
    <ToastContainer />
    <div class="container-fluid">
      <div class="card">
        <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {fileId ? <h1>Update Flag</h1> :  <h1>Create Flag</h1>}
        </div>
        <div class="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div class="container-fluid">
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Flag <span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      placeholder={"Flag"}
                      value={formik.values.flagName}
                      className={`form-control ${formik.touched.flagName &&
                          formik.errors.flagName
                          ? "is-invalid"
                          : ""
                        }`}
                      id="flagName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.flagName &&
                      formik.errors.flagName && (
                        <div className="invalid-feedback">
                          {formik.errors.flagName}
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

export default AddEditFlags