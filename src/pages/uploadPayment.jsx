import Axios from "axios"
import React, { Component } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import UploadPaymentEmpty from "../components/UploadPaymentEmpty"
import UploadPaymentForm from "../components/UploadPaymentForm"
import UploadPaymentModal from "../components/UploadPaymentModal"

const TRX_API = "http://localhost:2000/transaction"

export default class uploadPayment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orderNumber: "",
      previewImage: "",
      paymentProof: "",
      showModal: false,
      modalMessage: "",
    }
  }

  getOrderNumber = () => {
    const token = localStorage.getItem("token")
    const { idorder } = this.props.match.params
    if (token) {
      const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }
      Axios.get(`${TRX_API}/upload-payment/${idorder}`, axiosConfig)
        .then((res) => this.setState({ orderNumber: res.data }))
        .catch((err) => toast.error(err.response.data))
    }
  }

  componentDidMount() {
    this.getOrderNumber()
  }

  onUploadPayment = () => {
    const { paymentProof } = this.state
    const { idorder } = this.props.match.params
    if (!paymentProof) return toast.error("File Bukti Pembayaran masih kosong!")

    const token = localStorage.getItem("token")
    if (token) {
      const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }

      const data = new FormData()
      data.append("new", paymentProof)

      Axios.patch(`${TRX_API}/upload-payment/${idorder}/payments`, data, axiosConfig)
        .then((res) => {
          this.setState({ showModal: true, modalMessage: res.data })
        })
        .catch((err) => toast.error(err.response.data))
    }
  }

  handleCloseModal = () => {
    const { history } = this.props
    this.setState({ showModal: false, modalMessage: "" }, () => history.push("/"))
  }

  handleUploadPayment = (img) => {
    this.setState({ previewImage: URL.createObjectURL(img), paymentProof: img })
  }

  render() {
    const { orderNumber, previewImage, modalMessage, showModal } = this.state
    return (
      <Container>
        <Row className="m-4 bg-white p-3">
          <Col className="d-flex flex-column align-items-center">
            {orderNumber ? (
              <UploadPaymentForm
                orderNumber={orderNumber}
                previewImage={previewImage}
                onUploadPayment={this.onUploadPayment}
                handleUploadPayment={this.handleUploadPayment}
              />
            ) : (
              <UploadPaymentEmpty />
            )}
          </Col>
        </Row>
        <UploadPaymentModal
          showModal={showModal}
          modalMessage={modalMessage}
          handleCloseModal={this.handleCloseModal}
        />
      </Container>
    )
  }
}
