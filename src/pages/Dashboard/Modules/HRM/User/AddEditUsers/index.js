import React from 'react'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { HRMsidebarItems } from '../../../../../../utils/sideBarItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'

function HRMAddEditUser() {
    const location = useLocation()
    return (
        <Layout module={true} sidebarItems={HRMsidebarItems}>
            <div className='dashboard-content'>
                <Header dashboardLink={"/hrm/user"} addLink1={"/hrm/user"} title1={"User"} addLink2={"/hrm/addedituser"} title2={location && location?.state ? "Edit User" : "Add User"} />
                <div class="container-fluid">
                    <div class="card">
                        <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
                            <h1>Add User</h1>
                        </div>
                        <div class="card-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">File Number</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Employee Name</label>
                                            <input class="form-control" type="text" placeholder={location?.state} />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Gender</label>
                                            <select class="form-select">
                                                <option>Year</option>
                                                <option>2023</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Title</label>
                                            <input class="form-control" type="text" />

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Father/Husband Name</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Domicile</label>
                                            <select class="form-select">
                                                <option>Document Type</option>
                                                <option>External</option>
                                                <option>Internal</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Date of Birth</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Place of Birth</label>
                                            <select class="form-select">
                                                <option>Branch</option>
                                                <option>Legislation</option>
                                                <option>IT</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">CNIC Number</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">CNIC Issue Date</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">CNIC Exp Date</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Place of Issue</label>
                                            <select class="form-select">
                                                <option>Branch</option>
                                                <option>Legislation</option>
                                                <option>IT</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">NTN Number</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Religion</label>
                                            <select class="form-select">
                                                <option>Branch</option>
                                                <option>Legislation</option>
                                                <option>IT</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Marital Status</label>
                                            <select class="form-select">
                                                <option>Document Type</option>
                                                <option>External</option>
                                                <option>Internal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Province</label>
                                            <select class="form-select">
                                                <option>Branch</option>
                                                <option>Legislation</option>
                                                <option>IT</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label class="form-label">Domicile</label>
                                            <select class="form-select">
                                                <option>Document Type</option>
                                                <option>External</option>
                                                <option>Internal</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Permanent Address</label>
                                            <textarea class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">City</label>
                                            <select class="form-select">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Local Address</label>
                                            <textarea class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">City</label>
                                            <select class="form-select">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Phone Type</label>
                                            <select class="form-select">
                                                <option>Branch</option>
                                                <option>Legislation</option>
                                                <option>IT</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Phone Number</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <button class="btn btn-primary me-md-2" style={{ marginTop: "31px" }} type="button"><FontAwesomeIcon icon={faPlus} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Email</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Is Official</label>
                                            <select class="form-select">
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <button class="btn btn-primary me-md-2" style={{ marginTop: "31px" }} type="button"><FontAwesomeIcon icon={faPlus} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <button class="btn btn-primary float-end" type="button">Submit</button>
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

export default HRMAddEditUser
