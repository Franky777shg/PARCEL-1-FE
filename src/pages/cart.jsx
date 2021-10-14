import Axios from "axios"
import React, { Component } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import CartAddress from "../components/CartAddress"
import CartAddressModal from "../components/CartAddressModal"
import CartEmpty from "../components/CartEmpty"
import CartErrorModal from "../components/CartErrorModal"
import CartItem from "../components/CartItem"
import CartSummary from "../components/CartSummary"
import CartSummaryButton from "../components/CartSummaryButton"
import { getTotalParcel } from "../redux/actions"

const TRX_API = "http://localhost:2000/transaction"

class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      idOrder: 0,
      totalParcel: 0,
      cartItems: [],
      orderPrice: 0,
      showModal: false,
      modalMessage: "",
      showModalAddress: false,
      nameRecipient: "",
      addressRecipient: "",
    }
  }

  componentDidMount() {
    this.fetchData()
    this.setDefaultAddress()
    this.props.getTotalParcel()
  }

  setDefaultAddress = () => {
    const { name, address } = this.props
    this.setState({ nameRecipient: name, addressRecipient: address })
  }

  fetchData = () => {
    const token = localStorage.getItem("token")
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }
    Axios.get(`${TRX_API}/cart`, axiosConfig)
      .then((res) =>
        this.setState({ ...this.state, ...res.data }, () => {
          this.setState({ orderPrice: this.getTotalPrice() })
          this.props.getTotalParcel()
        })
      )
      .catch((err) => this.setState({ cartItems: [] }, () => this.props.getTotalParcel()))
  }

  handleChange = (data) => {
    const { qty } = data
    if (qty === 0) {
      const axiosBody = { data: { ...data } }
      delete axiosBody.qty
      delete axiosBody.parcelDetail
      Axios.delete(`${TRX_API}/cart`, axiosBody)
        .then((res) => {
          toast.success(res.data)
          this.fetchData()
        })
        .catch((err) => {
          toast.error(err.response.data)
          this.fetchData()
        })
    } else {
      const axiosBody = { ...data }
      Axios.patch(`${TRX_API}/cart/qty`, axiosBody)
        .then((res) => {
          toast.success(res.data)
          this.fetchData()
        })
        .catch((err) => {
          const modalMessage = err.response.data.map((err) => (
            <p key={err.id}>{`${err.message}`}</p>
          ))
          return this.setState({ modalMessage, showModal: true })
        })
    }
  }

  handleCloseModal = () => {
    this.setState({ showModal: false, modalMessage: "" })
  }

  handleCloseModalAddress = () => {
    this.setState({ showModalAddress: false })
  }

  handleEditAddress = () => {
    this.setState({ showModalAddress: true })
  }

  getTotalPrice = () => {
    const { cartItems } = this.state
    let totalAllItems = 0
    cartItems.map((cartItem) => {
      const { totalPrice } = cartItem.parcelData
      return (totalAllItems += +totalPrice)
    })
    return totalAllItems
  }

  handleSaveAddress = (name, address) => {
    if (name === "" || address === "")
      return toast.error("Nama atau Alamat penerima tidak boleh kosong!")

    this.setState({ nameRecipient: name, addressRecipient: address, showModalAddress: false })
  }

  onCheckout = () => {
    const { cartItems, idOrder, orderPrice, nameRecipient, addressRecipient } = this.state
    const orderData = {
      order_price: orderPrice,
      recipient_name: nameRecipient,
      recipient_address: addressRecipient,
    }
    const axiosBody = {
      idOrder,
      cartItems,
      orderData,
    }

    Axios.post(`${TRX_API}/checkout`, axiosBody)
      .then((res) => {
        const { history, getTotalParcel } = this.props
        toast.success(res.data)
        getTotalParcel()
        history.push(`/upload-payment/${idOrder}`)
      })
      .catch((err) => {
        if (typeof err.response.data !== "string") {
          const modalMessage = err.response.data.map((err) => (
            <p key={err.id}>{`${err.message}`}</p>
          ))
          return this.setState({ modalMessage, showModal: true })
        } else {
          toast.error(err.response.data)
        }
      })
  }

  render() {
    const {
      totalParcel,
      cartItems,
      orderPrice,
      showModal,
      modalMessage,
      showModalAddress,
      nameRecipient,
      addressRecipient,
    } = this.state
    return (
      <Container>
        <div className="p-3">
          {cartItems.length === 0 ? (
            <CartEmpty />
          ) : (
            <>
              <h3 className="my-3">Kamu punya {totalParcel} Parsel di dalam Keranjang!</h3>
              <Row>
                <CartItem cartItems={cartItems} handleChange={this.handleChange} />
                <Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 2 }}>
                  <Row>
                    <Col>
                      <CartSummary orderPrice={orderPrice} />
                      <CartAddress
                        nameRecipient={nameRecipient}
                        addressRecipient={addressRecipient}
                        handleEditAddress={this.handleEditAddress}
                      />
                    </Col>
                    <div className="d-flex justify-content-end my-3 pe-0">
                      <CartSummaryButton onCheckout={this.onCheckout} />
                    </div>
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </div>
        <CartErrorModal
          showErrorModal={showModal}
          modalMessage={modalMessage}
          handleCloseModal={this.handleCloseModal}
        />
        <CartAddressModal
          showModalAddress={showModalAddress}
          nameRecipient={nameRecipient}
          addressRecipient={addressRecipient}
          handleCloseModalAddress={this.handleCloseModalAddress}
          handleSaveAddress={this.handleSaveAddress}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  address: state.userReducer.address,
})

export default connect(mapStateToProps, { getTotalParcel })(Cart)
