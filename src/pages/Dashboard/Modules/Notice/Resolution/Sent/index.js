import React from 'react'
import { NoticeSidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import { useNavigate } from 'react-router';


function SentResolution() {
    const navigate = useNavigate()
    

    return (
        <Layout module={true} sidebarItems={NoticeSidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/notice/dashboard"} addLink2={"/notice/resolution/sent"} title1={"Notice"} title2={"Sent Resolution"} />
            <div class='dashboard-content'>
                <div class='container-fluid'>
                    <div class='card mt-5'>
                        <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                            <h1>SENT RESOLUTION</h1>
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
                                </div>
                                <div class="row">
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
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Resolution Type</label>
                                            <select class="form-select">
                                                <option>Resolution Type</option>
                                                <option>Government Resolution</option>
                                                <option>Private Member Resolution</option>
                                                <option>Govt. Resolution Supported by others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Resolution Status</label>
                                            <select class="form-select">
                                                <option selected="selected" value="0">Resolution Status</option>
                                                <option>Allowed</option>
                                                <option>Disallowed</option>
                                                <option>Withdraw</option>
                                                <option>Admitted</option>
                                                <option>Under Process</option>
                                                <option>Admitted and Selected in Balloting</option>
                                                <option>Dropped by the House</option>
                                                <option>Admitted but Lapsed</option>
                                                <option>Included in the order of day</option>
                                                <option>Passed by the House</option>
                                                <option>Passed As Amended</option>
                                                <option>Withdrawn by the Member</option>
                                                <option>Rejected by the House</option>
                                                <option>Passed Unanimously</option>
                                                <option>Under Correspondence</option>
                                                <option>Moved and Pending for Discussion</option>
                                                <option>Lapsed</option>
                                                <option>Deferred</option>
                                                <option>Refered to Standing Committee</option>
                                                <option>Move To Session</option>
                                                <option>Move in the House</option>
                                                <option>Pending for further discussion</option>
                                                <option>NFA</option>
                                                <option>Admitted as Call Attention Notice</option>

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

                                <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                            <tr>
                                                <th class="text-center" scope="col">Sr#</th>
                                                <th class="text-center" scope="col">Notice No./Date</th>
                                                <th class="text-center" scope="col">Session Number</th>
                                                <th class="text-center" scope="col">Resolution Type</th>
                                                <th class="text-left" style={{ paddingLeft: "6px" }} scope="col">Subject Matter</th>
                                                <th class="text-center" scope="col">Resolution Status</th>
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
                                                <td class="text-left"></td>
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

export default SentResolution
