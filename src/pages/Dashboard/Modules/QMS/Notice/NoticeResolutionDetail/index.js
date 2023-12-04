import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'

function QMSNoticeResolutionDetail() {
    return (
        <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/notice/notice-resolution-detail"} title2={"Notice Resolution Detail"} />
            <div class='container-fluid'>
                <div class='card mt-4'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>Notice Resolution Detail</h1>
                    </div>
                    <div class='card-body'>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Session No</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Notice Office Diary No</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Notice Office Diary Date</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Notice Office Diary Time  </label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Resolution Type</label>
                                        <select class="form-select">
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Resolution Status</label>
                                        <select class="form-select">
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Resolution Movers</label>
                                        <select class="form-select">
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-warning" type="submit">No File Attached</button>
                                    <button class="btn btn-primary" type="submit">Save</button>
                                    <button class="btn btn-primary" type="submit">Send for Translation</button>
                                </div>
                            </div>
                            <p>Resolution text here</p>
                            <p>Urdu text here</p>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default QMSNoticeResolutionDetail
