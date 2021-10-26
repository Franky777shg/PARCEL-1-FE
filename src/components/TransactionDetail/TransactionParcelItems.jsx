import React, { Component } from "react"
import { Col, Image, Row, Table } from "react-bootstrap"
import NumberFormat from "react-number-format"
import placeholderImage from "../../assets/img/no-img.png"

const IMG_PARCEL = "http://localhost:2000/uploads/parcels"

export default class TransactionParcelItems extends Component {
  render() {
    const { orderDetailBody } = this.props
    return (
      <Col xs={12} md={8}>
        {orderDetailBody.map((orderDetail, idx) => {
          const {
            idorder_detail,
            parcel_name,
            parcel_image,
            parcel_price,
            parcel_qty,
            productDetail,
          } = orderDetail

          return (
            <Row key={idorder_detail}>
              <Col xs={12} md={4} className="lead">
                {parcel_image ? (
                  <Image src={`${IMG_PARCEL}/${parcel_image}`} className="w-100" />
                ) : (
                  <Image src={placeholderImage} className="w-100" />
                )}
              </Col>
              <Col xs={12} md={8} className="border-end border-3">
                <h5 className="fw-bold fs-4">
                  {idx + 1}. Parsel {parcel_name}
                </h5>
                <p className="lead mb-0 text-secondary">
                  {parcel_qty} Parsel x &nbsp;
                  <NumberFormat
                    value={parcel_price}
                    prefix="Rp. "
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </p>
                <h5 className="fw-bold fs-5 mt-2">Isi Parsel</h5>
                <Row>
                  <Col>
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
                        {productDetail.map((product, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.qty} Pcs</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Col>
            </Row>
          )
        })}
      </Col>
    )
  }
}
