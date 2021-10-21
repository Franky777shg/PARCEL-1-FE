import React, { Component } from "react"
import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { keepLogin, getTotalParcel } from "./redux/actions"

// Import Components
import AuthWrapper from "./components/AuthWrapper"
import AdminRoute from "./components/CustomRoute/AdminRoute"
import UserRoute from "./components/CustomRoute/UserRoute"

//Import Pages
import NotFound from "./pages/404"
import AddParcel from "./pages/addParcel"
import AddProductAdmin from "./pages/addProductAdmin"
import Cart from "./pages/cart"
import EditProduct from "./pages/editProduct"
import EditParcel from "./pages/editParcel"
import FillParcel from "./pages/fillParcel"
import ForgotPassword from "./pages/forgotPassword"
import Login from "./pages/login"
import ParcelAdmin from "./pages/parcelAdmin"
import ParcelDetail from "./pages/parcelDetail"
import ProductAdmin from "./pages/productAdmin"
import Register from "./pages/register"
import ResetPassword from "./pages/resetPassword"
import TransactionDetail from "./pages/transactionDetail"
import UploadPayment from "./pages/uploadPayment"
import UserProfile from "./pages/userProfile"
import UserTransaction from "./pages/userTransaction"
import Verify from "./pages/verify"
import SalesReport from "./pages/salesReport"

class App extends Component {
  componentDidMount() {
    this.props.keepLogin()
    this.props.getTotalParcel()
  }

  render() {
    return (
      <>
        <Switch>
          {/* Route Homepage diarahkan dulu ke AuthWrapper */}
          <Route component={AuthWrapper} path="/" exact />

          {/* Router Khusus Tamu */}
          <Route component={Register} path="/register" />
          <Route component={Login} path="/login" />
          <Route component={Verify} path="/verify/:token" />
          <Route component={ForgotPassword} path="/forgot-password/" />
          <Route component={ResetPassword} path="/reset-password/:token" />
          <Route component={ParcelDetail} path="/parcel-detail" />

          {/* Route Khusus User Menggunakan Custom Route UserRoute */}
          <UserRoute component={FillParcel} path="/fill-parcel/:idparcel" />
          <UserRoute component={Cart} path="/cart" />
          <UserRoute component={UploadPayment} path="/upload-payment/:idorder" />
          <UserRoute component={UserTransaction} path="/user-transaction" />
          <UserRoute component={TransactionDetail} path="/transaction-detail/:idorder" />
          <UserRoute component={UserProfile} path="/user-profile" />

          {/* Route Khusus Admin Menggunakan Custom Route AdminRoute */}
          <AdminRoute component={ProductAdmin} path="/productAdmin" />
          <AdminRoute component={ParcelAdmin} path="/parcelAdmin" />
          <AdminRoute component={EditProduct} path="/editProductAdmin" />
          <AdminRoute component={AddProductAdmin} path="/addProductAdmin" />
          <AdminRoute component={AddParcel} path="/addParcel" />
          <AdminRoute component={EditParcel} path="/editParcelAdmin" />
          <AdminRoute component={SalesReport} path="/salesReport" />

          <Route component={NotFound} path="*" />
        </Switch>
        <ToastContainer />
      </>
    )
  }
}

export default connect(null, { keepLogin, getTotalParcel })(App)
