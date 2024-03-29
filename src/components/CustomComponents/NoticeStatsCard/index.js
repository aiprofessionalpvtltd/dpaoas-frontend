import {
  faExchange,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
// import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

function NoticeStatsCard({ title, icon, iconBgColor, total, sent, received, overall, upcoming, SentText, ReceivedText, ColValue, onClick}) {
  return (
    <div class= {ColValue ? ColValue : "col-4"} onClick={onClick}>
      {overall ? (
        <>
          <div class="card comp-card">
              <div class="card-body">
                  <div class="row align-items-center">
                      <div class="col">
                          <h6 class="mb-25" style={{ color: 'black' }}>{title}</h6>
                          <h3 class="fw-700" style={{ color: iconBgColor }}>{total ? total : 0}</h3>
                      </div>
                      <div class="col-auto">
                        <div className="box-thumbnail" style={{ backgroundColor: iconBgColor }}>
                        <FontAwesomeIcon
                          icon={icon}
                          style={{ fontSize: "30px", color: "#fff" }}
                        />
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </>
      ) : upcoming ? (
        <div class="card sos-st-card">
            <div class="card-block">
                <div class="row align-items-center">
                    <div class="col">
                        <div class="card-anim" style={{ backgroundColor: iconBgColor }}>
                        <FontAwesomeIcon
                          icon={icon}
                          style={{ fontSize: "30px", color: "#fff", marginTop: "-8px" }}
                        />
                        
                        </div>
                        <h3 class="mb-0">{total ? total : 0}</h3>
                    </div>
                    <div class="col-auto">
                        <h5 class="mb-0" style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>{title}</h5>
                    </div>
                    
                </div>
            </div>
        </div>
      ) : (
      <div class="card proj-t-card">
        <div class="card-body">
          <div class="row align-items-center mb-30">
            <div class="col-auto" style={{ paddingRight: 0 }}>
              <FontAwesomeIcon
                icon={icon}
                style={{ fontSize: "30px", color: iconBgColor ? iconBgColor : "#f9bc82" }}
              />
            </div>
            <div class="col pl-0" style={{ paddingLeft: -7, marginTop: -7 }}>
              <h6 class="mt-3">{title}</h6>
            </div>
          </div>
          <div class="row align-items-center text-center">
            <div class="col">
              <h6
                class="mb-0"
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  fontSize: "17px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {SentText ? SentText :"Sent"}
                </span>
                {sent ? sent : 0}
              </h6>
            </div>
            <div class="col">
              <FontAwesomeIcon
                icon={faExchange}
                style={{ fontSize: "25px", color: iconBgColor ? iconBgColor : "#f9bc82" }}
              />
            </div>
            <div class="col">
              <h6
                class="mb-0"
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  fontSize: "17px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {ReceivedText ? ReceivedText : "Received"}
                </span>
                {received ? received : 0}
              </h6>
            </div>
          </div>
          <h6 class="pt-badge" style={{ backgroundColor: iconBgColor ? iconBgColor : "#F22613", width: '120px', textAlign: 'center' }}>{total ? total : 0}</h6>
        </div>
      </div>
      )}
    </div>
  );
}

export default NoticeStatsCard;
