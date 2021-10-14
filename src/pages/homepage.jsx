import React, { Component } from "react";

//import axios
import axios from "axios"

//import link
import { Link } from "react-router-dom"

//import component
import Navbar from "../components/Navbar";
import Pagination from "../components/pagination";

//import styling
import { Card, Button, Dropdown, Carousel } from "react-bootstrap";
import "../style/homepage.css";

class Homepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      parcel: [],
      currentPage: "",
      parcelPerPage: "",
      active: 1,
      totalParcels: ""
    }
  }
  componentDidMount() {
    axios.get(`http://localhost:2000/homepage/getHomepage/${1}`)
      .then(res => {
        this.setState({ ...this.state, ...res.data })
        console.log(this.state)
      })
      .catch(err => console.log(err))
  }

  onSort = (sort) => {
    console.log(sort)

  }

  render() {
    const { currentPage, parcelPerPage, totalParcels } = this.state

    //pindah ke halaman tertentu
    const paginate = (pageNum) => {
      axios.get(`http://localhost:2000/homepage/getHomepage/${pageNum}`)
        .then(res => {

          this.setState({ ...this.state, ...res.data, active: pageNum })
        })
    }
    //halaman selanjutnya
    const nextPage = () => {
      axios.get(`http://localhost:2000/homepage/getHomepage/${currentPage + 1}`)
        .then(res => {
          this.setState({ ...this.state, ...res.data, active: currentPage + 1 })
        })
    }
    //halaman sebelumnya
    const prevPage = () => {
      axios.get(`http://localhost:2000/homepage/getHomepage/${currentPage - 1}`)
        .then(res => {
          this.setState({ ...this.state, ...res.data, active: currentPage - 1 })
        })
    }


    return (
      <div className="main-container">
        <div className="navbar-homepage">
          <Navbar />
        </div>
        <div className="content-container">
          <div className="filter">
            <h3>Filter Parsel</h3>
            <p>Berdasarkan Kategori</p>
            <form action="kategori">
              <div className="checkbox">
                <input type="checkbox" id="Makanan" />
                <label htmlFor="Makanan">Makanan</label>
              </div>
              <div className="checkbox">
                <input type="checkbox" id="Minuman" />
                <label htmlFor="Minuman">Minuman</label>
              </div>
              <div className="checkbox">
                <input type="checkbox" id="Pakaian" />
                <label htmlFor="Pakaian">Pakaian</label>
              </div>
              <div className="checkbox">
                <input type="checkbox" id="Sembako" />
                <label htmlFor="Sembako">Sembako</label>
              </div>
              <div className="checkbox">
                <input type="checkbox" id="Perabotan" />
                <label htmlFor="Perabotan">Perabotan</label>
              </div>
              <div className="checkbox">
                <input type="checkbox" id="Kesehatan" />
                <label htmlFor="Kesehatan">Kesehatan</label>
              </div>
            </form>
            <Button style={{ backgroundColor: "#7792A8", border: "none" }}>
              Reset Filter
            </Button>
          </div>
          <div className="content">
            <div className="carouseldropdown-container">

              <Carousel variant="dark">
                <Carousel.Item >
                  <img
                    className="d-block w-100"
                    src="https://media.istockphoto.com/photos/blue-light-background-old-grunge-texture-blank-pastel-abstract-paper-picture-id1217216727?b=1&k=20&m=1217216727&s=170667a&w=0&h=ZhFnbRzvTZ5dEHQfF3dt2-m1I8Rb3fMqhlo7clboXeI="
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h5>Custom parsel dengan produk pilihanmu sendiri</h5>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                  <img
                    className="d-block w-100"
                    src="https://media.istockphoto.com/photos/blue-light-background-old-grunge-texture-blank-pastel-abstract-paper-picture-id1217216727?b=1&k=20&m=1217216727&s=170667a&w=0&h=ZhFnbRzvTZ5dEHQfF3dt2-m1I8Rb3fMqhlo7clboXeI="
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <h5>Pilih parsel sesuai keperluan anda</h5>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
              <Dropdown className="dropdown">
                <Dropdown.Toggle
                  style={{ backgroundColor: "#7792A8", border: "none", marginLeft: "5vw" }}
                >
                  Sort
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" onClick={() => this.onSort("parcel_name")}>by Parsel Name (A-Z)</Dropdown.Item>
                  <Dropdown.Item href="#/action-1" onClick={() => this.onSort("parcel_name")}>by Parsel Name (Z-A)</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={() => this.onSort("parcel_price")}>by Parsel Price (Low - High)</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={() => this.onSort("parcel_price")}>by Parsel Price (High - Low)</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="card-container">
              {this.state.parcel.map((item, index) => {
                return (
                  <Card style={{ width: "18rem" }} key={index}>
                    <Card.Img variant="top" src={`http://localhost:2000/uploads/parcels/${item.parcel_image}`} style={{ height: "15vh", marginTop: "1vh" }} />
                    <Card.Body>
                      <Card.Title> <b> {item.parcel_name} </b></Card.Title>
                      <div className="card-desc">
                        <Card.Text>
                          {item.parcel_desc}

                        </Card.Text>
                        <Card.Text>
                          <b> Rp. {(item.parcel_price).toLocaleString()} </b>
                        </Card.Text>

                        <Button
                          style={{ backgroundColor: "#8F9B85", border: "none" }}
                          as={Link} to={`/parcel-detail/?${item.idparcel}`}
                        >
                          Detail Parsel
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                )
              })}
            </div>
            <Pagination productPerPage={parcelPerPage} totalProduct={totalParcels} paginate={paginate} nextPage={nextPage} prevPage={prevPage} active={this.state.active} />
          </div>
        </div>
        <div className="footer">
          <h3 style={{ textAlign: "center" }} >© 2021 ADJ Parcel</h3>
        </div>
      </div>
    );
  }
}

export default Homepage;
