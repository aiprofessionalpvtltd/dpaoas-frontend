import React from 'react'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CustomTable({ headingArr, itemsArr, handleEdit, handleDelete, tableTitle, headerBgColor, hideBtn, handleAdd }) {
    return (
        <div class="dash-detail-container" style={{ marginTop: "20px" }}>
            <div class="dash-card">
                <div class="dash-card-header" style={{ background: headerBgColor ? headerBgColor : "rgb(20, 174, 92)" }}>
                    <h2 class="float-start mt-2">{tableTitle}</h2>
                    {!hideBtn && (
                        <button class="btn btn-primary float-end" type="button" onClick={handleAdd}>Add Leave</button>
                    )}
                    <div class="clearfix"></div>
                </div>
                <table class="table table-striped red-bg-head">
                    <thead>
                        <tr>
                            {headingArr && headingArr.map((item) => (
                                <th class="text-center" scope="col" style={{ backgroundColor: "#FFF", color: "#666" }}>{item.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {itemsArr && itemsArr.map((item) => (

                            <tr>
                                <td class="text-center">{item.name}</td>
                                <td class="text-center">{item.leaveType}</td>
                                <td class="text-center"><span>{item.startDate}</span> - <span>{item.endDate}</span></td>
                                <td class="text-center">{item.days}</td>
                                <td class="text-center">{item.reason}</td>
                                <td class="text-center">{item.leaveStatus}</td>
                                <td class="text-center">{item.submittedTo}</td>
                                <td class="text-center">
                                    <button onClick={handleEdit} class="btn default btn-xs black" data-id="2"><FontAwesomeIcon icon={faEdit} /></button>
                                    <button onClick={handleDelete} class="btn default btn-xs black" data-id="2"><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default CustomTable
