import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { MMSSideBarItems } from '../../../../../../utils/sideBarItems'

function MMSMotionDetail() {
    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/mms/dashboard"} title1={"Motion"} addLink2={"/mms/motion/detail"} title2={"Motion Detail"} />
            <div class='container-fluid'>
                <div class="row mt-4">
                    <div class="">
                        <button class="btn btn-warning" type="submit">View File</button>
                        <button class="btn btn-primary" type="submit">Send for Translation</button>
                        <button class="btn btn-primary" type="submit">Print</button>
                        <button class="btn btn-primary" type="submit">Save</button>
                        <button class="btn btn-danger float-end" type="submit">Delete</button>
                    </div>
                </div>
                <div class='card mt-3'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1>MOTION DETAIL</h1>
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
                                        <label class="form-label">Motion ID</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">File No</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Motion Type</label>
                                        <select class="form-select">
                                            <option>Select</option>
                                            <option>Motion Under Rule 218</option>
                                            <option></option>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Motion Week</label>
                                        <select class="form-select">
                                            <option>Motion Week</option>
                                            <option>Not Applicable</option>
                                            <option>1st Week</option>
                                            <option>2nd Week</option>
                                            <option>3rd Week</option>
                                            <option>4th Week</option>
                                            <option>5th Week</option>
                                        </select>
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
                                        <label class="form-label">Notice Office Diary Time</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Motion Status</label>
                                        <select class="form-select">
                                            <option selected="selected" value="0">Motion Status</option>
                                            <option value="40">Admissibility not Allowed by the House</option>
                                            <option value="20">Admitted</option>
                                            <option value="26">Admitted but Lapsed</option>
                                            <option value="8">Admitted for 2 Hr. Discussion</option>
                                            <option value="6">Allowed</option>
                                            <option value="44">Approved</option>
                                            <option value="27">Deferred</option>
                                            <option value="21">Disallowed</option>
                                            <option value="9">Disallowed in Chamber</option>
                                            <option value="22">Discuss in the House</option>
                                            <option value="29">Discussed</option>
                                            <option value="7">Disposed Off</option>
                                            <option value="24">Droped by the House</option>
                                            <option value="28">Dropped</option>
                                            <option value="42">Held in Order</option>
                                            <option value="43">Held out of Order</option>
                                            <option value="18">Infructuous</option>
                                            <option value="12">Lapsed</option>
                                            <option value="30">Move To Session</option>
                                            <option value="19">Moved and Deferred</option>
                                            <option value="38">Moved and is Pending for Discussion</option>
                                            <option value="33">Moved in the House</option>
                                            <option value="11">Moved in the house without notice</option>
                                            <option value="14">Not Pressed</option>
                                            <option value="36">Notice Received for 2nd Time</option>
                                            <option value="17">Referred to Priv Cmt.</option>
                                            <option value="32">Referred to Special Committee</option>
                                            <option value="16">Referred to Spl Cmt</option>
                                            <option value="1">Referred to Standing Committee</option>
                                            <option value="37">Referred to the Privileges Committee</option>
                                            <option value="2">Ruled out of Order</option>
                                            <option value="10">Ruled out of Order in the house</option>
                                            <option value="15">Ruling Reserved</option>
                                            <option value="34">Selected/Not Sel. for Statement</option>
                                            <option value="41">Talked Out</option>
                                            <option value="39">To be heard</option>
                                            <option value="31">To be heard but Lapsed</option>
                                            <option value="5">Under Process</option>
                                            <option value="25">Under-Correspondence</option>
                                            <option value="4">Withdrawn at Secretariat Level</option>
                                            <option value="23">Withdrawn by the Member</option>
                                            <option value="3">Withdrawn in the House</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Date of Moving in House</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Date of Discussion</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Date of Reffering To SC</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">

                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label">Movers</label>
                                        <select class="form-select">
                                            <option>Select</option>
                                            <option></option>
                                            <option></option>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label">Ministries</label>
                                        <select class="form-select">
                                            <option>Select</option>
                                            <option></option>
                                            <option></option>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default MMSMotionDetail
