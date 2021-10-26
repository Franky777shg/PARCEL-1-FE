import React, { Component } from "react"
import { Col, Form } from "react-bootstrap"

export default class FilterInput extends Component {
  render() {
    const { filterStatus, onChangeFilterStatus } = this.props
    return (
      <Col xs={8} md={4}>
        <Form.Select
          className="mb-2"
          value={filterStatus}
          onChange={(e) => onChangeFilterStatus(+e.target.value)}
        >
          <option value="">Filter Penghasilan</option>
          <option value="1">Berdasarkan Tanggal</option>
          <option value="2">Berdasarkan Bulan</option>
          <option value="3">Berdasarkan Rentang Tanggal</option>
        </Form.Select>
      </Col>
    )
  }
}
