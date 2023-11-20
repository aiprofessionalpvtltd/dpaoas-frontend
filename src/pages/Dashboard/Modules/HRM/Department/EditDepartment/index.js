import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { HRMsidebarItems } from '../../../../../../utils/sideBarItems'
import { useLocation } from 'react-router-dom'

function HRMEditDepartment() {
    const location = useLocation()
    return (
        <Layout module={true} sidebarItems={HRMsidebarItems}>
            <div className='dashboard-content'>
                <Header dashboardLink={"/hrm/department"} addLink={"/hrm/department"} title1={"Department"} addLink2={"/hrm/editdepartment"} title2={"Edit Department"} />
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='card-header red-bg' style={{ background: "#666" }}>
                            <h1>Edit Department</h1>
                        </div>
                        <div className='card-body'>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Department name * </label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={location.state} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea placeholder="Description" className="form-control" ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Staus</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Status" />
                                        </div>
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button className="btn btn-primary" type="button" >Submit</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HRMEditDepartment
