import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import Modal from "react-modal";
import Select from "react-select";

const documentType = [
  { id: 1, name: "Meeting Agenda" },
  { id: 2, name: "Meeting Minutes" },
  { id: 3, name: "Committee Report" },
  { id: 4, name: "Ministries/Divisions Replies" },
  { id: 5, name: "Others" },
];
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "40%",
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
function ScheduleCommitteeMeetingDocsModel({
  isModalOpen,
  handleModal,
  
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      typeofDoc: "",
      file: "",
      comment: "",
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
            <h1>Attach Docs</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label class="form-label">Select Docs Type</label>
                    <Select
                      options={documentType.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                    //   isMulti
                      onChange={(selectedOptions) =>
                        formik.setFieldValue("typeofDoc", selectedOptions)
                      }
                      onBlur={formik.handleBlur}
                      value={formik.values.typeofDoc}
                      name="typeofDoc"
                    />
                    {formik.touched.mover && formik.errors.typeofDoc && (
                      <div class="invalid-feedback">
                        {formik.errors.typeofDoc}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Choose File
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      accept=".pdf, .jpg, .jpeg, .png"
                      id="complaintAttachmentFromResolver"
                      name="complaintAttachmentFromResolver"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "file",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div>
                    <label className="form-label">Comments</label>
                    <textarea
                      className={`form-control`}
                      id="comment"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.comment}
                    ></textarea>
                  </div>
                </div>
              </div>

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
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ScheduleCommitteeMeetingDocsModel;
