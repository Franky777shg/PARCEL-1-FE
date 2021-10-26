import React, { Component } from "react"
import { Container } from "react-bootstrap"
import Navbar from "../components/Navbar"

export default class NotFound extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Container>
          <div className="d-flex flex-column align-items-center justify-content-center m-5">
            <h1 className="fw-bold">404 Not Found</h1>
            <h3>Mohon maaf, halaman yang anda pilih tidak ditemukan 😢</h3>
          </div>
        </Container>
      </>
    )
  }
}
