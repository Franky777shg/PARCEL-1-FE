import React, { Component } from "react"
import { FloatingLabel, Form, Button } from "react-bootstrap"
import { toast } from "react-toastify"
import { connect } from "react-redux"
import { onLogin } from "../redux/actions"
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
      this.setState({ ...this.state, isError: false })
    }
    const username = this.refs.username.value
    const password = this.refs.password.value
    if (username === "" || password === "") {
      return this.setState({ ...this.state, isError: true }, () =>
        toast.error("Mohon masukkan seluruh data!!!")
      )
    }

    const userData = {
      username,
      password,
    }

    this.setState({ ...this.state, isSubmit: true })

    Axios.post(`${AUTH_API}/login`, userData)
      .then((res) => {
        const { user, token } = res.data
        localStorage.setItem("token", token)

        this.refs.username.value = ""
        this.refs.password.value = ""

        this.setState({ ...this.state, isSubmit: false })
        toast.success("Masuk akun berhasil!")
        this.props.onLogin(user)
      })
      .catch((err) => {
        this.setState({ ...this.state, isSubmit: false })
        toast.error(err.response.data)
      })
  }

  render() {
    const { isError, isSubmit } = this.state

    return (
      <>
        <div className="w-50">
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

export default connect(mapStateToProps, { onLogin })(FormLogin)
