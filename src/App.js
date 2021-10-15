import React, { Component } from "react"
import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { keepLogin, getTotalParcel } from "./redux/actions";
import AuthWrapper from "./components/AuthWrapper"
import Layout from "./components/Layout"
import NotFound from "./pages/404"
import AddParcel from "./pages/addParcel"
import AddProductAdmin from "./pages/addProductAdmin"
import Cart from "./pages/cart"
import EditProduct from "./pages/editProduct"
import EditParcel from "./pages/editParcel"
import FillParcel from "./pages/fillParcel"
import ForgotPassword from "./pages/forgotPassword"

//import Pages
import Login from "./pages/login";
import ParcelAdmin from "./pages/parcelAdmin";
import ParcelDetail from "./pages/parcelDetail";
import ProductAdmin from "./pages/productAdmin";
import Register from "./pages/register";
import ResetPassword from "./pages/resetPassword";
import uploadPayment from "./pages/uploadPayment";
import UserTransaction from "./pages/userTransaction";
import Verify from "./pages/verify";
import UserProfile from "./pages/userProfile";
import TransactionDetail from "./pages/transactionDetail";

class App extends Component {
  componentDidMount() {
    this.props.keepLogin();
    this.props.getTotalParcel();
  }

  render() {
    const { role } = this.props;
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
          <Route component={FillParcel} path="/fill-parcel/:idparcel" />

          {/* Route Khusus User */}
          {role === "user" && (
            <>
              <Layout>
                <Switch>
                  <Route component={Cart} path="/cart" />
                  <Route
                    component={uploadPayment}
                    path="/upload-payment/:idorder"
                  />
                  <Route component={UserTransaction} path="/user-transaction" />
                  <Route component={TransactionDetail} path="/transaction-detail/:idorder" />
                  <Route component={UserProfile} path="/user-profile" />
                  <Route component={NotFound} path="*" />
                </Switch>
              </Layout>
            </>
          )}

          {/* Route Khusus Admin */}
          {role === "admin" && (
            <>
              <Layout>
                <Switch>
                  <Route component={ProductAdmin} path="/productAdmin" />
                  <Route component={ParcelAdmin} path="/parcelAdmin" />
                  <Route component={EditProduct} path="/editProductAdmin" />
                  <Route component={AddProductAdmin} path="/addProductAdmin" />
                  <Route component={AddParcel} path="/addParcel" />
                  <Route component={EditParcel} path="/editParcelAdmin" />
                  <Route component={NotFound} path="*" />
                </Switch>
              </Layout>
            </>
          )}

          {/* Route Not Found For Guest */}
          <Route component={NotFound} path="*" />
        </Switch>
        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  role: state.userReducer.role,
});

export default connect(mapStateToProps, { keepLogin, getTotalParcel })(App);
