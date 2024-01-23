import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import { Button } from 'react-bootstrap'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { createContactTemplate, getContactList, getContactTemplate, getSignalContactListByid, getSignalContactTemplateByid } from '../../../../../../api/APIs'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { ToastContainer } from 'react-toastify'
import { getUserData } from '../../../../../../api/Auth'

function SMSAdvancedSMS() {
    const userData = getUserData();

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Set your desired page size
    const [contactList, setContactList] = useState([])
    const [templateList, settemplateList] = useState([])
    const [templateId, settemplateId] = useState(null)

    const [textInput, setTextInput] = useState('');
    const [textareaInput, setTextareaInput] = useState('');

    const [listId, setListId] = useState(null)
    const [count, setCount] = useState(null)

    const [allListData, setAllListData] = useState([])

console.log("sadsd",textareaInput);

    const handleTextInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleTextareaChange = (event) => {
        setTextareaInput(event.target.value);
    };



    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
    const transformDepartmentData = (apiData) => {
        return apiData.map((leave) => ({
            id: leave?.id,
            listName: leave?.listName,
            listDescription: leave?.listDescription,
            listActive: leave?.listActive,
            //   UserEmail:leave.user.email,
            isPublicList: JSON.stringify(leave?.isPublicList),
            createdAt: leave?.createdAt,
            updatedAt: leave?.updatedAt,
            //   contactMembers: leave?.contactMembers[0]?.member.memberName
        }));
    };

    const hendleListId = (event) => {
        const selectedValue = event.target.value;
        setListId(selectedValue);
    };

    const handleTemplate = (event) => {
        const selectedValue = event.target.value;
        settemplateId(selectedValue);
    };

    const getListDataAPi = async () => {
        const currentPage = 0
        const pageSize = 100
        try {
            const response = await getContactList(currentPage, pageSize)
            if (response?.success) {
                setContactList(response?.data?.contactList);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const HandleSignalListData = async () => {

        try {
            const response = await getSignalContactListByid(listId)
            if (response?.success) {
                const transformedData = transformDepartmentData(response?.data);
                setCount(response?.data?.count);
                setAllListData(transformedData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTemplateData = async () => {
        const currentPage = 0
        const pageSize = 100
        try {
            const response = await getContactTemplate(currentPage, pageSize);
            if (response?.success) {
                settemplateList(response?.data?.contactTemplate)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const CreateContactTemplateApi = async () => {
        const data = {
            templateName: textInput,
            msgText: textareaInput,
            fkUserId: userData?.id,
            isActive: true
        };
        try {
            const response = await createContactTemplate(data);
            if (response.success) {
                showSuccessMessage(response.message);
            }
        } catch (error) {
            showErrorMessage(error.response.data.message);
        }
    };

    const HandleSignalTemplateData = async (event) => {
        const selectedValue = event.target.value;
        settemplateId(selectedValue)

        try {
            const response = await getSignalContactTemplateByid(event.target.value)
            if (response?.success) {
                console.log("saquib;k",response?.data?.msgText);
                setTextareaInput(response?.data[0]?.msgText)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTemplateData()
        getListDataAPi()
    }, [])
    return (
        <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
            <ToastContainer />
            <Header
                dashboardLink={"/sms/dashboard"}
                title1={"Advanced SMS"}
                addLink1={"/sms/send-sms/advanced"}

            />
            <div className="dash-detail-container" style={{ margin: "12px" }}>
                <div class="row">
                    <div class="col-12">
                        <label for="" class="form-label">
                            Contact List
                        </label>
                        <select
                            class="form-select"
                            id="employeeName"
                            value={listId}
                            onChange={hendleListId}
                        >
                            <option value={""} selected disabled hidden>
                                Select
                            </option>
                            {contactList &&
                                contactList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item?.listName}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "16px",
                    }}
                >
                    <Button style={{ marginRight: "8px" }} onClick={() => HandleSignalListData()}>
                        Submit
                    </Button>
                </div>
                <div class="row">
                    <div class="col-12">
                        <CustomTable
                            data={allListData}
                            headerShown={true}
                            ActionHide={true}
                            hideEditIcon={true}
                            headertitlebgColor={"#666"}
                            headertitletextColor={"#FFF"}
                            handlePageChange={handlePageChange}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            totalCount={count}

                        />
                    </div>
                </div>


                
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label class="form-label">Preview</label>
                            <textarea
                                className="form-control"
                                style={{ width: "100%" }}
                                id="textareaInput"
                                placeholder="Enter text"
                                value={textareaInput}
                                onChange={handleTextareaChange}
                            ></textarea>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <label class="form-label">Message Template</label>
                            <select class="form-select"
                                id="employeeName"
                                value={templateId}
                                onChange={HandleSignalTemplateData}>
                                <option value={""} selected disabled hidden>
                                    Select
                                </option>
                                {templateList &&
                                    templateList.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item?.templateName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="" class="form-label">
                                Template Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="textInput"
                                placeholder=""
                                value={textInput}
                                onChange={handleTextInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "16px",
                    }}
                >
                    <Button style={{ marginRight: "8px" }} onClick={() => CreateContactTemplateApi()}>
                        Save
                    </Button>
                </div>
            </div>
        </Layout>
    )
}

export default SMSAdvancedSMS
