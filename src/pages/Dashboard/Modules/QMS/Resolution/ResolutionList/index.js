import React, { useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../../components/Header'

function QMSResolutionList() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Set your desired page size
    const data = [
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
    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/rsolution/list"} title2={"Resolution List"} />
    <div class='container-fluid'>
                    <div class='card mt-4'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>Resolution List</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Session No</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">List Name</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">List Date</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary" type="submit">Generate</button>
                                        <button class="btn btn-primary" type="submit">Save</button>
                                    </div>
                                </div>

                                <CustomTable
                                    headerShown={true}
                                    hideBtn={true}
                                    block={true}
                                    data={data}
                                    handleAdd={() => alert("Print")}
                                    handleEdit={(item) => navigate('/vms/addeditpass', { state: item })}
                                    hideUserIcon={true}
                                    handleUser={() => navigate("/vms/visitor")}
                                    handleDuplicate={() => navigate("/vms/duplicatepass")}
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

                            </div>
                        </div>
                    </div>
                </div>
    </Layout>
  )
}

export default QMSResolutionList
