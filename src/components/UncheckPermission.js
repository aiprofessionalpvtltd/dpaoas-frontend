import React from 'react'

function UncheckPermission({ permission, checkedItems, handleCheckboxChange }) {
    return (
        <div className="mb-3" key={permission.permission}>
            <label className="form-label">{permission.permission}</label>
            <div id="selected-module-1" className="seleted-module">
                <div className="row">
                    {permission.option.map(option => (
                        checkedItems.includes(option) && (
                            <div className="col-md-6 select-fix parent_selector">
                                <input type="hidden" name="role_permissions[]" value={option} />
                                <div data-id="orange" className="select-op-sm-orangeBG" style={{ borderLeft: `8px solid ${permission.backgroundColors}` }}>
                                    <input type="checkbox" value="3" className="cls-permission" checked={checkedItems.includes(option)} onChange={() => handleCheckboxChange(option)} />{option}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UncheckPermission