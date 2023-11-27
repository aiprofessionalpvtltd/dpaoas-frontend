import { Modal, Button } from 'react-bootstrap';

export const CustomAlert = ({ showModal, handleClose, handleOkClick }) => {
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Body className="text-center">
                <p>Are you sure you want to proceed?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleOkClick}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};