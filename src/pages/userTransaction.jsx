import Axios from "axios"
import React, { Component } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import TransactionBody from "../components/UserTransaction/TransactionBody"
import TransactionHead from "../components/UserTransaction/TransactionHead"
import UserTransactionEmpty from "../components/UserTransaction/UserTransactionEmpty"
import UserTransactionFilter from "../components/UserTransaction/UserTransactionFilter"

const TRX_API = "http://localhost:2000/transaction"

export default class UserTransaction extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transactionsData: [],
      orderStatus: [],
      statusActive: 0,
    }
  }

  componentDidMount() {
    this.getOrderStatus()
    const token = localStorage.getItem("token")
    if (token) {
      const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }
      Axios.get(`${TRX_API}/history`, axiosConfig)
        .then((res) => this.setState({ transactionsData: res.data }))
        .catch((err) => toast.error(err.response.data))
    }
  }

  getBadgeColor = (id) => {
    switch (id) {
      case 2:
        return "warning"
      case 3:
        return "primary"
      case 4:
        return "success"
      case 5:
        return "danger"
      default:
        return "primary"
    }
  }

  handleFilter = (idOrderStatus) => {
    const token = localStorage.getItem("token")
    if (token) {
      const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }
      if (idOrderStatus === 0) {
        Axios.get(`${TRX_API}/history`, axiosConfig)
          .then((res) => this.setState({ transactionsData: res.data, statusActive: idOrderStatus }))
          .catch((err) => toast.error(err.response.data))
      } else if (idOrderStatus > 1) {
        Axios.get(`${TRX_API}/history/${idOrderStatus}`, axiosConfig)
          .then((res) => this.setState({ transactionsData: res.data, statusActive: idOrderStatus }))
          .catch((err) => toast.error(err.response.data))
      }
    }
  }

  getOrderStatus = () => {
    Axios.get(`${TRX_API}/order-status`)
      .then((res) => this.setState({ orderStatus: res.data }))
      .catch((err) => toast.error(err.response.data))
  }

  render() {
    const { transactionsData, orderStatus, statusActive } = this.state
    return (
      <Container>
        <div className="my-3">
          <h2 className="fw-bold">Daftar Transaksi</h2>
          {orderStatus && (
            <UserTransactionFilter
              orderStatus={orderStatus}
              statusActive={statusActive}
              handleFilter={this.handleFilter}
            />
          )}

          {transactionsData.length === 0 ? (
            <UserTransactionEmpty />
          ) : (
            <>
              {transactionsData.map((transactionData) => {
                const {
                  idorder,
                  idorder_status,
                  order_date,
                  order_status,
                  order_number,
                  order_price,
                  parcel_name,
                  parcel_price,
                  parcel_qty,
                  parcel_image,
                  totalParcel,
                } = transactionData
                return (
                  <Row key={idorder}>
                    <Col>
                      <Card className="mx-0" style={{ width: "100%" }}>
                        <Card.Body>
                          <TransactionHead
                            order_date={order_date}
                            idorder_status={idorder_status}
                            order_status={order_status}
                            order_number={order_number}
                            getBadgeColor={this.getBadgeColor}
                          />
                          <TransactionBody
                            parcel_name={parcel_name}
                            parcel_qty={parcel_qty}
                            parcel_price={parcel_price}
                            parcel_image={parcel_image}
                            totalParcel={totalParcel}
                            order_price={order_price}
                            idorder_status={idorder_status}
                            idorder={idorder}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                )
              })}
            </>
          )}
        </div>
      </Container>
    )
  }
}
