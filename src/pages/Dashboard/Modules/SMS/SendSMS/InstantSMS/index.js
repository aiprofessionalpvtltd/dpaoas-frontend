import React, { useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import { Stepper, Step, StepLabel } from "@mui/material";
import { Button } from "react-bootstrap";


function SMSInstantSMS() {
  const [activeStep, setActiveStep] = useState(0);


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
          component: <Step1 handleNextStep={handleNextStep} />,
        },
        { label: "Step 2", component: <Step2 /> },
      ];
  return (
    <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
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
                  onClick={handleReset}
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


const Step1 = () => {
    return (
      <div>
        <section
          class="p-3 mt-5"
          style={{ boxShadow: " 1px 2px 12px 2px rgba(156,155,155,0.75" }}
        >

          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label class="form-label">Permanent Address</label>
                <textarea class="form-control"></textarea>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
              <label for="" class="form-label">
               Template Name
              </label>
              <input
                type="text"
                class="form-control"
                id=""
                placeholder=""
              />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="mb-3">
              <label class="form-label">City</label>
                <select class="form-select">
                  <option>Select</option>
                </select>
              </div>
            </div>
           
          </div>
        </section>
      </div>
    );
  };
  const Step2 = () => {
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
              <input type="email" class="form-control" id="" placeholder="023020,02309" />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Contact List
              </label>
              <select class="form-select " placeholder="Contact List">
                <option value="1">Permanent</option>
                <option value="2">Probition</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    );
  };