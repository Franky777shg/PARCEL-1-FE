import React, { Component } from "react"
import { Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

class NavAdmin extends Component {
  render() {
    const { onLogout } = this.props
    return (
      <Nav.Link>
        <div className="d-md-flex align-items-center">
          <div className="d-md-none">
            <NavDropdown.Item as={Link}>Transaksi</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/parcelAdmin">Parsel</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/productAdmin">Produk</NavDropdown.Item>
            <NavDropdown.Item as={Link}>Laporan Penjualan</NavDropdown.Item>
            <NavDropdown.Item as={Link}>Penghasilan</NavDropdown.Item>
            <NavDropdown.Item onClick={onLogout}>Keluar</NavDropdown.Item>
          </div>
          <NavDropdown align="end" title="Halo Admin" className="border d-none d-md-block">
            <NavDropdown.Item as={Link}>Transaksi</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/parcelAdmin">Parsel</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/productAdmin">Produk</NavDropdown.Item>
            <NavDropdown.Item as={Link}>Laporan Penjualan</NavDropdown.Item>
            <NavDropdown.Item as={Link}>Penghasilan</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onLogout}>Keluar</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Nav.Link>
    )
  }
}

export default NavAdmin
