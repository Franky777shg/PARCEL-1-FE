import React, { Component } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Redirect, withRouter } from "react-router"
import FormResetPassword from "../components/FormResetPassword"
import { isJWT } from "validator"
import { connect } from "react-redux"

class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: "",
    }
  }

  componentDidMount() {
    const { token } = this.props.match.params
    const { history } = this.props

    const isToken = isJWT(token)

    if (isToken) {
      return this.setState({ token })
    } else {
      history.push("/")
    }
  }

  render() {
    const { token } = this.state

    const { role } = this.props
    if (role === "admin") {
      return <Redirect to="/parcelAdmin" />
    } else if (role === "user") {
      return <Redirect to="/" />
    }

    return (
      <Container>
        <div className="d-flex align-items-center">
          <Row className="w-100 bg-white rounded-3 ms-0 my-5" style={{ minHeight: "75vh" }}>
            <Col className="d-flex flex-column justify-content-center align-items-center p-5">
              <h2 className="fw-bold mb-3">Ubah Kata Sandi Anda</h2>
              <FormResetPassword token={token} />
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  role: state.userReducer.role,
})

export default withRouter(connect(mapStateToProps, {})(ResetPassword))
