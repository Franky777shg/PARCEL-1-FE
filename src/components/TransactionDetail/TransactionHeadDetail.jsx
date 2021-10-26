import { format } from "date-fns"
import React, { Component } from "react"
import { Badge, Col } from "react-bootstrap"

export default class TransactionHeadDetail extends Component {
  getBadgeColor = (id) => {
    switch (id) {
      case 2:
        return "warning"
      case 3:
        return "primary"
      case 4:
        return "success"
      case 5:
        return "danger"
      default:
        return "primary"
    }
  }

  render() {
    const { order_date, idorder_status, order_status } = this.props
    return (
      <>
        <Col xs={12} md={2} className="lead">
          {format(new Date(order_date), "dd MMMM yyyy")}
        </Col>
        <Col xs={12} md={6} className="border-end border-3"></Col>
        <Col xs={12} md={4}>
          <Badge bg={this.getBadgeColor(idorder_status)}>{order_status}</Badge>
        </Col>
      </>
    )
  }
}
