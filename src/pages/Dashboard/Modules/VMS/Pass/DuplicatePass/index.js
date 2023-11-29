import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { VMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import CustomModal from '../../../../../../components/CustomComponents/CustomModal';
import Header from '../../../../../../components/Header';
import DatePicker from "react-datepicker";
import { getDuplicatePassByPassId } from '../../../../../../api/APIs';

const validationSchema = Yup.object({
  remarks: Yup.string().required('Remarks is required'),
  passdate: Yup.string().required('Pass Date is required'),
  requestby: Yup.string().required('Request By is required'),

});

const validationSchemaModal = Yup.object({
  visitorname: Yup.string().required('Visitor Name is required'),
  cnic: Yup.string().required('Cnic is required'),
  visitordetail: Yup.string().required('Visitor Detail By is required'),

});

const initialValuesModal = {
  visitorname: "",
  cnic: "",
  visitordetail: ""
}

function VMSDuplicatePass() {
  // const navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fromdate, setFromDate] = useState(new Date());
  const [todate, setToDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };


  const formik = useFormik({
    initialValues: {
      remarks: '',
      passdate: '',
      requestby: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });
  const [data, setData] = useState([
    { visitorname: "Saqib", cnic: '61101-1254556-3	', visitordetail: 'jdsljadslg dalkfjldkfjdsaf kldjaflkajflsdjf jlksddjflkajsdflk' },
    { visitorname: "Saqib", cnic: '61101-1254556-3	', visitordetail: 'jdsljadslg dalkfjldkfjdsaf kldjaflkajflsdjf jlksddjflkajsdflk' },
    { visitorname: "Saqib", cnic: '61101-1254556-3	', visitordetail: 'jdsljadslg dalkfjldkfjdsaf kldjaflkajflsdjf jlksddjflkajsdflk' },
  ]);

  function closeModal() {
    setIsOpen(false);
  }
  const getDuplicatePassByIDApi = async (passId) => {
    try {
      const response = await getDuplicatePassByPassId(passId)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {

  }, [])

  const handleSubmitModal = (values) => {
    const newData = [
      ...data,
      values
    ];

    setData(newData)
    closeModal();
  }

  return (
    <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} initialValues={initialValuesModal} validationSchema={validationSchemaModal} handleSubmit={handleSubmitModal} />
      <Header dashboardLink={"/vms/dashboard"} addLink1={"/vms/dashboard"} title1={"Passes"} addLink2={"/vms/duplicatepass"} title2={"Duplicate Pass"} />

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
                    <input type="text" className={`form-control ${formik.touched.passdate && formik.errors.passdate ? 'is-invalid' : ''}`}
                      id="passdate"
                      placeholder={formik.values.passdate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.passdate} />
                    {formik.touched.passdate && formik.errors.passdate && (
                      <div className='invalid-feedback'>{formik.errors.passdate}</div>
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
                    <select class="form-select">
                      <option>IT</option>
                      <option>HR</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Visit Purpose</label>
                    <textarea class="form-control"></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Card Type</label>
                    <select class="form-select">
                      <option>Personal</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Company Name</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">From Date</label>
                    <DatePicker selected={fromdate} onChange={(date) => setFromDate(date)} className='form-control' />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">To Date</label>
                    <DatePicker selected={todate} onChange={(date) => setToDate(date)} className='form-control' />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Active</label>
                    <select class="form-select">
                      <option>Document Type</option>
                      <option>External</option>
                      <option>Internal</option>
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
                  // handleDelete={(item) => handleDelete(item.id)}
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
