import React, { useState, useEffect } from 'react'
import { Layout } from '../../../../components/Layout'
import { VMSsidebarItems } from '../../../../utils/sideBarItems'
import CustomTable from '../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header'
import { getPassPdfBYPassID, getPasses } from '../../../../api/APIs'
import { ToastContainer } from 'react-toastify';
import { showErrorMessage, showSuccessMessage } from '../../../../utils/ToastAlert'
import { setPassID } from '../../../../api/Auth'



function VMSDashboard() {
    const navigate = useNavigate();
    const [passAllData, setPassAllData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformLeavesData = (apiData) => {
        return apiData.map((leave) => ({
            id: leave.id,
            passDate: leave.passDate,
            requestedBy: leave.requestedBy,
            branch: leave.branch,
            visitPurpose: leave.visitPurpose,
            cardType: leave.cardType,
            companyName: leave.companyName,
            fromDate: leave.fromDate,
            toDate: leave.toDate,
            allowOffDays: leave.allowOffDays,
            remarks: leave.remarks,
            passStatus: leave.passStatus,
            createdAt: leave.createdAt,
            updatedAt: leave.updatedAt
        }));
    };

    const getPassesData = async () => {
        try {
            const response = await getPasses(currentPage, pageSize)
            if (response?.success) {
                showSuccessMessage(response?.message)
                const transformedData = transformLeavesData(response.data);
                console.log("ALll Datatat, ", transformedData);
                setPassAllData(transformedData);
            }
        } catch (error) {
            console.log(error);
            // alert(error.response)
            console.log("error.response", error.response.data.error);
            showErrorMessage(error.response.data.error)
        }
    }
    useEffect(() => {
        getPassesData()
    }, [])
    const HandlePrint = async (id) => {
        try {
            const response = await getPassPdfBYPassID(id)
            console.log("REsponse ", response?.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/vms/dashboard"} addLink1={"/vms/dashboard"} title1={"Passes"} />
            <ToastContainer />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        block={true}
                        data={passAllData}
                        tableTitle="Passes"
                        addBtnText="Add Pass"
                        handleAdd={() => navigate('/vms/addeditpass')}
                        handleEdit={(item) => navigate('/vms/addeditpass', { state: item })}
                        hideUserIcon={true}
                        handleUser={(item) => {
                            setPassID(item.id)
                            navigate("/vms/visitor", { state: item })
                        }}
                        handleDuplicate={(item) => navigate("/vms/duplicatepass", { state: item.id })}
                        seachBarShow={true}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        handlePrint={(item) => HandlePrint(item.id)}
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                    // handlePrint={}
                    // handleUser={}
                    // handleDelete={(item) => handleDelete(item.id)}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default VMSDashboard
