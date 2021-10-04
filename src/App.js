import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import Homepage from "./pages/homepage"
import { ToastContainer } from "react-toastify"
import Register from "./pages/register"
import Login from "./pages/login"

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route component={Homepage} path="/" exact />
          <Route component={Register} path="/register" />
          <Route component={Login} path="/login" />
        </Switch>
        <ToastContainer />
      </>
    )
  }
}

export default App
