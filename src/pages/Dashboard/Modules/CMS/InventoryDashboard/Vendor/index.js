import React, { useCallback, useEffect, useState } from 'react'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { Layout } from '../../../../../../components/Layout'
import { CMSsidebarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import moment from 'moment'
import { DeleteVendor, getAllVendor, searchVendor } from '../../../../../../api/APIs'
import { showErrorMessage } from '../../../../../../utils/ToastAlert'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router'

function CMSVendorList() {

    const navigate = useNavigate()
    const [count, setCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [vendorData, setVendorData] = useState([])
    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformvendordata = (apiData) => {
        console.log(apiData);
        return apiData.map((item) => ({
            id: item?.id,
            vendorName: item?.vendorName,
            description: item?.description,
            status: item?.status,
        }));
    };
    const getAllVendorList = useCallback(async () => {
        try {
            const response = await getAllVendor(currentPage, pageSize);
            if (response?.success) {
                const transformedData = transformvendordata(response?.data?.vendors);
                setCount(response?.data?.count);
                setVendorData(transformedData);
            }
        } catch (error) {
            console.log(error);
        }
    }, [currentPage, pageSize, setCount, setVendorData]);

    const hendleDelete = async (id) => {
        try {
            const response = await DeleteVendor(id)
            if (response.success) {
                showErrorMessage(response.message)
                getAllVendorList()
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    }

    const SearchVendorApi = async (data) => {
        try {
            const response = await searchVendor(data); // Add await here
            if (response?.success) {
                const transformedData = transformvendordata(response?.data);
                setVendorData(transformedData);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message)
        }
    };
    useEffect(() => {
        getAllVendorList()
    }, { getAllVendorList })
    return (
        <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/cms/dashboard"}
            />
            <ToastContainer />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={vendorData}
                        tableTitle={"Vendor List"}

                        // hideBtn={true}
                        addBtnText={"Add Vendor"}
                        handleAdd={() => navigate("/cms/admin/inventory/vendor-list/add")}
                        singleDataCard={true}
                        hideDeleteIcon={false}
                        hideEditIcon={false}
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalCount={count}
                        handleDelete={(item) => hendleDelete(item.id)}
                        handleEdit={(item) => navigate("/cms/admin/inventory/vendor-list/edit", { state: item })}
                        seachBarShow={true}
                        searchonchange={(e) => SearchVendorApi(e.target.value)}
                    />
                </div>
            </div>

        </Layout>
    )
}

export default CMSVendorList