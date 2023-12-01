import React from 'react'
import { NoticeSidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import { useNavigate } from 'react-router';


function SentMotion() {
    const navigate = useNavigate()
    

    return (
        <Layout module={true} sidebarItems={NoticeSidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/notice/dashboard"} addLink2={"/notice/motion/search"} title1={"Notice"} title2={"Search Motion"} />
            <div class='dashboard-content'>
            <div class='container-fluid'>
                    <div class='card mt-5'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>SENT MOTION</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Diary No</label>
                                            <input class="form-control" type="text"/>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion ID</label>
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
                                            <label class="form-label">Motion Type</label>
                                            <select class="form-select">
                                                <option>Motion Type</option>
                                                <option>Adjournment Motion</option>
                                                <option>Call Attention Notice</option>
                                                <option>Privilege Motion</option>
                                                <option>Laying of Copy</option>
                                                <option>Motion For Consideration/Discussion</option>
                                                <option>Motion Under Rule 194</option>
                                                <option>Motion Under Rule 218</option>
                                                <option>Motion Under Rule 60</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Motion Status</label>
                                            <select class="form-select">
                                                <option>Motion Status</option>
                                                <option>Referred to Standing Committee</option>
                                                <option>Ruled out of Order</option>
                                                <option>Withdrawn in the House</option>
                                                <option>Withdrawn at Secretariat Level</option>
                                                <option>Under Process</option>
                                                <option>Allowed</option>
                                                <option>Disposed Off</option>
                                                <option>Admitted for 2 Hr. Discussion</option>
                                                <option>Disallowed in Chamber</option>
                                                <option>Ruled out of Order in the house</option>
                                                <option>Moved in the house without notice</option>
                                                <option>Lapsed</option>
                                                <option>Not Pressed</option>
                                                <option>Ruling Reserved</option>
                                                <option>Referred to Spl Cmt</option>
                                                <option>Referred to Priv Cmt.</option>
                                                <option>Infructuous</option>
                                                <option>Moved and Deferred</option>
                                                <option>Admitted</option>
                                                <option>Disallowed</option>
                                                <option>Discuss in the House</option>
                                                <option>Withdrawn by the Member</option>
                                                <option>Droped by the House</option>
                                                <option>Under-Correspondence</option>
                                                <option>Admitted but Lapsed</option>
                                                <option>Deferred</option>
                                                <option>Dropped</option>
                                                <option>Discussed</option>
                                                <option>Move To Session</option>
                                                <option>To be heard but Lapsed</option>
                                                <option>Referred to Special Committee</option>
                                                <option>Moved in the House</option>
                                                <option>Selected/Not Sel. for Statement</option>
                                                <option>Notice Received for 2nd Time</option>
                                                <option>Referred to the Privileges Committee</option>
                                                <option>Moved and is Pending for Discussion</option>
                                                <option>To be heard</option>
                                                <option>Admissibility not Allowed by the House</option>
                                                <option>Talked Out</option>
                                                <option>Held in Order</option>
                                                <option>Held out of Order</option>
                                                <option>Approved</option>

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
                                        <th class="text-center" scope="col">Notice No./Date</th>
                                        <th>M-DN</th>
                                        <th class="text-center" scope="col">Session Number</th>
                                        <th class="text-center" scope="col">Motion Type</th>
                                        <th class="text-left" style={{paddingLeft: "6px"}} scope="col">Subject Matter</th>
                                        <th class="text-center" scope="col">Motion Status</th>
                                        <th class="text-center" scope="col">Movers</th>
                                        <th class="text-center" scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td class="text-center">1</td>
                                        <td class="text-center"><span>730</span><br/><span>31/08/2023</span></td>
                                        <td></td>
                                        <td class="text-center">332</td>
                                        <td class="text-center">Motion Under Rule 218</td>
                                        <td class="text-left">No English Text</td>
                                        <td class="text-center">Under Process</td>
                                        <td class="text-center"></td>
                                        <td class="text-center">
                                          <a href="#"><i class="fas fa-print"></i></a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="text-center">2</td>
                                        <td class="text-center"><span>730</span><br/><span>31/08/2023</span></td>
                                        <td></td>
                                        <td class="text-center">332</td>
                                        <td class="text-center">Motion Under Rule 218</td>
                                        <td class="text-left">No English Text</td>
                                        <td class="text-center">Under Process</td>
                                        <td class="text-center"></td>
                                        <td class="text-center">
                                          <a href="#"><i class="fas fa-print"></i></a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="text-center">3</td>
                                        <td class="text-center"><span>730</span><br/><span>31/08/2023</span></td>
                                        <td></td>
                                        <td class="text-center">332</td>
                                        <td class="text-center">Motion Under Rule 218</td>
                                        <td class="text-left">No English Text</td>
                                        <td class="text-center">Under Process</td>
                                        <td class="text-center"></td>
                                        <td class="text-center">
                                          <a href="#"><i class="fas fa-print"></i></a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="text-center">4</td>
                                        <td class="text-center"><span>730</span><br/><span>31/08/2023</span></td>
                                        <td></td>
                                        <td class="text-center">332</td>
                                        <td class="text-center">Motion Under Rule 218</td>
                                        <td class="text-left">No English Text</td>
                                        <td class="text-center">Under Process</td>
                                        <td class="text-center"></td>
                                        <td class="text-center">
                                          <a href="#"><i class="fas fa-print"></i></a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  
                                    </table>
                                </div>

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

export default SentMotion
