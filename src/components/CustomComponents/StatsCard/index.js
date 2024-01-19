import React from "react";
// import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

function StatsCard({ name, freshVal, completedVal, InprogressVal, handleClick, subCat }) {
  return (
    <>
      <div class="col-4">
        <div class="card custom-card">
          <div class="card-header justify-content-between" style={{ background: "#6b7c8f" }}>
            <div class="card-title" style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
              {name}
            </div>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mb-0 pt-2 crm-deals-status">
              <li class="fresh">
                <div class="d-flex align-items-center justify-content-between">
                  <div>Fresh Received</div>
                  <div class="fs-12 text-muted">
                    <strong>{freshVal}</strong>
                  </div>
                </div>
              </li>
              <li class="info">
                <div class="d-flex align-items-center justify-content-between">
                  <div>InProgress</div>
                  <div class="fs-12 text-muted">
                    <strong>{InprogressVal}</strong>
                  </div>
                </div>
              </li>
              <li class="primary">
                <div class="d-flex align-items-center justify-content-between">
                  <div>Completed</div>
                  <div class="fs-12 text-muted">
                    <strong>{completedVal}</strong>
                  </div>
                </div>
              </li>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTop: "2px solid #ccc",
                  paddingTop: "15px",
                }}
              >
                {subCat && (
                  <button
                    style={{ background: "#6b7c8f", color: "#FFF", padding: "5px 10px" }}
                    className="btn default btn-xs black"
                    onClick={handleClick}
                  >
                    {"View More"}
                  </button>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
      {/* <div class="col-3">
        <div class="card custom-card">
          <div class="card-header justify-content-between" style={{ background: "#14ae5c" }}>
            <div class="card-title" style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
              Motion
            </div>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mb-0 pt-2 crm-deals-status">
              <li class="primary">
                <div class="d-flex align-items-center justify-content-between">
                  <div>Completed</div>
                  <div class="fs-12 text-muted">
                    <strong>25</strong>
                  </div>
                </div>
              </li>
              <li class="info">
                <div class="d-flex align-items-center justify-content-between">
                  <div>InProgress</div>
                  <div class="fs-12 text-muted">
                    <strong>32</strong>
                  </div>
                </div>
              </li>
              <a className="view-more" href="#">
                View More
              </a>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card custom-card">
          <div class="card-header justify-content-between" style={{ background: "#14ae5c" }}>
            <div class="card-title" style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
              Resolution
            </div>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mb-0 pt-2 crm-deals-status">
              <li class="primary">
                <div class="d-flex align-items-center justify-content-between">
                  <div>Completed</div>
                  <div class="fs-12 text-muted">
                    <strong>18</strong>
                  </div>
                </div>
              </li>
              <li class="info">
                <div class="d-flex align-items-center justify-content-between">
                  <div>InProgress</div>
                  <div class="fs-12 text-muted">
                    <strong>6</strong>
                  </div>
                </div>
              </li>
              <a className="view-more" href="#">
                View More
              </a>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card custom-card">
          <div class="card-header justify-content-between" style={{ background: "#14ae5c" }}>
            <div class="card-title" style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
              Legislation
            </div>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mb-0 pt-2 crm-deals-status">
              <li class="primary">
                <div class="d-flex align-items-center justify-content-between">
                  <div>Completed</div>
                  <div class="fs-12 text-muted">
                    <strong>17</strong>
                  </div>
                </div>
              </li>
              <li class="info">
                <div class="d-flex align-items-center justify-content-between">
                  <div>InProgress</div>
                  <div class="fs-12 text-muted">
                    <strong>33</strong>
                  </div>
                </div>
              </li>
              <a className="view-more" href="#">
                View More
              </a>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-3 mt-4">
        <div class="card custom-card">
          <div class="card-header justify-content-between" style={{ background: "#14ae5c" }}>
            <div class="card-title" style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
              House Business
            </div>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mb-0 pt-2 crm-deals-status">
              <li class="primary">
                <div class="d-flex align-items-center justify-content-between">
                  <div>Completed</div>
                  <div class="fs-12 text-muted">
                    <strong>35</strong>
                  </div>
                </div>
              </li>
              <li class="info">
                <div class="d-flex align-items-center justify-content-between">
                  <div>InProgress</div>
                  <div class="fs-12 text-muted">
                    <strong>45</strong>
                  </div>
                </div>
              </li>
              <a className="view-more" href="#">
                View More
              </a>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-3 mt-4">
        <div class="card custom-card">
          <div class="card-header justify-content-between" style={{ background: "#14ae5c" }}>
            <div class="card-title" style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
              Members
            </div>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mb-0 pt-2 crm-deals-status">
              <li class="primary">
                <div class="d-flex align-items-center justify-content-between">
                  <div>Completed</div>
                  <div class="fs-12 text-muted">
                    <strong>10</strong>
                  </div>
                </div>
              </li>
              <li class="info">
                <div class="d-flex align-items-center justify-content-between">
                  <div>InProgress</div>
                  <div class="fs-12 text-muted">
                    <strong>15</strong>
                  </div>
                </div>
              </li>
              <a className="view-more" href="#">
                View More
              </a>
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default StatsCard;
