import Axios from "axios"
import React, { Component } from "react"
import { Container } from "react-bootstrap"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import FillParcelDetail from "../components/FillParcelDetail"
import FillParcelFilter from "../components/FillParcelFilter"
import FillParcelModal from "../components/FillParcelModal"
import FillParcelOverlay from "../components/FillParcelOverlay"
import FillParcelProduct from "../components/FillParcelProduct"

const TRX_API = "http://localhost:2000/transaction"

class FillParcel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      parcelData: {
        idparcel: 0,
        parcel_name: "",
        parcel_price: 0,
        parcel_image: "",
        categories: [],
      },
      currentCategory: 0,
      parcelContents: [],
      parcelProducts: [],
      viewParcel: false,
      showModal: false,
      modalMessage: "",
    }
  }

  fetchParcelProduct = (idCategory) => {
    Axios.get(`${TRX_API}/fill-parcel-product/${idCategory}`)
      .then((res) => this.setState({ parcelProducts: res.data, currentCategory: idCategory }))
      .catch((err) => toast.error(err.response.data))
  }

  componentDidMount() {
    const { idparcel } = this.props.match.params
    Axios.get(`${TRX_API}/fill-parcel-data/${idparcel}`)
      .then((res) =>
        this.setState({ parcelData: res.data }, () =>
          this.fetchParcelProduct(res.data.categories[0].id)
        )
      )
      .catch((err) => toast.error(err.response.data))
  }

  calculateMaxQty = (idCategory) => {
    const { parcelContents } = this.state

    let qty = 0
    parcelContents.forEach((item) => {
      if (item.idCategory === idCategory) {
        qty += item.qty
      }
    })

    const { categories } = this.state.parcelData
    let maxQty
    categories.forEach((category) => {
      if (category.id === idCategory) {
        maxQty = category.maxQty
      }
    })

    const maxQtyPercent = (qty / maxQty) * 100
    const maxQtyValue = maxQty - qty

    return {
      value: maxQtyValue,
      percent: maxQtyPercent,
      label: `${qty}/${maxQty}`,
    }
  }

  getCategoryLabel = (idCategory) => {
    const { categories } = this.state.parcelData
    let label = ""
    categories.forEach((category) => {
      if (category.id === idCategory) {
        label = category.label
      }
    })
    return label
  }

  isProductOnCart = (idProduct) => {
    const { parcelContents } = this.state
    const isProductOnCart = parcelContents.filter((product) => product.idProduct === idProduct)
    if (isProductOnCart.length !== 0) {
      return true
    } else {
      return false
    }
  }

  onAddParcel = (product, qty) => {
    const { idproduct, idproduct_category, product_name, product_stock } = product
    let newParcelContents = [...this.state.parcelContents]
    const productCategory = this.getCategoryLabel(idproduct_category)
    const maxQty = this.calculateMaxQty(idproduct_category).value
    if (qty > maxQty) {
      return toast.error("Kamu tidak bisa menambahkan lebih dari qty per kategori")
    }
    let parcelContent
    if (this.isProductOnCart(idproduct)) {
      if (product_stock !== 1) {
        newParcelContents.forEach((product) => {
          if (product.idProduct === idproduct) {
            product.qty += 1
          }
        })
      } else {
        return toast.error(
          `Gagal menambahkan produk ke dalam parsel! Kamu hanya dapat membeli 1 Pcs ${product_name}`
        )
      }
    } else {
      parcelContent = {
        productCategory,
        qty,
        idCategory: idproduct_category,
        idProduct: idproduct,
        productName: product_name,
      }
      newParcelContents.push(parcelContent)
    }
    toast.success(`Berhasil menambahkan ${qty} Pcs ${product_name} ke dalam parsel!`)
    this.setState({ parcelContents: newParcelContents })
  }

  onDeleteParcel = (idxProduct) => {
    const deletedParcelContents = [...this.state.parcelContents]
    deletedParcelContents.splice(idxProduct, 1)
    this.setState({ parcelContents: deletedParcelContents })
  }

  handleViewParcel = () => {
    const { viewParcel } = this.state
    this.setState({ viewParcel: !viewParcel })
  }

  onAddToCart = () => {
    const { idusers } = this.props
    const { parcelContents, parcelData } = this.state
    const order_price = parcelData.parcel_price

    if (parcelContents.length === 0) {
      return toast.error("Oops, isi parselmu masih kosong!")
    }

    const isCategoryNotFull = []
    parcelData.categories.forEach((category) => {
      const { id, label } = category
      const maxQtyValue = this.calculateMaxQty(id).percent
      if (maxQtyValue < 100) {
        isCategoryNotFull.push(label)
      }
    })

    if (isCategoryNotFull.length !== 0) {
      const modalMessage = isCategoryNotFull.map((category) => {
        return <p>{`Kategori ${category} masih belum penuh!`}</p>
      })
      return this.setState({ modalMessage, showModal: true })
    }

    const orderData = {
      idusers,
      order_price,
    }

    const { idparcel } = parcelData
    const orderDetailData = {
      idparcel,
      parcel_qty: 1,
      parcelContents: parcelContents,
    }

    const axiosBody = {
      orderData,
      orderDetailData,
    }

    Axios.post(`${TRX_API}/new-order`, axiosBody)
      .then((res) => toast.success(res.data))
      .catch((err) => {
        const modalMessage = err.response.data.map((err) => {
          return <p>{`${err.message}`}</p>
        })
        return this.setState({ modalMessage, showModal: true })
      })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false, modalMessage: "" })
  }

  render() {
    const { categories } = this.state.parcelData
    const {
      parcelProducts,
      currentCategory,
      parcelData,
      viewParcel,
      parcelContents,
      showModal,
      modalMessage,
    } = this.state

    return (
      <>
        <Container fluid>
          <FillParcelDetail
            parcelData={parcelData}
            parcelContents={parcelContents}
            calculateMaxQty={this.calculateMaxQty}
            handleViewParcel={this.handleViewParcel}
            onAddToCart={this.onAddToCart}
          />
          <FillParcelFilter
            currentCategory={currentCategory}
            categories={categories}
            fetchParcelProduct={this.fetchParcelProduct}
          />
          <FillParcelProduct
            parcelProducts={parcelProducts}
            calculateMaxQty={this.calculateMaxQty}
            onAddParcel={this.onAddParcel}
          />
          <FillParcelOverlay
            viewParcel={viewParcel}
            parcelContents={parcelContents}
            handleViewParcel={this.handleViewParcel}
            onDeleteParcel={this.onDeleteParcel}
          />
          <FillParcelModal
            showModal={showModal}
            modalMessage={modalMessage}
            handleCloseModal={this.handleCloseModal}
          />
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  role: state.userReducer.role,
  idusers: state.userReducer.idusers,
})

export default connect(mapStateToProps, {})(FillParcel)
