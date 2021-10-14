import React, { Component } from "react"
import { Modal, Button } from "react-bootstrap"

export default class CartErrorModal extends Component {
  render() {
    const { showErrorModal, handleCloseModal, modalMessage } = this.props
    return (
      <Modal show={showErrorModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Gagal menambahkan parsel ke dalam keranjang!
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
