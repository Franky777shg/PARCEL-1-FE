import React, { Component } from "react"
import { Col } from "react-bootstrap"
import NumberFormat from "react-number-format"

export default class DataProductCapital extends Component {
  render() {
    const { totalProductCapital } = this.props
    return (
      <Col>
        <h3>Jumlah Modal</h3>
        <p className="lead">
          <NumberFormat
            value={totalProductCapital}
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
