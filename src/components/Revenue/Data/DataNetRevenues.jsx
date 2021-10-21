import React, { Component } from "react"
import { Col } from "react-bootstrap"
import NumberFormat from "react-number-format"

export default class DataNetRevenues extends Component {
  render() {
    const { totalNetRevenues } = this.props
    return (
      <Col xs={12} md={4}>
        <h3>Jumlah Penghasilan Bersih</h3>
        <p className="lead">
          <NumberFormat
            value={totalNetRevenues}
            prefix="Rp. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </p>
      </Col>
    )
  }
}
