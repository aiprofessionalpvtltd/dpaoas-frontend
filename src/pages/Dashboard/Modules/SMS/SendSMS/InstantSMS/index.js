import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { SMSsidebarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import {
  createSendSMS,
  getContactList,
  getContactTemplate,
  getSignalContactListByid,
  getSignalContactTemplateByid,
} from "../../../../../../api/APIs/Services/SMS.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { getUserData } from "../../../../../../api/Auth";
import { TagsInput } from "react-tag-input-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

function SMSInstantSMS() {
  const userData = getUserData();
  const [contactList, setContactList] = useState([]);
  const [templateList, settemplateList] = useState([]);
  const [templateId, settemplateId] = useState(null);
  const [textareaInput, setTextareaInput] = useState(null);
  const [groupData, setGroupData] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [numbers, setNumbers] = useState([]);

  const handleInputChange = (e) => {
    setNumbers(e);
  };

  const handlePhoneNumberClick = (phoneNo) => {
    const isPresent = numbers.includes(phoneNo);

    if (isPresent) {
      setNumbers(numbers.filter((number) => number !== phoneNo));
    } else {
      setNumbers([...numbers, phoneNo]);
    }
  };

  const HendleSendSms = async () => {
    const data = {
      msgText: textareaInput,
      RecieverNo: numbers,
      fkUserId: userData?.fkUserId,
      // fkListId: JSON.parse(selectedTemplate),
      isSent: "pending",
    };
    try {
      const response = await createSendSMS(data);
      if (response.success) {
        showSuccessMessage(response.message);
        handleReset();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const handleTextareaChange = (event) => {
    setTextareaInput(event.target.value);
  };

  const getListDataAPi = async () => {
    const currentPage = 0;
    const pageSize = 100;
    try {
      const response = await getContactList(currentPage, pageSize);
      if (response?.success) {
        const filterpublicList = response?.data?.contactList.filter(
          (item) => item.isPublicList === true
        );
        setContactList(filterpublicList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTemplateData = async () => {
    const currentPage = 0;
    const pageSize = 100;
    try {
      const response = await getContactTemplate(currentPage, pageSize);
      if (response?.success) {
        settemplateList(response?.data?.contactTemplate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleSignalTemplateData = async (event) => {
    const selectedValue = event.target.value;
    settemplateId(selectedValue);
    try {
      const response = await getSignalContactTemplateByid(event.target.value);
      if (response?.success) {
        console.log("saquib;k", response?.data?.msgText);
        setTextareaInput(response?.data[0]?.msgText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transfrerListData = (apiData) => {
    return apiData.map((leave, index) => ({
      memberName: leave?.member?.memberName,
      phoneNo: leave?.member?.phoneNo,
      // gender: leave?.member?.gender,
    }));
  };
  const HandleSignalListData = async (e) => {
    try {
      const response = await getSignalContactListByid(e.target.value);
      if (response?.success) {
        const transformedData = transfrerListData(
          response?.data[0]?.contactMembers
        );
        console.log("my signel DAta", response?.data[0]?.contactMembers);
        setGroupData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setNumbers([]);
    setTextareaInput(null);
    settemplateId(null);
  };

  useEffect(() => {
    getTemplateData();
    getListDataAPi();
  }, []);

  return (
    <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/sms/dashboard"}
        title1={"Instant SMS"}
        addLink1={"/sms/send-sms/instant"}
      />
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            <h1>Instant SMS</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Message Template</label>
                    <select
                      class="form-select"
                      id="employeeName"
                      value={templateId}
                      onChange={HandleSignalTemplateData}
                    >
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
                    <label for="" class="form-label">
                      Number
                    </label>
                    <TagsInput
                      value={numbers}
                      onChange={handleInputChange}
                      name="Numbers"
                      placeHolder="Number"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Contact List
                    </label>
                    <select
                      class="form-select "
                      placeholder="Contact List"
                      id="templateSelect"
                      value={selectedTemplate}
                      onChange={HandleSignalListData}
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
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={() => HendleSendSms()}
                >
                  Send
                </button>
              </div>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">
                        Mamber Name
                      </th>
                      <th class="text-center" scope="col">
                        Phone No
                      </th>
                      {/* <th class="text-center" scope="col">
                        Gender
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {groupData?.length > 0 &&
                      groupData.map((item, index) => (
                        <tr key={index}>
                          <td className="text-center">{item?.memberName}</td>
                          <td
                            className="text-center"
                            onClick={() => handlePhoneNumberClick(item.phoneNo)}
                            style={{ cursor: "pointer" }}
                          >
                            {item.phoneNo}{" "}
                            {numbers.includes(item.phoneNo) ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                style={{ color: "green", marginLeft: "5px" }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                style={{ color: "red", marginLeft: "5px" }}
                              />
                            )}
                          </td>
                          <td className="text-center">{item.gender}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SMSInstantSMS;
