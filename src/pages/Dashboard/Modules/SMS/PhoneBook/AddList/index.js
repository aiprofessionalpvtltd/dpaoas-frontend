import React from 'react'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'
import { useLocation } from 'react-router'

function SMSAddList() {
    const location = useLocation()
    return (
        <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/sms/dashboard"}
                title1={
                    location && location?.state ? "Edit List" : "Add List"
                  }
                addLink1={"/sms/phone-book/add"}
            />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        {location && location.state ? (
                            <h1>Edit Phone List</h1>
                        ): <h1>Add Phone List</h1>}
                       
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Last Name * </label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                id=""
                                            />

                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">List Field</label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                id=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Add similar validation logic for other fields */}
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className={`form-control`}
                                                id=""

                                            ></textarea>

                                        </div>

                                        {/* Add validation and error display for other fields */}
                                    </div>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-primary" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SMSAddList
