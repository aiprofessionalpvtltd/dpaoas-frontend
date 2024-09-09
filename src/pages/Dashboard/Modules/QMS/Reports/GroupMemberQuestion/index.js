import React, { useContext } from 'react';
import { Layout } from '../../../../../../components/Layout';
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems';
import Header from '../../../../../../components/Header';
import CustomTable from '../../../../../../components/CustomComponents/CustomTable';
import { AuthContext } from '../../../../../../api/AuthContext';
import { useFormik } from 'formik';
import { GroupMemberQuestionData } from '../../../../../../api/APIs/Services/Question.service';

function QMSGroupMemberQuestion() {
  const { sessions } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      fromSessionNo: "",
      toSessionNo: ""
    },
    onSubmit: (values) => {
      handleSubmit(values)
    },
  });

  const handleSessionChange = (event) => {
    const selectedSessionId = event.target.value;
    formik.setFieldValue('fromSessionNo', selectedSessionId);
  };

  const handleSessionChange2 = (event) => {
    const selectedSessionId = event.target.value;
    formik.setFieldValue('toSessionNo', selectedSessionId);
  };

  const handleSubmit = async (values) => {
    try {
      const res = await GroupMemberQuestionData(values.fromSessionNo, values.toSessionNo)
      if (res?.success) {
        const encodedJsonString = encodeURIComponent(JSON.stringify(res));
        const url = `/qms/reports/qroup-member-question/preview-pdf?state=${encodedJsonString}`;
        window.open(url, "_blank");
      }
    } catch (error) {

    }
  }

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink="/"
        addLink1="/qms/reports/qroup-member-question"
        title1="Group Member Data"
      />
      <div className="container-fluid">
        <div className="card mt-4">
          <div class="card-header red-bg" style={{ background: "#14ae5c !important" }}>
            <h1>Group Members Data</h1>
          </div>
          <div className="card-body">
            <div className="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">From Session</label>
                      <select
                        className="form-select"
                        id="fromSessionNo"
                        onChange={handleSessionChange}
                        value={formik.values.fromSessionNo}
                      >
                        <option selected disabled value={""}>
                          Select
                        </option>
                        {sessions &&
                          sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.sessionName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="mb-3">
                      <label className="form-label">To Session</label>
                      <select
                        className="form-select"
                        id="toSessionNo"
                        onChange={handleSessionChange2}
                        value={formik.values.toSessionNo}
                      >
                        <option selected disabled value={""}>
                          Select
                        </option>
                        {sessions &&
                          sessions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item?.sessionName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-primary" type="submit">
                      Generate
                    </button>
                  </div>
                </div>
              </form>

              <CustomTable
                headerShown={true}
                hideBtn={true}
                ActionHide={true}
                currentPage={10}
                pageSize={10}
                headertitlebgColor="#666"
                headertitletextColor="#FFF"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSGroupMemberQuestion;
