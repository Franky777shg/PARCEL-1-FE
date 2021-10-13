import React, { Component } from "react"
import { Accordion, Card, Col, Form, Row, Table } from "react-bootstrap"
import NumberFormat from "react-number-format"

export default class CartItem extends Component {
  render() {
    const { cartItems, handleChange } = this.props

    return (
      <Col xs={{ span: 12, order: 2 }} md={{ span: 8, order: 1 }}>
        {cartItems.map((cartItem) => {
          const { parcelData, parcelDetail } = cartItem
          const {
            idCartItem,
            parcelName,
            parcelPrice,
            qtyParcel,
            totalPrice,
            parcelNo,
            idParcel,
            idOrder,
          } = parcelData
          return (
            <Card style={{ width: "100%" }} key={idCartItem}>
              <Card.Body>
                <Row className="d-flex align-items-center mb-3">
                  <Col className="fw-bold fs-5">Parsel {parcelName}</Col>
                  <Col>
                    <NumberFormat
                      value={parcelPrice}
                      prefix="Rp. "
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </Col>
                  <Col>
                    <Form.Select
                      value={qtyParcel}
                      onChange={(e) => {
                        const data = {
                          idOrder,
                          idParcel,
                          parcelDetail,
                          noParcel: parcelNo,
                          qty: parseInt(e.target.value),
                        }
                        handleChange(data)
                      }}
                    >
                      <option value="0">Hapus Pesanan</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Select>
                  </Col>
                  <Col className="text-end">
                    <NumberFormat
                      value={totalPrice}
                      prefix="Rp. "
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </Col>
                </Row>
                <Row>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Detail Parsel</Accordion.Header>
                      <Accordion.Body>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Nama Produk</th>
                              <th>Kategori Produk</th>
                              <th>Jumlah Produk</th>
                            </tr>
                          </thead>
                          <tbody>
                            {parcelDetail.map((product) => {
                              const { no, qty, name, category } = product
                              return (
                                <tr key={no}>
                                  <td>{no}</td>
                                  <td>{name}</td>
                                  <td>{category}</td>
                                  <td>{qty} Pcs</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Row>
              </Card.Body>
            </Card>
          )
        })}
      </Col>
    )
  }
}
