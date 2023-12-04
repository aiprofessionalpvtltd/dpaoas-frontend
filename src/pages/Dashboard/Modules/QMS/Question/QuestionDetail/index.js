import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { QMSSideBarItems } from '../../../../../../utils/sideBarItems'

function QMSQuestionDetail() {
return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
    <Header dashboardLink={"/"} addLink1={"/qms/dashboard"} title1={"Question"} addLink2={"/qms/question/detail"} title2={"Question Detail"} />
    <div class='container-fluid'>
                    <div class='card mt-5'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>QUESTIONS DETAIL</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                                <div class="row mb-4">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-warning" type="submit">No File Attached</button>
                                        <button class="btn btn-primary" type="submit">Revive</button>
                                        <button class="btn btn-primary" type="submit">Defer</button>
                                        <button class="btn btn-primary" type="submit">Send for Translation</button>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Session No</label>
                                            <select class="form-select">
                                                <option>123</option>
                                                <option>12123</option>
                                                <option>45456</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary No</label>
                                            <select class="form-select">
                                                <option>6546</option>
                                                <option>45654</option>
                                                <option>45646</option>
                                            </select>
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
                                            <div class="form-check" style={{marginTop: "25px"}}>
                                                <input class="form-check-input " type="checkbox" id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault"> Priority</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Question ID</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Question Diary No</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Category</label>
                                            <select class="form-control small-control">
                                                <option>Select</option>
                                                <option>Starred</option>
                                                <option>Un-Starred</option>
                                                <option>Short Notice</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Question Status</label>
                                            <select class="form-control">
                                                <option>Select</option>
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
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Reply Date</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Senator</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Group</label>
                                            <select name="ctl00$ContentPlaceHolder3$GroupDDL" onchange="javascript:setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder3$GroupDDL\',\'\')', 0)" id="ContentPlaceHolder3_GroupDDL" class="form-control small-control">
                                                <option>Select</option>
                                                <option>1st Group</option>
                                                <option>2nd Group</option>
                                                <option>3rd Group</option>
                                                <option>4th Group</option>
                                                <option>5th Group</option>
                                            
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Division</label>
                                            <select class="form-control small-control">
                                                <option>Select</option>
                                                <option>Aviation Division</option>
                                                <option>Cabinet Division</option>
                                                <option>Capital Administration &amp; Development Div.</option>
                                                <option>Climate Change and Environmental Coordination</option>
                                                <option>Establishment Division</option>
                                                <option>Housing and Works Division</option>
                                                <option>Information Technology &amp; Telecommunications Division</option>
                                                <option>National Security Division</option>
                                                <option>Poverty Alleviation and Social Safety Division</option>
                                                <option>Textile Division</option>
                                            
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">File Status</label>
                                            <select name="ctl00$ContentPlaceHolder3$FileStatusDDL" id="ContentPlaceHolder3_FileStatusDDL" class="form-control small-control" required="true">
                                                <option>Available</option>
                                                <option>Missing</option>
                                                <option>Moved for Approval</option>
                                                <option>Moved for Advance Copy</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                               <p>Original Question text here</p>
                               <p>Ammended Question Text here</p>
                               <p>Urdu Text here</p>

                               <div class="d-grid gap-2 d-md-flex">
                                    <button class="btn btn-primary" type="submit">Update</button>
                                    <button class="btn btn-primary" type="submit">Print Ammended Question</button>
                                    <button class="btn btn-primary" type="submit">Print Original Question</button>
                                    <button class="btn btn-primary" type="submit">Print Urdu</button>
                                    <button class="btn btn-danger" type="submit">Delete</button>
                               </div>

                               <p>Reply Text here</p>

                               <div class="dash-detail-container" style={{marginTop: "20px"}}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                    <tr>
                                        <th class="text-left" scope="col">Action</th>
                                        <th class="text-left" scope="col">User</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Inserted By</td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>on 17/07/2023 1:40:14 PM</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Updated By</td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Muneeb Hussain on 19/07/2023 12:11:46 PM</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Sent for translation By</td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}></td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Translation Approved By </td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}></td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Deleted By</td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Muneeb Hussain on 19/07/2023 12:11:49 PM</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left" style={{paddingLeft: "23px"}}>Recovered By </td>
                                        <td class="text-left" style={{paddingLeft: "23px"}}></td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                                
                                <h2 style={{color: "#666", fontSize: "24px", marginTop: "30px"}}>Status History</h2>
                                <div class="dash-detail-container" style={{marginTop: "20px"}}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                      <tr>
                                        <th class="text-center" scope="col">Sr#</th>
                                        <th class="text-center" scope="col">Session No</th>
                                        <th class="text-center" scope="col">Question Status</th>
                                        <th class="text-center" scope="col">Status Date</th>
                                        <th class="text-center" scope="col">User</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td class="text-center">1</td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                      </tr>
                                    </tbody>
                                  
                                    </table>
                                </div>
                                <h2 style={{color: "#666", marginTop: "25px", fontSize: "24px"}}>Revival History</h2>
                                <div class="dash-detail-container" style={{marginTop: "20px"}}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                      <tr>
                                        <th class="text-center" scope="col">Sr#</th>
                                        <th class="text-center" scope="col">From Session Number</th>
                                        <th class="text-center" scope="col">To Session Number</th>
                                        <th class="text-center" scope="col">Previous Notice Office Diary No</th>
                                        <th class="text-center" scope="col">Revival Date</th>
                                        <th class="text-center" scope="col">User</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                      </tr>
                                    </tbody>
                                  
                                    </table>
                                </div>
                                <h2 style={{color: "#666", marginTop: "25px", fontSize: "24px"}}>Defer History</h2>
                                <div class="dash-detail-container" style={{marginTop: "20px"}}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                      <tr>
                                        <th class="text-center" scope="col">Sr#</th>
                                        <th class="text-center" scope="col">Defered to Session No</th>
                                        <th class="text-center" scope="col">Defered on</th>
                                        <th class="text-center" scope="col">Defered by</th>
                                        <th class="text-center" scope="col">User</th>
                                        <th class="text-center" scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                      </tr>
                                    </tbody>
                                  
                                    </table>
                                </div>
                                <h2 style={{color:" #666", marginTop: "25px", fontSize: "24px"}}>File Status History</h2>
                                <div class="dash-detail-container" style={{marginTop: "20px"}}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                      <tr>
                                        <th class="text-center" scope="col">Sr#</th>
                                        <th class="text-center" scope="col">File Status</th>
                                        <th class="text-center" scope="col">Date</th>
                                        <th class="text-center" scope="col">User</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"></td>
                                      </tr>
                                    </tbody>
                                  
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                    </div>
                </div>
    </Layout>
  )
}

export default QMSQuestionDetail
