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
  hidebtn1,
}) {
  const keys = data?.length > 0 ? Object.keys(data[0]) : [];
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
  const viewTooltip = <Tooltip id="edit-tooltip">View</Tooltip>;
  const deleteTooltip = <Tooltip id="delete-tooltip">Delete</Tooltip>;
  const vistorTooltip = <Tooltip id="visitor-tooltip">Visitors</Tooltip>;
  const printTooltip = <Tooltip id="print-tooltip">Print</Tooltip>;
  const duplicateTooltip = <Tooltip id="duplicate-tooltip">Duplicate</Tooltip>;
  const resolveTooltip = <Tooltip id="print-tooltip">Resolve</Tooltip>;
  const assignedTooltip = <Tooltip id="print-tooltip">Assigne</Tooltip>;
  const attendanceTooltip = <Tooltip id="attendance-tooltip">Mark </Tooltip>;

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null; // Hide pagination if totalPages is 1 or less
    }
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
          {Array.from({ length: totalPages })?.map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
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
            <div
              className="dash-card-header"
              style={{
                background: headerBgColor ? headerBgColor : "rgb(20, 174, 92)",
              }}
            >
              <h2 className="float-start mt-2">{tableTitle}</h2>
              {!hideBtn && (
                <>
                  {handleAdd2 && (
                    <button
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
            className="table table-striped table-responsive red-bg-head"
            style={{ marginTop: "20px", display: block ? "block" : "" }}
          >
            <thead>
              <tr>
                {keys?.map((key, index) => (
                  <th
                    key={index}
                    className="text-center"
                    scope="col"
                    style={{
                      backgroundColor: headertitlebgColor
                        ? headertitlebgColor
                        : "#FFF",
                      color: headertitletextColor
                        ? headertitletextColor
                        : "#666",
                    }}
                  >
                    {formatHeader(key)}
                  </th>
                ))}
                {data?.length > 0 && !ActionHide && (
                  <th
                    className="text-center"
                    style={{
                      width: "180px",
                      backgroundColor: headertitlebgColor
                        ? headertitlebgColor
                        : "#FFF",
                      color: headertitletextColor
                        ? headertitletextColor
                        : "#666",
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
                      {keys?.map((key, colIndex) => (
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
                                    style={{ background: "#2dce89" }}
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
                                    style={{ background: "#007bff" }}
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

                              {showAssigned && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={assignedTooltip}
                                >
                                  <button
                                    onClick={() => hendleAssigned(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ backgroundColor: "green" }}
                                  >
                                    <FontAwesomeIcon icon={faFileExport} />
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
                                    style={{ background: "#fb6340" }}
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
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                            </OverlayTrigger>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                : displayedData?.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {keys?.map((key, colIndex) => (
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
                          ) : (
                            <span>{item[key]}</span>
                          )}
                        </td>
                      ))}
                      {!ActionHide && (
                        <td className="text-center">
                          {!hideEditIcon && !hideEditIcon && (
                            <>
                              {!showEditIcon && !showEditIcon && (
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
                              {showView && handleView && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={viewTooltip}
                                >
                                  <button
                                    onClick={() => handleView(item)}
                                    className="btn-xs black circle-btn"
                                    data-id={item.id}
                                    style={{ background: "#2dce89" }}
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
                                    style={{ background: "#fb6340" }}
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
                              >
                                <FontAwesomeIcon icon={faCheck} />
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
