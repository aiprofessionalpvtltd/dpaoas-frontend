import React, { useState } from 'react'
import arrowLeft from "../assets/arrow.png"
import { Link } from 'react-router-dom';

function CheckPermission({ permission, checkedItems, handleCheckboxChange }) {
    const [hiddenItems, setHiddenItems] = useState(true);
    const handleHideShow = () => {
        setHiddenItems((prevHiddenItems) => !prevHiddenItems);
    };
    return (
        <div key={permission.permission}>
            <Link className="hideDetailsButton primaryButton2" onClick={handleHideShow} style={{ background: permission.backgroundColors }}>
                {permission.permission}
                <img id="rotate-icon1" src={arrowLeft} alt='icon' className="rotating-button" />
            </Link>
            {!hiddenItems && (<div className="main-role">
                <div className="row mb-3">
                    {permission.option.map(option => (
                        !checkedItems.includes(option) && (
                            <div className="col-6 mb-3">
                                <input type="hidden" name="role_permissions[]" value="1" />
                                <div data-id="orange" className="select-op-sm-orangeBG" style={{borderLeft:`8px solid ${permission?.backgroundColors}`}}>
                                    <input type="checkbox" name="role_permissions[]" value={option} className="cls-permission" id="cb-3" data-id="3" data-ajax="1" checked={checkedItems.includes(option)}
                                        onChange={() => handleCheckboxChange(option)} />{option}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>)}
            <br />
        </div>
    )
}

export default CheckPermission