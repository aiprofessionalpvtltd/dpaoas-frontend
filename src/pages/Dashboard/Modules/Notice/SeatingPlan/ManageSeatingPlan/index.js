import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { getAllSeats, updateSeat } from "../../../../../../api/APIs/Services/SeatingPlan.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";

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

function ManageSeatingPlan() {
  const { members } = useContext(AuthContext);
  const [seats, setSeats] = useState([]);
  const [govseat, setGovSeat] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    name: "",
    seatNo: 0,
    rowNumber: "",
  });

  const openModal = (item) => {
    // Inside a function or event handler
    setSelectedItem({
      id: item?.member?.id,
      name: item?.member?.memberName,
      seatNo: item?.seatNumber,
      rowNumber: item?.rowNumber,
    });
    setIsOpen(true);
  };

  const getAllSeatsApi = async () => {
    try {
      const response = await getAllSeats();
      if (response?.success) {
        setSeats(response?.data?.Opposition);
        setGovSeat(response?.data?.Government);
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSeatsApi();
  }, []);

  const hendleAssiginandUnassigin = async (assigin) => {
    const Data = {
      fkMemberId: assigin ? selectedItem?.id : null,
      rowNumber: selectedItem?.rowNumber,
      assignStatus: assigin ? true : false,
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

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c !important" }}>
            <h1>Add/Edit Seat</h1>
          </div>
          <div class="card-body">
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
                      setSelectedItem({ ...selectedItem, id: e.target.value });
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
            </div>

            <div className="d-flex row justify-content-center align-items-center">
              <div className="col-4" style={{ marginTop: "30px" }}>
                <Button variant="primary" type="submit" style={{ width: 150 }} onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </div>
              <div className="col-4" style={{ marginTop: "30px" }}>
                <Button
                  variant="success"
                  type="submit"
                  style={{ width: 150 }}
                  onClick={() => {
                    hendleAssiginandUnassigin(true);
                    setIsOpen(false);
                  }}
                >
                  Assigin
                </Button>
              </div>
              <div className="col-4" style={{ marginTop: "30px" }}>
                <Button
                  variant="success"
                  type="submit"
                  style={{ width: 150 }}
                  onClick={() => {
                    hendleAssiginandUnassigin(false);
                    setIsOpen(false);
                  }}
                >
                  Un Assigin
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
        <div class="dashboard-content">
          <div class="container-fluid">
            <div class="sitting-plan-main">
              <div class="sitting-row">
                <div>
                  {["F", "E", "D", "C", "B", "A"].map((rowLetter) => (
                    <div className="row">
                      <div className="col" style={{ marginBottom: "80px" }}>
                        {seats &&
                          seats
                            .filter((item) => item.rowNumber === rowLetter)
                            .map((item, index) => (
                              <div
                                className="sitting-card-left float-start"
                                key={index}
                                onClick={() => openModal(item)}
                              >
                                <div className="sitt-card-left">
                                  <img src={require("../../../../../../assets/seat.png")} />
                                  <h2>{item?.member?.memberName}</h2>
                                  <p>{item.seatNumber}</p>
                                </div>
                              </div>
                            ))}
                      </div>
                      <div className="col-1 text-center">
                        <strong style={{ marginTop: "80px", display: "block" }}>{rowLetter}</strong>
                      </div>
                      <div className="col">
                        {govseat &&
                          govseat
                            .filter((item) => item.rowNumber === rowLetter)
                            .map((item, index) => (
                              <div
                                className="sitting-card-right float-start"
                                key={index}
                                onClick={() => openModal(item)}
                              >
                                <div className="sitt-card-right">
                                  <img src={require("../../../../../../assets/seat.png")} />
                                  <h2>{item?.member?.memberName}</h2>
                                  <p>{item?.seatNumber}</p>
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="center-content">
                <h3>CHAIRMAN</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageSeatingPlan;
