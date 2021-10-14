import React, { Component } from "react"
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

export default class CartEmpty extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <h1 className="fw-bold">Oopss...</h1>
        <h3 className="text-center">Keranjang kamu masih kosong 😢</h3>
        <Button as={Link} to="/">
          Cari Parsel Sekarang!
        </Button>
      </div>
    )
  }
}
