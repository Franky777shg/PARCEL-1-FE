import { format } from "date-fns"
import React, { Component } from "react"
import { Badge, Col, Row } from "react-bootstrap"

export default class TransactionHead extends Component {
  render() {
    const { order_date, idorder_status, order_status, order_number, getBadgeColor } = this.props
    return (
      <Row className="d-flex align-items-center mb-3">
        <Col xs={12} md={2} className="lead">
          {format(new Date(order_date), "dd MMMM yyyy")}
        </Col>
        <Col xs={12} md={6} className="border-end border-3">
          <Badge bg={getBadgeColor(idorder_status)}>{order_status}</Badge>
        </Col>
        <Col>No Pesanan: #{order_number}</Col>
      </Row>
    )
  }
}
