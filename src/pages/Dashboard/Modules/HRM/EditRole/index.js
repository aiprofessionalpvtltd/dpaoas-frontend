import React, { useState } from 'react'

import { useLocation } from 'react-router-dom';
import Header from '../../../../../components/Header';
import UncheckPermission from '../../../../../components/UncheckPermission';
import CheckPermission from '../../../../../components/CheckPermission';
import { Layout } from '../../../../../components/Layout';
import { HRMsidebarItems } from '../../../../../utils/sideBarItems';

const permissionsArray = [
    {
        id: "1",
        permission: "Users",
        option: ['Optin 1', 'Option 2', 'Option 3'],
        backgroundColors: "#fb9527"
    },
    {
        id: "2",
        permission: "Role",
        option: ['Option 4', 'sys 5', 'Option 6'],
        backgroundColors: "#fb3157",
    },
];

function HRMEditRole() {
    const location = useLocation()
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (value) => {
        if (checkedItems.includes(value)) {
            console.log("options", value);
            // If the checkbox is already checked, uncheck it

            setCheckedItems(checkedItems.filter(item => item !== value));
        } else {
            // If the checkbox is unchecked, check it
            console.log("Value", value);
            setCheckedItems([...checkedItems, value]);
        }
    };
    return (
        <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
                <Header dashboardLink={"/hrm/dashboard"} addLink1={"/hrm/dashboard"} addLink2={"/hrm/editrole"} title1={"Roles"} title2={"Edit Role"} />
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='card-header red-bg' style={{ background: "#666" }}>
                            <h1>Edit Role</h1>
                        </div>
                        <div className='card-body pb-5'>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Role name * </label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={location.state} />
                                        </div>
                                        {permissionsArray.map(permission => (
                                            <UncheckPermission permission={permission} checkedItems={checkedItems} handleCheckboxChange={handleCheckboxChange} key={permission.id} />
                                        ))}

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button className="btn btn-primary" type="button">Submit</button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="permisionbox">
                                            {permissionsArray.map(permission => (
                                                <CheckPermission permission={permission} checkedItems={checkedItems} handleCheckboxChange={handleCheckboxChange} key={permission.id} />
                                            ))}

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

export default HRMEditRole
