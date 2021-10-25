import React, { Component } from "react"
import axios from "axios"
import { format } from "date-fns"
import NumberFormat from "react-number-format"
//import link
import { Link } from "react-router-dom"
//import styling
import "../style/transactionAdmin.css"
import { Button, Table } from "react-bootstrap"

//admin transaction URL
const ADM_TRX_URL =
    "http://localhost:2000/adminTransaction/getAllTransactions"

class AdminTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: []
        }
    }
    componentDidMount() {
        this.onGetAllStatus()
    }
    onGetAllStatus = () => {
        axios.get(ADM_TRX_URL).then(res => {
            let data = [...this.state.order]
            data.push(...res.data)
            this.setState({ order: data })
        })
            .catch(err => console.log(err))
    }
    onGetStatus = (idStatus) => {
        axios.get(`http://localhost:2000/adminTransaction/getTransactions/${idStatus}`).then(res => {
            this.setState({ order: res.data })
        })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div id="admintransaction-container">
                <h2 className="fw-bold">Daftar Transaksi</h2>
                <div id="statusfilter-button">
                    <h4>Status Transaksi :</h4>
                    <Button style={{ backgroundColor: "#7792A8", border: "none" }} onClick={this.onGetAllStatus}>
                        All Status
                    </Button>
                    <Button style={{ backgroundColor: "#7792A8", border: "none" }} onClick={() => this.onGetStatus(2)}>
                        Belum Bayar
                    </Button>
                    <Button style={{ backgroundColor: "#7792A8", border: "none" }} onClick={() => this.onGetStatus(3)}>
                        Menunggu Konfirmasi
                    </Button>
                    <Button style={{ backgroundColor: "#7792A8", border: "none" }} onClick={() => this.onGetStatus(4)}>
                        Pembayaran Berhasil
                    </Button>
                    <Button style={{ backgroundColor: "#7792A8", border: "none" }} onClick={() => this.onGetStatus(5)}>
                        Transaksi Ditolak
                    </Button>
                </div>
                <Table id="admintransaction-table" striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>No. Pesanan</th>
                            <th>Tanggal</th>
                            <th>Total Harga</th>
                            <th>Status</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.order.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>#{item.order_number}</td>
                                    <td>{format(new Date(item.order_date), "dd MMMM yyyy")}</td>
                                    <td><NumberFormat
                                        value={item.order_price}
                                        prefix="Rp. "
                                        displayType="text"
                                        thousandSeparator="."
                                        decimalSeparator=","
                                    /></td>
                                    <td>{item.order_status}</td>
                                    <td>  <Button style={{ backgroundColor: "#7792A8", border: "none" }} as={Link} to={`/admin-transaction-detail/${item.idorder}`}>
                                        Detail
                                    </Button> </td>
                                    <td>
                                        {item.idorder_status === 3 && <Button style={{ backgroundColor: "#8F9B85", border: "none" }} as={Link} to={`/admin-transaction-detail/${item.idorder}`} >
                                            Konfirmasi
                                        </Button>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

            </div>
        );
    }
}
export default AdminTransaction;