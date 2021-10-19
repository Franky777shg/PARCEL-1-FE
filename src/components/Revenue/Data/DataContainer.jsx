import React, { Component } from "react"
import { Row } from "react-bootstrap"

export default class DataContainer extends Component {
  render() {
    const { children } = this.props
    return (
      <Row className="p-2 bg-white">{children}</Row>
    )
  }
}
