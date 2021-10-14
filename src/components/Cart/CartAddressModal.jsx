import React, { Component } from "react"
import { Form, Modal, Button } from "react-bootstrap"

export default class CartAddressModal extends Component {
  onSave = () => {
    const { handleSaveAddress } = this.props
    const name = this.refs.name.value
    const address = this.refs.address.value

    handleSaveAddress(name, address)
  }

  render() {
    const { showModalAddress, handleCloseModalAddress, nameRecipient, addressRecipient } =
      this.props
    return (
      <Modal show={showModalAddress} onHide={handleCloseModalAddress}>
        <Modal.Header closeButton>
          <Modal.Title>Ubah Alamat Pengiriman</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nama Penerima</Form.Label>
            <Form.Control placeholder="Nama Penerima" defaultValue={nameRecipient} ref="name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Alamat Penerima</Form.Label>
            <Form.Control as="textarea" rows={3} defaultValue={addressRecipient} ref="address" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#7792A8", border: "none" }}
            onClick={handleCloseModalAddress}
          >
            Batalkan
          </Button>
          <Button style={{ backgroundColor: "#8F9B85", border: "none" }} onClick={this.onSave}>
            Simpan Alamat
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
