import React, { Component } from "react"
import { Card, Col, Form, Row, Button } from "react-bootstrap"

const PRODUCT_IMG_URL = "https://api-parcel-1.purwadhikafs2.com/uploads/products"

export default class FillParcelProduct extends Component {
  getProductQty = (idproduct) => {
    const qty = +this.refs[`product-${idproduct}`].value
    return qty
  }

  handleChangeQty = (value, idProduct, idCategory) => {
    const { calculateMaxQty } = this.props
    const max = calculateMaxQty(idCategory).value
    if (value > max) {
      return (this.refs[`product-${idProduct}`].value = max)
    } else if (value === "" || value === 0) {
      return (this.refs[`product-${idProduct}`].value = 1)
    } else {
      this.refs[`product-${idProduct}`].value = value
    }
  }

  render() {
    const { parcelProducts, calculateMaxQty, onAddParcel } = this.props
    return (
      <Row className="py-3 px-md-5">
        {parcelProducts.map((product) => {
          return (
            <Col xs={12} md={3} key={product.idproduct}>
              <div className="bg-white border my-2 d-flex flex-column" style={{ minHeight: 650 }}>
                <Card.Img variant="top" src={`${PRODUCT_IMG_URL}/${product.product_image}`} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{product.product_name}</Card.Title>
                  <Card.Text>{product.product_desc}</Card.Text>
                  {product.product_stock < 1 ? (
                    <Row>
                      <Card.Text className="text-danger">Out Of Stock</Card.Text>
                    </Row>
                  ) : (
                    <Row>
                      <Card.Text>Stock: {product.product_stock} Pcs</Card.Text>
                      <Col xs={4}>
                        <Form.Control
                          id={product.idproduct}
                          type="number"
                          placeholder="Qty"
                          defaultValue="1"
                          min="1"
                          max={calculateMaxQty(product.idproduct_category).value}
                          disabled={
                            calculateMaxQty(product.idproduct_category).percent === 100 && true
                          }
                          onChange={(e) =>
                            this.handleChangeQty(
                              e.target.value,
                              product.idproduct,
                              product.idproduct_category
                            )
                          }
                          ref={`product-${product.idproduct}`}
                        />
                      </Col>
                      <Col>
                        <Button
                          style={{ backgroundColor: "#8F9B85", border: "none" }}
                          disabled={
                            calculateMaxQty(product.idproduct_category).percent === 100 && true
                          }
                          onClick={() =>
                            onAddParcel(product, this.getProductQty(product.idproduct))
                          }
                        >
                          Tambah ke parsel
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Card.Body>
              </div>
            </Col>
          )
        })}
      </Row>
    )
  }
}
