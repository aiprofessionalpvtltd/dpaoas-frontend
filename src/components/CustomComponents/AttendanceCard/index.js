import React from "react";
import logo from "./../../../assets/profile-img.jpg";
import { Field } from "formik";

export const AttendanceCard = ({
  memberName,
  memberParty,
  attendance,
  view,
  index,
}) => {
  return (
    <>
      <div class="single-professionals">
        <div class="professionals-img">
          <img src={logo} alt="Image" style={{ width: "80px" }} />
          <i class="bx bx-heart"></i>
        </div>

        <h3>{memberName ? memberName : "Anwar Lal Dean"}</h3>
        <span style={{ marginBottom: "10px", display: "block" }}>
          {memberParty ? memberParty : "PPPP"}
        </span>

        <form>
          <div class="nice-select" tabindex="0">
            <span style={{ float: "left" }} class="current">
              Attendance
            </span>
            {view ? (
              <span
                className="tag"
                style={{
                  float: "right",
                  background:
                    attendance === "Present"
                      ? "#19bc28"
                      : attendance === "Leave"
                        ? "#125cc7"
                        : attendance === "Absent" ?  "rgb(130, 0, 1)" : "",
                  color: "#FFF",
                }}
              >
                {attendance ? attendance : "Absent"}
              </span>
            ) : (
              <span style={{ float: "right", width: "110px" }}>
                <Field
                  as="select"
                  className="form-select"
                  name={`sessionMembers.${index}.attendanceStatus`}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </Field>
              </span>
            )}
            <div className="clearfix"></div>
          </div>
        </form>
      </div>
    </>
  );
};
