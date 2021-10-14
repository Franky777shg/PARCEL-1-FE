import React, { Component } from "react"
import { FloatingLabel, Form, Button } from "react-bootstrap"
import { toast } from "react-toastify"
import { connect } from "react-redux"
import { onLogin, getTotalParcel } from "../redux/actions"
import { Link } from "react-router-dom"
import Axios from "axios"

const AUTH_API = "http://localhost:2000/auth"

class FormLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isError: false,
      isSubmit: false,
    }
  }

  onSubmit = () => {
    const { isError } = this.state
    if (isError) {
      this.setState({ isError: false })
    }
    const username = this.refs.username.value
    const password = this.refs.password.value
    if (username === "" || password === "") {
      return this.setState({ isError: true }, () =>
        toast.error("Mohon masukkan seluruh data!!!")
      )
    }

    const userData = {
      username,
      password,
    }

    this.setState({ isSubmit: true })

    Axios.post(`${AUTH_API}/login`, userData)
      .then((res) => {
        const { user, token } = res.data
        localStorage.setItem("token", token)

        this.refs.username.value = ""
        this.refs.password.value = ""

        this.setState({ isSubmit: false })
        toast.success("Masuk akun berhasil!")
        this.props.onLogin(user)
        this.props.getTotalParcel()
      })
      .catch((err) => {
        this.setState({ isSubmit: false })
        toast.error(err.response.data)
      })
  }

  render() {
    const { isError, isSubmit } = this.state

    return (
      <>
        <div className="w-75">
          <FloatingLabel label="Username" className="mb-3">
            <Form.Control
              name="username"
              placeholder="username123"
              autoComplete="off"
              required
              ref="username"
              isInvalid={isError}
            />
          </FloatingLabel>
          <FloatingLabel label="Kata Sandi" className="mb-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="Kata Sandi"
              ref="password"
              isInvalid={isError}
            />
          </FloatingLabel>
          <p>
            Lupa Kata Sandi? <Link to="/forgot-password">Klik disini</Link>
          </p>
          <p className="d-block d-md-none">
            Belum punya akun?{" "}
            <Link className="d-block d-md-none" to="/register">
              Daftar Disini
            </Link>
          </p>
        </div>
        <Button
          style={{ backgroundColor: "#8F9B85", border: "none" }}
          size="lg"
          onClick={this.onSubmit}
          disabled={isSubmit}
        >
          Masuk
        </Button>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.userReducer.isError,
  responseText: state.userReducer.responseText,
})

export default connect(mapStateToProps, { onLogin, getTotalParcel })(FormLogin)
