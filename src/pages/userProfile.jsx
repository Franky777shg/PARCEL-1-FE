import React, { Component } from "react";
import Axios from "axios";

//import redux
import { connect } from "react-redux";
//import link
import { Link } from "react-router-dom"

//import styling
import "../style/userProfile.css"
import { Button, Image, Form, Row, Col } from "react-bootstrap"
import { toast } from "react-toastify"
import noImage from "../assets/img/no-avatar.jpeg"

//import action
import { updateData, uploadAvatar, removeAvatar } from "../redux/actions"
const URL_UPLOAD_AVATAR =
    "http://localhost:2000/profile/updateProfilePhoto/avatars";
const URL_REMOVE_AVATAR =
    "http://localhost:2000/profile/removeProfilePhoto"

class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            address: "",
            avatar: "",
            nameErr: [false, ""],
            addressErr: [false, ""],
            emailErr: [false, ""]
        }
    }

    componentDidMount() {
        const { name, email, address } = this.props
        this.setState({ name, email, address })
    }

    onChangeName = (value) => {
        if (!value) {
            this.setState({ name: value })
            return this.setState({ nameErr: [true, "Nama harus diisi!"] })
        } else {
            this.setState({ name: value })
            return this.setState({ nameErr: [false, ""] })
        }
    }
    onChangeEmail = (value) => {
        const emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!value) {
            this.setState({ email: value })
            return this.setState({ emailErr: [true, "Email harus diisi !"] })
        } else if (!emailRegex.test(value)) {
            this.setState({ email: value })
            return this.setState({ emailErr: [true, "Mohon masukkan email yang valid!"] })
        } else {
            this.setState({ email: value })
            return this.setState({ emailErr: [false, ""] })
        }
    }
    onChangeAddress = (value) => {
        if (!value) {
            this.setState({ address: value })
            return this.setState({ addressErr: [true, "Alamat harus diisi!"] })
        } else {
            this.setState({ address: value })
            return this.setState({ addressErr: [false, ""] })
        }
    }
    handleChoose = (e) => {
        // console.log("e.target.files", e.target.files)
        this.setState({ avatar: e.target.files[0] })
    }
    handleUpload = () => {
        const data = new FormData()
        // console.log(data) //create new data (empty/default)
        data.append("new", this.state.avatar)
        const token = localStorage.getItem("token");
        const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
        Axios.put(URL_UPLOAD_AVATAR, data, axiosConfig).then((res) => {
            toast.success("Berhasil ubah foto profil")
            this.props.uploadAvatar(res.data)
        });
        // console.log(data.get("new")) //new data after append (key + value)
    }
    onSave = () => {
        const newData = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            gender: this.refs.gender.value || null,
            age: +this.refs.age.value
        }
        const { name, email, address } = newData
        //cek semua input terisi
        if (!name || !email || !address)
            return toast.error("Masukkan semua data")
        //cek validasi email input
        if (this.state.emailErr[0] === true)
            return toast.error("Email tidak valid")
        else this.props.updateData(newData)
        return toast.success("Data profil berhasil diubah")
    }
    onRemoveAvatar = () => {
        const token = localStorage.getItem("token");
        const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
        Axios.put(URL_REMOVE_AVATAR, null, axiosConfig).then(
            (res) => {
                if (this.props.avatar === null)
                    return toast.error("Tidak ada foto untuk dihapus")
                else
                    this.props.removeAvatar()
                toast.success("Foto profil berhasil dihapus")
            }
        ).catch(err => console.log(err.response))
    }

    render() {
        // console.log(this.props)
        // console.log(this.state.avatar)
        return (
            <div>
                <h1 id="profilH1">Profil Anda</h1>
                <div id="editprofile-container">
                    <div id="profile-form-container">
                        <Form>
                            <Form.Group as={Row} className="mb-2" controlId="formPlaintextUsername">
                                <Form.Label column sm="2">
                                    Username
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={this.props.username} />
                                </Col>
                            </Form.Group>
                            <Button style={{ backgroundColor: "#7792A8", border: "none", marginBottom: "3vh" }} as={Link} to={`user-profile-change-password`}>
                                Ubah Kata Sandi
                            </Button>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="2">
                                    Nama Lengkap
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" value={this.state.name} onChange={(e) => this.onChangeName(e.target.value)} className="profile-form" />
                                    <Form.Text className="text-danger">
                                        {this.state.nameErr[0] ? this.state.nameErr[1] : ""}
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="email" value={this.state.email} onChange={(e) => this.onChangeEmail(e.target.value)} className="profile-form" />
                                    <Form.Text className="text-danger">
                                        {this.state.emailErr[0] ? this.state.emailErr[1] : ""}
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
                                <Form.Label column sm="2">
                                    Alamat
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" value={this.state.address} onChange={(e) => this.onChangeAddress(e.target.value)}
                                        className="profile-form" />
                                    <Form.Text className="text-danger">
                                        {this.state.addressErr[0] ? this.state.addressErr[1] : ""}
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextGender">
                                <Form.Label column sm="2">
                                    Gender
                                </Form.Label>
                                <Form.Select aria-label="Default select example" className="mb-3, profile-form" defaultValue={this.props.gender || null} ref="gender" id="gender-form">
                                    <option value="">Jenis Kelamin</option>
                                    <option value="MALE">Laki-laki</option>
                                    <option value="FEMALE">Perempuan</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextAge">
                                <Form.Label column sm="2">
                                    Umur
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="number" defaultValue={this.props.age} ref="age" className="profile-form" min="1" />
                                </Col>
                            </Form.Group>
                        </Form>
                        <Button
                            id="profile-save"
                            size="lg" onClick={this.onSave}
                        >
                            Simpan
                        </Button>
                    </div>
                    <div id="profile-avatar">
                        <Col xs={6} md={4}>
                            {this.props.avatar ? <Image src={`http://localhost:2000/uploads/avatars/${this.props.avatar}`} roundedCircle width={250} height={250} /> : <Image src={noImage} roundedCircle width={250} height={250} />}

                        </Col>
                        <form encType="multipart/form-data">
                            <input
                                type="file"
                                accept="image/*"
                                name="new"
                                onChange={(e) => this.handleChoose(e)}
                            />
                        </form>
                        <Button
                            className="button, profile-avatar-button"
                            variant="success"
                            onClick={this.handleUpload} style={{ backgroundColor: "#7792A8", border: "none" }}
                        >
                            Upload
                        </Button>
                        <Button
                            className="profile-avatar-button"
                            style={{ backgroundColor: "#EF476F", border: "none" }} onClick={this.onRemoveAvatar}
                        >
                            Hapus
                        </Button>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        idusers: state.userReducer.idusers,
        username: state.userReducer.username,
        role: state.userReducer.role,
        email: state.userReducer.email,
        name: state.userReducer.name,
        address: state.userReducer.address,
        avatar: state.userReducer.avatar,
        gender: state.userReducer.gender,
        age: state.userReducer.age,
    }
}

export default connect(mapStateToProps, { updateData, uploadAvatar, removeAvatar })(UserProfile)


