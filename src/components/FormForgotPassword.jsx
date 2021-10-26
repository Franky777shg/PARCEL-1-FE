import Axios from "axios"
import React, { Component } from "react"
import { Button, Form } from "react-bootstrap"
import { withRouter } from "react-router"
import { toast } from "react-toastify"

const AUTH_API = "https://api-parcel-1.purwadhikafs2.com/auth"

class FormForgotPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmit: false,
    }
  }

  onSubmit = () => {
    const email = this.refs.email.value
    const { history } = this.props

    this.setState({ isSubmit: true })

    Axios.post(`${AUTH_API}/forgot-password`, { email })
      .then((res) => {
        this.setState({ isSubmit: false }, () => {
          toast.success(res.data)
          history.push("/login")
        })
      })
      .catch((err) => {
        this.setState({ isSubmit: false }, () => {
          toast.error(err.response.data)
        })
      })
  }

  render() {
    const { isSubmit } = this.state
    return (
      <>
        <div className="w-75">
          <Form.Control
            className="mb-3"
            type="email"
            name="email"
            placeholder="Masukkan email anda!"
            autoComplete="off"
            required
            ref="email"
          />
        </div>
        <Button
          style={{ backgroundColor: "#8F9B85", border: "none" }}
          size="lg"
          disabled={isSubmit}
          onClick={this.onSubmit}
        >
          Kirim Email
        </Button>
      </>
    )
  }
}

export default withRouter(FormForgotPassword)
