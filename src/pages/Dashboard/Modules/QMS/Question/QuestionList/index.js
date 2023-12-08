import React, { useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { useFormik } from 'formik';
import * as Yup from 'yup';
const validationSchema = Yup.object({
    sessionNumber: Yup.string().required('Session No is required'),
    category:Yup.string(),
    groupNo: Yup.string(),
    startListNo: Yup.string(),
    listName: Yup.string(),
    houseLayDate: Yup.string(),
    include: Yup.boolean()
    
});

function QMSQuestionList() {
    const formik = useFormik({
        initialValues: {
            sessionNumber: '',
            category:'',
            groupNo: '',
            startListNo: '',
            listName: '',
            houseLayDate: '',
            include: ''
            
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
   
    const data = [
        {
            "Sr#": 1,
            "List Name": "21-11-2023",
            "Session Number": "Saqib khan",
            "List Date": "Additional Secretary Office",
            "Group": "Personal",
            "Catagory": "AI Professionals Pvt Limited",
            "Start Number": "21-11-2023",
        },
        {
            "Sr#": 1,
            "List Name": "21-11-2023",
            "Session Number": "Saqib khan",
            "List Date": "Additional Secretary Office",
            "Group": "Personal",
            "Catagory": "AI Professionals Pvt Limited",
            "Start Number": "21-11-2023",
        },
    ]
    
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/question/list"} title2={"Question List"} />
    <div class='container-fluid'>
                    <div class='card mt-4'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>Question List</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                            <form onSubmit={formik.handleSubmit}>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Session No</label>
                                            <input
                                                type='text'
                                                placeholder={formik.values.sessionNumber}
                                                className={`form-control ${formik.touched.sessionNumber && formik.errors.sessionNumber ? 'is-invalid' : ''}`}
                                                id='sessionNumber'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.sessionNumber && formik.errors.sessionNumber && (
                                                    <div className='invalid-feedback'>{formik.errors.sessionNumber}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Catagory</label>
                                            <select class="form-select" id='category'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}>
                                                <option>Starred</option>
                                                <option>Un-Starred</option>
                                                <option>Short Notice</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Group No</label>
                                            <input class="form-control" id='groupNo' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Start List No</label>
                                            <input class="form-control" id='startListNo' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">List Name</label>
                                            <input class="form-control" id='listName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">House Lay Date</label>
                                            <input class="form-control" id='houseLayDate' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <div class="form-check" style={{marginTop: "39px"}}>
                                                <input class="form-check-input " type="checkbox" id='include' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                <label class="form-check-label" for="flexCheckDefault">Include Deffer Questions</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary" type="submit">Generate</button>
                                        <button class="btn btn-primary" type="">Save</button>
                                    </div>
                                </div>
                                </form>
                                    <CustomTable
                                    headerShown={true}
                                    hideBtn={true}
                                    block={false}
                                    data={data}
                                    handleAdd={() => alert("Print")}
                                    handleEdit={(item) => navigate('/vms/addeditpass', { state: item })}
                                    hideUserIcon={true}
                                    handleUser={() => navigate("/vms/visitor")}
                                    handleDuplicate={() => navigate("/vms/duplicatepass")}
                                    // seachBarShow={true}
                                    handlePageChange={handlePageChange}
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    headertitlebgColor={"#666"}
                                    headertitletextColor={"#FFF"}
                                // handlePrint={}
                                // handleUser={}
                                // handleDelete={(item) => handleDelete(item.id)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
    </Layout>
  )
}

export default QMSQuestionList
