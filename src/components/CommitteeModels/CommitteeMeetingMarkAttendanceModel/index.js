import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../api/AuthContext";
import { getUserData } from "../../../api/Auth";
import { showSuccessMessage } from "../../../utils/ToastAlert";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "40%",
    height: "70%",
    overflowY: "auto",
    transform: "translate(-50%, -50%)",
  },
};
const committeesData = [
  {
    id: 1,
    committeeName:
      "Committee to consider and make recommendations on the Money Bill 2024",
    committeeType: "Domestic Committees",
    chairPerson: "Syed Yousaf Raza Gilani",
    committeeSecretary: "Syed Hasnain Haider",
    members: "View Members",
    status: "active",
  },
  {
    id: 2,
    committeeName: "Senate House Committee",
    committeeType: "House Committee",
    chairPerson: "Syedaal Khan",
    committeeSecretary: "Muhammad Zubair Thaheem",
    members: "View Members",
    status: "inactive",
  },
  {
    id: 3,
    committeeName: "Senate Finance Committee",
    committeeType: "Domestic Committee",
    chairPerson: "Syed Yousaf Raza Gilani",
    committeeSecretary: "Syed Hasnain Haider",
    members: "View Members",
    status: "active",
  },
  {
    id: 4,
    committeeName: "Business Advisory Committee",
    committeeType: "Domestic Committee",
    chairPerson: "Syed Yousaf Raza Gilani",
    committeeSecretary: "Syed Hasnain Haider",
    members: "View Members",
    status: "active",
  },
];

const membersData = [
  { id: 1, name: "Senator Farooq Hamid Naek" },
  { id: 2, name: "Senator Syed Ali Zafar" },
  { id: 3, name: "Senator Azam Nazeer Tarar" },
  { id: 4, name: "Senator Ahmed Khan" },
  { id: 5, name: "Senator Sherry Rehman" },
  { id: 6, name: "Senator Mohsin Aziz" },
];
function MarkMeetingMemberAttendance({ isModalOpen, handleModal, isview }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  console.log("isView", isview);
  const formik = useFormik({
    initialValues: {
      committeeName: "",
      committeeMeetingDate: "",
      committeeMeettingTime: "",
      committeeRoom: "",
      meetingStatus: "",
      Remarks: "",
      //   Members: [],
      members: membersData.map((member) => ({
        ...member,
        attendance: "present",
      })),
    },
    onSubmit: (values) => {
      console.log("Values", values);
    },
  });

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateSelect = (date) => {
    formik.setFieldValue("committeeMeetingDate", date);
    setIsCalendarOpen(false);
  };

  const handleAttendanceChange = (id, value) => {
    const updatedMembers = formik.values.members.map((member) =>
      member.id === id ? { ...member, attendance: value } : member
    );
    formik.setFieldValue("members", updatedMembers);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => handleModal()}
        style={customStyles}
        contentLabel="Schedule Committee Room Modal"
      >
        <div className="card">
          <div
            className="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>{isview ? "View Meeting" : "Mark Member Attendance"}</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Committee Name</label>
                    <select
                      class="form-select"
                      id="committeeName"
                      name="committeeName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.committeeName}
                      disabled={isview}
                    >
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      {committeesData &&
                        committeesData?.map((item) => (
                          <option
                            value={item.id}
                          >{`${item?.committeeName}`}</option>
                        ))}
                    </select>
                    {formik.touched.committeeName &&
                      formik.errors.committeeName && (
                        <div className="invalid-feedback">
                          {formik.errors.committeeName}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3" style={{ position: "relative" }}>
                    <label className="form-label">Committee Meeting Date</label>
                    <span
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "36px",
                        zIndex: 1,
                        fontSize: "20px",
                        zIndex: "1",
                        color: "#666",
                        cursor: "pointer",
                      }}
                      onClick={handleCalendarToggle}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>

                    <DatePicker
                      selected={formik.values.committeeMeetingDate}
                      onChange={handleDateSelect}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.committeeMeetingDate &&
                        formik.errors.committeeMeetingDate
                          ? "is-invalid"
                          : ""
                      }`}
                      open={isCalendarOpen}
                      onClickOutside={() => setIsCalendarOpen(false)}
                      onInputClick={handleCalendarToggle}
                      onClick={handleCalendarToggle}
                      maxDate={new Date()}
                      dateFormat="dd-MM-yyyy"
                      disabled={isview}
                    />

                    {formik.touched.committeeMeetingDate &&
                      formik.errors.committeeMeetingDate && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formik.errors.committeeMeetingDate}
                        </div>
                      )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Committee Meeting Time</label>
                    <TimePicker
                      value={formik.values.committeeMeettingTime}
                      clockIcon={null}
                      openClockOnFocus={false}
                      format="hh:mm a"
                      onChange={(time) =>
                        formik.setFieldValue("committeeMeettingTime", time)
                      }
                      className={`form-control`}
                      disabled={isview}
                    />
                    {formik.touched.committeeMeettingTime &&
                      formik.errors.committeeMeettingTime && (
                        <div className="invalid-feedback">
                          {formik.errors.committeeMeettingTime}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Committee Room</label>
                    <select
                      class="form-select"
                      id="committeeRoom"
                      name="committeeRoom"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.committeeRoom}
                      disabled={isview}
                    >
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      <option>Committee Room 1</option>
                      <option>Committee Room 2</option>
                      <option>Committee Room 3</option>
                      <option>Committee Room 4</option>
                      <option>Committee Room 5</option>
                    </select>
                    {formik.touched.committeeName &&
                      formik.errors.committeeName && (
                        <div className="invalid-feedback">
                          {formik.errors.committeeName}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Meeting Status</label>
                    <select
                      class="form-select"
                      id="meetingStatus"
                      name="meetingStatus"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.meetingStatus}
                      disabled={isview}
                    >
                      <option value={""} selected disabled hidden>
                        Select
                      </option>
                      <option>Pending</option>
                      <option>Reffered to Next Committee</option>
                      <option>Resolved</option>
                      <option>Postponed</option>
                    </select>
                    {formik.touched.committeeName &&
                      formik.errors.committeeName && (
                        <div className="invalid-feedback">
                          {formik.errors.committeeName}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div>
                    <label className="form-label">Description</label>
                    <textarea
                      className={`form-control`}
                      id="description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      disabled={isview}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mt-4 mb-3">
                    <label className="form-label fw-bold fs-6">
                      Members Attendance
                    </label>
                    {formik?.values?.members.map((member) => (
                      <div
                        key={member.id}
                        className="d-flex align-items-center"
                      >
                        <div className="flex-grow-1">
                          <label className="fs-8">{member.name}</label>
                        </div>
                        <div>
                          <select
                            className="form-select mb-3"
                            id="status"
                            name="status"
                            //   onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={member.attendance}
                            onChange={(e) =>
                              handleAttendanceChange(member.id, e.target.value)
                            }
                            disabled={isview}
                          >
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {isview ? (
                ""
              ) : (
                <div className="d-flex row justify-content-end align-items-center">
                  <div
                    className="col-12 align-items-center justify-content-end"
                    style={{ marginTop: "30px" }}
                  >
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MarkMeetingMemberAttendance;
