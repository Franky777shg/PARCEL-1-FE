import React, { Component } from "react"
import { Card, Col, Row, Button } from "react-bootstrap"

export default class CartAddress extends Component {
  render() {
    const { nameRecipient, addressRecipient, handleEditAddress} = this.props
    return (
      <Card className="w-100" style={{ backgroundColor: "#D4DEEB", border: "none" }}>
        <Card.Body>
          <h5 className="fw-bold">Alamat Pengiriman:</h5>
          <Row>
            <Col>Nama Penerima:</Col>
            <Col>{nameRecipient}</Col>
          </Row>
          <Row>
            <Col>Alamat Penerima:</Col>
            <Col>{addressRecipient}</Col>
          </Row>
          <Row xs={2} className="justify-content-center my-2">
            <Button variant="secondary" onClick={handleEditAddress}>
              Ubah Alamat
            </Button>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}
