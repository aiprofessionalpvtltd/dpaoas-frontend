import React from 'react';
import { faEdit, faTrash, faUser, faPrint, faClone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function CustomTable({ data, handleEdit, handleDelete, tableTitle, headerBgColor, hideBtn, addBtnText, handleAdd, handlePrint, handleUser, handleDuplicate, hideUserIcon, headertitlebgColor, headertitletextColor, block, hideEditIcon, seachBarShow }) {
    const keys = data.length > 0 ? Object.keys(data[0]) : [];

    const formatHeader = (key) => {
        // Split camelCase into separate words and join with spaces
        return key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
    };

    const editTooltip = <Tooltip id="edit-tooltip">Edit</Tooltip>;
    const deleteTooltip = <Tooltip id="delete-tooltip">Delete</Tooltip>;
    const vistorTooltip = <Tooltip id="visitor-tooltip">Visitors</Tooltip>;
    const printTooltip = <Tooltip id="print-tooltip">Print</Tooltip>;
    const duplicateTooltip = <Tooltip id="duplicate-tooltip">Duplicate</Tooltip>;

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
                {seachBarShow && seachBarShow && (
                    <div class="input-group float-end" style={{ width: "250px", marginTop: "10px", marginBottom: "15px" }}>
                        <input type="text" class="form-control" placeholder="Search" />
                        <div class="input-group-btn">
                            <button class="btn btn-default" type="submit">
                                <i class="glyphicon glyphicon-search"></i>
                            </button>
                        </div>
                    </div>
                )}

                <table className="table table-striped red-bg-head" style={{ marginTop: "20px", display: block ? "block" : "" }}>
                    <thead>
                        <tr>
                            {keys.map((key, index) => (
                                <th key={index} className="text-center" scope="col" style={{ backgroundColor: headertitlebgColor ? headertitlebgColor : "#FFF", color: headertitletextColor ? headertitletextColor : "#666" }}>
                                    {formatHeader(key)}
                                </th>
                            ))}
                            <th className="text-center" style={{ width: "180px", backgroundColor: headertitlebgColor ? headertitlebgColor : "#FFF", color: headertitletextColor ? headertitletextColor : "#666" }}>Actions</th>
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
                                    {!hideEditIcon && !hideEditIcon && (
                                        <OverlayTrigger placement="top" overlay={editTooltip}>
                                            <button onClick={() => handleEdit(item)} className="btn default btn-xs black" data-id={item.id}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </OverlayTrigger>
                                    )}
                                    <OverlayTrigger placement="top" overlay={deleteTooltip}>
                                        <button onClick={() => handleDelete(item)} className="btn default btn-xs black" data-id={item.id}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </OverlayTrigger>
                                    {hideUserIcon && hideUserIcon && (
                                        <>
                                            <OverlayTrigger placement="top" overlay={vistorTooltip}>
                                                <button onClick={() => handleUser(item)} className="btn default btn-xs black" data-id={item.id}>
                                                    <FontAwesomeIcon icon={faUser} />
                                                </button>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={printTooltip}>

                                                <button onClick={() => handlePrint(item)} className="btn default btn-xs black" data-id={item.id}>
                                                    <FontAwesomeIcon icon={faPrint} />
                                                </button>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={duplicateTooltip}>
                                                <button onClick={() => handleDuplicate(item)} className="btn default btn-xs black" data-id={item.id}>
                                                    <FontAwesomeIcon icon={faClone} />
                                                </button>
                                            </OverlayTrigger>
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