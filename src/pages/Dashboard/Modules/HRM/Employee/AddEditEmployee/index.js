import React, { useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { HRMsidebarItems } from "../../../../../../utils/sideBarItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { UpdateEmployee, createEmployee } from "../../../../../../api/APIs";
import { ToastContainer } from "react-toastify";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { Button } from "react-bootstrap";

const validationSchema = Yup.object({
  employeename: Yup.string().required("Employee name is required"),
  filenumber: Yup.string().required("File Number is required"),
  fatherhusbandname: Yup.string().required("Father/Husband Name is required"),
  cnicnumber: Yup.string().required("CNIC Number is required"),
  permanentaddress: Yup.string().required("Permanent Address is required"),
});
function HRMAddEditEmployee() {
  const location = useLocation();
  const [dateofbirth, setDateOfBirth] = useState(new Date());
  const [placeofbirth, setPlaceOfBirth] = useState(new Date());
  const [cnicissue, setCnicIssue] = useState(new Date());
  const [cnicexpire, setCnicExpire] = useState(new Date());
  const [activeStep, setActiveStep] = useState(0);


  const formik = useFormik({
    initialValues: {
      employeename: "",
      filenumber: "",
      fatherhusbandname: "",
      cnicnumber: "",
      permanentaddress: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (location.state) {
        UpdateEmployeeApi(values);
      } else {
        CreateEmployeeApi(values);
      }
    },
  });

  const CreateEmployeeApi = async (values) => {
    const data = {
      firstName: values.fatherhusbandname,
      lastName: "string",
      userName: values.employeename,
      phoneNo: values.permanentaddress,
      gender: "string",
      email: values.cnicnumber,
      password: "string",
      fileNumber: values.filenumber,
      supervisor: 0,
      fkRoleId: 0,
      fkDepartmentId: 0,
      fkDesignationId: 0,
    };
    try {
      const response = await createEmployee(data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateEmployeeApi = async (values) => {
    const data = {
      firstName: values.fatherhusbandname,
      lastName: "string",
      userName: values.employeename,
      phoneNo: values.permanentaddress,
      gender: "string",
      email: "test@test.com",
      password: "string",
      fileNumber: values.filenumber,
      supervisor: 0,
      fkRoleId: 0,
      fkDepartmentId: 0,
      fkDesignationId: 0,
    };
    try {
      const response = await UpdateEmployee(location?.state?.id, data);
      if (response.success) {
        showSuccessMessage(response.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

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
    { label: "About", component: <Step1 handleNextStep={handleNextStep} /> },
    { label: "Personal", component: <Step2 /> },


  ];
  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/hrm/employee"}
        addLink1={"/hrm/employee"}
        title1={"Employee"}
        addLink2={"/hrm/addeditemployee"}
        title2={location && location?.state ? "Edit Employee" : "Add Employee"}
      />
      <ToastContainer />

      <div className="dash-detail-container">
        <div class='card-body'>
          <div class="container-fluid">
            <Stepper activeStep={activeStep} style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
              {steps.map((step, index) => (
                <Step key={index} completed={isStepCompleted(index)} sx={{ mt: 1 }}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Display the current step component */}
            {steps[activeStep].component}

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              {activeStep > 0 && (
                <Button onClick={handlePrevStep} style={{ marginRight: '8px' }}>Back</Button>
              )}
              {activeStep < steps.length - 1 && (
                <Button onClick={handleNextStep} style={{ marginLeft: '8px' }}>Next</Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button onClick={handleReset} style={{ marginLeft: '8px' }}>submit</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HRMAddEditEmployee;

const Step1 = () => {
  return (
    <div>
      <section>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">First Name</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Name" />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Last Name</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Last Name" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Email Adress</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email Adress" />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Address</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Address" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">CNIC</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="CNIC" />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Mobile No</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Mobile No" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Contact No</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Contact No" />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">City</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="City" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
const Step2 = () => {
  return (
    <section>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">First Name</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Name" />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Last Name</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Last Name" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email Adress</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email Adress" />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Address</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Address" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">CNIC</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="CNIC" />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Mobile No</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Mobile No" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Contact No</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Contact No" />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">City</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="City" />
          </div>
        </div>
      </div>
    </section>
  )
}
