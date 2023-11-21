import React from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CustomTable({ data, handleEdit, handleDelete, tableTitle, headerBgColor, hideBtn, addBtnText, handleAdd }) {
    const keys = data.length > 0 ? Object.keys(data[0]) : [];

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
                <table className="table table-striped red-bg-head">
                    <thead>
                        <tr>
                            {keys.map((key, index) => (
                                <th key={index} className="text-center" scope="col" style={{ backgroundColor: "#FFF", color: "#666" }}>
                                    {key}
                                </th>
                            ))}
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {keys.map((key, colIndex) => (
                                    <td key={colIndex} className="text-center">
                                        {item[key]}
                                    </td>
                                ))}
                                <td className="text-center">
                                    <button onClick={() => handleEdit(item)} className="btn default btn-xs black" data-id={item.id}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => handleDelete(item)} className="btn default btn-xs black" data-id={item.id}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
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