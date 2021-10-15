import Axios from "axios"
import React, { Component } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import TransactionDeliveryDetail from "../components/TransactionDetail/TransactionDeliveryDetail"
import TransactionEmpty from "../components/TransactionDetail/TransactionEmpty"
import TransactionHeadDetail from "../components/TransactionDetail/TransactionHeadDetail"
import TransactionParcelItems from "../components/TransactionDetail/TransactionParcelItems"
import TransactionPaymentDetail from "../components/TransactionDetail/TransactionPaymentDetail"
import TransactionPrice from "../components/TransactionDetail/TransactionPrice"

const TRX_API = "http://localhost:2000/transaction"

export default class TransactionDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orderDetailHead: {},
      orderDetailBody: [],
    }
  }

  componentDidMount() {
    const { idorder } = this.props.match.params
    const token = localStorage.getItem("token")
    if (token) {
      const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }
      Axios.get(`${TRX_API}/detail/${idorder}`, axiosConfig)
        .then((res) =>
          this.setState({
            orderDetailHead: res.data.orderDetailHead,
            orderDetailBody: res.data.orderDetailBody,
          })
        )
        .catch((err) => toast.error(err.response.data))
    }
  }

  render() {
    const { orderDetailHead, orderDetailBody } = this.state
    const {
      idorder,
      idorder_status,
      order_number,
      order_date,
      order_price,
      recipient_name,
      recipient_address,
      order_status,
      payment_proof,
    } = orderDetailHead
    return (
      <Container>
        <div className="my-3">
          {Object.keys(orderDetailHead).length === 0 ? (
            <TransactionEmpty />
          ) : (
            <>
              <h2 className="fw-bold">Detail Transaksi #{order_number}</h2>
              <Card className="mx-0" style={{ width: "100%" }}>
                <Card.Body>
                  <Row className="d-flex g-3 mb-3">
                    <Col>
                      <Row>
                        <TransactionHeadDetail
                          order_date={order_date}
                          idorder_status={idorder_status}
                          order_status={order_status}
                        />
                      </Row>
                      <Row>
                        <TransactionParcelItems orderDetailBody={orderDetailBody} />
                        <TransactionPrice order_price={order_price} />
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <TransactionDeliveryDetail
                recipient_address={recipient_address}
                recipient_name={recipient_name}
              />
              <TransactionPaymentDetail idorder={idorder} payment_proof={payment_proof} />
            </>
          )}
        </div>
      </Container>
    )
  }
}
