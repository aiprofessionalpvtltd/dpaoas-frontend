import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { VMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import CustomModal from '../../../../../../components/CustomComponents/CustomModal';
import Header from '../../../../../../components/Header';
import DatePicker from "react-datepicker";
import { createDuplicatePass, getDuplicatePassByPassId } from '../../../../../../api/APIs';
import { showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const validationSchema = Yup.object({
  passdate: Yup.string().required('Pass Date is required'),
  requestby: Yup.string().required('Request By is required'),
  branch: Yup.string(),
  visitpurpose: Yup.string(),
  cardtype: Yup.string(),
  companyname: Yup.string(),
  companyname: Yup.string(),
  fromdate: Yup.string().required('From Date is required'),
  todate: Yup.string().required('To Date is required'),
  passstatus: Yup.string(),
  passstatus: Yup.string(),
  allowoffdays: Yup.string(),
  remarks: Yup.string().required('Remarks is required'),

});

const validationSchemaModal = Yup.object({
  name: Yup.string().required('Visitor Name is required'),
  cnic: Yup.string().required('Cnic is required'),
  details: Yup.string().required('Visitor Detail By is required'),

});

const initialValuesModal = {
  name: "",
  cnic: "",
  details: "",
  visitorStatus: "active"
}

function VMSDuplicatePass() {
  // const navigate = useNavigate()
  const location = useLocation()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const [duplicateData, setDuplicateData] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  console.log("duplicateData Psss duplicateData", duplicateData?.passDate);

  const formik = useFormik({
    initialValues: {
      passdate: '',
      requestby: '',
      branch: '',
      visitpurpose: '',
      cardtype: '',
      companyname: '',
      fromdate: '',
      todate: '',
      passstatus: '',
      allowoffdays: '',
      remarks: '',
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      submitDublicatePass(values)
    },
  });

  function closeModal() {
    setIsOpen(false);
  }
  const transformDuplicatePassData = (apiData) => {
    return apiData.map((leave) => ({
      id: leave.id,
      name: leave.name,
      cnic: leave.cnic,
      details: leave.details,
      visitorStatus: leave.visitorStatus,
    }));
  };
  // const getDuplicatePassByIDApi = async () => {
  //   try {
  //     const response = await getDuplicatePassByPassId(location.state)
  //     if (response?.success) {
  //       showSuccessMessage(response?.message)
  //       const transformedData = transformDuplicatePassData(response.data.visitor);
  //       // console.log("ALll Duplicate Data, ", response.data);
  //       setData(transformedData)
  //       setDuplicateData(response?.data?.pass);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    const getDuplicatePassByIDApi = async () => {
      try {
        const response = await getDuplicatePassByPassId(location.state);
        if (response?.success) {
          // showSuccessMessage(response?.message);
          const transformedData = transformDuplicatePassData(response.data.visitor);
          setData(transformedData);
          setDuplicateData(response?.data?.pass);
          // const passDate = response?.data?.pass ? new Date(response?.data?.pass?.passDate) : null;
          // const fromDate = response?.data?.pass ? new Date(response?.data?.pass?.fromDate) : null;
          // const toDate = response?.data?.pass ? new Date(response?.data?.pass?.toDate) : null;
          // Set formik initial values here
          formik.setValues({
            // passdate: passDate,
            requestby: response.data.pass.requestedBy,
            branch: response.data.pass.branch,
            visitpurpose: response.data.pass.visitPurpose,
            cardtype: response.data.pass.cardType,
            companyname: response.data.pass.companyName,
            // fromdate: fromDate,
            // todate: toDate,
            passstatus: response.data.pass.passStatus,
            allowoffdays: response.data.pass.allowOffDays,
            remarks: response.data.pass.remarks,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDuplicatePassByIDApi();
  }, [location.state, formik.setValues]);


  const handleSubmitModal = (values) => {
    const newData = [
      ...data,
      values
    ];

    setData(newData)
    closeModal();
  }

  const submitDublicatePass = async (values) => {
    const startDateObj = new Date(values.fromdate);
    const endDateObj = new Date(values.todate);

    // Calculate the time difference in milliseconds
    const timeDiff = endDateObj - startDateObj;

    // Calculate the number of days
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const sumbitData = {
      passDate: values.passdate,
      requestedBy: values.requestby,
      branch: values.branch,
      visitPurpose: values.visitpurpose,
      fromDate: values.fromdate,
      toDate: values.todate,
      cardType: values.cardtype,
      companyName: values.companyname,
      allowOffDays: [
        String(daysDiff)
      ],
      remarks: values.remarks,
      passStatus: values.passstatus,
    }
    const passes = { pass: sumbitData, visitor: data }
    console.log("Data frome", passes);
    try {
      const response = await createDuplicatePass(passes)
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleDelete = async (id) => {
    try {
      showSuccessMessage("Visitors Delete Succesfully");
      setData((prevData) => prevData.filter(item => item.id !== id));


    } catch (error) {
      console.log(error);
      // Handle error here
    }
  };
  return (
    <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} initialValues={initialValuesModal} validationSchema={validationSchemaModal} handleSubmit={handleSubmitModal} />
      <Header dashboardLink={"/vms/dashboard"} addLink1={"/vms/dashboard"} title1={"Passes"} addLink2={"/vms/duplicatepass"} title2={"Duplicate Pass"} />
      <ToastContainer />
      <div class='card'>
        <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
          <h1>Duplicate Pass</h1>
        </div>
        <div class='card-body'>

          <form onSubmit={formik.handleSubmit}>
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Pass Date</label>
                    <DatePicker
                      selected={formik.values.passdate}
                      onChange={(date) =>
                        formik.setFieldValue("passdate", date)
                      }
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.passdate && formik.errors.passdate
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    {formik.touched.passdate && formik.errors.passdate && (
                      <div className="invalid-feedback">
                        {formik.errors.passdate}
                      </div>
                    )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Requested By</label>
                    <input type="text" className={`form-control ${formik.touched.requestby && formik.errors.requestby ? 'is-invalid' : ''}`}
                      id="requestby"
                      placeholder={formik.values.requestby}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.requestby} />
                    {formik.touched.requestby && formik.errors.requestby && (
                      <div className='invalid-feedback'>{formik.errors.requestby}</div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Branch</label>
                    <select
                      class="form-select"
                      id="branch"
                      onChange={formik.handleChange}
                      value={formik.values.branch}
                    >
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Visit Purpose</label>
                    <textarea class="form-control" id="visitpurpose"
                      onChange={formik.handleChange}
                      value={formik.values.visitpurpose}></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Card Type</label>
                    <select class="form-select" id="cardtype"
                      onChange={formik.handleChange}
                      value={formik.values.cardtype}>
                      <option >Personal</option>
                      <option >Hamid</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Company Name</label>
                    <input class="form-control" type="text" id="companyname"
                      onChange={formik.handleChange}
                      value={formik.values.companyname} />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">From Date</label>
                    <DatePicker
                      selected={formik.values.fromdate}
                      onChange={(date) =>
                        formik.setFieldValue("fromdate", date)
                      }
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.fromdate && formik.errors.fromdate
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    {formik.touched.fromdate && formik.errors.fromdate && (
                      <div className="invalid-feedback">
                        {formik.errors.fromdate}
                      </div>
                    )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">To Date</label>
                    <DatePicker
                      selected={formik.values.todate}
                      onChange={(date) =>
                        formik.setFieldValue("todate", date)
                      }
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.todate && formik.errors.todate
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    {formik.touched.todate && formik.errors.todate && (
                      <div className="invalid-feedback">
                        {formik.errors.todate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Active</label>
                    <select class="form-select" id='passstatus' onChange={formik.handleChange}
                      value={formik.values.passstatus}>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Allow Off Days</label>
                    <div style={{ display: "flex" }}>
                      <div class="form-check" style={{ marginTop: "14px" }}>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          Saturday
                        </label>
                      </div>
                      <div class="form-check" style={{ marginTop: "14px", marginLeft: "20px" }}>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          Sunday
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Remarks</label>
                    <textarea
                      cols="30"
                      rows="10"
                      placeholder={formik.values.remarks}
                      className={`form-control ${formik.touched.remarks && formik.errors.remarks ? 'is-invalid' : ''}`}
                      id='remarks'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.remarks}
                    ></textarea>
                    {formik.touched.remarks && formik.errors.remarks && (
                      <div className='invalid-feedback'>{formik.errors.remarks}</div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <CustomTable
                    data={data}
                    tableTitle="Visitors"
                    addBtnText="Add Visitor"
                    handleAdd={() => setIsOpen(true)}
                    hideEditIcon={true}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    // handlePrint={}
                    // handleUser={}
                    handleDelete={(item) => handleDelete(item.id)}
                  />
                </div>
              </div>
              <div class="row">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-primary mt-3" type="submit">Submit</button>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </Layout>
  )
}

export default VMSDuplicatePass
