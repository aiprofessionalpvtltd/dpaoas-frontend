import React from "react";
import logo from "./../../../assets/profile-img.jpg";

export const EfilingAttendanceCard = ({
  memberName,
  memberParty,
  attendance,
  onChange,
  view
}) => {
  return (
    <>
      <div className="single-professionals">
        <div className="professionals-img">
          <img src={logo} alt="Image" style={{ width: "80px" }} />
          <i className="bx bx-heart"></i>
        </div>

        <h3>{memberName ? memberName : "Anwar Lal Dean"}</h3>
        <span style={{ marginBottom: "10px", display: "block" }}>
          {memberParty ? memberParty : "PPPP"}
        </span>

        <form>
          <div className="nice-select" tabIndex="0">
            <span style={{ float: "left" }} className="current">
              Attendance
            </span>
            <span style={{ float: "right", width: "110px" }}>
                {view ? (
              <span
                className="tag"
                style={{
                  float: "right",
                  background:
                   attendance === "PRESENT"
                      ? "rgb(0, 128, 0)"
                      : attendance === "LEAVE"
                        ? "rgb(0, 0, 255)"
                        : attendance === "ABSENT"
                          ? "rgb(255, 0, 0)"
                          : "",
                  color: "#FFF",
                }}
              >
                {attendance ? attendance : "PRESENT"}
              </span>
            ):(
              <select
                className="form-select"
                onChange={onChange} // Trigger parent onChange with index
                value={attendance} // Set the selected value from the parent state
              >
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="LEAVE">Leave</option>
              </select>
              )}
            </span>
            <div className="clearfix"></div>
          </div>
        </form>
      </div>
    </>
  );
};
