import React, { Component } from "react"
import { Col, Row } from "react-bootstrap"

export default class ParcelRevenueContainer extends Component {
  render() {
    const { children } = this.props
    return (
      <Row className="p-3 mb-3 bg-white">
        <Col>{children}</Col>
      </Row>
    )
  }
}
