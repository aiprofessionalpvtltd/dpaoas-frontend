import React from 'react'
import { Layout } from '../../../../../components/Layout'
import Header from '../../../../../components/Header'
import { MMSSideBarItems } from '../../../../../utils/sideBarItems'

function MMSMotionSummery() {
    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/mms/dashboard"} title1={"Motion"} addLink2={"/mms/reports/motion-summary"} title2={"Motion Summary"} />
            <div class='container-fluid'>
                <div class='card mt-5'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>MOTION SUMMARY</h1>
                    </div>
                    <div class='card-body'>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">From Session</label>
                                        <select class="form-select">
                                            <option>Select</option>
                                            <option>121</option>
                                            <option>122</option>
                                            <option>123</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">To Session</label>
                                        <select class="form-select">
                                            <option>Select</option>
                                            <option>121</option>
                                            <option>122</option>
                                            <option>123</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Motion Type</label>
                                        <select class="form-select">
                                            <option>Adjournment Motion</option>
                                            <option>Call Attention Notice</option>
                                            <option>Privilege Motion</option>
                                            <option>Motion Under Rule 218</option>
                                            <option>Motion Under Rule 60</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-primary" type="submit">View Summary</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MMSMotionSummery
