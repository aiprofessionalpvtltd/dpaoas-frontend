import React, { useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { HRMsidebarItems } from "../../../../../../utils/sideBarItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Stepper, Step, StepLabel } from "@mui/material";
import DatePicker from "react-datepicker";
import { UpdateEmployee, createEmployee } from "../../../../../../api/APIs/Services/organizational.service";
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
    {
      label: "Presonal Detail",
      component: <Step1 handleNextStep={handleNextStep} />,
    },
    { label: "Employee Information", component: <Step2 /> },
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

      <div className="dash-detail-container" style={{ margin: "12px" }}>
        <div
          class="dash-card-header p-3"
          style={{ background: "rgb(20, 174, 92)" }}
        >
          <h2 class="float-start mt-2">Employee Detail</h2>
          <div class="clearfix"></div>
        </div>
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
  );
}

export default HRMAddEditEmployee;

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
              <label for="" class="form-label">
                Is Active
              </label>
              <select class="form-select " placeholder="Is Active">
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Title
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="Title"
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Name
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="Name"
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Father/Husband Name
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="Father/Husband Name"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Gender
              </label>
              <select class="form-select " placeholder="Gender">
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Date of Birth
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="Date of Birth"
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Place of Birth
              </label>
              <select class="form-select " placeholder="Place of Birth">
                <option value="1">Islamabad</option>
                <option value="2">Lahore</option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                CNIC No
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="CNIC No"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                CNIC Issue Date
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="CNIC Issue Date"
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                CNIC Exp Date
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="CNIC Exp Date"
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Place of Issue
              </label>
              <select class="form-select " placeholder="Place of Issue">
                <option value="1">Islamabad</option>
                <option value="2">Lahore</option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                NTN
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="NTN"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Religion
              </label>
              <select class="form-select " placeholder="Religion">
                <option value="1">Christianity</option>
                <option value="2">Hinduism</option>
                <option value="3">Islam</option>
                <option value="4">Other</option>
                <option value="5">Sikh</option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Marital Status
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="Marital Status"
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Province
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="Province"
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="" class="form-label">
                Domicile
              </label>
              <input
                type="email"
                class="form-control"
                id=""
                placeholder="Domicile"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label class="form-label">Permanent Address</label>
              <textarea class="form-control"></textarea>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label class="form-label">City</label>
              <select class="form-select">
                <option>Select</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label class="form-label">Local Address</label>
              <textarea class="form-control"></textarea>
            </div>
          </div>
          <div class="col">
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
              Ref-Id
            </label>
            <input
              type="email"
              class="form-control"
              id=""
              placeholder="Ref-Id"
            />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="" class="form-label">
              Post
            </label>
            <input type="email" class="form-control" id="" placeholder="Post" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="" class="form-label">
              BPS
            </label>
            <input type="email" class="form-control" id="" placeholder="BPS" />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="" class="form-label">
              Post Status
            </label>
            <select class="form-select " placeholder="Post Status">
              <option value="1">Permanent</option>
              <option value="2">Probition</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="" class="form-label">
              Gazetted
            </label>
            <input
              type="email"
              class="form-control"
              id=""
              placeholder="Gazetted"
            />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="" class="form-label">
              Appointment Date
            </label>
            <input
              type="email"
              class="form-control"
              id=""
              placeholder="Appointment Date"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="" class="form-label">
              Current Status
            </label>
            <input
              type="email"
              class="form-control"
              id=""
              placeholder="Current Status"
            />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="" class="form-label">
              Status Date
            </label>
            <input
              type="email"
              class="form-control"
              id=""
              placeholder="Status Date"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="mb-3">
            <label for="" class="form-label">
              Is Current
            </label>
            <select class="form-select " placeholder="Is Current">
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="mb-3">
            <label for="" class="form-label">
              Detail
            </label>
            <textarea style={{ width: "100%" }} class="form-control"></textarea>
          </div>
        </div>
      </div>
    </section>
  );
};
