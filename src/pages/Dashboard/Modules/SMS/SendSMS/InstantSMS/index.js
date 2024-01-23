import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import { Stepper, Step, StepLabel } from "@mui/material";
import { Button } from "react-bootstrap";
import { createContactTemplate, createSendSMS, getContactList, getContactTemplate, getSignalContactListByid, getSignalContactTemplateByid } from '../../../../../../api/APIs';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { ToastContainer } from 'react-toastify';
import { getUserData } from '../../../../../../api/Auth';


function SMSInstantSMS() {
  const [activeStep, setActiveStep] = useState(0);
  const userData = getUserData();

  const [contactList, setContactList] = useState([])
  const [templateList, settemplateList] = useState([])
  const [templateId, settemplateId] = useState(null)

  const [textInput, setTextInput] = useState('');
  const [textareaInput, setTextareaInput] = useState('');

  console.log("sadsd", textareaInput);

  const [selectedTemplate, setSelectedTemplate] = useState('');

  const [numbers, setNumbers] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Split the input string into an array of numbers
    const newNumbers = inputValue.split(',').map((num) => num.trim());
    setNumbers(newNumbers);
  };

  const handleInputFocus = (e) => {
    e.target.select();
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const HendleSendSms = async () => {
    const data = {
      msgText: textareaInput,
      RecieverNo: numbers,
      fkUserId: userData?.id,
      fkListId: selectedTemplate,
      isSent: "pending"
    };
    try {
      const response = await createSendSMS(data);
      if (response.success) {
        showSuccessMessage(response.message);
        handleReset()
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleTextareaChange = (event) => {
    setTextareaInput(event.target.value);
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
        console.log("saquib;k", response?.data?.msgText);
        setTextareaInput(response?.data[0]?.msgText)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTemplateData()
    getListDataAPi()
  }, []);





  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const isStepCompleted = (stepIndex) => {
    return stepIndex < activeStep;
  };
  const steps = [
    {
      label: "Step 1",
      component: <Step1 handleNextStep={handleNextStep} textareaInput={textareaInput} templateId={templateId} handleTextareaChange={handleTextareaChange} templateList={templateList} textInput={textInput} handleTextInputChange={handleTextInputChange} CreateContactTemplateApi={CreateContactTemplateApi} HandleSignalTemplateData={HandleSignalTemplateData} />,
    },
    { label: "Step 2", component: <Step2 templateList={templateList} handleInputChange={handleInputChange} handleInputFocus={handleInputFocus} handleTemplateChange={handleTemplateChange} numbers={numbers} selectedTemplate={selectedTemplate} /> },
  ];
  return (
    <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/sms/dashboard"}
        title1={"Instant SMS"}
        addLink1={"/sms/send-sms/instant"}

      />
      <div className="dash-detail-container" style={{ margin: "12px" }}>
        {/* <div
          class="dash-card-header p-3"
          style={{ background: "rgb(20, 174, 92)" }}
        >
          <h2 class="float-start mt-2">Employee Detail</h2>
          <div class="clearfix"></div>
        </div> */}
        <div class="card-body">
          <div class="container-fluid">
            <Stepper
              activeStep={activeStep}
              style={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                width: "550px",
                margin: "0 auto",
              }}
            >
              {steps.map((step, index) => (
                <Step
                  key={index}
                  completed={isStepCompleted(index)}
                  sx={{ mt: 1 }}
                >
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Display the current step component */}
            {steps[activeStep].component}

            {/* Navigation buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              {activeStep > 0 && (
                <Button onClick={handlePrevStep} style={{ marginRight: "8px" }}>
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 && (
                <Button
                  onClick={handleNextStep}
                  style={{ marginLeft: "8px", marginRight: "0" }}
                >
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  onClick={() => {
                    HendleSendSms()
                  }}
                  style={{ marginLeft: "8px", marginRight: "0" }}
                >
                  submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SMSInstantSMS


const Step1 = ({ textareaInput, templateId, handleTextareaChange, templateList, textInput, handleTextInputChange, CreateContactTemplateApi, HandleSignalTemplateData }) => {

  return (
    <div>
      <ToastContainer />
      <section
        class="p-3 mt-5"
        style={{ boxShadow: " 1px 2px 12px 2px rgba(156,155,155,0.75" }}
      >

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
      </section>
    </div>
  );
};
const Step2 = ({ templateList, handleInputChange, handleInputFocus, handleTemplateChange, numbers, selectedTemplate }) => {


  return (
    <section
      class="p-3 mt-5"
      style={{ boxShadow: " 1px 2px 12px 2px rgba(156,155,155,0.75" }}
    >

      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="" class="form-label">
              Number
            </label>
            <input
              class="form-control"
              type="text"  // Use text type to allow multiple numbers separated by commas
              value={numbers.join(', ')}  // Display numbers as a comma-separated string
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Type numbers (e.g., 1, 2, 3)"
            />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="" class="form-label">
              Contact List
            </label>
            <select class="form-select " placeholder="Contact List" id="templateSelect"
              value={selectedTemplate}
              onChange={handleTemplateChange}>
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
      </div>
    </section>
  );
};