import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'

function QMSNoticeQuestionDetail() {
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/notice/notice-question-detail"} title2={"Notice Question Detail"} />
    <div class='container-fluid'>
                    <div class="row mt-4">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-primary" type="submit">Send for Translation</button>
                        </div>
                    </div>
                    <div class="row">
                            <div class="col-3">
                                <div class="mb-3">
                                    <input class="form-control" type="text" />
                                </div>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-primary me-2" type="submit">Update</button>
                                <button class="btn btn-warning me-2" type="submit">View File</button>
                                <button class="btn btn-primary me-2" type="submit">Revive</button>
                                <button class="btn btn-primary me-2" type="submit">Duplicate</button>
                                <button class="btn btn-danger" type="submit">Delete</button>
                            </div>
                    </div>
                    <div class='card mt-4'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>NOTICE QUESTION DETAIL</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                                <div class="dash-detail-container mb-4">
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3">
                                                <label class="form-label">Session No</label>
                                                <input class="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3">
                                                <label class="form-label">Notice Office Diary No </label>
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
                                                <label class="form-label">Notice Office Diary Time</label>
                                                <input class="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3">
                                                <label class="form-label">Question Diary No</label>
                                                <input class="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3">
                                                <label class="form-label">Assigned Question ID</label>
                                                <input class="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3">
                                                <label class="form-label">Category</label>
                                                <select class="form-select">
                                                    <option>Starred</option>
                                                    <option>Un-Starred</option>
                                                    <option>Short Notice</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3">
                                                <label class="form-label">Senator</label>
                                                <select class="form-select">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="mb-3">
                                                <label class="form-label">Division</label>
                                                <input class="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p>English Test Here</p>
                                <p>Urdu Text Here</p>

                            </div>
                        </div>
                    </div>
                </div>
    </Layout>
  )
}

export default QMSNoticeQuestionDetail
