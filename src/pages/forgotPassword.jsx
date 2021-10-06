import React, { Component } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import FormForgotPassword from "../components/FormForgotPassword"

class ForgotPassword extends Component {
  render() {
    const { role } = this.props
    if (role === "admin") {
      return <Redirect to="/parcelAdmin" />
    } else if (role === "user") {
      return <Redirect to="/" />
    }
    
    return (
      <Container>
        <div className="d-flex align-items-center">
          <Row className="w-100 bg-white rounded-3 ms-0 my-5" style={{ minHeight: "75vh" }}>
            <Col className="d-flex flex-column justify-content-center align-items-center p-5">
              <h3 className="fw-bold mb-3">Lupa Kata Sandi</h3>
              <FormForgotPassword />
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  role: state.userReducer.role
})


export default connect(mapStateToProps, {})(ForgotPassword)
