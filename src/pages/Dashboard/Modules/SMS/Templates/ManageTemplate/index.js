import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems';
import { DeleteContactTemplate, getContactTemplate } from '../../../../../../api/APIs';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import SMSAddEditTemplate from '../AddTemplates';
import { CustomAlert } from '../../../../../../components/CustomComponents/CustomAlert';

function SMSMAnageTemplate() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [templateData, setTemplateData] = useState([]);

    const [modalisOpan, setModalisOpan] = useState(false)
    const [selecteditem, setSelecteditem] = useState([])

    const [count, setCount] = useState()
    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformDepartmentData = (apiData) => {
        console.log(apiData[0].isActive)
        return apiData.map((leave) => ({
            id: leave?.id,
            templateName: leave?.templateName,
            description: leave?.msgText,
            Status: JSON.stringify(leave?.isActive),
            createdAt: moment(leave?.createdAt).format("YYYY/MM/DD"),
            updatedAt: moment(leave?.updatedAt).format("YYYY/MM/DD")
        }));
    };
    const getTemplate = useCallback(async () => {
        try {
            const response = await getContactTemplate(currentPage, pageSize);
            if (response?.success) {
                const transformedData = transformDepartmentData(response?.data?.contactTemplate);
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
                <SMSAddEditTemplate modalisOpan={modalisOpan} hendleModal={() => setModalisOpan(!modalisOpan)} selectedData={selecteditem} getTemplate={getTemplate}/>
            ) : null}
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={templateData}
                        singleDataCard={true}

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
                    />
                </div>
            </div>
        </Layout>
    )
}

export default SMSMAnageTemplate
