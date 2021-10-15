import React, { Component } from "react"
import { Badge, Nav, NavDropdown, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { FiShoppingCart } from "react-icons/fi"
import Avatar from "../Avatar"
import { Link } from "react-router-dom"

class NavUser extends Component {
  render() {
    const { onLogout, name, totalParcel } = this.props
    return (
      <Nav.Link>
        <div className="d-md-flex align-items-center">
          {/* CART */}
          <div className="d-none d-md-block">
            <Button variant="link" as={Link} to="/cart">
              <FiShoppingCart className="fs-3 text-black" />
              <Badge
                bg="dark"
                className="me-3"
                style={{
                  position: "relative",
                  top: "-.5em",
                  borderRadius: "100%",
                }}
              >
                {totalParcel}
              </Badge>
            </Button>
          </div>
          <Avatar />

          {/* DROPDOWN MOBILE */}
          <div className="d-md-none">
            <NavDropdown.Item as={Link} to="/cart">
              Keranjang
              <Badge bg="dark" className="ms-1">
                {totalParcel}
              </Badge>
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/user-profile">
              Profil
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/user-transaction">
              Transaksi
            </NavDropdown.Item>
            <NavDropdown.Item onClick={onLogout}>Keluar</NavDropdown.Item>
          </div>

          {/* DROPDOWN TABLET - DESKTOP */}
          <NavDropdown align="end" title={`Halo ${name}`} className="border d-none d-md-block">
            <NavDropdown.Item as={Link} to="/user-profile">
              Profil
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/user-transaction">
              Transaksi
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onLogout}>Keluar</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Nav.Link>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  totalParcel: state.transactionReducer.totalParcel,
})

export default connect(mapStateToProps, {})(NavUser)
