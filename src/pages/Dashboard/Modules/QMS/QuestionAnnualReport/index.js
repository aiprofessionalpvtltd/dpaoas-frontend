import React, { useContext, useState } from "react";
import Header from "../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../utils/sideBarItems";
import { AuthContext } from "../../../../../api/AuthContext";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import { AnnualQuestionReprtPdfPreview } from "../../../../../api/APIs/Services/Question.service";

function QuestionAnualReport() {
  const { sessions } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      fromsessionNumber: "",
      tosessionNumber: "",
      parlimentryYear: ""
    },
    onSubmit: (values) => {

      AnnualQuestionReprtPdf(values);
    },
    enableReinitialize: true,
  });


  const AnnualQuestionReprtPdf = async (values) => {
    const Data = {
      fromSessionId: values?.fromsessionNumber,
      toSessionId: values?.tosessionNumber,
    };
    try {
      const response = await AnnualQuestionReprtPdfPreview(Data);
      if (response?.success) {
        const combinedData = {
          ...response?.data,
          parlimentryYear: values?.parlimentryYear
        };
  
        const encodedJsonString = encodeURIComponent(JSON.stringify(combinedData));
        const url = `/qms/questionList/question-anual-report-pdf-preview?state=${encodedJsonString}`;
        window.open(url, "_blank");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/questionList/question-anual-report"}
        title1={"Annual Report Summary"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>ANNUAL REPORT SUMMARY</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">From Session</label>
                      <select
                        className={`form-select`}
                        // placeholder="Session No"
                        value={formik.values.fromsessionNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="fromsessionNumber"
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>

                        {sessions &&
                          sessions.length > 0 &&
                          sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.sessionName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">To Session</label>
                      <select
                        className={`form-select`}
                        // placeholder="Session No"
                        value={formik.values.tosessionNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="tosessionNumber"
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>

                        {sessions &&
                          sessions.length > 0 &&
                          sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.sessionName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label">Parliamentary Year</label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.parlimentryYear}
                        className={`form-control ${formik.touched.parlimentryYear &&
                          formik.errors.parlimentryYear
                          ? "is-invalid"
                          : ""
                          }`}
                        id="parlimentryYear"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.parlimentryYear &&
                        formik.errors.parlimentryYear && (
                          <div className="invalid-feedback">
                            {formik.errors.parlimentryYear}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => {
                        formik.resetForm();
                      }}
                    >
                      Reset
                    </button>
                    <button
                      class="btn btn-primary"
                      type="submit"
                      disabled={
                        formik?.values?.fromsessionNumber ||
                          formik.values.tosessionNumber
                          ? false
                          : true
                      }
                    >
                      Preview PDF
                    </button>
                  </div>
                </div>
              </form>


            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QuestionAnualReport;
