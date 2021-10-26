import axios from "axios"
import React, { Component } from "react"
import { FloatingLabel, Form, Button } from "react-bootstrap"
import { toast } from "react-toastify"
import { isEmail } from "validator"
import { withRouter } from "react-router"

const AUTH_API = "https://api-parcel-1.purwadhikafs2.com/auth"

class FormRegister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      email: "",
      name: "",
      address: "",
      password: "",
      confirmPassword: "",
      errUsername: [false, ""],
      errEmail: [false, ""],
      errPassword: [false, ""],
      errConfirmPassword: [false, ""],
      isSubmit: false,
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target
    const numberRegex = /[0-9]/
    const minLengthUsername = 8
    const minLengthPassword = 8
    switch (name) {
      case "username":
        const isUsernameContainNumber = numberRegex.test(value)
        if (value.length < minLengthUsername || !isUsernameContainNumber)
          return this.setState({
            username: value,
            errUsername: [true, "Username minimal 8 karakter dan mengandung angka!"],
          })
        this.setState({ username: value, errUsername: [false, ""] })
        break
      case "email":
        const emailValid = isEmail(value)
        if (!emailValid)
          return this.setState({
            email: value,
            errEmail: [true, "Mohon masukkan email yang valid!."],
          })
        this.setState({ email: value, errEmail: [false, ""] })
        break
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
        if (!isPasswordSame)
          return this.setState({
            confirmPassword: value,
            errConfirmPassword: [true, "Kata sandi tidak cocok."],
          })
        this.setState({ confirmPassword: value, errConfirmPassword: [false, ""] })
        break
      default:
        this.setState({
          [name]: value,
        })
    }
  }

  onSubmit = () => {
    const { username, email, name, address, password, confirmPassword } = this.state
    const [errUsername] = this.state.errUsername
    const [errEmail] = this.state.errEmail
    const [errPassword] = this.state.errPassword
    const [errConfirmPassword] = this.state.errConfirmPassword

    // Check Input Kosong
    if (
      username === "" ||
      email === "" ||
      name === "" ||
      address === "" ||
      password === "" ||
      confirmPassword === ""
    )
      return toast.error("Mohon masukkan seluruh data!")

    // Check Validasi Input
    if (
      errUsername === true ||
      errEmail === true ||
      errPassword === true ||
      errConfirmPassword === true
    )
      return toast.error("Mohon masukkan data yang valid!")
    
    if ( password !== confirmPassword) return toast.error("Konfirmasi kata sandi tidak cocok!")

    const newUser = {
      username,
      email,
      name,
      address,
      password,
    }

    this.setState({ isSubmit: true })

    axios
      .post(`${AUTH_API}/register`, newUser)
      .then((res) => {
        this.setState({ isSubmit: false })
        toast.success(res.data)
        return this.props.history.push("/login")
      })
      .catch((err) => {
        this.setState({ isSubmit: false }, () => toast.error(err.response.data))
      })
  }

  render() {
    const { username, email, name, address, password, confirmPassword, isSubmit } = this.state
    const [errUsername, errTextUsername] = this.state.errUsername
    const [errEmail, errTextEmail] = this.state.errEmail
    const [errPassword, errTextPassword] = this.state.errPassword
    const [errConfirmPassword, errTextConfirmPassword] = this.state.errConfirmPassword

    return (
      <>
        <div className="w-50">
          <FloatingLabel label="Username" className="mb-3">
            <Form.Control
              name="username"
              placeholder="username123"
              value={username}
              onChange={(e) => this.handleChange(e)}
              isInvalid={errUsername}
              autoComplete="off"
              required
            />
            <Form.Text className="text-danger">{errTextUsername}</Form.Text>
          </FloatingLabel>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              name="email"
              type="email"
              placeholder="emailsaya@mail.com"
              isInvalid={errEmail}
              value={email}
              onChange={(e) => this.handleChange(e)}
              autoComplete="off"
            />
            <Form.Text className="text-danger">{errTextEmail}</Form.Text>
          </FloatingLabel>
          <FloatingLabel
            label="Nama Lengkap"
            className="mb-3"
            value={name}
            onChange={(e) => this.handleChange(e)}
            autoComplete="off"
          >
            <Form.Control name="name" placeholder="Nama Lengkap" />
          </FloatingLabel>
          <FloatingLabel
            label="Alamat"
            className="mb-3"
            value={address}
            onChange={(e) => this.handleChange(e)}
            autoComplete="off"
          >
            <Form.Control name="address" placeholder="Alamat Saya" />
          </FloatingLabel>
          <FloatingLabel label="Kata Sandi" className="mb-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => this.handleChange(e)}
              isInvalid={errPassword}
            />
            <Form.Text className="text-danger">{errTextPassword}</Form.Text>
          </FloatingLabel>
          <FloatingLabel label="Konfirmasi Kata Sandi" className="mb-3">
            <Form.Control
              name="confirmPassword"
              type="password"
              placeholder="Konfirmasi Kata Sandi"
              value={confirmPassword}
              onChange={(e) => this.handleChange(e)}
              isInvalid={errConfirmPassword}
            />
            <Form.Text className="text-danger">{errTextConfirmPassword}</Form.Text>
          </FloatingLabel>
        </div>
        <Button
          style={{ backgroundColor: "#8F9B85", border: "none" }}
          size="lg"
          onClick={this.onSubmit}
          disabled={isSubmit}
        >
          Daftar
        </Button>
      </>
    )
  }
}

export default withRouter(FormRegister)
