import React from 'react'
import { Layout } from '../../../../../components/Layout'
import Header from '../../../../../components/Header'
import { useNavigate } from 'react-router-dom';
import { HRMsidebarItems } from '../../../../../utils/sideBarItems';

const Data = [
    {
        id: "1",
        name: "Admin",
        status: "Active"
    },
    {
        id: "2",
        name: "Editor",
        status: "InActive"
    },
    {
        id: "3",
        name: "Manager",
        status: "Active"
    },
    {
        id: "4",
        name: "Employee",
        status: "Active"
    }
]

function HRMDesignation() {
    const navigate = useNavigate()

    const handleEditClick = (name) => {
        navigate("/hrm/addeditdesignation", { state: name })
    };
    return (
        <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/hrm/designation"} addLink1={"/hrm/designation"} title1={"Designation"} />
            <div className='container-fluid'>
                <div class='card'>
                    <div class="card-header red-bg" style={{ background: "#f3f3f3" }}>
                        <h1 class="float-start">Designation List</h1>
                        <button class="btn btn-primary float-end" type="button" onClick={() => navigate('/hrm/addeditdesignation')}>Add Designation</button>
                        <div class="clearfix"></div>
                    </div>
                    <div class='card-body'>
                        <div class="container-fluid">
                            <div class="row">
                                <table class="table table-striped red-bg-head">
                                    <thead>
                                        <tr>
                                            <th class="text-center" scope="col">Name</th>
                                            <th class="text-center" scope="col">Staus</th>
                                            <th class="text-center" scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Data.map(item => (
                                            <tr>
                                                <td class="text-center">{item.name}</td>
                                                <td class="text-center"><span class={`label label-sm ${item.status === 'Active' ? 'label-success' : 'label-danger'}`}>{item.status}</span></td>
                                                <td class="text-center">
                                                    <button onClick={() => handleEditClick(item.name)} class="btn default btn-xs black" data-id="2"><i class="fas fa-edit"></i> Edit</button>
                                                    <a href="/" class="btn default btn-xs black" data-id="2"><i class="fas fa-trash"></i> Suspended</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default HRMDesignation
