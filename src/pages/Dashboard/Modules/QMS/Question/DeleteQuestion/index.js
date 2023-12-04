import React, { useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'

function QMSDeleteQuestion() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Set your desired page size
    const data = [
        {
            "Sr#": 1,
            "MID": "21-11-2023",
            "M-File No": "Saqib khan",
            "Motion Diary No": "Additional Secretary Office",
            "Session Number": "Educational Trip",
            "Motion Type": "Personal",
            "Subject Matter": "AI Professionals Pvt Limited",
            "Notice No./Date": "21-11-2023",
            "Motion Week": "30-11-2023",
            "Motion Status": [
                "Saturday"
            ],
            "Movers": "Visit",
            "Ministries": "Inactive",
        },
        {
            "Sr#": 1,
            "MID": "21-11-2023",
            "M-File No": "Ali Ahmad Jan",
            "Motion Diary No": "Additional Secretary Office",
            "Session Number": "Educational Trip",
            "Motion Type": "Personal",
            "Subject Matter": "AI Professionals Pvt Limited",
            "Notice No./Date": "21-11-2023",
            "Motion Week": "30-11-2023",
            "Motion Status": [
                "Saturday"
            ],
            "Movers": "Visit",
            "Ministries": "Inactive",
        },
    ]
    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
    return (
        <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/question/delete"} title2={"Delete Question"} />
            <div class='container-fluid'>
                <div class='card mt-5'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>DELETED QUESTIONS</h1>
                    </div>
                    <div class='card-body'>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Question Diary No</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Question ID</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Keyword</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Member Name</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">From Session</label>
                                        <select class="form-select">
                                            <option>333</option>
                                            <option>332</option>
                                            <option>331</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">To Session</label>
                                        <select class="form-select">
                                            <option>333</option>
                                            <option>332</option>
                                            <option>331</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Category</label>
                                        <select class="form-control">
                                            <option>Category</option>
                                            <option>Starred</option>
                                            <option>Un-Starred</option>
                                            <option>Short Notice</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Group</label>
                                        <select class="form-control">
                                            <option>Group1</option>
                                            <option>Group1</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Question Status</label>
                                        <select class="form-control">
                                            <option>Question Status</option>
                                            <option>Admitted</option>
                                            <option>Admitted but Lapsed</option>
                                            <option>Deferred</option>
                                            <option>Disallowed</option>
                                            <option>Disallowed on Reconsideration</option>
                                            <option>File not Available</option>
                                            <option>Lapsed</option>
                                            <option>NFA</option>
                                            <option>Replied</option>
                                            <option>Replied/Referred to Standing Committee</option>
                                            <option>Under Correspondence</option>
                                            <option>Under Process</option>
                                            <option>Withdrawn</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Notice Diary No</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">From Notice Date</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">To Notice Date</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Gender</label>
                                        <select class="form-control">
                                            <option>Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Religion</label>
                                        <select class="form-control">
                                            <option>Religion</option>
                                            <option>Islam</option>
                                            <option>Christianity</option>
                                            <option>Hinduism</option>
                                            <option>Sikh</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Not in Religion</label>
                                        <select class="form-control">
                                            <option>Not in Religion</option>
                                            <option>Islam</option>
                                            <option>Christianity</option>
                                            <option>Hinduism</option>
                                            <option>Sikh</option>
                                            <option>Other</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <div class="form-check" style={{ marginTop: "39px" }}>
                                            <input class="form-check-input " type="checkbox" id="flexCheckDefault" />
                                            <label class="form-check-label" for="flexCheckDefault"> Complete Text</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <div class="mb-3">
                                        <label class="form-label">Division</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-primary" type="submit">Search</button>
                                    <button class="btn btn-primary" type="submit">Reset</button>
                                </div>
                            </div>

                            <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                                <div class="row mb-3">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary" type="submit">Print Questions</button>
                                        <button class="btn btn-primary" type="submit">Annual Report</button>
                                    </div>
                                    <div class="clearfix"></div>
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
            </div>
        </Layout>
    )
}

export default QMSDeleteQuestion
