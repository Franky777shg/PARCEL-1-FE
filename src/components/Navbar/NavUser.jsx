import React, { Component } from "react"
import Avatar from "react-avatar"
import { Nav, NavDropdown } from "react-bootstrap"

class NavUser extends Component {
  render() {
    const { onLogout } = this.props
    return (
      <Nav.Link>
        <div className="d-md-flex align-items-center">
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
          <Avatar name="Andra Andaru" size={40} round className="d-none d-md-block me-3" />
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
          <NavDropdown align="end" title="Halo Andra Andaru" className="border d-none d-md-block">
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

export default NavUser
