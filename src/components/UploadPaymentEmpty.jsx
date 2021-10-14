import React, { Component } from "react"

export default class UploadPaymentEmpty extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <h1 className="fw-bold">Oopss...</h1>
        <h3 className="text-center">Data Pesanan tidak ditemukan 😢</h3>
      </div>
    )
  }
}
