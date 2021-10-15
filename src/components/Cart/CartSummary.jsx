import React, { Component } from "react"
import { Card, Col, Row } from "react-bootstrap"
import NumberFormat from "react-number-format"

export default class CartSummary extends Component {
  render() {
    const { orderPrice } = this.props
    return (
      <Card className="w-100" style={{ backgroundColor: "#EEE2B2", border: "none" }}>
        <Card.Body>
          <h5 className="fw-bold">Ringkasan Pesanan:</h5>
          <Row>
            <Col>Total Harga Pesanan:</Col>
            <Col>
              <NumberFormat
                value={orderPrice}
                prefix="Rp. "
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}
