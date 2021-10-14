import React, { Component } from "react"
import { Modal, Button } from "react-bootstrap"

export default class FillParcelModal extends Component {
  render() {
    const { showModal, handleCloseModal, modalMessage } = this.props
    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Gagal menambahkan parsel ke dalam keranjang!
          {modalMessage}
          Silahkan isi kembali parcel!
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
