import React, { Component } from "react"
import { Col } from "react-bootstrap"
import DatePicker from "react-datepicker"
import { id } from "date-fns/locale"

export default class FilterByDateRange extends Component {
  render() {
    const { startDate, endDate, onChangeStartDateRange, onChangeEndDateRange } = this.props
    return (
      <>
        <Col xs={8} md={2}>
          Mulai Tanggal
          <DatePicker
            selected={startDate}
            onChange={(date) => onChangeStartDateRange(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={id}
            dateFormat="dd/MM/yy"
          />
        </Col>
        <Col xs={8} md={2}>
          Sampai Tanggal
          <DatePicker
            selected={endDate}
            onChange={(date) => onChangeEndDateRange(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale={id}
            dateFormat="dd/MM/yy"
          />
        </Col>
      </>
    )
  }
}
