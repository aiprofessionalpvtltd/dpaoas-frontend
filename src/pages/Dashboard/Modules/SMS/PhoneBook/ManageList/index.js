import React, { useCallback, useContext, useEffect, useState } from 'react'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { useNavigate } from 'react-router'
import { DeleteContactList, getContactList, getSignalContactListByid } from '../../../../../../api/APIs/Services/SMS.service'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { ToastContainer } from 'react-toastify'
import moment from 'moment'
import SMSAddList from '../AddList'
import { CustomAlert } from '../../../../../../components/CustomComponents/CustomAlert'
import { getPermissionsData, getUserData, setPermissionsData, setRolesData } from '../../../../../../api/Auth'
import { AuthContext } from '../../../../../../api/AuthContext'
import { CheckPermission } from '../../../../../../utils/permissionsConfig'
import { getRoles } from '../../../../../../api/APIs/Services/organizational.service'

function SMSManageList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);

  const [modalisOpan, setModalisOpan] = useState(false)
  const [selecteditem, setSelecteditem] = useState([])
  const [contactList, setContactList] = useState([])
  const pageSize = 4; // Set your desired page size

  const { permissions } = useContext(AuthContext);
  const [permissionsLocal, setPermissionsLocal] = useState([]);
  const [roles, setRoles] = useState([]);

  const userRole = getUserData();

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
        id: null,
        listName: "",
        listDescription: "",
        contactMembers: []
      }
    ])
    setModalisOpan(true)
  }

  const [showModal, setShowModal] = useState(false);
  const [listId, setListId] = useState(null);
  const [alertMessage, setalertmessage] = useState(null)

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleOkClick = () => {
    if (alertMessage === "Members already exist on the list.") {
      handleClose()
    } else {
      handleDelete(listId);
      handleClose();
    }

  };

  const hendleSingleList = async (id) => {
    try {
      const response = await getSignalContactListByid(id)
      if (response?.success) {
        // navigate("/sms/phone-book/add", { state: response?.data })
        if (response?.data[0]?.contactMembers?.length) {
          setalertmessage("Members already exist on the list.")
          handleShow()
        } else {
          setalertmessage("Are you sure you want to proceed?")
          handleShow()
        }
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }


  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response?.data?.roles);
      } catch (error) {
        alert(error?.response?.data)
        // if (error?.response?.data?.error === "Token has expired!") {
        //   logout();
        //   navigation("/login");
        // }
      }
    };

    fetchRoles();
  }, []);
  useEffect(() => {
    if (roles) {
      setRolesData(roles);
      const localPermissionsData = getPermissionsData();
      setPermissionsLocal(localPermissionsData);

      // Check if permissions exist and has length
      if (permissions && permissions.length > 0) {
        const res = CheckPermission(userRole?.role?.name, roles, permissions);
        setPermissionsData(res?.permissions);
        setPermissionsLocal(res?.permissions);
      } else {
        // Handle the case when permissions are empty or undefined
        // For example, set default permissions
        setPermissionsData(localPermissionsData);
        setPermissionsLocal(localPermissionsData);
      }
    }
  }, [roles, permissions]);

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
      <CustomAlert
        title={alertMessage}
        showModal={showModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />
      {modalisOpan ? (
        <SMSAddList modalisOpan={modalisOpan} hendleModal={() => setModalisOpan(!modalisOpan)} Data={selecteditem} getContactListApi={getContactListApi} />
      ) : null}
      <div class="row">
        <div class="col-12">
          <CustomTable
            data={contactList}
            singleDataCard={true}
            tableTitle="Manage List"
            addBtnText="Add List"
            hideBtn={permissionsLocal?.SMS?.canCreate ? false : true}
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
            ActionHide={permissionsLocal?.SMS?.canDelete || permissionsLocal?.SMS?.canEdit ? false : true}
            totalCount={count}
            handleDelete={(item) => {
              setListId(item.id)
              hendleSingleList(item.id)
            }}
            hideDeleteIcon={permissionsLocal?.SMS?.canDelete ? false : true}
            hideEditIcon={permissionsLocal?.SMS?.canEdit ? false : true}
          />
        </div>
      </div>
    </Layout>
  )
}

export default SMSManageList
