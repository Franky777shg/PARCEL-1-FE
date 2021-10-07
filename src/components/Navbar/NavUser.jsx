import React, { Component } from "react"
import { Nav, NavDropdown } from "react-bootstrap"
import { connect } from "react-redux"
import Avatar from "../Avatar"

class NavUser extends Component {
  render() {
    const { onLogout, name } = this.props
    return (
      <Nav.Link>
        <div className="d-md-flex align-items-center">
          
          {/* CART */}
          {/* <div className="d-none d-md-block">
            <FiShoppingCart className="fs-3" />
            <Badge
              bg="dark"
              className="me-3"
              style={{
                position: "relative",
                top: "-.5em",
                borderRadius: "100%",
              }}
            >
              9
            </Badge>
          </div> */}
          <Avatar />

          {/* DROPDOWN MOBILE */}
          <div className="d-md-none">
            {/* <NavDropdown.Item>
              Cart
              <Badge bg="dark" className="ms-1">
                9
              </Badge>
            </NavDropdown.Item> */}
            <NavDropdown.Item>Profil</NavDropdown.Item>
            <NavDropdown.Item>Transaksi</NavDropdown.Item>
            <NavDropdown.Item onClick={onLogout}>Keluar</NavDropdown.Item>
          </div>

          {/* DROPDOWN TABLET - DESKTOP */}
          <NavDropdown align="end" title={`Halo ${name}`} className="border d-none d-md-block">
            <NavDropdown.Item>Profil</NavDropdown.Item>
            <NavDropdown.Item>Transaksi</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onLogout}>Keluar</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Nav.Link>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name
})


export default connect(mapStateToProps, {}) (NavUser)
