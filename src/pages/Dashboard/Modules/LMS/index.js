import React from 'react'
import { Layout } from '../../../../components/Layout'
import LeaveCard from '../../../../components/CustomComponents/LeaveCard'
import CustomTable from '../../../../components/CustomComponents/CustomTable'
import profileimage from "../../../../assets/profile-img.jpg"
import { LMSsidebarItems } from '../../../../utils/sideBarItems'
import { useNavigate } from 'react-router-dom'

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

const onleaveData = [
    {
        id: "1",
        profile: profileimage,
        name: "Saqib",
        date: "April 20",
        leaveType: "Casual Leave"
    },
    {
        id: "1",
        profile: profileimage,
        name: "Saqib",
        date: "April 20",
        leaveType: "Casual Leave"
    },
    {
        id: "1",
        profile: profileimage,
        name: "Saqib",
        date: "April 20",
        leaveType: "Casual Leave"
    }
]
function LMSDashboard() {
    const navigate = useNavigate()
    return (
        <Layout module={true} sidebarItems={LMSsidebarItems} centerlogohide={true}>
            <div class='container-fluid'>
                <h1>Welcome back Abbas</h1>
                <div class="row">
                    <div class="col-md-12">
                        <div class="dash-detail-container">
                            <div class="row">
                                <LeaveCard available={"06"} used={"05"} title={"Casual Leaves"} />
                                <LeaveCard available={"05"} used={"04"} title={"Sick Leaves"} />
                                <LeaveCard available={"05"} used={"04"} title={"Half Leaves"} />
                                <LeaveCard available={"05"} used={"04"} title={"Approved Leaves"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-9">
                        <CustomTable
                            data={data}
                            tableTitle="Leave Request"
                            addBtnText="Add Leave"
                            handleAdd={() => navigate('/lms/addedit')}
                            handleEdit={() => navigate('/lms/addedit', { state: true })}
                        // handleDelete={(item) => handleDelete(item.id)}
                        />
                    </div>
                    <div class="col-3">
                        <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                            <div class="dash-card">
                                <div class="dash-card-header green-bg">
                                    <h2>Who is on Leave</h2>
                                </div>
                                <div class="count" style={{ width: "100%" }}>
                                    <h3 style={{ fontSize: "17px", marginTop: "7px", marginBottom: "30px" }} class="float-start">ON leave : <span style={{ color: "red" }}>{onleaveData?.length}</span></h3>
                                    <select class="form-select float-end" style={{ width: "150px" }} aria-label="Default select example">
                                        <option selected>Today</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <div class="clearfix"></div>
                                    {onleaveData && onleaveData.map((item) => (
                                        <div class="d-flex flex-row">

                                            <img style={{ marginBottom: "30px", marginRight: "15px" }} src={item.profile} width="40" height="40" class="rounded-circle mr-3" alt='logo' />
                                            <div class="w-100">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="d-flex flex-row align-items-center">
                                                        <span class="mr-2">{item.name}</span>
                                                    </div>
                                                </div>
                                                <p class="text-justify comment-text mb-0" style={{ textAlign: "left" }}><span>{item.date} - <span>{item.leaveType}</span></span></p>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default LMSDashboard
