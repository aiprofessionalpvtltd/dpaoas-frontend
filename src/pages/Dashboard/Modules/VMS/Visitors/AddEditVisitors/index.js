import React from 'react'
import { VMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout'
import { useLocation } from 'react-router-dom'

function HRMAddEditVisitors() {
    const location = useLocation()
    return (
        <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
            <div class='card'>
                <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                    {location && location.state ? (
                        <h1>Edit Visitors</h1>
                    ) : <h1>Add Visitors</h1>}
                </div>
                <div class='card-body'>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">Visitor Name</label>
                                    <input class="form-control" type="text" />
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">CNIC</label>
                                    <input class="form-control" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">Visitor Details</label>
                                    <textarea class="form-control" name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-primary" type="button">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HRMAddEditVisitors
