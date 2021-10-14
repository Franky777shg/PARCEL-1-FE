import React, { Component } from "react"
import { Col, Image, Row, Button } from "react-bootstrap"
import NumberFormat from "react-number-format"
import { Link } from "react-router-dom"
import placeholderImage from "../../assets/img/no-img.png"

const IMG_PARCEL = "http://localhost:2000/uploads/parcels"

export default class TransactionBody extends Component {
  render() {
    const {
      parcel_name,
      parcel_qty,
      parcel_price,
      parcel_image,
      totalParcel,
      order_price,
      idorder_status,
      idorder,
    } = this.props
    return (
      <Row>
        <Col xs={12} md={2}>
          {parcel_image ? (
            <Image src={`${IMG_PARCEL}/${parcel_image}`} className="w-100" />
          ) : (
            <Image src={placeholderImage} className="w-100" />
          )}
        </Col>
        <Col xs={12} md={6} className="border-end border-3">
          <h5 className="fw-bold fs-4">Parsel {parcel_name}</h5>
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
          {totalParcel > 1 && (
            <small className="text-secondary">+{totalParcel - 1} Parsel Lainnya</small>
          )}
        </Col>
        <Col xs={12} md={4}>
          <Row>
            <Col>
              <h3>Total Belanja: </h3>
              <h3>
                <NumberFormat
                  value={order_price}
                  prefix="Rp. "
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </h3>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              {idorder_status === 2 ? (
                <>
                  <Button
                    style={{ backgroundColor: "#7792A8", border: "none" }}
                    as={Link}
                    to="/my-transaction"
                    className="me-2"
                  >
                    Lihat Detil Transaksi
                  </Button>
                  <Button
                    style={{ backgroundColor: "#8F9B85", border: "none" }}
                    className="ms-2"
                    as={Link}
                    to={`/upload-payment/${idorder}`}
                  >
                    Bayar Sekarang
                  </Button>
                </>
              ) : (
                <Button style={{ backgroundColor: "#8F9B85", border: "none" }} className="me-2">
                  Lihat Detail Transaksi
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
