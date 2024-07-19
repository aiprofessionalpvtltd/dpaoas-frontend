import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { deleteQuestionFromList, getAllQuestion } from "../../../../../../api/APIs/Services/Question.service";

function RemoveQuestion() {
  const [allQuestions, setAllQuestions] = useState([])

  const formik = useFormik({
    initialValues: {
      question: "",
    },
    onSubmit: (values) => {
        removeQuestion(values   );
    },
    enableReinitialize: true,
  });

  const removeQuestion = async (values) => {
    try {
      const response = await deleteQuestionFromList(values?.question)
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllQuestionsApi();
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error.response.data.message);
    }
  }

  const getAllQuestionsApi = async () => {
    try {
      const response = await getAllQuestion(0, 1000, "inQuestion");
      if (response?.success) {
        setAllQuestions(response.data?.questions);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllQuestionsApi();
  }, [])

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/manage/remove-question"}
        title1={"Remove Question"}
      />
      <div class="container-fluid">
        <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Remove Question</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
            <form onSubmit={formik.handleSubmit}>
              <div class="row">
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label">Questions</label>
                    <select className={`form-select`}
                          // placeholder="Session No"
                          value={formik.values.question}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="question">
                    
                      <option value={""} selected disabled hidden>
                            Select
                          </option>

                          {allQuestions &&
                            allQuestions.length > 0 &&
                            allQuestions.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.id}
                              </option>
                            ))}
                    </select>
                  </div>
                </div>

                <div class="col" style={{ marginTop: '32px' }}>
                  <button class="btn btn-primary" type="submit">
                    Remove
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

export default RemoveQuestion;