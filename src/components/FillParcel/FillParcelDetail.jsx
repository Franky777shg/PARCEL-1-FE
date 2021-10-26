import React, { Component } from "react"
import { Button, Col, Image, ProgressBar, Row } from "react-bootstrap"
import NumberFormat from "react-number-format"

const PARCEL_IMG_URL = "https://api-parcel-1.purwadhikafs2.com/uploads/parcels"

export default class FillParcelDetail extends Component {
  render() {
    const { parcel_name, parcel_image, parcel_price, categories } = this.props.parcelData
    const { calculateMaxQty, handleViewParcel, onAddToCart } = this.props
    return (
      <Row className="py-5 px-5" style={{ backgroundColor: "#D4DEEB" }}>
        <Col className="d-flex justify-content-center d-md-block mb-3">
          <Image src={`${PARCEL_IMG_URL}/${parcel_image}`} width={200} height={200} />
        </Col>
        <Col className="d-flex flex-column justify-content-center">
          <h2 className="fw-bold">Parsel {parcel_name}</h2>
          <p>Silahkan isi parsel sesuai keinginan anda!</p>
          {categories.map((category) => {
            return (
              <Row key={category.id}>
                <Col>{category.label}</Col>
                <Col>{category.maxQty}</Col>
                <Col>
                  <ProgressBar
                    now={calculateMaxQty(category.id).percent}
                    label={calculateMaxQty(category.id).label}
                  />
                </Col>
              </Row>
            )
          })}
        </Col>
        <Col className="d-flex flex-column align-items-end justify-content-evenly" xs={12} md={4}>
          <h3 className="fw-bold">
            <NumberFormat
              value={parcel_price}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </h3>
          <Button
            style={{ backgroundColor: "#8F9B85", border: "none" }}
            className="mb-2"
            size="lg"
            onClick={handleViewParcel}
          >
            Lihat Isi Parsel
          </Button>
          <Button
            style={{ backgroundColor: "#7792A8", border: "none" }}
            size="lg"
            onClick={onAddToCart}
          >
            Tambah Ke Keranjang
          </Button>
        </Col>
      </Row>
    )
  }
}
