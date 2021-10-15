import React, { Component } from "react"
import { Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

class NavAdmin extends Component {
  render() {
    const { onLogout } = this.props
    return (
      <Nav.Link>
        <div className="d-md-flex align-items-center">
          {/* DROPDOWN MOBILE */}
          <div className="d-md-none">
            <NavDropdown.Item>Transaksi</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/parcelAdmin">
              Parsel
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/productAdmin">
              Produk
            </NavDropdown.Item>
            <NavDropdown.Item>Laporan Penjualan</NavDropdown.Item>
            <NavDropdown.Item>Penghasilan</NavDropdown.Item>
            <NavDropdown.Item onClick={onLogout}>Keluar</NavDropdown.Item>
          </div>
          {/* DROPDOWN TABLET - DESKTOP */}
          <NavDropdown align="end" title="Halo Admin" className="border d-none d-md-block">
            <NavDropdown.Item>Transaksi</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/parcelAdmin">
              Parsel
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/productAdmin">
              Produk
            </NavDropdown.Item>
            <NavDropdown.Item>Laporan Penjualan</NavDropdown.Item>
            <NavDropdown.Item>Penghasilan</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onLogout}>Keluar</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Nav.Link>
    )
  }
}

export default NavAdmin
