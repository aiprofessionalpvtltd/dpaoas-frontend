import React,{useState} from "react";
import seatImage from "../../../../../../assets/seat.png"; 
import { Modal, Button, Form } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const seats = [
    { id: 1, number: 1, rowNumber: 'A' },
    { id: 2, number: 2, rowNumber: 'A' },
    { id: 3, number: 3, rowNumber: 'A' },
    { id: 4, number: 4, rowNumber: 'A' },
    { id: 5, number: 5, rowNumber: 'A' },
    { id: 6, number: 6, rowNumber: 'A' },
    { id: 7, number: 7, rowNumber: 'A' },
    { id: 8, number: 8, rowNumber: 'A' },
    { id: 9, number: 9, rowNumber: 'A' },
    { id: 10, number: 10, rowNumber: 'A' },
    { id: 21, number: 21, rowNumber: 'B' },
    { id: 22, number: 22, rowNumber: 'B' },
    { id: 23, number: 23, rowNumber: 'B' },
    { id: 24, number: 24, rowNumber: 'B' },
    { id: 25, number: 25, rowNumber: 'B' },
    { id: 26, number: 26, rowNumber: 'B' },
    { id: 27, number: 27, rowNumber: 'B' },
    { id: 28, number: 28, rowNumber: 'B' },
    { id: 29, number: 29, rowNumber: 'B' },
    { id: 30, number: 30, rowNumber: 'B' },
    { id: 41, number: 41, rowNumber: 'C' },
    { id: 42, number: 42, rowNumber: 'C' },
    { id: 43, number: 43, rowNumber: 'C' },
    { id: 44, number: 44, rowNumber: 'C' },
    { id: 45, number: 45, rowNumber: 'C' },
    { id: 46, number: 46, rowNumber: 'C' },
    { id: 47, number: 47, rowNumber: 'C' },
    { id: 48, number: 48, rowNumber: 'C' },
    { id: 49, number: 49, rowNumber: 'C' },
    { id: 50, number: 50, rowNumber: 'C' },
    // Corrected row number from 40 to 50
  ];
  
  const oppositionseats = [
    { id: 11, number: 11, rowNumber: 'A' },
    { id: 12, number: 12, rowNumber: 'A' },
    { id: 13, number: 13, rowNumber: 'A' },
    { id: 14, number: 14, rowNumber: 'A' },
    { id: 15, number: 15, rowNumber: 'A' },
    { id: 16, number: 16, rowNumber: 'A' },
    { id: 17, number: 17, rowNumber: 'A' },
    { id: 18, number: 18, rowNumber: 'A' },
    { id: 19, number: 19, rowNumber: 'A' },
    { id: 20, number: 20, rowNumber: 'A' },
    { id: 31, number: 31, rowNumber: 'B' },
    { id: 32, number: 32, rowNumber: 'B' },
    { id: 33, number: 33, rowNumber: 'B' },
    { id: 34, number: 34, rowNumber: 'B' },
    { id: 35, number: 35, rowNumber: 'B' },
    { id: 36, number: 36, rowNumber: 'B' },
    { id: 37, number: 37, rowNumber: 'B' },
    { id: 38, number: 38, rowNumber: 'B' },
    { id: 39, number: 39, rowNumber: 'B' },
    { id: 40, number: 40, rowNumber: 'B' },
    { id: 51, number: 51, rowNumber: 'C' },
    { id: 52, number: 52, rowNumber: 'C' },
    { id: 53, number: 53, rowNumber: 'C' },
    { id: 54, number: 54, rowNumber: 'C' },
    { id: 55, number: 55, rowNumber: 'C' },
    { id: 56, number: 56, rowNumber: 'C' },
    { id: 57, number: 57, rowNumber: 'C' },
    { id: 58, number: 58, rowNumber: 'C' },
    { id: 59, number: 59, rowNumber: 'C' },
    { id: 60, number: 60, rowNumber: 'C' },
    // Corrected row number from 50 to 60
  ];






const TestingSeatingPlan = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [seatData, setSeatData] = useState([...seats, ...oppositionseats]);
  
    const handleSeatClick = (seat) => {
      setSelectedSeat(seat);
      setShowModal(true);
    };
  
    const handleSaveName = (event) => {
      event.preventDefault();
      const name = event.target.elements.name.value;
  
      setSeatData((prevData) =>
        prevData.map((seat) =>
          seat.id === selectedSeat.id ? { ...seat, memberName: name } : seat
        )
      );
  
      setShowModal(false);
    };
  
    const renderSeats = (seats, isOpposition = false) => {
        return seats.map((seat) => (
          <div
            className={`sitting-card-${isOpposition ? 'left' : 'right'} float-${isOpposition ? 'start' : 'end'}`}
            key={seat.id}
            onClick={() => handleSeatClick(seat)}
            style={{ cursor: "pointer" }}
          >
             <div style={{borderRadius:"5px", border:"1px solid", background:"red"}}>
            <div className={`sitt-card-${isOpposition ? 'left' : 'right'}`}>
               
              {/* <img src={seatImage} alt="Seat" /> */}
              <h2>{seat.memberName}</h2>
              </div>
              <p>{seat.number}</p>
            </div>
          </div>
        ));
      };
      
      return (
        <div>
          {["F", "E", "D", "C", "B", "A"].map((rowLetter) => (
            <div className="row" key={rowLetter}>
              <div className="col" style={{ marginBottom: "80px", display: 'flex', flexDirection: 'row-reverse' }}>
                {renderSeats(
                  seatData.filter(seat => seat.rowNumber === rowLetter && oppositionseats.some(os => os.id === seat.id)),
                  true
                )}
              </div>
              <div className="col" style={{ marginBottom: "80px" }}>
                {renderSeats(
                  seatData.filter(seat => seat.rowNumber === rowLetter && seats.some(s => s.id === seat.id))
                )}
              </div>
            </div>
          ))}
      
          {selectedSeat && (
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Seat {selectedSeat.number}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSaveName}>
                  <Form.Group controlId="formName">
                    <Form.Label>Enter Member Name</Form.Label>
                    <Form.Control type="text" name="name" defaultValue={selectedSeat.memberName} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          )}
        </div>
      );
      
  };
  
  export default TestingSeatingPlan;


