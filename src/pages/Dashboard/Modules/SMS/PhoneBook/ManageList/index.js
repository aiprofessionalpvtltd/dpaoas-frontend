import React, { useCallback, useEffect, useState } from 'react'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { useNavigate } from 'react-router'
import { DeleteContactList, getContactList, getSignalContactListByid } from '../../../../../../api/APIs'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { ToastContainer } from 'react-toastify'
import moment from 'moment'
import SMSAddList from '../AddList'

function SMSManageList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);

  const [modalisOpan, setModalisOpan] = useState(false)
  const [selecteditem, setSelecteditem] = useState([])
  const [contactList, setContactList] = useState([])
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };
  const transformDepartmentData = (apiData) => {

    return apiData.map((leave) => ({
      id: leave?.id,
      listName: leave.isPublicList === true ? `*${leave?.listName}` : leave?.listName,
      listDescription: leave?.listDescription,
      listActive: leave?.listActive,
      UserName: `${leave.user.employee?.firstName}${leave.user.employee?.lastName}`,
      isPublicList: JSON.stringify(leave?.isPublicList),
      createdAt: moment(leave?.createdAt).format("YYYY/MM/DD"),
      updatedAt: moment(leave?.updatedAt).format("YYYY/MM/DD")
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
  }, [currentPage, pageSize, setCount, setContactList, setModalisOpan, modalisOpan]);

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

  const hendleSingleListRecord = async (id) => {

    try {
      const response = await getSignalContactListByid(id)
      if (response?.success) {
        // navigate("/sms/phone-book/add", { state: response?.data })
        setSelecteditem(response?.data)
        // console.log("response?.data",response?.data);
        setModalisOpan(true)

      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }
  const hendleAdd = () => {
    setSelecteditem([
      {
        id:null,
        listName: "",
        listDescription: "",
        contactMembers: []
      }
    ])
    setModalisOpan(true)
  }
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
      {modalisOpan ? (
        <SMSAddList modalisOpan={modalisOpan} hendleModal={() => setModalisOpan(!modalisOpan)} Data={selecteditem} getContactListApi={getContactListApi}/>
      ) : null}
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={contactList}
            singleDataCard={true}
            tableTitle="Manage List"
            addBtnText="Add List"
            handleAdd={() => hendleAdd()}
            handleEdit={(item) => hendleSingleListRecord(item.id)
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
