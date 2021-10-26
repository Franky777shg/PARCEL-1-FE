import React, { Component } from "react"
import Axios from "axios"
import NumberFormat from "react-number-format"
//import link
import { Link } from "react-router-dom"
//import styling
import "../style/transactionAdmin.css"
import { Button, Table, Card, Image } from "react-bootstrap"
import noImage from "../assets/img/no-avatar.jpeg"
import { toast } from "react-toastify"

class AdminTransactionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderBio: {},
            orderItem: []
        }
    }
    fetchData = (idOrder) => {
        Axios.get(`https://api-parcel-1.purwadhikafs2.com/adminTransaction/getDetailTransaction/${idOrder}`).then(res => {
            //push data bio ke state(orderBio)
            this.setState({ orderBio: res.data.orderBio })
            //push data item ke state(orderItem)
            let dataItem = [...this.state.orderItem]
            dataItem.push(...res.data.orderDetailItems)
            this.setState({ orderItem: dataItem })
        })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        const params = Object.values(this.props.match.params)
        const idOrder = +params[0]
        this.fetchData(idOrder)
    }
    onConfirmPayment = (idOrderStatus) => {
        const params = Object.values(this.props.match.params)
        const idOrder = +params[0]
        const body = {
            idOrder,
            "idOrderStatus": idOrderStatus
        }
        Axios.put(`https://api-parcel-1.purwadhikafs2.com/adminTransaction/confirmPayment`, body).then(
            res => {
                toast.success("Status pesanan berhasil diubah")
                this.fetchData(idOrder)
            }
        )
            .catch(err => console.log(err))
    }

    render() {
        const { order_number, idorder_status, order_price, date_order, recipient_name, recipient_address, payment_proof, name, order_status } = this.state.orderBio
        console.log(this.state.orderItem)
        return (
            <div className="admintransactiondetail-container">
                <h2 className="fw-bold">Detail Transaksi #{order_number}</h2>
                <div className="bio-container">
                    <Card className="bio-card" style={{ backgroundColor: "#D4DEEB" }}>
                        <Card.Body>
                            <h5>Tanggal Pemesanan: {date_order}</h5>
                            <h5>Pengirim: {name}</h5>
                            <h5>Penerima: {recipient_name}</h5>
                            <h5>Alamat Penerima: {recipient_address}</h5>
                            <h5>Total Belanja: <NumberFormat
                                value={order_price}
                                prefix="Rp. "
                                displayType="text"
                                thousandSeparator="."
                                decimalSeparator=","
                            /></h5>
                            <h5>Status Pembayaran: {order_status}</h5>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <h5>Bukti Pembayaran</h5>
                            {payment_proof ? <Image width="150px" height="200px" src={`https://api-parcel-1.purwadhikafs2.com/uploads/payments/${payment_proof}`} thumbnail /> : <Image src={noImage} />}

                        </Card.Body>
                    </Card>
                    <div className="bio-button">
                        <Button style={{ backgroundColor: "#8F9B85", border: "none" }} size="lg" as={Link} to={`/admin-transaction`} >
                            Kembali
                        </Button>
                        {idorder_status === 3 && <div className="confirm-button"> <Button style={{ backgroundColor: "#7792A8", border: "none", marginBottom: "2vh" }} onClick={() => this.onConfirmPayment(4)}>
                            Terima Pesanan
                        </Button> <Button style={{ backgroundColor: "#EF476F", border: "none" }} onClick={() => this.onConfirmPayment(5)}>
                                Tolak Pesanan
                            </Button>
                        </div>}
                    </div>
                </div>
                {/* Daftar Item dalam order */}
                <div >
                    {this.state.orderItem.map((item, index) => {
                        return (
                            <Card className="items-card" key={index}>
                                <Card.Body className="items-container">
                                    <div>
                                        <h5 className="fw-bold">{index + 1}. {item.parcel_name}</h5>
                                        <h5>{item.parcel_qty} x <NumberFormat
                                            value={item.parcel_price}
                                            prefix="Rp. "
                                            displayType="text"
                                            thousandSeparator="."
                                            decimalSeparator=","
                                        /></h5>
                                        <Image style={{ width: "15vw", height: "25vh" }} src={`https://api-parcel-1.purwadhikafs2.com/uploads/parcels/${item.parcel_image}`} thumbnail />
                                    </div>
                                    <div>
                                        <Table striped bordered hover className="table-items">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Nama Produk</th>
                                                    <th>Kategori Produk</th>
                                                    <th>Jumlah Produk</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.productDetail.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.category}</td>
                                                            <td>{item.qty}Pcs</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default AdminTransactionDetail
