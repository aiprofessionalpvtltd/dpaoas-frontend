import React, { useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import { LMSsidebarItems } from '../../../../../utils/sideBarItems'
import CustomTable from '../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/Header'
import DatePicker from "react-datepicker";

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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


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
                                    <label class="form-label">Name</label>
                                    <select class="form-select">
                                        <option>Saqib</option>
                                        <option>Hamid</option>
                                        <option>Mohsin</option>
                                    </select>
                                </div>
                            </div>


                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label" style={{ display: "block" }}>Start Date</label>
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='form-control' />
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label" style={{ display: "block" }}>End Date</label>
                                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className='form-control' />
                                </div>
                            </div>

                        </div>
                        <div class="row"><div class="d-grid gap-2 d-md-flex justify-content-md-end"><button class="btn btn-primary" type="button">Search</button></div></div>
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
