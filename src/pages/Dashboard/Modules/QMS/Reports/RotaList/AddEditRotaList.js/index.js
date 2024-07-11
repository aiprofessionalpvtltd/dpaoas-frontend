import React, { useContext } from 'react'
import { Layout } from '../../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../../utils/sideBarItems'
import Header from '../../../../../../../components/Header'
import { ToastContainer } from 'react-toastify'
import * as Yup from "yup";
import { useFormik } from 'formik'
import { AuthContext } from '../../../../../../../api/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
// import DatePicker from "react-datepicker";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { CreateRotaList, UpdateRotaList } from '../../../../../../../api/APIs/Services/Question.service'
import { showErrorMessage, showSuccessMessage } from '../../../../../../../utils/ToastAlert'
import { useLocation } from 'react-router-dom'
import moment from 'moment'

const validationSchema = Yup.object({
    groupNo: Yup.string().required("Group No is required"),
    allotmentType: Yup.string().required("Allotment Type is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    sessionId:Yup.string().required("Session Number is Required")
  });
  

function AddEditRotaList() {
    const { sessions } = useContext(AuthContext);
    const location = useLocation()
    const formik = useFormik({
        initialValues: {
          allotmentType: location?.state ? location?.state?.weekDays :  "",
          groupNo: location?.state ? location?.state?.fkGroupId : "",
          startDate: location?.state?.startDate ? moment(location?.state?.startDate).toDate() : "",
          endDate:  location?.state?.endDate ? moment(location?.state?.endDate).toDate() : "",
          sessionId:location?.state ? location?.state?.fkSessionId: "",
          allowedDates: location?.state?.allowedDates ? location?.state?.allowedDates : [],
          skipGroupsID: location?.state?.skipGroups[0] ? location?.state?.skipGroups[0]?.groupId:"",
          skipGroupsDate:location?.state?.skipGroups[0] ? moment(location?.state?.skipGroups[0]?.date).toDate():""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
        //   console.log("Values",values.allowedDates.map((date) => date));
        if(location?.state?.id){
            UpdateRotaListApi(values)
        }else{
            CreateRotaListApi(values)
        }
        },
      });
  
      console.log(formik.values?.startDate)
      const CreateRotaListApi = async (values) => {
        const Data = {
          fkSessionId: values?.sessionId,
          fkGroupId: values?.groupNo || "",
          weekDays: values?.allotmentType,
          startDate: values?.startDate,
          endDate: values?.endDate,
          allowedDates:values?.allowedDates?.map((date) => date?.format()),
          ...(values?.skipGroupsDate
            ? {
                skipGroups: [
                  {
                    groupId: values?.skipGroupsID || "",
                    date: values?.skipGroupsDate || "",
                  },
                ],
              }
            : { skipGroups: [] })
        };
        try {
          const response = await CreateRotaList(Data);
           
            showSuccessMessage(response?.message)
          
        } catch (error) {
          showErrorMessage(error?.response?.data?.message);
        }
      };
      const UpdateRotaListApi = async (values) => {
        const Data = {
          fkSessionId: values?.sessionId,
          fkGroupId: values?.groupNo || "",
          weekDays: values?.allotmentType,
          startDate: values?.startDate ,
          endDate: values?.endDate,
          allowedDates:values?.allowedDates?.map((date) => date),
          ...(values?.skipGroupsDate
            ? {
                skipGroups: [
                  {
                    groupId: values?.skipGroupsID || "",
                    date: values?.skipGroupsDate || "",
                  },
                ],
              }
            : { skipGroups: [] })
        };
        console.log("Data", Data);
        try {
          const response = await UpdateRotaList(location?.state?.id ,Data);
           
            showSuccessMessage(response?.message)
          
        } catch (error) {
          showErrorMessage(error?.response?.data?.message);
        }
      };
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/reports/rota-list"}
        title1={"Rota List"}
        addLink2={""}
        title2={location?.state?.id ? "Edit Rota List" :"Add Rota List"}
      />
      <ToastContainer />

      <div class="container-fluid dash-detail-container">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1> {location?.state?.id ? "Update Rota List" : "Create Rota List"}</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">Session No</label>
                      <select
                        className={`form-select  ${
                          formik.touched.sessionId && formik.errors.sessionId
                            ? "is-invalid"
                            : ""
                        }`}
                        id="sessionId"
                        value={formik.values.sessionId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        {sessions &&
                          sessions.map((item) => (
                            <option key={item.id} value={String(item.id)}>
                              {item?.sessionName}
                            </option>
                          ))}
                      </select>
                      {formik.touched.sessionId && formik.errors.sessionId && (
                        <div className="invalid-feedback">
                          {formik.errors.sessionId}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">Allotment Type</label>
                      <select
                        className={`form-select ${
                          formik.touched.allotmentType &&
                          formik.errors.allotmentType
                            ? "is-invalid"
                            : ""
                        }`}
                        id="allotmentType"
                        value={formik?.values?.allotmentType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option value={"Regular Days"}>Regular Days</option>
                        <option value={"Tuesday-Friday"}>Tuesday/Friday</option>
                        <option value={"Wednesday-Friday"}>
                          Wednesday/Friday
                        </option>
                        {/* <option value={"Alternate Days"}>Alternate Days</option> */}
                      </select>
                      {formik.touched.allotmentType &&
                        formik.errors.allotmentType && (
                          <div className="invalid-feedback">
                            {formik.errors.allotmentType}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">Group No</label>
                      <select
                        className={`form-select ${
                          formik.touched.groupNo && formik.errors.groupNo
                            ? "is-invalid"
                            : ""
                        }`}
                        id="groupNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.groupNo}
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option value={"1"}>Group 1</option>
                        <option value={"2"}>Group 2</option>
                        <option value={"3"}>Group 3</option>
                        <option value={"4"}>Group 4</option>
                        <option value={"5"}>Group 5</option>
                      </select>
                      {formik.touched.groupNo && formik.errors.groupNo && (
                        <div className="invalid-feedback">
                          {formik.errors.groupNo}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label style={{ width: "100%" }} className="form-label">
                        Start Date
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
                        id="startDate"
                        format='DD/MM/YYYY'
                        value={formik.values.startDate}
                        onChange={(date) =>{
                            // const formattedDate = moment(date).format('DD/MM/YYYY');
                            formik.setFieldValue("startDate", date)
                        }
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.startDate && formik.errors.startDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.startDate && formik.errors.startDate && (
                        <div className="invalid-feedback">
                          {formik.errors.startDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-3">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label style={{ width: "100%" }} className="form-label">
                        End Date
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
                        id="endDate"
                        format='DD/MM/YYYY'
                        value={formik.values.endDate}
                        onChange={(date) =>{
                            // const formattedDate = moment(date).format('DD/MM/YYYY');
                            formik.setFieldValue("endDate", date)
                        }
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.endDate && formik.errors.endDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.endDate && formik.errors.endDate && (
                        <div className="invalid-feedback">
                          {formik.errors.endDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label style={{ width: "100%" }} className="form-label">
                        Allowed Dates
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
                        value={formik.values.allowedDates}
                        onChange={(date) =>
                            {
                                // const formattedDate = moment(date).format('DD/MM/YYYY');
                                formik.setFieldValue("allowedDates", date)
                            }
                        }
                        multiple
                        sort
                        id="allowedDates"
                        format={"MM/DD/YYYY"}
                        calendarPosition="bottom-center"
                        plugins={[<DatePanel />]}
                      />
                      {formik.touched.allowedDates &&
                        formik.errors.allowedDates && (
                          <div className="invalid-feedback">
                            {formik.errors.allowedDates}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label style={{ width: "100%" }} className="form-label">
                        Skip Groups Date
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
                        format='DD/MM/YYYY'
                        id="skipGroupsDate"
                        value={formik.values.skipGroupsDate}
                        onChange={(date) =>
{
                            // const formattedDate = moment(date).format('DD/MM/YYYY');
                          formik.setFieldValue("skipGroupsDate", date)}
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
        
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">Skip Group No</label>
                      <select
                        className={`form-select ${
                            formik.touched.skipGroupsDate && formik.errors.skipGroupsDate
                              ? "is-invalid"
                              : ""
                          }`}
                        id="skipGroupsID"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.skipGroupsID}
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option value={"1"}>Group 1</option>
                        <option value={"2"}>Group 2</option>
                        <option value={"3"}>Group 3</option>
                        <option value={"4"}>Group 4</option>
                        <option value={"5"}>Group 5</option>
                      </select>
                      {formik.touched.skipGroupsDate &&
                        formik.errors.skipGroupsDate && (
                          <div className="invalid-feedback">
                            {"Please Select Skip Group Data"}
                          </div>
                        )}
                
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="submit">
                        {location?.state?.id ? "Update Rota List" : "Create Rota List"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddEditRotaList