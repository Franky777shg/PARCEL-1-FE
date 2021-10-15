import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router"
import Layout from "../Layout"

class AdminRoute extends Component {
  render() {
    const { component: Component, role, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(props) => {
          return role === "admin" ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : role === "user" ? (
            <Redirect to="/" />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { referrer: props.location },
              }}
            />
          )
        }}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  role: state.userReducer.role,
})

export default connect(mapStateToProps, {})(AdminRoute)
