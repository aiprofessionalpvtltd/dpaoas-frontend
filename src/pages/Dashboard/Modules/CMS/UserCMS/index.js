import React, { useCallback, useEffect, useState } from 'react'
import { Layout } from '../../../../../components/Layout';
import { CMSsidebarItems } from '../../../../../utils/sideBarItems';
import { ToastContainer } from 'react-toastify';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';
import Header from '../../../../../components/Header';
import { useNavigate } from 'react-router-dom';
import { getallComplaint, getallcomplaintRecordById } from '../../../../../api/APIs';

function CMSUserDashboard() {
    const navigate = useNavigate()
    const [count, setCount] = useState(null);
    const [complaintData, setComplaintData] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);

    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformDepartmentData = (apiData) => {
        return apiData.map((leave) => ({
            id: leave?.id,
            fkComplaineeUserId: leave?.fkComplaineeUserId,
            complaintDescription: leave?.complaintDescription,
            complaintType: leave?.complaintType?.complaintTypeName,
            complaintCategory: leave?.complaintCategory?.complaintCategoryName,
            complaintIssuedDate: leave?.complaintIssuedDate
        }));
    };
    const getComplaint = useCallback(async () => {
        try {
            const response = await getallComplaint(currentPage, pageSize);
            if (response?.success) {
                const transformedData = transformDepartmentData(response?.data);
                setCount(response?.count);
                setComplaintData(transformedData);
            }
        } catch (error) {
            console.log(error);
        }
    }, [currentPage, pageSize, setCount, setComplaintData]);

    const HandlePrint = async (id) => {
        try {
            const response = await getallcomplaintRecordById(id);
            console.log("response", response?.data?.complaintAttachment);
            const url = `http://172.16.170.8:5152${response?.data?.complaintAttachment}`;
            window.open(url, "_blank");
            // setPdfUrl(url)
          } catch (error) {
            console.log(error);
          }
        };

    useEffect(() => {
        getComplaint()
    }, [getComplaint])
    return (
        <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/cms/dashboard"}
            //   addLink1={"/cms/dashboard"}
            //   title1={"User Complaint"}
            />
            <ToastContainer />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        block={false}
                        data={complaintData}
                        tableTitle="User Complaint"
                        addBtnText="Add User Complaint"
                        handleAdd={() => navigate("/cms/dashboard/addedit")}
                        handleEdit={(item) => navigate("/cms/dashboard/addedit", { state: item })}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        totalCount={count}
                        hideDeleteIcon={true}
                        showPrint={true}
                        handlePrint={(item) => HandlePrint(item.id)}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default CMSUserDashboard