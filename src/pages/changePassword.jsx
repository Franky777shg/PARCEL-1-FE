import React, { Component } from "react"
import Axios from "axios"

// import link
import { Link } from "react-router-dom"
//import component
// import Navbar from "../components/Navbar"
//import styling
import "../style/userProfile.css"
import { FloatingLabel, Form, Button } from "react-bootstrap"
import { toast } from "react-toastify"

class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            passwordErr: [false, ""]
        }
    }
    passwordValid = (e) => {
        const numberRegex = /[0-9]/
        const minLengthPassword = 8
        this.setState({ newPassword: e.target.value })
        if (!numberRegex.test(e.target.value) || e.target.value.length < minLengthPassword) return this.setState({ passwordErr: [true, "Kata sandi minimal 8 karakter dan mengandung angka."] })
        return this.setState({ passwordErr: [false, ""], newPassword: e.target.value })
    }

    onChangePassword = () => {
        const body = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        }
        const token = localStorage.getItem("token");
        const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
        if (this.state.newPassword !== this.state.confirmNewPassword) return toast.error("Konfirmasi kata sandi tidak sesuai")

        Axios.post("https://api-parcel-1.purwadhikafs2.com/profile/changePassword", body, axiosConfig).then(res => {
            toast.success(res.data)
            this.setState({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            })
        }
        )
            .catch(err => toast.error(err.response.data))
    }

    render() {
        return (
            <div id="changepassword-container">
                <h1>Ganti Kata Sandi</h1>
                <FloatingLabel label="Masukkan Kata Sandi Anda">
                    <Form.Control type="password" placeholder="Masukkan Kata Sandi Anda" value={this.state.oldPassword} onChange={(e) => this.setState({ oldPassword: e.target.value })} />
                </FloatingLabel>
                <FloatingLabel label="Masukkan Kata Sandi Terbaru">
                    <Form.Control type="password" placeholder="Masukkan Kata Sandi Anda" value={this.state.newPassword} onChange={(e) => this.passwordValid(e)} />
                    <Form.Text className="text-danger">
                        {this.state.passwordErr[0] ? this.state.passwordErr[1] : ""}
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel label="Konfirmasi Kata Sandi Terbaru">
                    <Form.Control type="password" placeholder="Masukkan Kata Sandi Anda" value={this.state.confirmNewPassword} onChange={(e) => this.setState({ confirmNewPassword: e.target.value })} />
                </FloatingLabel>
                <div id="changepassword-button">
                    <Button
                        style={{ backgroundColor: "#8F9B85", border: "none" }} size="lg" onClick={this.onChangePassword}
                    >
                        Ubah Kata Sandi
                    </Button>
                    <Button
                        style={{ backgroundColor: "#EF476F", border: "none" }}
                        size="lg" as={Link} to={`user-profile`}
                    >
                        Kembali
                    </Button>
                </div>
            </div>

        )
    }

}
export default ChangePassword