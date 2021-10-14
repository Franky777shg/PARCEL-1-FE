import React, { Component } from "react";
import Axios from "axios";

//import redux
import { connect } from "react-redux";

//import styling
import "../style/userProfile.css"
import { Button, Image, Form, Row, Col } from "react-bootstrap"

//import action
import { updateData } from "../redux/actions"

class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            address: ""
        }
    }

    componentDidMount() {
        const { name, email, address } = this.props
        this.setState({ name, email, address })
    }

    onChangeName = (value) => {
        if (!value) {
            this.setState({ name: value })
            alert("error name")
        } else {
            this.setState({ name: value })
        }
    }
    onChangeEmail = (value) => {
        if (!value) {
            this.setState({ email: value })
            alert("error email")
        } else {
            this.setState({ email: value })
        }
    }
    onChangeAddress = (value) => {
        if (!value) {
            this.setState({ address: value })
            alert("error address")
        } else {
            this.setState({ address: value })
        }
    }
    onSave = () => {
        const newData = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            gender: this.refs.gender.value || null,
            age: +this.refs.age.value
        }
        this.props.updateData(newData)
    }

    render() {
        return (
            <div>
                <h1 id="profilH1">Profil Anda</h1>
                <div id="editprofile-container">
                    <div id="profile-form">
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextUsername">
                                <Form.Label column sm="2">
                                    Username
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={this.props.username} />
                                </Col>
                            </Form.Group>
                            <Button style={{ backgroundColor: "#7792A8", border: "none", marginBottom: "3vh" }}>
                                Ubah Kata Sandi
                            </Button>

                            <Form.Group as={Row} className="mb-4" controlId="formPlaintextName">
                                <Form.Label column sm="2">
                                    Nama Lengkap
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" value={this.state.name} onChange={(e) => this.onChangeName(e.target.value)} className="profile-form" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="email" value={this.state.email} onChange={(e) => this.onChangeEmail(e.target.value)} className="profile-form" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-4" controlId="formPlaintextAddress">
                                <Form.Label column sm="2">
                                    Alamat
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" value={this.state.address} onChange={(e) => this.onChangeAddress(e.target.value)}
                                        className="profile-form" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Select aria-label="Default select example" className="mb-4" id="gender-form" defaultValue={this.props.gender || null} ref="gender">
                                <option value="">Jenis Kelamin</option>
                                <option value="MALE">Laki-laki</option>
                                <option value="FEMALE">Perempuan</option>
                            </Form.Select>
                            <Form.Group as={Row} className="mb-4" controlId="formPlaintextAge">
                                <Form.Label column sm="2">
                                    Umur
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="number" defaultValue={this.props.age} ref="age" className="profile-form" />
                                </Col>
                            </Form.Group>
                        </Form>
                        <div id="profile-avatar">
                            <Col xs={6} md={4}>
                                <Image src="https://images.unsplash.com/photo-1633118342855-221562c9e7bd?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDc5fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" roundedCircle width={250} height={250} />
                            </Col>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Default file input example</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </div>
                    </div>
                    <div id="profile-save">
                        <Button
                            style={{ backgroundColor: "#8F9B85", border: "none" }} size="lg" onClick={this.onSave}
                        >
                            Simpan
                        </Button>
                        <Button
                            style={{ backgroundColor: "#EF476F", border: "none" }}
                            size="lg"
                        >
                            Reset
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

export default connect(mapStateToProps, { updateData })(UserProfile)


