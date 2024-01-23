import React, { useCallback, useEffect, useState } from 'react'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { useNavigate } from 'react-router'
import { DeleteContactList, getContactList } from '../../../../../../api/APIs'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { ToastContainer } from 'react-toastify'

function SMSManageList() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [contactList, setContactList] = useState([])
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const transformDepartmentData = (apiData) => {
    console.log(apiData);
    return apiData.map((leave) => ({
      id: leave?.id,
      listName: leave?.listName,
      listDescription: leave?.listDescription,
      listActive: leave?.listActive,
      UserEmail: leave.user.email,
      isPublicList: JSON.stringify(leave?.isPublicList),
      createdAt: leave?.createdAt,
      updatedAt: leave?.updatedAt,
      //   contactMembers: leave?.contactMembers[0]?.member.memberName
    }));
  };
  const getContactListApi = useCallback(async () => {
    try {
      const response = await getContactList(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformDepartmentData(response?.data?.contactList);
        setCount(response?.data?.count);
        setContactList(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setContactList]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteContactList(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getContactListApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getContactListApi();
  }, [getContactListApi]);
  return (
    <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/sms/dashboard"}
        title1={"Manage List"}
        addLink1={"/sms/phone-book/manage"}
      />
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={contactList}
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
            totalCount={count}
            handleDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </Layout>
  )
}

export default SMSManageList
