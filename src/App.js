import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

//import Pages
import Homepage from "./pages/homepage"
import Login from "./pages/login"
import Register from "./pages/register"
import ProductAdmin from "./pages/productAdmin"
import ParcelAdmin from "./pages/parcelAdmin"
import Verify from "./pages/verify"
import { connect } from "react-redux"
import { keepLogin } from "./redux/actions"
import NotFound from "./pages/404"

class App extends Component {
  componentDidMount() {
    this.props.keepLogin()
  }

  render() {
    return (
      <>
        <Switch>
          <Route component={Homepage} path="/" exact />
          <Route component={Register} path="/register" />
          <Route component={Login} path="/login" />
          <Route component={Verify} path="/verify/:token" />
          <Route component={ProductAdmin} path="/productAdmin" />
          <Route component={ParcelAdmin} path="/parcelAdmin" />
          <Route component={NotFound} path="*" />
        </Switch>
        <ToastContainer />
      </>
    )
  }
}

export default connect(null, { keepLogin })(App)
