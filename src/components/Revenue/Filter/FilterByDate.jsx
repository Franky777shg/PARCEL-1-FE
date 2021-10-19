import { id } from "date-fns/locale"
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
          locale={id}
          dateFormat="dd MMMM yyyy"
          selected={startDate}
          onChange={(date) =>
            onChangeFilterByDate(date)
          }
        />
      </Col>
    )
  }
}
