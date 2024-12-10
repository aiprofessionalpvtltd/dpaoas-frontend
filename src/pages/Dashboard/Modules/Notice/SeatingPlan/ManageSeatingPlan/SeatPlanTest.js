import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import {
  getAllSeats,
  updateSeat,
  swapSeats,
  placeSeat,
} from "../../../../../../api/APIs/Services/SeatingPlan.service"; // Import swapSeats API function
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const colorInfo = [
  { color: "red", text: "Opposition" },
  { color: "green", text: "Treasury" },
  { color: "orange", text: "Minister" },
  { color: "gray", text: "Request" },
  { color: "blue", text: "Independent" }, // added yellow for completeness
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%", // Adjust the width as needed, for example '80%'
  },
};

const Seat = ({ item, onDrop, side, onClick }) => {
  const getColorByGovernmentType = (governmentType) => {
    switch (governmentType) {
      case "Government":
        return "green";
      case "Opposition":
        return "red";
      case "Independent":
        return "blue";
      case "Request":
        return "gray";
      case "Minister":
        return "orange";
      default:
        return "white";
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "seat",
    item: { item, side },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "seat",
    drop: (draggedItem) => onDrop(draggedItem.item, item, draggedItem.side),
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={`sitting-card-${side} float-start`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={onClick}
    >
      <div
        className={`sitt-card-${side}`}
        style={{
          borderRadius: "5px",
          border: "1px solid",
          background:
            item?.isRequest === true
              ? "gray"
              : item?.member?.isMinister === true
                ? "orange"
                : item?.member?.governmentType
                  ? getColorByGovernmentType(item?.member?.governmentType)
                  : "white",
          cursor: "pointer",
        }}
      >
        <h2>{item?.member?.memberName || ""}</h2>

        <p style={{ color: item?.member ? "white" : "black" }}>
          {item?.seatNumber}
        </p>
      </div>
    </div>
  );
};

function ManageSeatingPlan() {
  const { members } = useContext(AuthContext);
  const [seats, setSeats] = useState([]);
  const [govseat, setGovSeat] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    name: "",
    seatNo: 0,
    rowNumber: "",
    isRequested: false,
  });

  const [fromItem, setFromItem] = useState(null);
  const [toItem, setToItem] = useState(null);

  useEffect(() => {
    getAllSeatsApi();
  }, []);

  const getAllSeatsApi = async () => {
    try {
      const response = await getAllSeats();
      if (response?.success) {
        setSeats(response?.data?.Opposition);
        setGovSeat(response?.data?.Government);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (item) => {
    setSelectedItem({
      id: item?.member?.id,
      name: item?.member?.memberName,
      seatNo: item?.seatNumber,
      rowNumber: item?.rowNumber,
      isRequested: item?.isRequested,
    });
    setIsOpen(true);
  };

  const openConfirmationModal = (from, to) => {
    setFromItem(from);
    setToItem(to);
    setConfirmationModalIsOpen(true);
  };

  const handleAssignAndUnassign = async (assign) => {
    const Data = {
      fkMemberId: assign ? selectedItem?.id : null,
      rowNumber: selectedItem?.rowNumber,
      assignStatus: assign ? true : false,
      isRequest: selectedItem?.isRequested,
    };

    try {
      const response = await updateSeat(selectedItem.seatNo, Data);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllSeatsApi();
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const moveSeat = (fromItem, toItem) => {
    openConfirmationModal(fromItem, toItem);
  };

  const handleMove = async () => {
    const placeData = {
      seatNumber1: fromItem,
      seatNumber2: toItem,
    };
    try {
      const response = await placeSeat(placeData);
      if (response?.success) {
        getAllSeatsApi();
        showSuccessMessage(
          `Placed member: ${fromItem.member?.memberName} to seat ${toItem.seatNumber}`
        );
      }
    } catch (error) {
      showErrorMessage(
        error?.response?.data?.message || "Error placing member."
      );
    }
    setConfirmationModalIsOpen(false);
  };

  const handleSwap = async () => {
    const swapData = {
      seatNumber1: fromItem.seatNumber,
      seatNumber2: toItem.seatNumber,
    };
    try {
      const response = await swapSeats(swapData);
      if (response?.success) {
        getAllSeatsApi();
        showSuccessMessage(
          `Swapped seats: ${fromItem.member?.memberName} <-> ${toItem.member?.memberName}`
        );
      }
    } catch (error) {
      showErrorMessage(
        error?.response?.data?.message || "Error swapping seats."
      );
    }
    setConfirmationModalIsOpen(false);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="card">
            <div
              className="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Add/Edit Seat</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-8">
                  <div className="mb-3">
                    <label className="form-label">Seat No</label>
                    <input
                      type="text"
                      className={`form-control`}
                      id="seatNo"
                      placeholder={selectedItem?.seatNo}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div>
                    <label className="form-label">Member Name</label>
                    <select
                      className="form-select"
                      value={selectedItem?.id || ""}
                      onChange={(e) => {
                        setSelectedItem({
                          ...selectedItem,
                          id: e.target.value,
                        });
                      }}
                    >
                      <option value={""} disabled hidden>
                        Select
                      </option>
                      {members &&
                        members.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item?.memberName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-check" style={{ marginTop: "40px" }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isRequested"
                      checked={selectedItem?.isRequested}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          isRequested: e.target.checked,
                        })
                      }
                    />
                    <label className="form-check-label" htmlFor="isRequested">
                      Is Requested
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex row justify-content-center align-items-center">
                <div className="col-4" style={{ marginTop: "30px" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: 150 }}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="col-4" style={{ marginTop: "30px" }}>
                  <Button
                    variant="success"
                    type="submit"
                    style={{ width: 150 }}
                    onClick={() => {
                      handleAssignAndUnassign(true);
                      setIsOpen(false);
                    }}
                  >
                    Assign
                  </Button>
                </div>
                <div className="col-4" style={{ marginTop: "30px" }}>
                  <Button
                    variant="success"
                    type="submit"
                    style={{ width: 150 }}
                    onClick={() => {
                      handleAssignAndUnassign(false);
                      setIsOpen(false);
                    }}
                  >
                    Unassign
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <ToastContainer />
        <div
          style={{
            overflowY: "auto",
            maxHeight: "100%",
            background: "#F0F2F5",
          }}
        >
          <div className="dashboard-content">
            <div className="container-fluid">
              <div className="sitting-plan-main" style={{ marginTop: "60px" }}>
                <div className="sitting-row">
                  <div>
                    {["F", "E", "D", "C", "B", "A"].map((rowLetter) => (
                      <div className="row" key={rowLetter}>
                        <div
                          className="col"
                          style={{ marginBottom: "10px", rotate: "-10deg" }}
                        >
                          {seats &&
                            seats
                              .filter((item) => item.rowNumber === rowLetter)
                              .map((item, index) => (
                                <Seat
                                  key={index}
                                  item={item}
                                  onDrop={moveSeat}
                                  side="left"
                                  onClick={() => openModal(item)}
                                />
                              ))}
                        </div>
                        <div className="col-1 text-center">
                          <strong
                            style={{ marginTop: "35px", display: "block" }}
                          >
                            {rowLetter}
                          </strong>
                        </div>
                        <div className="col" style={{ rotate: "10deg" }}>
                          {govseat &&
                            govseat
                              .filter((item) => item.rowNumber === rowLetter)
                              .map((item, index) => (
                                <Seat
                                  key={index}
                                  item={item}
                                  onDrop={moveSeat}
                                  side="right"
                                  onClick={() => openModal(item)}
                                />
                              ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="center-content mt-2">
                  <h3 style={{ paddingTop: "5px" }}>1</h3>
                  <h3 style={{ paddingTop: "5px" }}>CHAIRMAN</h3>
                </div>
              </div>
            </div>
          </div>
          <div
            className="container  d-flex flex-column"
            style={{ minHeight: "400px", marginRight: "70px" }}
          >
            {/* <div className="flex-grow-1"></div> */}
            <div className="row justify-content-end mb-4">
              <div className="col-auto">
                <table className="table">
                  <tbody>
                    {colorInfo.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            backgroundColor: item.color,
                            width: "150px",
                          }}
                        ></td>
                        <td style={{ width: "250px" }}>{item.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* </Modal> */}

        <Modal
          isOpen={confirmationModalIsOpen}
          onRequestClose={() => setConfirmationModalIsOpen(false)}
          style={customStyles}
          contentLabel="Confirm Move Modal"
        >
          <div className="card">
            <div
              className="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>Confirm Action</h1>
            </div>
            <div className="card-body">
              <div className="d-flex row justify-content-center align-items-center">
                <h3>Select Assign Seat Way</h3>

                <div className="col-4" style={{ marginTop: "30px" }}>
                  <Button
                    variant="success"
                    style={{ width: 150 }}
                    onClick={handleMove}
                  >
                    Move
                  </Button>
                </div>
                <div className="col-4" style={{ marginTop: "30px" }}>
                  <Button
                    variant="success"
                    style={{ width: 150 }}
                    onClick={handleSwap}
                  >
                    Swap
                  </Button>
                </div>
                <div className="col-4" style={{ marginTop: "30px" }}>
                  <Button
                    variant="primary"
                    style={{ width: 150 }}
                    onClick={() => setConfirmationModalIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </DndProvider>
    </>
  );
}

export default ManageSeatingPlan;
