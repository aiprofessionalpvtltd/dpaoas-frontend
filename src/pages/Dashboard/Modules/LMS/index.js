import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../components/Layout'
import LeaveCard from '../../../../components/CustomComponents/LeaveCard'
import CustomTable from '../../../../components/CustomComponents/CustomTable'
import profileimage from "../../../../assets/profile-img.jpg"
import { LMSsidebarItems } from '../../../../utils/sideBarItems'
import { useNavigate } from 'react-router-dom'
import { getAllLeaves, getWhosOnLeave } from '../../../../api/APIs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const data = [
    {
        id: 1,
        name: "Saqib Khan",
        leaveType: "Sick",
        startDate: "11/02/2023",
        endDate: "11/02/2023",
        totalDays: "30",
        reason: "Feeling Not Good",
        leaveStatus: "Approved",
        submittedTo: "Mohsin"
    },
    {
        id: 2,
        name: "Mohsin Khan",
        leaveType: "Sick",
        startDate: "11/02/2023",
        endDate: "11/02/2023",
        totalDays: "30",
        reason: "Feeling Not Good",
        leaveStatus: "Approved",
        submittedTo: "Mohsin"
    },
    {
        id: 3,
        name: "Saqib Khan",
        leaveType: "Sick",
        startDate: "11/02/2023",
        endDate: "11/02/2023",
        totalDays: "30",
        reason: "Feeling Not Good",
        leaveStatus: "Approved",
        submittedTo: "Mohsin"
    },
    {
        id: 4,
        name: "Mohsin Khan",
        leaveType: "Sick",
        startDate: "11/02/2023",
        endDate: "11/02/2023",
        totalDays: "30",
        reason: "Feeling Not Good",
        leaveStatus: "Approved",
        submittedTo: "Mohsin"
    }
]

const onleaveData = [
    {
        id: "1",
        profile: profileimage,
        name: "Saqib",
        date: "April 20 - April 28,",
        leaveType: "11:33 am"
    },
    {
        id: "1",
        profile: profileimage,
        name: "Saqib",
        date: "April 20 - April 28,",
        leaveType: "11:33 am"
    },
    {
        id: "1",
        profile: profileimage,
        name: "Saqib",
        date: "April 20 - April 28,",
        leaveType: "11:33 am"
    }
]
function LMSDashboard() {
    const navigate = useNavigate();
    const [leaveData, setLeaveData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // const [count, setCount] = useState(null);
    const pageSize = 10; // Set your desired page size
  
    const showSuccessMessage = (message) => {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });
      };
    
      const showErrorMessage = (message) => {
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });
      };

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformLeavesData = (apiData) => {
        return apiData.map((leave) => ({
          id: leave.id,
          name: `${leave.leavefirstName} ${leave.leavelastName}`,
          leaveType: leave.requestLeaveSubType,
          startDate: leave.requestStartDate,
          endDate: leave.requestEndDate,
          totalDays: leave.requestNumberOfDays,
          reason: leave.requestLeaveReason,
          leaveStatus: leave.requestStatus,
          submittedTo: leave.leavesubmittedTofirstName,
        }));
      };

    const getAllLeavesApi = async () => {
        try {
            const response = await getAllLeaves(currentPage, pageSize);
            if(response?.success) {
                showSuccessMessage(response?.message)
                const transformedData = transformLeavesData(response.data);
                setLeaveData(transformedData);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    }

    const getWhosOnLeaveApi = async () => {
        try {
            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            const response = await getWhosOnLeave(formattedDate, formattedDate, 1);
            if(response?.success) {
                showSuccessMessage(response?.message);
                // setLeaveData(response);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        getAllLeavesApi()
        getWhosOnLeaveApi();
    }, [currentPage])

    return (
        <Layout module={true} sidebarItems={LMSsidebarItems} centerlogohide={true}>
            <ToastContainer />
            
            <h1>Welcome back Abbas</h1>
            <div class="row">
                <div class="col-md-12">
                    <div class="mt-5 mb-4">
                        <div class="row">
                            <LeaveCard available={"06"} used={"05"} title={"Approved Leaves"} percentage={"60"} value={"10"} />
                            <LeaveCard available={"05"} used={"04"} title={"Submitted Leaves"} percentage={"80"} value={"09"} />
                            <LeaveCard available={"05"} used={"04"} title={"Remaining Leaves"} percentage={"100"} value={"07"} />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-9">
                    <CustomTable
                        block={true}
                        data={leaveData}
                        tableTitle="Leave Request"
                        addBtnText="Add Leave"
                        handleAdd={() => navigate('/lms/addedit')}
                        handleEdit={(item) => navigate('/lms/addedit', { state: item })}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        pageSize={pageSize}
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
                                <div class="clearfix"></div>
                                {onleaveData && onleaveData.map((item, index) => (
                                    <div class="d-flex flex-row" key={index}>

                                        <img style={{ marginBottom: "30px", marginRight: "15px" }} src={item.profile} width="40" height="40" class="rounded-circle mr-3" alt='logo' />
                                        <div class="w-100">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex flex-row align-items-center">
                                                    <span class="mr-2">{item.name}</span>
                                                </div>
                                            </div>
                                            <p class="text-justify comment-text mb-0" style={{ textAlign: "left" }}><span>{item.date}<span>{item.leaveType}</span></span></p>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default LMSDashboard
