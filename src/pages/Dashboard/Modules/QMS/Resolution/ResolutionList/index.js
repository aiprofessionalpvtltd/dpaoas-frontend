import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../../components/Header'
import { DeleteResolution, getAllResolutions } from '../../../../../../api/APIs'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { ToastContainer } from 'react-toastify'

function QMSResolutionList() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(1);
    const [resData, setResData] = useState([]);
    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformLeavesData = (apiData) => {
        return apiData.map((leave) => {
          return {
            SrNo: leave.id,
            SessionNumber: leave?.session?.sessionName,
            ResolutionType: leave?.resolutionType,
            SubjectMatter: "",
            NoticeNo: leave?.noticeDiary?.noticeOfficeDiaryNo,
            ResolutionStatus: leave?.resolutionStatus?.resolutionStatus,
            Status: leave?.resolutionActive,
          };
        });
      };

    const getAllResolutionsApi = async () => {
        try {
          const response = await getAllResolutions(currentPage, pageSize);
          if (response?.success) {
            // showSuccessMessage(response?.message);
            setCount(response?.data?.count)
            const transformedData = transformLeavesData(response.data?.resolution);
            setResData(transformedData);
          }
        } catch (error) {
          showErrorMessage(error?.response?.data?.message);
        }
      };
    
      useEffect(() => {
        getAllResolutionsApi();
      }, [currentPage]);

      const deleteResolutionApi = async (id) => {
        try {
            const response = await DeleteResolution(id);
            if (response?.success) {
              showSuccessMessage(response?.message);
              getAllResolutionsApi();
            }
          } catch (error) {
            showErrorMessage(error?.response?.data?.message);
          }
      }

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <ToastContainer />
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
                                    hideBtn={true}
                                    data={resData || []}
                                    tableTitle="Resolutions"
                                    handlePageChange={handlePageChange}
                                    currentPage={currentPage}
                                    showPrint={true}
                                        pageSize={pageSize}
                                        handleDelete={(item) => deleteResolutionApi(item.SrNo)}
                                        handleAdd={(item) => navigate('/')}
                                        handleEdit={(item) => navigate('/')}
                                        totalCount={count}
                                    />

                            </div>
                        </div>
                    </div>
                </div>
    </Layout>
  )
}

export default QMSResolutionList
