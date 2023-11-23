import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function LeaveCard({ available, used, progressValue, title, percentage }) {
    return (
        <div class="col-3">
            <div class="dash-card">
                <div class="dash-card-header green-bg" style={{ textAlign: "center" }}>
                    <h2 style={{ marginBottom: 0 }}>{title}</h2>
                </div>
                <div class="count" style={{ borderLeft: "1px", width: "100%" }}>
                    <div class="float-start" style={{ width: 70, height: 70 }}>
                        <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={{
                                // Customize the root svg element
                                root: {},
                                // Customize the path, i.e. the "completed progress"
                                path: {
                                    // Path color
                                    stroke: '#14ae5c',
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',
                                    // Customize transition animation
                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                    // Rotate the path
                                    transform: 'rotate(0.25turn)',
                                    transformOrigin: 'center center',
                                },
                                // Customize the circle behind the path, i.e. the "total progress"
                                trail: {
                                    // Trail color
                                    stroke: '#d6d6d6',
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',
                                    // Rotate the trail
                                    transform: 'rotate(0.25turn)',
                                    transformOrigin: 'center center',
                                },
                                // Customize the text
                                text: {
                                    // Text color
                                    fill: '#000',
                                    // Text size
                                    fontSize: '20px',
                                    fontWeight: "bold"
                                },
                                // Customize background - only used when the `background` prop is true
                                background: {
                                    fill: '#3e98c7',
                                },
                            }}
                        />
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
