import React, { Component } from "react"
import { Col } from "react-bootstrap"
import DatePicker from 'react-datepicker'

export default class FilterByMonth extends Component {
  render() {
    const { startDate, onChangeFilterByMonth} = this.props
    return (
      <Col xs={8} md={2}>
        Bulan
        <DatePicker
          selected={startDate}
          onChange={(date) => onChangeFilterByMonth(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </Col>
    )
  }
}
