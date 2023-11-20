import React from 'react'

function LeaveCard({ available, used, progressValue, title }) {
    return (
        <div class="col-3">
            <div class="dash-card">
                <div class="dash-card-header green-bg" style={{ textAlign: "center" }}>
                    <h2 style={{ marginBottom: 0 }}>{title}</h2>
                </div>
                <div class="count" style={{ borderLeft: "1px", width: "100%" }}>
                    <div class="float-start">

                    </div>
                    <div class="float-end" style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "18px", marginBottom: "5px", display: "block" }}>Available : {available}</span>
                        <span style={{ fontSize: "18px" }}>Used : {used}</span>
                    </div>
                    <div class="clearfix"></div>
                </div>

            </div>
        </div>
    )
}

export default LeaveCard
