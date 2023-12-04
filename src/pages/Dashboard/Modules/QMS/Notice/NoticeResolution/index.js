import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'

function QMSNoticeResolution() {
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/notice/notice-resolution"} title2={"Notice Resolution"} />
    <div class='container-fluid'>
                    <div class='card mt-4'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>Notice Resolution</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Diary No</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Resolution ID</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Keyword</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Member Name</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
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
                                            <label class="form-label">Resolution Type</label>
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
                                            <label class="form-label">Resolution Status</label>
                                            <select class="form-select">
                                                <option>Select</option>
                                                <option>121</option>
                                                <option>122</option>
                                                <option>123</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">From Notice Date</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">To Notice Date</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary" type="submit">Search</button>
                                        <button class="btn btn-primary" type="submit">Reset</button>
                                    </div>
                                </div>
                                <div class="dash-detail-container" style={{marginTop: "20px"}}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                      <tr>
                                        <th class="text-center" scope="col">Sr#</th>
                                        <th class="text-center" scope="col">Notce No./Date</th>
                                        <th class="text-center" scope="col">Session Number</th>
                                        <th class="text-center" scope="col">Resolution Type</th>
                                        <th class="text-center" scope="col">Subject Matter</th>
                                        <th class="text-center" scope="col">Resolution Status</th>
                                        <th class="text-center" scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td class="text-center">1</td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"><button class="btn btn-primary" type="submit">Print</button></td>
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

export default QMSNoticeResolution
