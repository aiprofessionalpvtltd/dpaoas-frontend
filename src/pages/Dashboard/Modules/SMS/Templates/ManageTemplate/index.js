import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems';
import { DeleteContactTemplate, getContactTemplate } from '../../../../../../api/APIs/Services/SMS.service';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import SMSAddEditTemplate from '../AddTemplates';
import { CustomAlert } from '../../../../../../components/CustomComponents/CustomAlert';
import { getPermissionsData, getUserData, setPermissionsData, setRolesData } from '../../../../../../api/Auth';
import { CheckPermission } from '../../../../../../utils/permissionsConfig';
import { AuthContext } from '../../../../../../api/AuthContext';
import { getRoles } from '../../../../../../api/APIs/Services/organizational.service';

function SMSMAnageTemplate() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [templateData, setTemplateData] = useState([]);

    const [modalisOpan, setModalisOpan] = useState(false)
    const [selecteditem, setSelecteditem] = useState([])

    const [count, setCount] = useState()
    const pageSize = 15; // Set your desired page size

    const { permissions } = useContext(AuthContext);
    const [permissionsLocal, setPermissionsLocal] = useState([]);
    const [roles, setRoles] = useState([]);

    console.log("pr",permissionsLocal);

    const userRole = getUserData();

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformData = (apiData) => {
        return apiData.map((item) => ({
            id: item?.id,
            templateName: item?.templateName,
            description: item?.msgText,
            Status: JSON.stringify(item?.isActive),
            createdAt: moment(item?.createdAt).format("YYYY/MM/DD"),
            updatedAt: moment(item?.updatedAt).format("YYYY/MM/DD")
        }));
    };
    const getTemplate = useCallback(async () => {
        try {
            const response = await getContactTemplate(currentPage, pageSize);
            if (response?.success) {
                const transformedData = transformData(response?.data?.contactTemplate);
                setCount(response?.data?.count);
                setTemplateData(transformedData);
            }
        } catch (error) {
            console.log(error);
        }
    }, [currentPage, pageSize, setCount, setTemplateData, setModalisOpan, modalisOpan]);

    const handleDelete = async (id) => {
        try {
            const response = await DeleteContactTemplate(id);
            if (response?.success) {
                showSuccessMessage(response.message);
                getTemplate();
            }
        } catch (error) {
            showErrorMessage(error.response.data.message);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [templateid, setTemplateId] = useState(null);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleOkClick = () => {
        handleDelete(templateid);
        handleClose();
    };

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
        getTemplate();
    }, [getTemplate]);
    return (
        <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/sms/dashboard"}
                title1={"Manage Template"}
                addLink1={"/sms/template/manage"}
            />

            <ToastContainer />
            <CustomAlert
                showModal={showModal}
                handleClose={handleClose}
                handleOkClick={handleOkClick}
            />
            {modalisOpan ? (
                <SMSAddEditTemplate modalisOpan={modalisOpan} hendleModal={() => setModalisOpan(!modalisOpan)} selectedData={selecteditem} getTemplate={getTemplate} />
            ) : null}
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={templateData}
                        singleDataCard={true}
                        hideBtn={permissionsLocal?.SMS?.canCreate ? false : true}
                        hidebtn1={permissionsLocal?.SMS?.canCreate ? false : true}
                        tableTitle="Manage Template"
                        addBtnText="Add Template"
                        handleAdd={() => {
                            setSelecteditem([
                                {
                                    id: null,
                                    templateName: "",
                                    msgText: ""
                                }
                            ])
                            setModalisOpan(true)
                        }

                            // navigate("/sms/template/add")
                        }
                        handleEdit={(item) => {
                            setSelecteditem(item)
                            setModalisOpan(true)
                        }
                            // navigate("/sms/template/add", { state: item })

                        }
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        // handlePrint={}
                        // handleUser={}
                        totalCount={count}
                        handleDelete={(item) => {
                            setTemplateId(item.id)
                            handleShow()
                        }}
                        hideDeleteIcon={permissionsLocal?.SMS?.canDelete ? false : true}
                        hideEditIcon={permissionsLocal?.SMS?.canEdit ? false : true}
                        ActionHide={permissionsLocal?.SMS?.canDelete || permissionsLocal?.SMS?.canEdit ? false : true}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default SMSMAnageTemplate
    