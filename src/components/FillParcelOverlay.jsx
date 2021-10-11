import React, { Component } from "react"
import { CloseButton, Offcanvas, Table } from "react-bootstrap"

export default class FillParcelOverlay extends Component {
  render() {
    const { viewParcel, handleViewParcel, parcelContents, onDeleteParcel } = this.props
    return (
      <Offcanvas show={viewParcel} onHide={handleViewParcel} placement="end" scroll>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold fs-3">Isi Parcel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Qty</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {parcelContents.map((parcelContent, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{parcelContent.productName}</td>
                  <td>{parcelContent.qty}</td>
                  <td>{parcelContent.productCategory}</td>
                  <td>
                    <CloseButton onClick={(index) => onDeleteParcel(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Offcanvas.Body>
      </Offcanvas>
    )
  }
}
