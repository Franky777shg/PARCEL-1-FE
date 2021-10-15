import React, { Component } from "react"
import { Col, Row } from "react-bootstrap"
import NumberFormat from "react-number-format"

export default class TransactionPrice extends Component {
  render() {
    const { order_price } = this.props
    return (
      <Col xs={12} md={4}>
        <Row>
          <Col>
            <h3>Total Belanja: </h3>
            <h3>
              <NumberFormat
                value={order_price}
                prefix="Rp. "
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
              />
            </h3>
          </Col>
        </Row>
      </Col>
    )
  }
}
