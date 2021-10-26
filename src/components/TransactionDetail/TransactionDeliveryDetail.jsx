import React, { Component } from "react"
import { Card, Col, Row } from "react-bootstrap"

export default class TransactionDeliveryDetail extends Component {
  render() {
    const { recipient_address, recipient_name } = this.props
    return (
      <>
        <h2 className="fw-bold">Detail Pengiriman</h2>
        <Card className="mx-0" style={{ width: "100%" }}>
          <Card.Body>
            <Row className="d-flex g-3 mb-3">
              <Col>
                <Row>
                  <Col xs={4}>Nama Penerima:</Col>
                  <Col>{recipient_name}</Col>
                </Row>
                <Row>
                  <Col xs={4}>Alamat Penerima:</Col>
                  <Col>{recipient_address}</Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    )
  }
}
