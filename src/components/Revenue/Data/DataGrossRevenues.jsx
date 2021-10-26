import React, { Component } from "react"
import { Col } from "react-bootstrap"
import NumberFormat from "react-number-format"

export default class DataGrossRevenues extends Component {
  render() {
    const { totalGrossRevenues } = this.props
    return (
      <Col xs={12} md={4}>
        <h3>Jumlah Penghasilan Kotor</h3>
        <p className="lead">
          <NumberFormat
            value={totalGrossRevenues}
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
