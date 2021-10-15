import React, { Component } from "react";
import axios from "axios";

//import component
import Navbar from "../components/Navbar";

//import redux
import { connect } from "react-redux";

//import link
import { Link, Redirect } from "react-router-dom";

//import styling
import { Button } from "react-bootstrap";
import "../style/parcelDetail.css";

class ParcelDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parcelName: "",
      parcelDesc: "",
      parcelPrice: "",
      parcelImage: "",
      parcelItems: [],
      toLogin: false,
    };
  }

  componentDidMount() {
    const idParcel = this.props.location.search.substring(1);

    axios
      .get(`http://localhost:2000/homepage/parcelDetail/${idParcel}`)
      .then((res) => {
        this.setState({
          parcelName: res.data[0].parcel_name,
          parcelDesc: res.data[0].parcel_desc,
          parcelPrice: res.data[0].parcel_price,
          parcelImage: res.data[0].parcel_image,
          parcelItems: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const {
      parcelName,
      parcelDesc,
      parcelPrice,
      parcelImage,
      toLogin,
      parcelItems,
    } = this.state;

    if (toLogin) {
      return <Redirect to="/login" />;
    }

    console.log(this.props)

    return (
      <div>
        <Navbar />
        <div className="content-container">
          <div className="parcel-container">
            <img
              src={`http://localhost:2000/uploads/parcels/${parcelImage}`}
              alt=""
              className="image-detail"
            />
            <div className="detail-container">
              <h1 style={{ textAlign: "start" }}>{parcelName}</h1>
              <p>{parcelDesc}</p>
              <p>Anda dapat mengisi parcel dengan produk berikut:</p>
              <div className="parcelitems-container">
                <div id="parcelItems">
                  {parcelItems.map((item, index) => {
                    return <p key={index}>{item.category_name}</p>;
                  })}
                </div>
                <p>
                  {parcelItems.map((item, index) => {
                    return <p key={index}>{item.qty_parcel_category} Pcs</p>;
                  })}{" "}
                </p>
              </div>
            </div>
            <div className="button-detail">
              <h5>
                <b>Rp. {parcelPrice.toLocaleString()}</b>
              </h5>
              <Button
                style={{ backgroundColor: "#8F9B85", border: "none" }}
                as={Link}
                to={`/fill-parcel/${this.props.location.search.substring(1)}`}
              >
                Kreasikan Parsel Sekarang
              </Button>

              <Button
                style={{ backgroundColor: "#EF476F", border: "none" }}
                as={Link}
                to={`/`}
              >
                Kembali ke halaman utama
              </Button>
            </div>
          </div>
        </div>

        <div className="footer">
          <h3 style={{ textAlign: "center" }}>© 2021 ADJ Parcel</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
  };
};

export default connect(mapStateToProps)(ParcelDetail);
