import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export const CustomAlert = ({
  showModal,
  handleClose,
  handleOkClick,
  title,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Body className="text-center">
        <FontAwesomeIcon
          icon={faQuestionCircle}
          style={{ fontSize: "38px", color: "#f9bc82" }}
        />
        {title ? (
          <p className="mt-3" style={{ fontSize: "22px" }}>
            {title}
          </p>
        ) : (
          <p className="mt-3" style={{ fontSize: "22px" }}>
            Are you sure you want to proceed?
          </p>
        )}
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button
          variant="primary"
          className="btn-primary"
          style={{ width: "80px", background: "#779ecb", border: "none" }}
          onClick={handleOkClick}
        >
          Yes
        </Button>
        <Button
          variant="secondary"
          className="btn-default"
          style={{
            width: "80px",
            background: "#d85261",
            color: "#FFF",
            border: "none",
          }}
          onClick={handleClose}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
