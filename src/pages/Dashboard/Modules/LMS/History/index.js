import React from 'react'
import { Layout } from '../../../../../components/Layout'
import { LMSsidebarItems } from '../../../../../utils/sideBarItems'
import CustomTable from '../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/Header'

const data = [
    {
        id: 1,
        name: "Saqib Khan",
        leaveType: "Sick",
        startDate: "11/02/2023",
        endDate: "11/02/2023",
        days: "30",
        reason: "Filling Not Good",
        leaveStatus: "Approved",
        submittedTo: "Mohsin"
    },
    {
        id: 2,
        name: "Mohsin Khan",
        leaveType: "Sick",
        startDate: "11/02/2023",
        endDate: "11/02/2023",
        days: "30",
        reason: "Filling Not Good",
        leaveStatus: "Approved",
        submittedTo: "Mohsin"
    }
]
function LMSHistory() {
    const navigate = useNavigate()

    return (
        <Layout module={true} sidebarItems={LMSsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/lms/dashboard"} addLink1={"/lms/history"} title1={"History"} />

            <div class='card'>
                <div class='card-header red-bg' style={{ background: "#14ae5c" }}>
                    <h1>Leave History</h1>
                </div>
                <div class='card-body'>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">All</label>
                                    <select class="form-select">
                                        <option>Approved</option>
                                        <option>Pending</option>
                                        <option>Rejected</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">Department</label>
                                    <select class="form-select">
                                        <option>IT</option>
                                        <option>Admin</option>
                                        <option>Finance</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">Designation</label>
                                    <select class="form-select">
                                        <option>Software Dev</option>
                                        <option>UI/UX</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">Start Date</label>
                                    <input class="form-control" type="text" />
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">End Date</label>
                                    <input class="form-control" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <CustomTable data={data} tableTitle={"Leave Request"} headerBgColor={"#666"} hideBtn={true} handleEdit={() => navigate('/lms/addedit', { state: true })} />
                            </div></div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default LMSHistory
