import React, { useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import Header from '../../../../../components/Header'
import CustomTable from '../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import { QMSSideBarItems } from '../../../../../utils/sideBarItems'

function QMSSerchResolution() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(null);
    const pageSize = 4;

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

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

    return (
        <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/search/resolution"} title2={"Search Resolution"} />
            <div class='container-fluid'>
                <div class='card mt-4'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>SEARCH RESOLUTION</h1>
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
                                            <option>Select</option>
                                            <option>121</option>
                                            <option>122</option>
                                            <option>123</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">To Session</label>
                                        <select class="form-select">
                                            <option>Select</option>
                                            <option>121</option>
                                            <option>122</option>
                                            <option>123</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Resolution Type</label>
                                        <select class="form-select">
                                            <option>Resolution Type</option>
                                            <option>Government Resolution</option>
                                            <option>Private Member Resolution</option>
                                            <option>Govt. Resolution Supported by others</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Colour Res.No</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Resolution Status</label>
                                        <select class="form-select">
                                            <option selected="selected" value="0">Resolution Status</option>
                                            <option>Allowed</option>
                                            <option>Disallowed</option>
                                            <option>Withdraw</option>
                                            <option>Admitted</option>
                                            <option>Under Process</option>
                                            <option>Admitted and Selected in Balloting</option>
                                            <option>Dropped by the House</option>
                                            <option>Admitted but Lapsed</option>
                                            <option>Included in the order of day</option>
                                            <option>Passed by the House</option>
                                            <option>Passed As Amended</option>
                                            <option>Withdrawn by the Member</option>
                                            <option>Rejected by the House</option>
                                            <option>Passed Unanimously</option>
                                            <option>Under Correspondence</option>
                                            <option>Moved and Pending for Discussion</option>
                                            <option>Lapsed</option>
                                            <option>Deferred</option>
                                            <option>Refered to Standing Committee</option>
                                            <option>Move To Session</option>
                                            <option>Move in the House</option>
                                            <option>Pending for further discussion</option>
                                            <option>NFA</option>
                                            <option>Admitted as Call Attention Notice</option>

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
                                            <label class="form-check-label" for="flexCheckDefault">Complete Text</label>
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

                            <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                                <div class="row">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary mb-3" type="submit">Print Resolution</button>
                                        <button class="btn btn-primary mb-3" type="submit">Motion Annual Report</button>
                                    </div>
                                </div>
                                <CustomTable
                                    headerShown={true}
                                    hideBtn={true}
                                    block={true}
                                    data={data}
                                    // handleEdit={(item) => navigate('/vms/addeditpass', { state: item })}
                                    hideUserIcon={true}
                                    // handleUser={() => navigate("/vms/visitor")}
                                    // handleDuplicate={() => navigate("/vms/duplicatepass")}
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
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Resolution Status</label>
                                            <select class="form-select">
                                                <option>Resolution Status</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Status Date</label>
                                            <input class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <button style={{ marginTop: "30px" }} class="btn btn-primary" type="submit">Change Status</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default QMSSerchResolution
