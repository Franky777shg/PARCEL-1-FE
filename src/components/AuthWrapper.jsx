import React, { Component } from "react"
import { connect } from "react-redux"
import Homepage from "../pages/homepage"
import ParcelAdmin from "../pages/parcelAdmin"
import Layout from "./Layout"

class AuthWrapper extends Component {
  render() {
    const { role } = this.props
    return (
      <>
        {/* Wrapper untuk home, admin = dashboard admin, tamu/user = homepage */}
        {role === "admin" ? (
          <>
            <Layout>
              <ParcelAdmin />
            </Layout>
          </>
        ) : (
          <Homepage />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  role: state.userReducer.role,
})

export default connect(mapStateToProps, {})(AuthWrapper)
