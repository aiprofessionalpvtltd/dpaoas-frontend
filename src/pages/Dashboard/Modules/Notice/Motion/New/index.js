import React from 'react'
import { NoticeSidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import { useNavigate } from 'react-router';


function NewMotion() {
    const navigate = useNavigate()
    

    return (
        <Layout module={true} sidebarItems={NoticeSidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/notice/dashboard"} addLink2={"/notice/motion/new"} title1={"Notice"} title2={"New Motion"} />
            <div class='dashboard-content'>
            <div class='container-fluid'>
                    <div class='card mt-5'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>NEW MOTION</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Session No</label>
                                            <input class="form-control" type="text"/>
                                        </div>
                                    </div>
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
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary Date</label>
                                            <input class="form-control" type="text"/>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary Time</label>
                                            <input class="form-control" type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Notice Office Diary No</label>
                                            <select class="form-select">
                                                <option>2655</option>
                                                <option>2556</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Movers</label>
                                            <select class="form-select">
                                                <option>Motion Type</option>
                                                <option>Adjournment Motion</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label for="formFile" class="form-label">Attach Image File </label>
                                            <input class="form-control" type="file" id="formFile"/>
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

export default NewMotion
