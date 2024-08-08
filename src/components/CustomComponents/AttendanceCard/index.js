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
                      ? "rgb(0, 128, 0)"
                      : attendance === "Leave"
                        ? "rgb(0, 0, 255)"
                        : attendance === "Absent"
                          ? "rgb(255, 0, 0)"
                          : attendance === "Vacant"
                            ? "rgb(128, 128, 128)"
                            : attendance === "Suspended"
                              ? "rgb(255, 165, 0)"
                              : "",
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
                  <option value="Vacant">Vacant</option>
                  <option value="Suspended">Suspended</option>
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
