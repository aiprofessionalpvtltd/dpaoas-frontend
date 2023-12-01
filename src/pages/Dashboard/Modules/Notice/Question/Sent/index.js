import React from 'react'
import { NoticeSidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import { useNavigate } from 'react-router';


function SentQuestion() {
    const navigate = useNavigate()
    

    return (
        <Layout module={true} sidebarItems={NoticeSidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/notice/dashboard"} addLink2={"/notice/question/sent"} title1={"Notice"} title2={"Sent Question"} />
            <div class='dashboard-content'>
            <div class='card mt-5'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>SENT QUESTIONS</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Question Diary No.</label>
                                            <input class="form-control" type="text"/>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Question ID</label>
                                            <input class="form-control" type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Keyword</label>
                                            <input class="form-control" type="text"/>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Member Name</label>
                                            <input class="form-control" type="text"/>
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
                                </div>
                                <div class="row">
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
                                            <label class="form-label">Question Status</label>
                                            <select class="form-select">
                                                <option>Question Status</option>
                                                <option>Admitted</option>
                                                <option>Admitted but Lapsed</option>
                                                <option>Deferred</option>
                                                <option>Disallowed</option>
                                                <option>Disallowed on Reconsideration</option>
                                                <option>File not Available</option>
                                                <option>Lapsed</option>
                                                <option>NFA</option>
                                                <option>Replied</option>
                                                <option>Replied/Referred to Standing Committee</option>
                                                <option>Under Correspondence</option>
                                                <option>Under Process</option>
                                                <option>Withdrawn</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">From Notice Date</label>
                                            <input class="form-control" type="text"/>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">To Notice Date</label>
                                            <input class="form-control" type="text"/>
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
                                        <th class="text-center" scope="col">QID</th>
                                        <th class="text-center" scope="col">Diary No</th>
                                        <th class="text-center" scope="col">Notice Date</th>
                                        <th class="text-center" scope="col">Notice Time</th>
                                        <th class="text-center" scope="col">Session Number</th>
                                        <th class="text-left" style={{paddingLeft: "6px"}} scope="col">Subject Matter</th>
                                        <th class="text-center" scope="col">Category</th>
                                        <th class="text-center" scope="col">Submitted By</th>
                                        <th class="text-center" scope="col">Status</th>
                                        {/* <th class="text-center" scope="col">Action</th> */}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td class="text-center green-color">1</td>
                                        <td class="text-center green-color">2648</td>
                                        <td class="text-center green-color">2648</td>
                                        <td class="text-center green-color">23/10/2023</td>
                                        <td class="text-center green-color">09:54</td>
                                        <td class="text-center green-color">332</td>
                                        <td class="text-left">No English Text No Urdu Text</td>
                                        <td class="text-center green-color">Starred</td>
                                        <td class="text-center green-color">Dr. Afnan Ullah Khan </td>
                                        <td class="text-center green-color">Under Process</td>
                                        {/* <td class="text-center">
                                          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" href="#"><i class="fas fa-edit"></i></a>
                                          <a href="#"><i class="fas fa-trash"></i></a>
                                          <a href="#"><i class="fas fa-print"></i></a>
                                        </td> */}
                                      </tr>
                                      <tr>
                                        <td class="text-center red-message-color">2</td>
                                        <td class="text-center red-message-color">2648</td>
                                        <td class="text-center red-message-color">2648</td>
                                        <td class="text-center red-message-color">23/10/2023</td>
                                        <td class="text-center red-message-color">09:54</td>
                                        <td class="text-center red-message-color">332</td>
                                        <td class="text-left">No English Text No Urdu Text</td>
                                        <td class="text-center red-message-color">Starred</td>
                                        <td class="text-center red-message-color">Dr. Afnan Ullah Khan </td>
                                        <td class="text-center red-message-color">Under Process</td>
                                        {/* <td class="text-center">
                                            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" href="#"><i class="fas fa-edit"></i></a>
                                            <a href="#"><i class="fas fa-trash"></i></a>
                                            <a href="#"><i class="fas fa-print"></i></a>
                                        </td> */}
                                      </tr>
                                      <tr>
                                        <td class="text-center green-color">1</td>
                                        <td class="text-center green-color">2648</td>
                                        <td class="text-center green-color">2648</td>
                                        <td class="text-center green-color">23/10/2023</td>
                                        <td class="text-center green-color">09:54</td>
                                        <td class="text-center green-color">332</td>
                                        <td class="text-left">No English Text No Urdu Text</td>
                                        <td class="text-center green-color">Starred</td>
                                        <td class="text-center green-color">Dr. Afnan Ullah Khan </td>
                                        <td class="text-center green-color">Under Process</td>
                                        {/* <td class="text-center">
                                          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" href="#"><i class="fas fa-edit"></i></a>
                                          <a href="#"><i class="fas fa-trash"></i></a>
                                          <a href="#"><i class="fas fa-print"></i></a>
                                        </td> */}
                                      </tr>
                                      <tr>
                                        <td class="text-center red-message-color">2</td>
                                        <td class="text-center red-message-color">2648</td>
                                        <td class="text-center red-message-color">2648</td>
                                        <td class="text-center red-message-color">23/10/2023</td>
                                        <td class="text-center red-message-color">09:54</td>
                                        <td class="text-center red-message-color">332</td>
                                        <td class="text-left">No English Text No Urdu Text</td>
                                        <td class="text-center red-message-color">Starred</td>
                                        <td class="text-center red-message-color">Dr. Afnan Ullah Khan </td>
                                        <td class="text-center red-message-color">Under Process</td>
                                        {/* <td class="text-center">
                                            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" href="#"><i class="fas fa-edit"></i></a>
                                            <a href="#"><i class="fas fa-trash"></i></a>
                                            <a href="#"><i class="fas fa-print"></i></a>
                                        </td> */}
                                      </tr>
                                    </tbody>
                                  
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
            </div>
            <div class="footer">
                © Copyright AI Professionals
            </div>
        </Layout>
    )
}

export default SentQuestion
