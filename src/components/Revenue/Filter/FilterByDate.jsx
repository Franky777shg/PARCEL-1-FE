import React, { Component } from "react"
import { Col } from "react-bootstrap"
import DatePicker from 'react-datepicker'

export default class FilterByDate extends Component {
  render() {
    const { startDate, onChangeFilterByDate } = this.props
    return (
      <Col xs={8} md={2}>
        Tanggal
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={(date) =>
            onChangeFilterByDate(date)
          }
        />
      </Col>
    )
  }
}
