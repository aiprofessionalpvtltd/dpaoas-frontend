import React from 'react';
import { faEdit, faTrash, faUser, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CustomTable({ data, handleEdit, handleDelete, tableTitle, headerBgColor, hideBtn, addBtnText, handleAdd, handlePrint, handleUser, hideUserIcon, headertitlebgColor, headertitletextColor }) {
    const keys = data.length > 0 ? Object.keys(data[0]) : [];

    const formatHeader = (key) => {
        // Split camelCase into separate words and join with spaces
        return key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
    };

    return (
        <div className="dash-detail-container" style={{ marginTop: "20px" }}>
            <div className="dash-card">
                <div className="dash-card-header" style={{ background: headerBgColor ? headerBgColor : "rgb(20, 174, 92)" }}>
                    <h2 className="float-start mt-2">{tableTitle}</h2>
                    {!hideBtn && (
                        <button className="btn btn-primary float-end" type="button" onClick={handleAdd}>
                            {addBtnText}
                        </button>
                    )}
                    <div className="clearfix"></div>
                </div>
                <table className="table table-striped red-bg-head" style={{ marginTop: "20px" }}>
                    <thead>
                        <tr>
                            {keys.map((key, index) => (
                                <th key={index} className="text-center" scope="col" style={{ backgroundColor: headertitlebgColor ? headertitlebgColor : "#FFF", color: headertitletextColor ? headertitletextColor : "#666" }}>
                                    {formatHeader(key)}
                                </th>
                            ))}
                            <th className="text-center" style={{ backgroundColor: headertitlebgColor ? headertitlebgColor : "#FFF", color: headertitletextColor ? headertitletextColor : "#666" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {keys.map((key, colIndex) => (
                                    // <td key={colIndex} className="text-center">
                                    //     {item[key]}
                                    // </td>
                                    <td class="text-center">
                                        {item[key] === "Active" || item[key] === "InActive" ? (
                                            <span class={`label label-sm ${item[key] === 'Active' ? 'label-success' : 'label-danger'}`}>{item[key]}</span>
                                        ) : <span>{item[key]}</span>
                                        }
                                    </td>
                                ))}
                                <td className="text-center">
                                    <button onClick={() => handleEdit(item)} className="btn default btn-xs black" data-id={item.id}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => handleDelete(item)} className="btn default btn-xs black" data-id={item.id}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    {hideUserIcon && hideUserIcon && (
                                        <>
                                            <button onClick={() => handleUser(item)} className="btn default btn-xs black" data-id={item.id}>
                                                <FontAwesomeIcon icon={faUser} />
                                            </button>
                                            <button onClick={() => handlePrint(item)} className="btn default btn-xs black" data-id={item.id}>
                                                <FontAwesomeIcon icon={faPrint} />
                                            </button>
                                        </>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomTable;