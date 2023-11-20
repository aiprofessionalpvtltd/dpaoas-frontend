import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import { HRMsidebarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import { useLocation } from 'react-router-dom'

function HRMAddEditDesignation() {
    const location = useLocation()
    return (
        <Layout module={true} sidebarItems={HRMsidebarItems}>
            <div className='dashboard-content'>
                <Header dashboardLink={"/hrm/designation"} addLink1={"/hrm/designation"} title1={"Designation"} addLink2={"/hrm/addeditdesignation"} title2={location && location?.state ? "Edit Designation" : "Add Designation"} />
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='card-header red-bg' style={{ background: "#666" }}>
                            <h1>Add Designation</h1>
                        </div>
                        <div className='card-body'>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Designation name * </label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={location?.state} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea placeholder="Description" className="form-control" ></textarea>
                                        </div>
                                        {location && location?.state && (

                                            <div className="mb-3">
                                                <label className="form-label">Staus</label>
                                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Status" />
                                            </div>
                                        )}
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

export default HRMAddEditDesignation
