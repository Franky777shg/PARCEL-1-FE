import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

//import Pages
import Login from "./pages/login"
import Register from "./pages/register"
import ProductAdmin from "./pages/productAdmin"
import ParcelAdmin from "./pages/parcelAdmin"
import EditProduct from "./pages/editProduct"
import Verify from "./pages/verify"
import { connect } from "react-redux"
import { keepLogin } from "./redux/actions"
import AddProductAdmin from "./pages/addProductAdmin"
import NotFound from "./pages/404"
import ForgotPassword from "./pages/forgotPassword"
import ResetPassword from "./pages/resetPassword"
import Layout from "./components/Layout"
import AuthWrapper from "./components/AuthWrapper"

class App extends Component {
  componentDidMount() {
    this.props.keepLogin()
  }

  render() {
    const { role } = this.props
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

          {/* Route Khusus User */}
          {/* Soon */}

          {/* Route Khusus Admin */}
          {role === "admin" && (
            <>
              <Layout>
                <Route component={ProductAdmin} path="/productAdmin" />
                <Route component={ParcelAdmin} path="/parcelAdmin" />
                <Route component={EditProduct} path="/editProductAdmin" />
                <Route component={AddProductAdmin} path="/addProductAdmin" />
              </Layout>
              <Route component={NotFound} path="*" />
            </>
          )}
          
          <Route component={NotFound} path="*" />
        </Switch>
        <ToastContainer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  role: state.userReducer.role,
})

export default connect(mapStateToProps, { keepLogin })(App)
