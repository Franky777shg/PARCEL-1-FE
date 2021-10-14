import React, { Component } from "react"
import { Modal, Button } from "react-bootstrap"

export default class UploadPaymentModal extends Component {
  render() {
    const { showModal, handleCloseModal, modalMessage } = this.props
    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Pembayaran Berhasil!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
