import React, { useState } from 'react'
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import { NoticeSidebarItems } from '../../../../../../utils/sideBarItems';

function PrivateBill() {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
    const data = []
  return (
    <Layout
    module={true}
    sidebarItems={NoticeSidebarItems}
    centerlogohide={true}
>
    <Header
        dashboardLink={"/"}
    />
    <div class="row">
        <div class="col-12">
            <CustomTable
                data={data}
                tableTitle="Government Bill"
                hideBtn={true}
                hidebtn1={true}
                ActionHide={true}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}

            />
        </div>
    </div>
</Layout>
  )
}

export default PrivateBill