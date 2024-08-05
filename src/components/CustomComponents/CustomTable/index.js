import React, { useEffect, useState } from "react";
import {
  faEdit,
  faTrash,
  faUser,
  faPrint,
  faClone,
  faCheck,
  faFileExport,
  faEye,
  faUserCheck,
  faCirclePlus,
  faTrashArrowUp,
  faListCheck,
  faPaperPlane,
  faFile,
  faBacon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function CustomTable({
  hendleAttendance,
  showAttendance,
  hendleAssigned,
  showAssigned,
  showResolve,
  hendleResolve,
  handleList,
  data,
  handleEdit,
  handleView,
  showView,
  handleDelete,
  handlePageChange,
  tableTitle,
  headerBgColor,
  hideBtn,
  addBtnText,
  addBtnText2,
  showPrint,
  handleAdd,
  handleAdd2,
  handlePrint,
  handleUser,
  handleDuplicate,
  hideUserIcon,
  headertitlebgColor,
  headertitletextColor,
  block,
  hideEditIcon,
  seachBarShow,
  currentPage,
  pageSize,
  headerShown,
  searchonchange,
  ActionHide,
  totalCount,
  hidePagination,
  assignBtn,
  assignClick,
  hideDeleteIcon,
  singleDataCard,
  showEditIcon,
  showRecoverIcon,
  showListIcon,
  handleRecover,
  hidebtn1,
  showCreateBtn,
  hendleCreateBtn,
  isCheckbox,
  isChecked,
  setIsChecked,
  handleSent,
  showSent,
  showDocs,
  hendleDocs,
  showBallot,
  hendleBallot,
  iscolumnCheckbox,
  setIsColumnCheckBox,
  isColumncheck,
}) {
  const keys = data?.length > 0 ? Object.keys(data[0]) : [];
  const filteredKeys = keys?.filter((key) => {
    if (
      key === "internalAttachment" &&
      data.some((obj) => Array.isArray(obj[key]))
    ) {
      return false; // Skip filtering if it's an array in any object
    }
    return key !== "internalAttachment" && key !== "internalId" && key !== "isEditable" && key !== "attachmentInternal" && key !=="billFrom" && key !=="billCategory";
  });

  const [totalPages, setTotalPages] = useState(0);

  const formatHeader = (key) => {
    // Split camelCase into separate words and join with spaces
    return key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
  };

  // useEffect(() => {
  //   setTotalPages(Math.max(1, Math.ceil((totalCount ? totalCount : data?.length) / pageSize)));
  // }, [data?.length, pageSize]);

  useEffect(() => {
    setTotalPages((prevTotalPages) =>
      Math.max(
        1,
        Math.ceil((totalCount ? totalCount : data?.length) / pageSize)
      )
    );
  }, [data?.length, pageSize, totalCount]);

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = data?.slice(startIndex, endIndex);

  const editTooltip = <Tooltip id="edit-tooltip">Edit</Tooltip>;
  const sendTooltip = <Tooltip id="edit-tooltip">Send</Tooltip>;
  const viewTooltip = <Tooltip id="edit-tooltip">View</Tooltip>;
  const deleteTooltip = <Tooltip id="delete-tooltip">Delete</Tooltip>;
  const vistorTooltip = <Tooltip id="visitor-tooltip">Visitors</Tooltip>;
  const printTooltip = <Tooltip id="print-tooltip">Print</Tooltip>;
  const duplicateTooltip = <Tooltip id="duplicate-tooltip">Duplicate</Tooltip>;
  const resolveTooltip = <Tooltip id="print-tooltip">Complete</Tooltip>;
  const assignedTooltip = <Tooltip id="print-tooltip">Assign</Tooltip>;
  const createTooltip = <Tooltip id="create-tooltip">Create Case</Tooltip>;
  const attendanceTooltip = (
    <Tooltip id="attendance-tooltip">Mark Attendance </Tooltip>
  );
  const restoreTooltip = <Tooltip id="restore-tooltip">Recover</Tooltip>;
  const listTooltip = <Tooltip id="list-tooltip">List</Tooltip>;
  const attachDocs = <Tooltip id="docs-tooltip">Attach Docs</Tooltip>;
  const ballotList = <Tooltip id="docs-tooltip">Ballot</Tooltip>;

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null; // Hide pagination if totalPages is 1 or less
    }

    const getPages = () => {
      const pages = [];
      if (totalPages <= 5) {
        for (let i = 0; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 2) {
          pages.push(0, 1, 2, 3, -1, totalPages - 1); // Show first 4 pages, dots, and last page
        } else if (currentPage >= totalPages - 3) {
          pages.push(
            0,
            -1,
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1
          ); // Show first page, dots, and last 4 pages
        } else {
          pages.push(
            0,
            -1,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            -1,
            totalPages - 1
          ); // Show first page, dots, current page, adjacent pages, dots, and last page
        }
      }
      return pages;
    };

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage <= 0 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 0}
            >
              Previous
            </button>
          </li>
          {getPages().map((page, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === page ? "active" : ""} ${
                page === -1 ? "disabled" : ""
              }`}
            >
              {page === -1 ? (
                <span className="page-link">...</span>
              ) : (
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                >
                  {page + 1}
                </button>
              )}
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage >= totalPages - 1 ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="container-fluid">
      <div className={`${singleDataCard ? "card" : ""}`}>
        <div className="dash-card">
          {!headerShown && !headerShown && (
            <div className="dash-card-header">
              <h2 style={{ color: "#666" }} className="float-start mt-2">
                {tableTitle}
              </h2>
              {!hideBtn && (
                <>
                  {handleAdd2 && (
                    <button
                      style={{
                        background: "#1b84ff",
                        border: "#1b84ff solid 1px",
                      }}
                      className="btn btn-primary float-end ms-2"
                      type="button"
                      onClick={handleAdd2}
                    >
                      {addBtnText2}
                    </button>
                  )}
                </>
              )}
              {!hidebtn1 && (
                <button
                  className="btn btn-primary float-end"
                  type="button"
                  onClick={handleAdd}
                >
                  {addBtnText}
                </button>
              )}
              <div className="clearfix"></div>
            </div>
          )}
          {seachBarShow && seachBarShow && (
            <div
              className="input-group float-end"
              style={{
                width: "250px",
                marginTop: "10px",
                marginBottom: "15px",
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={searchonchange}
              />
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          )}

          {data?.length <= 0 && (
            // <div
            //   style={{
            //     textAlign: "center",
            //     marginTop: "30px",
            //     fontSize: "20px",
            //   }}
            // >
            //   No data found :(
            // </div>
            <div
              class="alert alert-danger mt-5"
              role="alert"
              style={{ width: "350px", margin: "0 auto", textAlign: "center" }}
            >
              No Record Found
            </div>
          )}
          <table
            className="table table-responsive red-bg-head"
            style={{ marginTop: "20px", display: block ? "block" : "" }}
          >
            <thead>
              <tr>
                {/* <th>slsl</th> */}
                {isCheckbox && (
                  <th
                    className="text-center"
                    scope="col"
                    style={{
                      backgroundColor: "#FFF",
                      color: "rgb(171, 178, 196)",
                    }}
                  >
                    Select
                  </th>
                )}
                {filteredKeys?.map((key, index) => (
                  <th
                    key={index}
                    className="text-center"
                    scope="col"
                    style={{
                      backgroundColor: "#FFF",
                      color: "rgb(171, 178, 196)",
                    }}
                  >
                    {formatHeader(key)}
                    {key != "Status" && isColumncheck && (
                      <td className="text-center">
                        {/* {isChecked.includes(key) ? isChecked.indexOf(key) + 1 : ''} */}
                        <input
                          type="checkbox"
                          checked={iscolumnCheckbox.includes(key)} // Check if item.internalId is in the array of selected IDs
                          onChange={() => {
                            // Toggle the selection of the current item
                            const updatedChecked = iscolumnCheckbox.includes(
                              key
                            )
                              ? iscolumnCheckbox.filter((id) => id !== key) // If already selected, remove it from the array
                              : [...iscolumnCheckbox, key]; // If not selected, add it to the array
                            setIsColumnCheckBox(updatedChecked);
                          }}
                        />
                      </td>
                    )}
                  </th>
                ))}
                {data?.length > 0 && !ActionHide && (
                  <th
                    className="text-center"
                    style={{
                      width: "180px",
                      backgroundColor: "#FFF",
                      color: "rgb(171, 178, 196)",
                    }}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {totalCount || hidePagination
                ? data?.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {isCheckbox && (
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={isChecked.includes(item.internalId)} // Check if item.internalId is in the array of selected IDs
                            onChange={() => {
                              // Toggle the selection of the current item
                              const updatedChecked = isChecked.includes(
                                item.internalId
                              )
                                ? isChecked.filter(
                                    (id) => id !== item.internalId
                                  ) // If already selected, remove it from the array
                                : [...isChecked, item.internalId]; // If not selected, add it to the array
                              setIsChecked(updatedChecked);
                            }}
                          />
                        </td>
                      )}

                      {filteredKeys?.map((key, colIndex) => (
                        // <td key={colIndex} className="text-center">
                        //     {item[key]}
                        // </td>
                        <td className="text-center">
                          {item[key] === "active" ||
                          item[key] === "inactive" ||
                          item[key] === "complete" ||
                          item[key] === "closed" ||
                          item[key] === "in-progress" ||
                          item[key] === "pending" ||
                          item[key] === "approved"
                           ? (
                            <span
                              className={`label label-sm ${
                                item[key] === "active" ||
                                item[key] === "complete"
                                  ? "label-success"
                                  : item[key] === "pending"
                                    ? "label-pending"
                                    : item[key] === "closed"
                                      ? "label-close" : 
                                      item[key] === "closed" 
                                      ? "label-close"
                                      : item[key] === "in-progress"
                                        ? "label-inprogress"
                                        : "label-danger"
                              }`}
                            >
                              {item[key]}
                            </span>
                          ) : item[key] === "Total Motions" ||
                            item[key] === "Total Resolution" ? (
                            <span style={{ fontWeight: "bold" }}>
                              {item[key]}
                            </span>
                          ) : typeof item[key] === "string" &&
                            item[key].split(" ").length > 5 ? (
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="see-tooltip">
                                  <span>{item[key]}</span>
                                </Tooltip>
                              }
                            >
                              <span className="truncated-text">
                                {item[key]}
                              </span>
                            </OverlayTrigger>
                          ) : (
                            <span>{item[key]}</span>
                          )}
                        </td>
                      ))}
                      {!ActionHide && (
                        <td className="text-center">
                          {!hideEditIcon && !hideEditIcon && (
                            <>
                              {showView && handleView && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={viewTooltip}
                                >
                                  <button
                                    onClick={() => handleView(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "#2dce89" }}
                                  >
                                    <FontAwesomeIcon icon={faEye} />
                                  </button>
                                </OverlayTrigger>
                              )}
                              {item?.attachmentInternal && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={viewTooltip}
                                >
                                  <button
                                    onClick={() => handleView(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "#2dce89" }}
                                  >
                                    <FontAwesomeIcon icon={faEye} />
                                  </button>
                                </OverlayTrigger>
                              )}

                              {showAttendance && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={attendanceTooltip}
                                >
                                  <button
                                    onClick={() => hendleAttendance(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "#007bff" }}
                                  >
                                    <FontAwesomeIcon icon={faUserCheck} />
                                  </button>
                                </OverlayTrigger>
                              )}

                              {showPrint && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={printTooltip}
                                >
                                  <button
                                    onClick={() => handlePrint(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                  >
                                    <FontAwesomeIcon icon={faPrint} />
                                  </button>
                                </OverlayTrigger>
                              )}

                              {showCreateBtn && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={createTooltip}
                                >
                                  <button
                                    onClick={() => hendleCreateBtn(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "darkblue" }}
                                  >
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                  </button>
                                </OverlayTrigger>
                              )}

                              {showAssigned && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={assignedTooltip}
                                >
                                  <button
                                    onClick={() => hendleAssigned(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "#007bff" }}
                                  >
                                    <FontAwesomeIcon icon={faFileExport} />
                                  </button>
                                </OverlayTrigger>
                              )}
                              {item?.isEditable && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={editTooltip}
                                >
                                  <button
                                    onClick={() => handleEdit(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "blue" }}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                </OverlayTrigger>
                              )}
                              {showSent && showSent && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={sendTooltip}
                                >
                                  <button
                                    onClick={() => handleSent(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "green" }}
                                  >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                  </button>
                                </OverlayTrigger>
                              )}
                              {!showEditIcon && !showEditIcon && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={editTooltip}
                                >
                                  <button
                                    onClick={() => handleEdit(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "#007bff" }}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                </OverlayTrigger>
                              )}

                              {!hideDeleteIcon && !hideDeleteIcon && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={deleteTooltip}
                                >
                                  <button
                                    onClick={() => handleDelete(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "#fb6340" }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </OverlayTrigger>
                              )}
                            </>
                          )}
                          {hideUserIcon && hideUserIcon && (
                            <>
                              <OverlayTrigger
                                placement="top"
                                overlay={vistorTooltip}
                              >
                                <button
                                  onClick={() => handleUser(item)}
                                  className="btn-xs black circle-btn"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faUser} />
                                </button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="top"
                                overlay={printTooltip}
                              >
                                <button
                                  onClick={() => handlePrint(item)}
                                  className="btn-xs black circle-btn"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faPrint} />
                                </button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="top"
                                overlay={duplicateTooltip}
                              >
                                <button
                                  onClick={() => handleDuplicate(item)}
                                  className="btn-xs black circle-btn"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faClone} />
                                </button>
                              </OverlayTrigger>
                            </>
                          )}
                          {showResolve && (
                            <OverlayTrigger
                              placement="top"
                              overlay={resolveTooltip}
                            >
                              <button
                                onClick={() => hendleResolve(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                                style={{ color: "green" }}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                            </OverlayTrigger>
                          )}

                          {showRecoverIcon && showRecoverIcon && (
                            <OverlayTrigger
                              placement="top"
                              overlay={restoreTooltip}
                            >
                              <button
                                onClick={() => handleRecover(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faTrashArrowUp} />
                              </button>
                            </OverlayTrigger>
                          )}

                          {showListIcon && showListIcon && (
                            <OverlayTrigger
                              placement="top"
                              overlay={listTooltip}
                            >
                              <button
                                onClick={() => handleList(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faListCheck} />
                              </button>
                            </OverlayTrigger>
                          )}

                          {showDocs && (
                            <OverlayTrigger
                              placement="top"
                              overlay={attachDocs}
                            >
                              <button
                                onClick={() => hendleDocs(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faFile} />
                              </button>
                            </OverlayTrigger>
                          )}
                          {showBallot && (
                            <OverlayTrigger
                              placement="top"
                              overlay={ballotList}
                            >
                              <button
                                onClick={() => hendleBallot(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faBacon} />
                              </button>
                            </OverlayTrigger>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                : displayedData?.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {isCheckbox && (
                        <td className="text-center">
                          {isChecked.includes(item.internalId)
                            ? isChecked.indexOf(item.internalId) + 1
                            : ""}
                          <input
                            type="checkbox"
                            checked={isChecked.includes(item.internalId)} // Check if item.internalId is in the array of selected IDs
                            onChange={() => {
                              // Toggle the selection of the current item
                              const updatedChecked = isChecked.includes(
                                item.internalId
                              )
                                ? isChecked.filter(
                                    (id) => id !== item.internalId
                                  ) // If already selected, remove it from the array
                                : [...isChecked, item.internalId]; // If not selected, add it to the array
                              setIsChecked(updatedChecked);
                            }}
                          />
                        </td>
                      )}

                      {filteredKeys?.map((key, colIndex) => (
                        // <td key={colIndex} className="text-center">
                        //     {item[key]}
                        // </td>
                        <td className="text-center">
                          {item[key] === "active" ||
                          item[key] === "inactive" ? (
                            <span
                              className={`label label-sm ${
                                item[key] === "active"
                                  ? "label-success"
                                  : "label-danger"
                              }`}
                            >
                              {item[key]}
                            </span>
                          ) : typeof item[key] === "string" &&
                            item[key].split(" ").length > 5 ? (
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="see-tooltip">
                                  <span>{item[key]}</span>
                                </Tooltip>
                              }
                            >
                              <span className="truncated-text">
                                {item[key]}
                              </span>
                            </OverlayTrigger>
                          ) : (
                            <span>{item[key]}</span>
                          )}
                        </td>
                      ))}
                      {!ActionHide && (
                        <td className="text-center">
                          {!hideEditIcon && !hideEditIcon && (
                            <>
                              {showSent && showSent && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={sendTooltip}
                                >
                                  <button
                                    onClick={() => handleSent(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "green" }}
                                  >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                  </button>
                                </OverlayTrigger>
                              )}
                              {item?.isEditable && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={editTooltip}
                                >
                                  <button
                                    onClick={() => handleEdit(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                </OverlayTrigger>
                              )}
                              {!showEditIcon && !showEditIcon && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={editTooltip}
                                >
                                  <button
                                    onClick={() => handleEdit(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "#007bff" }}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                </OverlayTrigger>
                              )}
                              {showView && handleView && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={viewTooltip}
                                >
                                  <button
                                    onClick={() => handleView(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "#2dce89" }}
                                  >
                                    <FontAwesomeIcon icon={faEye} />
                                  </button>
                                </OverlayTrigger>
                              )}

                              {!hideDeleteIcon && !hideDeleteIcon && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={deleteTooltip}
                                >
                                  <button
                                    onClick={() => handleDelete(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ color: "#fb6340" }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </OverlayTrigger>
                              )}
                            </>
                          )}
                          {assignBtn && (
                            <>
                              <button
                                class="btn btn-primary"
                                type="submit"
                                onClick={assignClick}
                                style={{
                                  padding: "3px 8px",
                                  fontSize: "13px",
                                }}
                              >
                                Assign
                              </button>
                            </>
                          )}

                          {hideUserIcon && hideUserIcon && (
                            <>
                              <OverlayTrigger
                                placement="top"
                                overlay={vistorTooltip}
                              >
                                <button
                                  onClick={() => handleUser(item)}
                                  className="btn-xs black circle-btn"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faUser} />
                                </button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="top"
                                overlay={printTooltip}
                              >
                                <button
                                  onClick={() => handlePrint(item)}
                                  className="btn-xs black circle-btn"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faPrint} />
                                </button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="top"
                                overlay={duplicateTooltip}
                              >
                                <button
                                  onClick={() => handleDuplicate(item)}
                                  className="btn-xs black circle-btn"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faClone} />
                                </button>
                              </OverlayTrigger>
                            </>
                          )}
                          {showAttendance && (
                            <OverlayTrigger
                              placement="top"
                              overlay={attendanceTooltip}
                            >
                              <button
                                onClick={() => hendleAttendance(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                                style={{ color: "#007bff" }}
                              >
                                <FontAwesomeIcon icon={faUserCheck} />
                              </button>
                            </OverlayTrigger>
                          )}
                          {showPrint && (
                            <OverlayTrigger
                              placement="top"
                              overlay={printTooltip}
                            >
                              <button
                                onClick={() => handlePrint(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faPrint} />
                              </button>
                            </OverlayTrigger>
                          )}
                          {showResolve && (
                            <OverlayTrigger
                              placement="top"
                              overlay={resolveTooltip}
                            >
                              <button
                                onClick={() => hendleResolve(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                                style={{ color: "green" }}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                            </OverlayTrigger>
                          )}
                          {showRecoverIcon && showRecoverIcon && (
                            <OverlayTrigger
                              placement="top"
                              overlay={restoreTooltip}
                            >
                              <button
                                onClick={() => handleRecover(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faTrashArrowUp} />
                              </button>
                            </OverlayTrigger>
                          )}

                          {showListIcon && showListIcon && (
                            <OverlayTrigger
                              placement="top"
                              overlay={listTooltip}
                            >
                              <button
                                onClick={() => handleList(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faListCheck} />
                              </button>
                            </OverlayTrigger>
                          )}
                          {showDocs && (
                            <OverlayTrigger
                              placement="top"
                              overlay={attachDocs}
                            >
                              <button
                                onClick={() => hendleDocs(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faFile} />
                              </button>
                            </OverlayTrigger>
                          )}
                          {showBallot && (
                            <OverlayTrigger
                              placement="top"
                              overlay={ballotList}
                            >
                              <button
                                onClick={() => hendleBallot(item)}
                                className="btn-xs black circle-btn"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faBacon} />
                              </button>
                            </OverlayTrigger>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {hidePagination
          ? null
          : data?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {renderPagination()}
              </div>
            )}
      </div>
    </div>
  );
}

export default CustomTable;
