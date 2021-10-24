import React, { Component } from "react"
//import link
import { Link } from "react-router-dom"
//import styling
import "../style/transactionAdmin.css"
import { Button, Table, Card, Image } from "react-bootstrap"

class AdminTransactionDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="admintransactiondetail-container">
                <h2 className="fw-bold">Detail Transaksi #123123123</h2>
                <div className="bio-container">
                    <Card className="bio-card" style={{ backgroundColor: "#D4DEEB" }}>
                        <Card.Body>
                            <h5>Tanggal Pemesanan: 07 Oktober 2021</h5>
                            <h5>Pengirim: Dimas Aditya</h5>
                            <h5>Penerima: Andra Juan</h5>
                            <h5>Alamat Penerima: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore corrupti eveniet sapiente vel quo dicta, provident.</h5>
                            <h5>Total Belanja: Rp. 4.500.000</h5>
                            <h5>Status Pembayaran: Belum Bayar</h5>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <h5>Bukti Pembayaran</h5>
                            <Image src="https://i.postimg.cc/nVdCHSqc/Skrill-Cashout.png" thumbnail />
                        </Card.Body>
                    </Card>
                    <div className="bio-button">
                        <Button style={{ backgroundColor: "#8F9B85", border: "none" }} size="lg" as={Link} to={`/admin-transaction`} >
                            Kembali
                        </Button>
                    </div>
                </div>
                <div >
                    <Card className="items-card">
                        <Card.Body className="items-container">
                            <div>
                                <h5 className="fw-bold">1. Parcel Lebaran A</h5>
                                <h5>1 Parsel x Rp.434.000</h5>
                                <Image style={{ width: "15vw", height: "25vh" }} src="https://i.postimg.cc/nVdCHSqc/Skrill-Cashout.png" thumbnail />
                            </div>
                            <div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama Produk</th>
                                            <th>Kategori Produk</th>
                                            <th>Jumlah Produk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
                                            <td>Sarung</td>
                                            <td>1 Pcs</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
                                            <td>Sarung</td>
                                            <td>1 Pcs</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
                                            <td>Sarung</td>
                                            <td>1 Pcs</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
                                            <td>Sarung</td>
                                            <td>1 Pcs</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
                                            <td>Sarung</td>
                                            <td>1 Pcs</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}
export default AdminTransactionDetail
