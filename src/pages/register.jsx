import React, { Component } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import FormRegister from "../components/FormRegister"

const IMAGE_PARCEL_URL =
  "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80"

class Register extends Component {
  render() {
    return (
      <Container>
        <div className="d-flex align-items-center">
          <Row className="w-100 bg-white rounded-3 ms-0 my-5">
            <Col
              md={4}
              className="d-none d-md-flex flex-column justify-content-center align-items-center rounded-end"
              style={{ backgroundColor: "#D4DEEB" }}
            >
              <h3 className="fw-bold">Selamat Datang di ADJ Parcel</h3>
              <br />
              <Image src={IMAGE_PARCEL_URL} width={200} rounded fluid />
              <br />
              <p>Sudah punya akun?</p>
              <Link to="/login">Masuk Disini</Link>
            </Col>
            <Col
              md={8}
              className="d-flex flex-column justify-content-center align-items-center p-3"
            >
              <h3 className="fw-bold d-block d-md-none">Selamat Datang di ADJ Parcel</h3>
              <h3 className="fw-bold">Daftar Akun</h3>
              <FormRegister />
              <br />
              <p className="d-block d-md-none">Sudah punya akun?</p>
              <Link className="d-block d-md-none" to="/login">
                Masuk Disini
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

export default Register
