import React, { useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'

function QMSQuestionList() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
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
                    <div class='card mt-5'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>Question List</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Session No</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Catagory</label>
                                            <select class="form-select">
                                                <option>Starred</option>
                                                <option>Un-Starred</option>
                                                <option>Short Notice</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Group No</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Start List No</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">List Name</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">House Lay Date</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <div class="form-check" style={{marginTop: "39px"}}>
                                                <input class="form-check-input " type="checkbox" id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault">Include Deffer Questions</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary" type="submit">Generate</button>
                                        <button class="btn btn-primary" type="submit">Save</button>
                                    </div>
                                </div>
                                    <CustomTable
                                    headerShown={true}
                                    hideBtn={true}
                                    block={true}
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
