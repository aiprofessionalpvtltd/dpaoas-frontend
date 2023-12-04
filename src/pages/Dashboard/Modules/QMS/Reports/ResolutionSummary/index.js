import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'

function QMSResolutionSummary() {
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/reports/resolution-summary"} title2={"Resolution Summary"} />
            <div class='container-fluid'>
                    <div class='card mt-5'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>RESOLUTION SUMMARY</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">From Session</label>
                                            <select class="form-select">
                                                <option>333</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">To Session</label>
                                            <select class="form-select">
                                                <option>331</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                               <div class="d-grid gap-2 d-md-flex float-end">
                                    <button class="btn btn-primary" type="submit">View Summary</button>
                               </div>
                               <div class="clearfix"></div>
                               <div class="dash-detail-container" style={{marginTop: "20px"}}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                    <tr>
                                        <th class="text-left" scope="col">Summary Detail</th>
                                        <th class="text-left" scope="col">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Received Resolution</td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>11</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Admitted But Lapsed</td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>1</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Disallowed</td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>2</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Dropped by The House </td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>1</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Lapsed</td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>1</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>NFA</td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>1</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Passed Unanimously</td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>5</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
  )
}

export default QMSResolutionSummary
