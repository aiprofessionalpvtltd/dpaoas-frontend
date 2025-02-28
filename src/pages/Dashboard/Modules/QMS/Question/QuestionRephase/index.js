import React, { useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { rephaseQuestion } from "../../../../../../api/APIs/Services/Question.service";

const validationSchema = Yup.object({
  text: Yup.string().required("Text is required"),
});

function QMSQuestionRephase() {
  const [searchedData, setSearchedData] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleRephase(values);
    },
  });

  const handleRephase = async (values) => {
    const payload = {
      text: values.text,
    };
    setIsLoading(true);
    try {
      const response = await rephaseQuestion(payload);
      if (response.success) {
        showSuccessMessage("Text Successfully Rephased");
        setSearchedData(response.paraphrased);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/qms/dashboard"}
        addLink1={"/qms/question/rephase"}
        title1={"Question Rephase"}
      />
      <ToastContainer />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Question Rephase</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Text To Rephase</label>
                      <textarea
                        className={`form-control ${
                          formik.touched.text && formik.errors.text
                            ? "is-invalid"
                            : ""
                        }`}
                        id="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.text}
                      ></textarea>
                      {formik.touched.text && formik.errors.text && (
                        <div className="invalid-feedback">
                          {formik.errors.text}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Searching...
                        </>
                      ) : (
                        "Search"
                      )}
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => {
                        formik.resetForm({});
                        setSearchedData([]);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
              {Object.keys(searchedData).length > 0 && (
                <div
                  class="dash-detail-container"
                  style={{ marginTop: "20px" }}
                >
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card h-100">
                        <div className="card-header bg-primary text-white">
                          <h5 className="mb-0">First Option</h5>
                        </div>
                        <div className="card-body">
                          <p>{searchedData?.option1}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card h-100">
                        <div className="card-header bg-primary text-white">
                          <h5 className="mb-0">Second Option</h5>
                        </div>
                        <div className="card-body">
                          <p>{searchedData?.option2}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card h-100">
                        <div className="card-header bg-primary text-white">
                          <h5 className="mb-0">Third Option</h5>
                        </div>
                        <div className="card-body">
                          <p>{searchedData?.option3}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSQuestionRephase;
