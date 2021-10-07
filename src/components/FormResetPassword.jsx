import React, { Component } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { toast } from "react-toastify"
import Axios from "axios"
import { withRouter } from "react-router"

const AUTH_API = "http://localhost:2000/auth"

class FormResetPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: "",
      confirmPassword: "",
      visibility: false,
      visibilityConfirm: false,
      errPassword: [false, ""],
      errConfirmPassword: [false, ""],
      isSubmit: false,
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target
    const [errPassword] = this.state.errPassword
    const numberRegex = /[0-9]/
    const minLengthPassword = 8

    switch (name) {
      case "password":
        const isPasswordContainNumber = numberRegex.test(value)
        if (value.length < minLengthPassword || !isPasswordContainNumber)
          return this.setState({
            password: value,
            errPassword: [true, "Kata sandi minimal 8 karakter dan mengandung angka."],
          })
        this.setState({ password: value, errPassword: [false, ""] })
        break
      case "confirmPassword":
        const isPasswordSame = value === this.state.password
        if (!isPasswordSame || errPassword)
          return this.setState({
            confirmPassword: value,
            errConfirmPassword: [true, "Kata sandi tidak cocok."],
          })
        this.setState({ confirmPassword: value, errConfirmPassword: [false, ""] })
        break
      default:
        break
    }
  }

  onSubmit = () => {
    const { password, confirmPassword } = this.state
    const [errPassword] = this.state.errPassword
    const [errConfirmPassword] = this.state.errConfirmPassword
    const { token, history } = this.props
    const AxiosConfig = { headers: { Authorization: `Bearer ${token}` } }

    if (password === "" || confirmPassword === "")
      return toast.error("Mohon masukkan seluruh data!")

    // Check Validasi Input
    if (errPassword === true || errConfirmPassword === true)
      return toast.error("Mohon masukkan data yang valid!")

    if (password !== confirmPassword) return toast.error("Konfirmasi kata sandi tidak cocok!")

    this.setState({ isSubmit: true })

    Axios.post(`${AUTH_API}/reset-password`, { password }, AxiosConfig)
      .then((res) => {
        this.setState({ isSubmit: false })
        toast.success(res.data)
        return history.push("/login")
      })
      .catch((err) => {
        this.setState({ isSubmit: false }, () => toast.error(err.response.data))
      })
  }

  render() {
    const [errPassword, errorPassText] = this.state.errPassword
    const [errConfirmPassword, errorPassConfirmText] = this.state.errConfirmPassword
    const { visibility, visibilityConfirm, password, confirmPassword } = this.state

    return (
      <>
        <div className="w-75">
          <Form.Label className="fw-bold fs-4">Kata Sandi Baru</Form.Label>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Masukkan kata sandi baru anda"
              type={visibility ? "text" : "password"}
              isInvalid={errPassword}
              name="password"
              value={password}
              onChange={(e) => this.handleChange(e)}
            />
            <InputGroup.Text
              onClick={() => this.setState({ visibility: !visibility })}
            >
              {visibility ? <FiEye /> : <FiEyeOff />}
            </InputGroup.Text>
          </InputGroup>
          <Form.Text className="text-danger">{errorPassText}</Form.Text>
          <br />
          <Form.Label className="fw-bold fs-4">Konfirmasi Kata Sandi Baru</Form.Label>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Masukkan ulang kata sandi baru anda"
              type={visibilityConfirm ? "text" : "password"}
              isInvalid={errConfirmPassword}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => this.handleChange(e)}
            />
            <InputGroup.Text
              onClick={() =>
                this.setState({ visibilityConfirm: !visibilityConfirm })
              }
            >
              {visibilityConfirm ? <FiEye /> : <FiEyeOff />}
            </InputGroup.Text>
          </InputGroup>
          <Form.Text className="text-danger">{errorPassConfirmText}</Form.Text>
        </div>
        <br />
        <Button
          style={{ backgroundColor: "#8F9B85", border: "none" }}
          size="lg"
          onClick={this.onSubmit}
        >
          Ubah
        </Button>
      </>
    )
  }
}

export default withRouter(FormResetPassword)
