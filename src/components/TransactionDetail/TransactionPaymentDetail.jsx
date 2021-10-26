import React, { Component } from "react"
import { Card, Col, Image, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const IMG_PAYMENT = "https://api-parcel-1.purwadhikafs2.com/uploads/payments"

export default class TransactionPaymentDetail extends Component {
  render() {
    const { payment_proof, idorder } = this.props
    return (
      <>
        <h2 className="fw-bold">Bukti Pembayaran</h2>
        <Card className="mx-0" style={{ width: "100%" }}>
          <Card.Body>
            <Row className="d-flex g-3 mb-3">
              <Col>
                {payment_proof ? (
                  <Image src={`${IMG_PAYMENT}/${payment_proof}`} width={250} height={250} />
                ) : (
                  <>
                    <h3>Kamu belum mengirim bukti pembayaran</h3>
                    <Button as={Link} to={`/upload-payment/${idorder}`}>
                      Unggah Bukti Pembayaran
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    )
  }
}
