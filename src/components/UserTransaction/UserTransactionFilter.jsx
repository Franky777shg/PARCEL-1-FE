import React, { Component } from "react"
import { Col, Form, Row, Button } from "react-bootstrap"

export default class UserTransactionFilter extends Component {
  getButtonColor = (id) => {
    const { statusActive } = this.props
    if (id === statusActive) {
      return "#8F9B85"
    } else {
      return "#7792A8"
    }
  }
  render() {
    const { handleFilter, orderStatus } = this.props
    return (
      <>
        <div className="mt-3 py-3 px-md-5 bg-white rounded d-none d-md-block">
          <div className="d-flex align-items-center justify-content-around">
            <h5 className="fw-bold mb-0">Status Transaksi : </h5>
            <Button
              style={{ backgroundColor: this.getButtonColor(0), border: "none" }}
              onClick={() => handleFilter(0)}
            >
              All Status
            </Button>
            {orderStatus.map((filterButton) => {
              const { idorder_status, order_status } = filterButton
              return (
                <Button
                  style={{ backgroundColor: this.getButtonColor(idorder_status), border: "none" }}
                  onClick={() => handleFilter(idorder_status)}
                >
                  {order_status}
                </Button>
              )
            })}

            <Button
              variant="link"
              style={{ color: this.getButtonColor(0) }}
              onClick={() => handleFilter(0)}
            >
              Reset Filter
            </Button>
          </div>
        </div>
        <Row className="py-3 px-md-5 bg-white d-block d-md-none">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Filter Status Pesanan
            </Form.Label>
            <Col xs={8} md={2}>
              <Form.Select onChange={(e) => handleFilter(+e.target.value)}>
                <option value={0}>All Status</option>
                {orderStatus.map((filterButton) => {
                  const { idorder_status, order_status } = filterButton
                  return <option value={idorder_status}>{order_status}</option>
                })}
              </Form.Select>
            </Col>
          </Form.Group>
        </Row>
      </>
    )
  }
}
