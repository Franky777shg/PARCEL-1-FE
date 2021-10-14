import React, { Component } from "react"
import { Form, Image, Button } from "react-bootstrap"
import placeholderImage from "../assets/img/no-img.png"

export default class UploadPaymentForm extends Component {
  render() {
    const { orderNumber, previewImage, onUploadPayment, handleUploadPayment } = this.props
    return (
      <>
        <h2 className="fw-bold text-center">Upload Bukti Pembayaran</h2>
        <h3 className="text-center">Nomor Pesanan #{orderNumber}</h3>
        <p className="lead text-center">
          Selesaikan transaksi anda dengan transfer ke rekening <br />
          BCA 512309471237 a/n ADJ Parsel
        </p>
        {previewImage ? (
          <Image src={previewImage} rounded width={200} height={200} />
        ) : (
          <Image src={placeholderImage} rounded />
        )}

        <Form.Group className="my-3">
          <Form.Label>Masukkan Bukti Pembayaran</Form.Label>
          <Form.Control
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => handleUploadPayment(e.target.files[0])}
          />
        </Form.Group>
        <Button
          style={{ backgroundColor: "#8F9B85", border: "none" }}
          className="mb-2"
          onClick={onUploadPayment}
        >
          Kirim Bukti Pembayaran
        </Button>
        <Button style={{ backgroundColor: "#7792A8", border: "none" }}>Nanti Saja</Button>
      </>
    )
  }
}
