import React, { Component } from "react"
import { Row } from "react-bootstrap"

export default class FilterContainer extends Component {
  render() {
    const { children } = this.props
    return <Row className="my-4 p-2 g-3 bg-white d-flex align-items-center">{children}</Row>
  }
}
