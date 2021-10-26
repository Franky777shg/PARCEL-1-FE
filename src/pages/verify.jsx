import axios from "axios"
import React, { Component } from "react"
import { Container } from "react-bootstrap"
import { withRouter } from "react-router"

const AUTH_API = "http://localhost:2000/auth"

class Verify extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      verifySuccess: false,
      responseText: "",
    }
  }

  componentDidMount() {
    const { token } = this.props.match.params
    const verifyLink = `${AUTH_API}/verify`
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }
    const { history } = this.props
    if (token) {
      axios
        .post(verifyLink, null, axiosConfig)
        .then((res) => {
          this.setState(
            {
              verifySuccess: true,
              responseText: res.data,
              isLoading: false,
            },
            () => {
              setTimeout(() => {
                history.push("/login")
              }, 6000)
            }
          )
        })
        .catch((err) => {
          this.setState({ responseText: err.response.data, isLoading: false }, () => {
            setTimeout(() => {
              history.push("/")
            }, 6000)
          })
        })
    }
  }

  render() {
    const { verifySuccess, isLoading, responseText } = this.state
    return (
      <>
        <Container>
          <div className="d-flex flex-column align-items-center justify-content-center m-5">
            <h1 className="fw-bold">Verifikasi Akun</h1>
            {isLoading ? (
              <h3>Mohon tunggu sebentar...</h3>
            ) : verifySuccess ? (
              <>
                <h3>{responseText}</h3>
                <h4>Anda akan diarahkan ke halaman login...</h4>
              </>
            ) : (
              <>
                <h3>{responseText}</h3>
                <h4>Anda akan diarahkan ke halaman utama...</h4>
              </>
            )}
          </div>
        </Container>
      </>
    )
  }
}

export default withRouter(Verify)
