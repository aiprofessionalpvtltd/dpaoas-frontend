import { ToastContainer } from "react-toastify";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../../../api/AuthContext";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
function NMSProroguredSessions() {
  const { members, sessions } = useContext(AuthContext);
  const [proroguredSessions, setProroguredSessions] = useState([]);
  //   const formik = useFormik({
  //     initialValues: {
  //       memberName: "",
  //       sessionNo: "",
  //       sittingDate: "",
  //       attendanceType: "",
  //     },
  //     onSubmit: (values) => {
  //       console.log(values);
  //     },
  //   });
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <Header
        dashboardLink={"/notice/dashboard"}
        //   addLink1={"/notice/speech-on-demand/addedit"}
        title1={"Prorogued Sessions"}
      />
      <ToastContainer />
      <div className="container-fluid">
        {/* <div class="card mt-1">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Add Single Member Attendeance</h1>
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Select Member</label>
                      <Select
                        options={
                          members &&
                          members?.map((item) => ({
                            value: item?.id,
                            label: item?.memberName,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue("memberName", selectedOptions);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.memberName}
                        name="memberName"
                        // isClearable={true}
                        className={`.form-select  ${
                          formik.touched.memberName && formik.errors.memberName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.memberName &&
                        formik.errors.memberName && (
                          <div className="invalid-feedback">
                            {formik.errors.memberName}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      <Select
                        options={
                          sessions &&
                          sessions?.map((item) => ({
                            value: item?.id,
                            label: item?.sessionName,
                          }))
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue("sessionNo", selectedOptions);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.sessionNo}
                        name="sessionNo"
                        // isClearable={true}
                        className={`.form-select  ${
                          formik.touched.sessionNo && formik.errors.sessionNo
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.sessionNo && formik.errors.sessionNo && (
                        <div className="invalid-feedback">
                          {formik.errors.sessionNo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3" style={{ position: "relative" }}>
                      <label className="form-label">Sitting Date</label>
                      <span
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "36px",
                          zIndex: 1,
                          fontSize: "20px",
                          zIndex: "1",
                          color: "#666",
                        }}
                        className={`.form-select  ${
                          formik.touched.sittingDate &&
                          formik.errors.sittingDate
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.sittingDate}
                        minDate={new Date()}
                        onChange={(date) =>
                          formik.setFieldValue("sittingDate", date)
                        }
                        onBlur={formik.handleBlur}
                        className={`form-control`}
                      />
                      {formik.touched.sittingDate &&
                        formik.errors.sittingDate && (
                          <div className="invalid-feedback">
                            {formik.errors.sittingDate}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="mb-3">
                      <label class="form-label">Select Attendance Type</label>
                      <select
                        class={`form-select ${
                          formik.touched.attendanceType &&
                          formik.errors.attendanceType
                            ? "is-invalid"
                            : ""
                        }`}
                        // placeholder="Session No"
                        value={formik.values.attendanceType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="attendanceType"
                      >
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Leave">Leave</option>
                      </select>
                      {formik.touched.attendanceType &&
                        formik.errors.attendanceType && (
                          <div className="invalid-feedback">
                            {formik.errors.attendanceType}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <button className="btn btn-primary float-end" type="submit">
                    Mark Attendance
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div> */}

        <div class="row mt-5">
          <div class="col-12">
            <CustomTable
              block={false}
              hideBtn={true}
              hidebtn1={true}
              data={proroguredSessions}
              // addBtnText={"Add Speech On Demand"}
              tableTitle="Prorogued Sessions"
              // handlePageChange={handlePageChange}
              // currentPage={currentPage}
              // pageSize={pageSize}
              headertitlebgColor={"#666"}
              headertitletextColor={"#FFF"}
              // totalCount={count}
              // handleAdd={() => navigate("/notice/speech-on-demand/addedit")}
              // handleEdit={(item) => hendleEdit(item.SR)}
              // handleDelete={(item) => handleDelete(item.SR)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default NMSProroguredSessions;
