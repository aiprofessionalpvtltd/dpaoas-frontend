import React, { useEffect, useState } from 'react'
import arrowLeft from "../../../../../assets/arrow.png"
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import Header from '../../../../../components/Header';
import { Layout } from '../../../../../components/Layout';
import { HRMsidebarItems } from '../../../../../utils/sideBarItems';
import CheckPermissionRole from '../../../../../components/checkPermissionRole';
import UnCheckPermissionRole from '../../../../../components/UnCheckPermissionRole';

const permissionsArray = [
    {
        id: "1",
        permission: "Users",
        option: [{ id: 1, label: 'View' }, { id: 2, label: 'Edit' }],
        backgroundColors: "#fb9527"
    },
    {
        id: "2",
        permission: "Role",
        option: [{ id: 1, label: 'View' }, { id: 2, label: 'Create' }],
        backgroundColors: "#fb3157",
    },
];

function HRMEditRole() {
    const [hiddenItems, setHiddenItems] = useState(null);
    const handleHideShow = (id) => {
        setHiddenItems(id);
    };
    const location = useLocation()
    const [allItems, setAllItems] = useState(
        [
            {
                id: "1",
                permission: "Users",
                option: [{ id: 1, label: 'View' }, { id: 2, label: 'Edit' }, { id: 3, label: 'Create' }, { id: 4, label: 'Delete' }],
                backgroundColors: "#fb9527"
            },
            {
                id: "2",
                permission: "Role",
                option: [{ id: 1, label: 'View' }, { id: 2, label: 'Edit' }, { id: 3, label: 'Create' }, { id: 4, label: 'Delete' }],
                backgroundColors: "#fb3157",
            },
        ]
    );
    const [permissionsArray, setPermissionsArray] = useState(
        [
            {
                id: "1",
                permission: "Users",
                option: [{ id: 1, label: 'View' }, { id: 2, label: 'Edit' }],
                backgroundColors: "#fb9527"
            },
            {
                id: "2",
                permission: "Role",
                option: [{ id: 1, label: 'View' }, { id: 3, label: 'Create' }],
                backgroundColors: "#fb3157",
            },
        ]
    );
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (itemId, optionId, permission) => {
        const isChecked = checkedItems.some(
            (item) => item.itemId === itemId && item.optionId === optionId && item.permission === permission
        );

        if (isChecked) {
            // Item is checked, remove it
            setCheckedItems((prevCheckedItems) =>
                prevCheckedItems.filter(
                    (item) => !(item.itemId === itemId && item.optionId === optionId && item.permission === permission)
                )
            );
        } else {
            // Item is not checked, add it
            setCheckedItems((prevCheckedItems) => [
                ...prevCheckedItems,
                { itemId, optionId, permission },
            ]);
        }
    };

    const filteredItems = permissionsArray.length
        ? allItems.map(item => ({
            ...item,
            option: item.option.filter(option =>
                permissionsArray.some(
                    permission =>
                        permission.id !== item.id &&
                        permission.option.some(permOption => permOption.id !== option.id)
                )
            ),
        }))
        : allItems;

    useEffect(() => {
        const initialCheckedItems = permissionsArray.flatMap(permission => (
            permission.option.map(option => ({
                itemId: permission.id,
                optionId: option.id,
                permission: permission.permission,
            }))
        ));

        setCheckedItems(initialCheckedItems);

        console.log(checkedItems);
    }, [permissionsArray]);


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
                                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={location?.state?.name} />
                                    </div>
                                    {checkedItems.map(({ itemId, optionId, permission }) => {
                                        const checkedItem = allItems.find((item) => item.id === itemId)?.option.find((opt) => opt.id === optionId);
                                        return (

                                            <div className="mb-3" key={`${itemId}-${optionId}`}>
                                                <label className="form-label">{permission}</label>
                                                <div id="selected-module-1" className="seleted-module">
                                                    <div className="row">
                                                        <div className="col-md-6 select-fix parent_selector">
                                                            {/* <input type="hidden" name="role_permissions[]" value={option} /> */}
                                                            <div data-id="orange" className="select-op-sm-orangeBG" style={{ borderLeft: `8px solid ${permission.backgroundColors}` }}>
                                                                <input type="checkbox" value="3" className="cls-permission" checked={true} onChange={() => handleCheckboxChange(itemId, optionId, permission)} />{checkedItem?.label}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                    })}

                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-primary" type="button">Submit</button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="permisionbox">
                                        {filteredItems.map(item => (

                                            <div key={item.id}>
                                                <Link className="hideDetailsButton primaryButton2" onClick={() => handleHideShow(item.id)} >
                                                    {item.permission}
                                                    <img id="rotate-icon1" src={arrowLeft} alt='icon' className="rotating-button" />
                                                </Link>
                                                {hiddenItems === item.id && (<div className="main-role">
                                                    <div className="row mb-3">

                                                        {item.option
                                                            .filter(option => !checkedItems.some(
                                                                checkedItem => checkedItem.itemId === item.id && checkedItem.optionId === option.id
                                                            ))
                                                            .map(option => (
                                                                <div className="col-6 mb-3">

                                                                    <div data-id="orange" className="select-op-sm-orangeBG" style={{ borderLeft: `8px solid ` }}>
                                                                        <input type="checkbox" name="role_permissions[]" value={option} className="cls-permission" id="cb-3" data-id="3" data-ajax="1" checked={checkedItems.some(
                                                                            checkedItem => checkedItem.itemId === item.id && checkedItem.optionId === option.id
                                                                        )}
                                                                            onChange={() => handleCheckboxChange(item.id, option.id, item.permission)} />{option?.label}
                                                                    </div>
                                                                </div>
                                                            ))}


                                                    </div>
                                                </div>)}
                                                <br />
                                            </div>
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
