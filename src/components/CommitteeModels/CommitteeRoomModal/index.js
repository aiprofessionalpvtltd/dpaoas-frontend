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
function ScheduleCommitteeRoom({
  isModalOpen,
  handleModal,
  committeeRoom,
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      committeeName: "",
      committeeMeetingDate: "",
      committeeMeettingTime: "",
      Remarks: "",
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
            <h1>{`Committee Room No: ${committeeRoom} `}</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                {/* <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Committee Name</label>
                    <input
                      className={`form-control`}
                      id="committeeName"
                      name="committeeName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.committeeName}
                    />
                  </div>
                </div> */}
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
                  <div>
                    <label className="form-label">Description</label>
                    <textarea
                      className={`form-control`}
                      id="description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="d-flex row justify-content-end align-items-center">
                //{" "}
                {/* <div className="col-4" style={{ marginTop: "30px" }}>
//                   <button className="btn btn-primary" type="button" onClick={() => hendleModal()}>
//                     Cancel
//                   </button>
//                 </div> */}
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

export default ScheduleCommitteeRoom;

// function ScheduleCommitteeRoom({ isModalOpen, hendleModal }) {
//     const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const formik = useFormik({
//     initialValues: {
//         committeeName: "",
//         committeeMeetingDate: "",
//         committeeMeettingTime: "",
//         Remarks:"",
//     },

//     onSubmit: (values) => {
//         console.log("Values", values)
//       // Handle form submission here
//     //   hendleVandor(values)
//     },

//   })

//   // Handle Claneder Toggel
//   const handleCalendarToggle = () => {
//     setIsCalendarOpen(!isCalendarOpen);
//   };
//   // Handale DateCHange
//   const handleDateSelect = (date) => {
//     formik.setFieldValue("committeeMeetingDate", date);
//     setIsCalendarOpen(false);
//   };
// //   const hendleVandor = async (values) => {
// //     const Data = {
// //         vendorName: values?.vendorName,
// //         description: values?.description,
// //         staus:"active"

// //     }

//   return (
//     <div>
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => hendleModal()}
//         style={customStyles}
//         contentLabel="Example Modal"
//       >
//         <div class="card">
//           <div
//             class="card-header red-bg"
//             style={{ background: "#14ae5c !important" }}
//           >
//             <h1>{`Schedule Committee Room No: at Time ` }</h1>
//           </div>
//           <div class="card-body">
//             <form onSubmit={formik.handleSubmit}>

//               <div className="row">
//                 <div className="col">
//                   <div className="mb-3">
//                     <label className="form-label">Committee Name</label>
//                     <input
//                       className={`form-control`}
//                       id='committeeName'
//                       name="committeeName"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.committeeName}
//                     />

//                   </div>
//                 </div>
//               </div>
//               <div className='row'>
//               <div className="col-6">
//                   <div className="mb-3" style={{ position: "relative" }}>
//                     <label className="form-label">Committee Meeting Date</label>
//                     <span
//                       style={{
//                         position: "absolute",
//                         right: "15px",
//                         top: "36px",
//                         zIndex: 1,
//                         fontSize: "20px",
//                         zIndex: "1",
//                         color: "#666",
//                         cursor: "pointer",
//                       }}
//                       onClick={handleCalendarToggle}
//                     >
//                       <FontAwesomeIcon icon={faCalendarAlt} />
//                     </span>

//                     <DatePicker
//                       selected={formik.values.committeeMeetingDate}
//                       onChange={handleDateSelect}
//                       onBlur={formik.handleBlur}
//                       className={`form-control ${
//                         formik.touched.committeeMeetingDate &&
//                         formik.errors.committeeMeetingDate
//                           ? "is-invalid"
//                           : ""
//                       }`}
//                       open={isCalendarOpen}
//                       onClickOutside={() => setIsCalendarOpen(false)}
//                       onInputClick={handleCalendarToggle}
//                       // onClick={handleCalendarToggle}
//                       maxDate={new Date()}
//                       dateFormat="dd-MM-yyyy"
//                     />

//                     {formik.touched.committeeMeetingDate &&
//                       formik.errors.committeeMeetingDate && (
//                         <div
//                           className="invalid-feedback"
//                           style={{ display: "block" }}
//                         >
//                           {formik.errors.committeeMeetingDate}
//                         </div>
//                       )}
//                   </div>
//                 </div>
//                 <div class="col">
//                   <div class="mb-3">
//                     <label class="form-label">Committee Meeting Time</label>
//                     <TimePicker
//                       value={formik.values.committeeMeettingTime}
//                       clockIcon={null}
//                       openClockOnFocus={false}
//                       format="hh:mm a"
//                       onChange={(time) =>
//                         formik.setFieldValue("committeeMeettingTime", time)
//                       }
//                       className={`form-control`}
//                     />
//                     {formik.touched.committeeMeettingTime &&
//                       formik.errors.committeeMeettingTime && (
//                         <div className="invalid-feedback">
//                           {formik.errors.committeeMeettingTime}
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col">
//                   <div>
//                     <label className="form-label">Description</label>
//                     <textarea
//                       className={`form-control`}
//                       id='description'
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.description}
//                     ></textarea>
//                   </div>
//                 </div>
//               </div>

//               <div className="d-flex row justify-content-end align-items-center">
//                 {/* <div className="col-4" style={{ marginTop: "30px" }}>
//                   <button className="btn btn-primary" type="button" onClick={() => hendleModal()}>
//                     Cancel
//                   </button>
//                 </div> */}
//                 <div className="col-12 align-items-center justify-content-end" style={{ marginTop: "30px" }}>
//                   <button className="btn btn-primary" type="submit">
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Modal>
//     </div>

//   )
// }

// export default ScheduleCommitteeRoom
