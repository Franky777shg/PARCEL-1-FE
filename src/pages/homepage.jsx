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
import NumberFormat from "react-number-format"

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parcel: [],
      currentPage: "",
      parcelPerPage: "",
      active: 1,
      totalParcels: "",
      filterID: []
    }
  }
  componentDidMount() {
    axios.get(`https://api-parcel-1.purwadhikafs2.com/homepage/getHomepage/${1}`)
      .then(res => {
        this.setState({ ...this.state, ...res.data })
        // console.log(this.state)
      })
      .catch(err => console.log(err))
  }
  onResetFilter = () => {
    axios.get(`https://api-parcel-1.purwadhikafs2.com/homepage/getHomepage/${1}`)
      .then(res => {
        this.setState({ ...this.state, ...res.data })
        // console.log(this.state)
      })
      .catch(err => console.log(err))
  }
  onSort = (sortMethod) => {
    const body = {
      "sortMethod": sortMethod
    }
    axios.post(`https://api-parcel-1.purwadhikafs2.com/homepage/sortParcel`, body)
      .then(res => {
        this.setState({ ...this.state, ...res.data })
      })
      .catch(err => console.log(err))
  }
  onFilter = () => {
    if (this.state.filterID.length !== 0) {
      const body = {
        "idProductCategory": this.state.filterID
      }
      axios.post(`https://api-parcel-1.purwadhikafs2.com/homepage/filterParcel/1`, body)
        .then(res => {
          this.setState({ ...this.state, ...res.data, active: 1 })
        })
        .catch(err => console.log(err))
    } else {
      axios.get(`https://api-parcel-1.purwadhikafs2.com/homepage/getHomepage/1`)
        .then(res => {

          this.setState({ ...this.state, ...res.data, active: 1 })
        })
    }
  }
  onChangeFilter = (value) => {
    const { filterID } = this.state
    let filterIDNew = []
    if (filterID.includes(value)) {
      filterIDNew = filterID.filter(item => {
        return item !== value
      })
      // console.log(filterIDNew)
    }
    else { filterIDNew = [...filterID, value] }
    this.setState({ filterID: filterIDNew }, () => this.onFilter())
  }

  //pindah ke halaman tertentu
  paginate = (pageNum) => {
    if (this.state.filterID.length !== 0) {
      const body = {
        "idProductCategory": this.state.filterID
      }
      axios.post(`https://api-parcel-1.purwadhikafs2.com/homepage/filterParcel/${pageNum}`, body)
        .then(res => {
          this.setState({ ...this.state, ...res.data, active: pageNum })
        })
        .catch(err => console.log(err))
    } else {
      axios.get(`https://api-parcel-1.purwadhikafs2.com/homepage/getHomepage/${pageNum}`)
        .then(res => {

          this.setState({ ...this.state, ...res.data, active: pageNum })
        })
    }
  }
  //halaman selanjutnya
  nextPage = () => {
    const { currentPage } = this.state
    if (this.state.filterID.length !== 0) {
      const body = {
        "idProductCategory": this.state.filterID
      }
      axios.post(`https://api-parcel-1.purwadhikafs2.com/homepage/filterParcel/${currentPage + 1}`, body)
        .then(res => {
          this.setState({ ...this.state, ...res.data, active: currentPage + 1 })
        })
        .catch(err => console.log(err))
    }
    else {
      axios.get(`https://api-parcel-1.purwadhikafs2.com/homepage/getHomepage/${currentPage + 1}`)
        .then(res => {
          this.setState({ ...this.state, ...res.data, active: currentPage + 1 })
        })
    }
  }
  //halaman sebelumnya
  prevPage = () => {
    const { currentPage } = this.state
    if (this.state.filterID.length !== 0) {
      const body = {
        "idProductCategory": this.state.filterID
      }
      axios.post(`https://api-parcel-1.purwadhikafs2.com/homepage/filterParcel/${currentPage - 1}`, body)
        .then(res => {
          this.setState({ ...this.state, ...res.data, active: currentPage - 1 })
        })
        .catch(err => console.log(err))
    } else {
      axios.get(`https://api-parcel-1.purwadhikafs2.com/homepage/getHomepage/${currentPage - 1}`)
        .then(res => {
          this.setState({ ...this.state, ...res.data, active: currentPage - 1 })
        })
    }
  }
  render() {
    // console.log(this.state.filterID)
    const { parcelPerPage, totalParcels } = this.state


    return (
      <div className="main-container">
        <div className="navbar-homepage">
          <Navbar />
        </div>
        <div className="content-container">
          <div className="filter">
            <h3>Filter Parsel</h3>
            <h5>Berdasarkan Isi :</h5>
            <div className="checkbox-container">
              <form action="kategori">
                <div className="checkbox">
                  <input type="checkbox" id="Makanan" value={2} onChange={(e) => this.onChangeFilter(+e.target.value)} checked={this.state.filterID.includes(2) ? true : false} />
                  <label htmlFor="Makanan">Makanan</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" id="Minuman" value={3} onChange={(e) => this.onChangeFilter(+e.target.value)} checked={this.state.filterID.includes(3) ? true : false} />
                  <label htmlFor="Minuman">Minuman</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" id="Pakaian" value={4} onChange={(e) => this.onChangeFilter(+e.target.value)} checked={this.state.filterID.includes(4) ? true : false} />
                  <label htmlFor="Pakaian">Pakaian</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" id="Kesehatan" value={5} onChange={(e) => this.onChangeFilter(+e.target.value)} checked={this.state.filterID.includes(5) ? true : false} />
                  <label htmlFor="Kesehatan">Kesehatan</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" id="Sembako" value={6} onChange={(e) => this.onChangeFilter(+e.target.value)} checked={this.state.filterID.includes(6) ? true : false} />
                  <label htmlFor="Sembako">Sembako</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" id="Perabotan" value={7} onChange={(e) => this.onChangeFilter(+e.target.value)} checked={this.state.filterID.includes(7) ? true : false} />
                  <label htmlFor="Perabotan">Perabotan</label>
                </div>
              </form>
            </div>
            <Button style={{ backgroundColor: "#7792A8", border: "none" }} onClick={this.onResetFilter}>
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
                    <h4><b>Custom parsel dengan produk pilihanmu sendiri</b></h4>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                  <img
                    className="d-block w-100"
                    src="https://media.istockphoto.com/photos/blue-light-background-old-grunge-texture-blank-pastel-abstract-paper-picture-id1217216727?b=1&k=20&m=1217216727&s=170667a&w=0&h=ZhFnbRzvTZ5dEHQfF3dt2-m1I8Rb3fMqhlo7clboXeI="
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <h4><b>Pilih parsel sesuai keperluan anda</b></h4>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
              <Dropdown className="dropdown">
                <Dropdown.Toggle
                  style={{ backgroundColor: "#7792A8", border: "none", marginLeft: "5vw" }}
                >
                  Urutkan
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-2" onClick={() => this.onSort("asc")}>Berdasarkan Harga (Terendah - Tertinggi)</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={() => this.onSort("desc")}>Berdasarkan Harga (Tertinggi - Terendah)</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="card-container">
              {this.state.parcel.map((item, index) => {
                return (
                  <Card style={{ width: "18rem" }} key={index}>
                    <Card.Img variant="top" src={`https://api-parcel-1.purwadhikafs2.com/uploads/parcels/${item.parcel_image}`} style={{ height: "15vh", marginTop: "1vh" }} />
                    <Card.Body>
                      <Card.Title> <b> {item.parcel_name} </b></Card.Title>
                      <div className="card-desc">
                        <Card.Text>
                          {item.parcel_desc}
                        </Card.Text>
                        <Card.Text>
                          <b><NumberFormat
                            value={item.parcel_price}
                            prefix="Rp. "
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                          /></b>
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
            <Pagination productPerPage={parcelPerPage} totalProduct={totalParcels} paginate={this.paginate} nextPage={this.nextPage} prevPage={this.prevPage} active={this.state.active} />
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
