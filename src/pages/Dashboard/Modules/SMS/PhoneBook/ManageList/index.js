import React, { useState } from 'react'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { useNavigate } from 'react-router'

function SMSManageList() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    // const [count, setCount] = useState(null);
    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
    const Data = [
        {
            id: "1",
            Name: "COntact Person Name",
            Detail: "Senate OF pakistan"
        },
        {
            id: "3",
            Name: "COntact Person Name",
            Detail: "Senate OF pakistan"
        },
        {
            id: "4",
            Name: "COntact Person Name",
            Detail: "Senate OF pakistan"
        },
        {
            id: "5",
            Name: "COntact Person Name",
            Detail: "Senate OF pakistan"
        }
    ]
    return (
        <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/sms/dashboard"}
                title1={"Manage List"}
                addLink1={"/sms/phone-book/manage"}
            />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={Data}
                        tableTitle="Manage List"
                        addBtnText="Add List"
                        handleAdd={() => navigate("/sms/phone-book/add")}
                        handleEdit={(item) =>
                            navigate("/sms/phone-book/add", { state: item })
                        }
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        // handlePrint={}
                        // handleUser={}
                        //   totalCount={count}
                        handleDelete={(item) => alert("lspd")}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default SMSManageList
