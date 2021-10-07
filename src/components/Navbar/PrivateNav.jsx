import React, { Component } from "react"
import { connect } from "react-redux"
import NavAdmin from "./NavAdmin"
import NavUser from "./NavUser"
import { onLogout } from "../../redux/actions"
import { withRouter } from "react-router"

class PrivateNav extends Component {
  pushToHomepage = () => {
    const { history } = this.props
    history.push("/")
  }

  onLogout = () => {
    localStorage.removeItem("token")
    this.props.onLogout()
    this.pushToHomepage()
  }

  render() {
    const { role } = this.props
    return (
      <>
        {role === "user" && <NavUser onLogout={this.onLogout} />}
        {role === "admin" && <NavAdmin onLogout={this.onLogout} />}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  role: state.userReducer.role,
})

export default withRouter(connect(mapStateToProps, { onLogout })(PrivateNav))
