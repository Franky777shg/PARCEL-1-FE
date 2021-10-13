import React, { Component } from "react"
import { Col, Form, Row } from "react-bootstrap"

export default class FillParcelFilter extends Component {
  render() {
    const { currentCategory, fetchParcelProduct, categories } = this.props
    return (
      <Row className="py-3 px-md-5 sticky-top bg-white" style={{ top: 60 }}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Filter Kategori Produk
          </Form.Label>
          <Col xs={8} md={2}>
            <Form.Select
              value={currentCategory}
              onChange={(e) => fetchParcelProduct(e.target.value)}
            >
              {categories.map((category) => {
                return <option value={category.id}>{category.label}</option>
              })}
            </Form.Select>
          </Col>
        </Form.Group>
      </Row>
    )
  }
}
