import React, { useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'

function QMSDeleteResolution() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Set your desired page size
    const data = [
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
            <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/resolution/delete"} title2={"Delete Resolution"} />
            <div class='container-fluid'>
                <div class='card mt-5'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>DELETED RESOLUTION</h1>
                    </div>
                    <div class='card-body'>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Resolution Diary No</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Resolution ID</label>
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
                                        <label class="form-label">Resolution Type</label>
                                        <select class="form-control">
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Colour Res. No</label>
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
                                        <label class="form-label">Resolution Status</label>
                                        <select class="form-control">
                                            <option>Resolution Status</option>
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
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" id="flexCheckDefault" />
                                            <label class="form-check-label" for="flexCheckDefault"> Complete Text</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-primary" type="submit">Search</button>
                                    <button class="btn btn-primary" type="submit">Reset</button>
                                </div>
                            </div>

                            <div class="" style={{ marginTop: "20px" }}>
                                <div class="row mb-3">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary" type="submit">Print Resolution</button>
                                        <button class="btn btn-primary" type="submit">Motion Annual Report</button>
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
                                <div style={{ float: "right", marginTop: "10px" }}>

                                    <button class="btn btn-primary" type="submit">Recover</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default QMSDeleteResolution
