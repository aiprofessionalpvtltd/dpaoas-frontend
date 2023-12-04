import React from 'react'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { MMSSideBarItems } from '../../../../../../utils/sideBarItems'
import { useNavigate } from 'react-router-dom'

function MMSMotionList() {
    const navigate = useNavigate()
    const handleAdd = () => {
        navigate("/mms/motion/new")
    }
    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/mms/dashboard"} title1={"Motion"} addLink2={"/mms/motion/list"} title2={"Motion List"} />
            <div class='container-fluid'>
                <div class='card mt-5'>
                    <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                        <h1 className="float-start mt-2">MOTION LIST</h1>
                        <button
                            className="btn btn-primary float-end"
                            type="button"
                            onClick={handleAdd}
                        >
                            {"Add Motion"}
                        </button>
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
                                        <label class="form-label">Motion Type</label>
                                        <select class="form-select">
                                            <option>Select</option>
                                            <option>Adjournment Motion</option>
                                            <option>Call Attention Notice</option>
                                            <option>Privilege Motion</option>
                                            <option>Motion Under Rule 218</option>
                                            <option>Motion Under Rule 60</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Motion Week</label>
                                        <select class="form-select">
                                            <option>Not Applicable</option>
                                            <option>1st Week</option>
                                            <option>2nd Week</option>
                                            <option>3rd Week</option>
                                            <option>4th Week</option>
                                            <option>5th Week</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">List Name</label>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">List Date</label>
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
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-primary" type="submit">Generate</button>
                                    <button class="btn btn-primary" type="submit">Save</button>
                                </div>
                            </div>

                            <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                                <table class="table red-bg-head th">
                                    <thead>
                                        <tr>
                                            <th class="text-center" scope="col">Sr#</th>
                                            <th class="text-center" scope="col">List Name</th>
                                            <th class="text-center" scope="col">Session Number</th>
                                            <th class="text-center" scope="col">List Date</th>
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
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="table red-bg-head th">
                                    <thead>
                                        <tr>
                                            <th class="text-center" scope="col">Sr#</th>
                                            <th class="text-center" scope="col">MID / Date</th>
                                            <th class="text-center" scope="col">Name of the Mover</th>
                                            <th class="text-center" scope="col">Contents of the Motion</th>
                                            <th class="text-center" scope="col">Status / Remarks</th>
                                            <th class="text-center" scope="col">Ministry</th>
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

                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default MMSMotionList
