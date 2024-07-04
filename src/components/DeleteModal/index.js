import React from 'react'
import { Modal } from 'react-bootstrap';

export const DeleteModal = ({ isOpen, toggleModal, title, children }) => {
    return (
      <Modal show={isOpen} onHide={toggleModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    );
  };