import React, { useState } from 'react'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { HRMsidebarItems } from '../../../../../../utils/sideBarItems';

function HRMAddDepartment() {
    const [state, setState] = useState({
        departmentName: "",
        description: ""
    })
    const handledepartmentNameChange = (event) => {
        setState({
            ...state,
            departmentName: event.target.value
        });
    };

    const handleDescriptionChange = (event) => {
        setState({
            ...state,
            description: event.target.value
        });
    };

    const handleSubmit = () => {
        alert(`You submitted:\n\ndepartmentName: ${state.departmentName}\ndescription: ${state.description}`);
    }
    return (
        <Layout module={true} sidebarItems={HRMsidebarItems}>
            <div className='dashboard-content'>
                <Header dashboardLink={"/hrm/department"} addLink1={"/hrm/department"} title1={"Department"} addLink2={"/hrm/addepartment"} title2={"Add Department"} />
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='card-header red-bg' style={{ background: "#666" }}>
                            <h1>Add Department</h1>
                        </div>
                        <div className='card-body'>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Department name * </label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Department name" value={state.departmentName} onChange={handledepartmentNameChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea placeholder="Description" className="form-control" value={state.description} onChange={handleDescriptionChange}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Staus</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Status" />
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

export default HRMAddDepartment
