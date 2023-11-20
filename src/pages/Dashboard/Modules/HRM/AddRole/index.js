import React, { useState } from 'react'
import { HRMsidebarItems } from '../../../../../utils/sideBarItems'
import { Layout } from '../../../../../components/Layout';
import Header from '../../../../../components/Header';

function HRMAddRole() {
    const [state, setState] = useState({
        roleName: "",
        description: ""
    })
    const handleRoleNameChange = (event) => {
        setState({
            ...state,
            roleName: event.target.value
        });
    };

    const handleDescriptionChange = (event) => {
        setState({
            ...state,
            description: event.target.value
        });
    };

    const handleSubmit = () => {
        alert(`You submitted:\n\nroleName: ${state.roleName}\ndescription: ${state.description}`);
    }
    return (
        <Layout module={true} sidebarItems={HRMsidebarItems}>
            <div className='dashboard-content'>
                <Header dashboardLink={"/hrm/dashboard"} addLink1={"/hrm/dashboard"} addLink2={"/hrm/addrole"} title1={"Roles"} title2={"Add Role"} />
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='card-header red-bg' style={{ background: "#666" }}>
                            <h1>Add Role</h1>
                        </div>
                        <div className='card-body'>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Role name * </label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Role name" value={state.roleName} onChange={handleRoleNameChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea placeholder="Description" className="form-control" value={state.description} onChange={handleDescriptionChange}></textarea>
                                        </div>
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button className="btn btn-primary" type="button" onClick={handleSubmit}>Submit</button>
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

export default HRMAddRole
