import React, { useEffect, useState } from "react";
import { faEdit, faTrash, faUser, faPrint, faClone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function CustomTable({
  data,
  handleEdit,
  handleDelete,
  handlePageChange,
  tableTitle,
  headerBgColor,
  hideBtn,
  addBtnText,
  showPrint,
  handleAdd,
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
}) {
  const keys = data?.length > 0 ? Object.keys(data[0]) : [];
  const [totalPages, setTotalPages] = useState(0);

  const formatHeader = (key) => {
    // Split camelCase into separate words and join with spaces
    return key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
  };

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil((totalCount ? totalCount : data?.length) / pageSize)));
  }, [data?.length, pageSize]);

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = data?.slice(startIndex, endIndex);

  const editTooltip = <Tooltip id="edit-tooltip">Edit</Tooltip>;
  const deleteTooltip = <Tooltip id="delete-tooltip">Delete</Tooltip>;
  const vistorTooltip = <Tooltip id="visitor-tooltip">Visitors</Tooltip>;
  const printTooltip = <Tooltip id="print-tooltip">Print</Tooltip>;
  const duplicateTooltip = <Tooltip id="duplicate-tooltip">Duplicate</Tooltip>;

  const renderPagination = () => (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage <= 0 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 0}>
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index ? "active" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(index)}>
              {index + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage >= totalPages - 1 ? "disabled" : ""}`}>
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

  return (
    <div className="container-fluid">
      <div className="dash-detail-container">
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
                <button className="btn btn-primary float-end" type="button" onClick={handleAdd}>
                  {addBtnText}
                </button>
              )}
              <div className="clearfix"></div>
            </div>
          )}
          {seachBarShow && seachBarShow && (
            <div className="input-group float-end" style={{ width: "250px", marginTop: "10px", marginBottom: "15px" }}>
              <input type="text" className="form-control" placeholder="Search" onChange={searchonchange} />
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          )}

          {data.length <= 0 && (
            <div style={{ textAlign: "center", marginTop: "30px", fontSize: "20px" }}>No data found :(</div>
          )}
          <table
            className="table table-striped red-bg-head"
            style={{ marginTop: "20px", display: block ? "block" : "" }}
          >
            <thead>
              <tr>
                {keys.map((key, index) => (
                  <th
                    key={index}
                    className="text-center"
                    scope="col"
                    style={{
                      backgroundColor: headertitlebgColor ? headertitlebgColor : "#FFF",
                      color: headertitletextColor ? headertitletextColor : "#666",
                    }}
                  >
                    {formatHeader(key)}
                  </th>
                ))}
                {data.length > 0 && !ActionHide && (
                  <th
                    className="text-center"
                    style={{
                      width: "180px",
                      backgroundColor: headertitlebgColor ? headertitlebgColor : "#FFF",
                      color: headertitletextColor ? headertitletextColor : "#666",
                    }}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {totalCount || hidePagination
                ? data.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {keys.map((key, colIndex) => (
                        // <td key={colIndex} className="text-center">
                        //     {item[key]}
                        // </td>
                        <td className="text-center">
                          {item[key] === "active" || item[key] === "inactive" ? (
                            <span
                              className={`label label-sm ${item[key] === "active" ? "label-success" : "label-danger"}`}
                            >
                              {item[key]}
                            </span>
                          ) : (
                            <span>{item[key]}</span>
                          )}
                        </td>
                      ))}
                      <td className="text-center">
                        {!hideEditIcon && !hideEditIcon && (
                          <>
                            <OverlayTrigger placement="top" overlay={editTooltip}>
                              <button
                                onClick={() => handleEdit(item)}
                                className="btn default btn-xs black"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={deleteTooltip}>
                              <button
                                onClick={() => handleDelete(item)}
                                className="btn default btn-xs black"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </OverlayTrigger>
                          </>
                        )}
                        {hideUserIcon && hideUserIcon && (
                          <>
                            <OverlayTrigger placement="top" overlay={vistorTooltip}>
                              <button
                                onClick={() => handleUser(item)}
                                className="btn default btn-xs black"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faUser} />
                              </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={printTooltip}>
                              <button
                                onClick={() => handlePrint(item)}
                                className="btn default btn-xs black"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faPrint} />
                              </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={duplicateTooltip}>
                              <button
                                onClick={() => handleDuplicate(item)}
                                className="btn default btn-xs black"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faClone} />
                              </button>
                            </OverlayTrigger>
                          </>
                        )}
                        {showPrint && (
                          <OverlayTrigger placement="top" overlay={printTooltip}>
                            <button
                              onClick={() => handlePrint(item)}
                              className="btn default btn-xs black"
                              data-id={item.id}
                            >
                              <FontAwesomeIcon icon={faPrint} />
                            </button>
                          </OverlayTrigger>
                        )}
                      </td>
                    </tr>
                  ))
                : displayedData.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {keys.map((key, colIndex) => (
                        // <td key={colIndex} className="text-center">
                        //     {item[key]}
                        // </td>
                        <td className="text-center">
                          {item[key] === "active" || item[key] === "inactive" ? (
                            <span
                              className={`label label-sm ${item[key] === "active" ? "label-success" : "label-danger"}`}
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
                              <OverlayTrigger placement="top" overlay={editTooltip}>
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="btn default btn-xs black"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </OverlayTrigger>
                              <OverlayTrigger placement="top" overlay={deleteTooltip}>
                                <button
                                  onClick={() => handleDelete(item)}
                                  className="btn default btn-xs black"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </OverlayTrigger>
                            </>
                          )}
                          {hideUserIcon && hideUserIcon && (
                            <>
                              <OverlayTrigger placement="top" overlay={vistorTooltip}>
                                <button
                                  onClick={() => handleUser(item)}
                                  className="btn default btn-xs black"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faUser} />
                                </button>
                              </OverlayTrigger>
                              <OverlayTrigger placement="top" overlay={printTooltip}>
                                <button
                                  onClick={() => handlePrint(item)}
                                  className="btn default btn-xs black"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faPrint} />
                                </button>
                              </OverlayTrigger>
                              <OverlayTrigger placement="top" overlay={duplicateTooltip}>
                                <button
                                  onClick={() => handleDuplicate(item)}
                                  className="btn default btn-xs black"
                                  data-id={item.id}
                                >
                                  <FontAwesomeIcon icon={faClone} />
                                </button>
                              </OverlayTrigger>
                            </>
                          )}
                          {showPrint && (
                            <OverlayTrigger placement="top" overlay={printTooltip}>
                              <button
                                onClick={() => handlePrint(item)}
                                className="btn default btn-xs black"
                                data-id={item.id}
                              >
                                <FontAwesomeIcon icon={faPrint} />
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
          : data.length > 0 && (
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
