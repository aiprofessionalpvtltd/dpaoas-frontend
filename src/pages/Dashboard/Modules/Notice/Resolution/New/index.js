import React from 'react'
import { NoticeSidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import { useNavigate } from 'react-router';


function NewResolution() {
    const navigate = useNavigate()


    return (
        <Layout module={true} sidebarItems={NoticeSidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/notice/dashboard"} addLink2={"/notice/resolution/new"} title1={"Notice"} title2={"New Resolution"} />
            <div class='dashboard-content'>
                <div class='container-fluid'>
                    <div class='card mt-5'>
                        <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                            <h1>NEW RESOLUTION</h1>
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
                                            <select class="form-select">
                                                <option>178</option>
                                                <option>100</option>
                                                <option>93</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Resolution Type</label>
                                            <select class="form-select">
                                                <option value="0">Select</option>
                                                <option value="0">Government Resolution</option>
                                                <option value="0">Private Member Resolution</option>
                                                <option value="0">Govt. Resolution Supported by others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Movers</label>
                                            <select class="form-select">
                                                <option>saqib</option>
                                                <option>umar</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label for="formFile" class="form-label">Notice Office Diary Date </label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label for="formFile" class="form-label">Notice Office Diary Time </label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label for="formFile" class="form-label">
                                                Attachment{" "}
                                            </label>
                                            <input class="form-control" type="file" id="formFile" />
                                        </div>
                                    </div>
                                </div>

                                <p>add text editor here</p>
                                <p>add text editor here</p>

                                <div class="row">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary" type="submit">Submit</button>
                                    </div>
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

export default NewResolution
