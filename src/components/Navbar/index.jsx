import React, { Component } from "react"
import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PrivateNav from "./PrivateNav"

class Navbar extends Component {
  render() {
    const { role } = this.props
    return (
      <NavbarBS bg="light" expand="lg" sticky="top">
        <Container>
          <NavbarBS.Brand as={Link} to="/" className="fw-bold fs-3">
            ADJ Parcel
          </NavbarBS.Brand>
          <NavbarBS.Toggle />
          <NavbarBS.Collapse>
            <Nav className="ms-auto">
              {/* Jika User Login, Button Masuk tidak muncul */}
              {role ? (
                <PrivateNav />
              ) : (
                <>
                  <Button
                    className="my-1 me-md-2"
                    style={{ backgroundColor: "#8F9B85", border: "none" }}
                    as={Link}
                    to="/login"
                  >
                    Masuk
                  </Button>
                  <Button
                    className="my-1 ms-md-2"
                    style={{ backgroundColor: "#7792A8", border: "none" }}
                    as={Link}
                    to="/register"
                  >
                    Daftar
                  </Button>
                </>
              )}
            </Nav>
          </NavbarBS.Collapse>
        </Container>
      </NavbarBS>
    )
  }
}

const mapStateToProps = (state) => ({
  role: state.userReducer.role,
})

export default connect(mapStateToProps, {})(Navbar)
