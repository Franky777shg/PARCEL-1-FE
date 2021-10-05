import React from "react";
import axios from "axios";
import { Image, Form, Button } from "react-bootstrap";
import {toast} from "react-toastify"

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      category: [],
      categorySelect: "",
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:2000/productAdmin/getProductId/${this.props.location.search.substring(1)}`)
      .then((res) => {
        this.setState({ product: res.data[0], categorySelect: res.data[0].idproduct_category });
        axios
          .get(`http://localhost:2000/productAdmin/productCategories`)
          .then((res) => {
            this.setState({ category: res.data });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  confirmEditProduct=()=>{
      let product_name = this.refs.namaProduk.value
      let product_category= this.state.categorySelect
      let product_desc = this.refs.deskripsi.value
      let product_capital= this.refs.modal.value
      let product_price = this.refs.harga.value
      let product_stock = this.refs.stok.value

      if(!product_name || !product_category || !product_desc || !product_capital || !product_price || !product_stock ){
          return toast.error("Periksa Kembali seluruh form telah terisi", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
      }

      // data yang dikirim untuk edit produk
      let data ={
          product_name,
          product_category,
          product_desc,
          product_capital,
          product_price,
          product_stock
      }
      console.log(data)

      
  }

  render() {
    // console.log(this.state.product);
    // console.log(this.state.category);
    // console.log(this.state.categorySelect);
    console.log(this.props.location.search.substring(1))
    return (
      <div>
        <h1>Edit Product</h1>
        <div className="d-flex flex-wrap  bd-highlight mb-3 justify-content-center">
          <Image src={`http://localhost:2000/uploads/products/${this.state.product.product_image}`} className="me-2" width={300} height={340} />
          <div style={{width:"40vw"}}>

            <Form.Label>Nama Produk</Form.Label>
            <Form.Control type="text" defaultValue={this.state.product.product_name} ref="namaProduk" />

            <Form.Label>Kategori</Form.Label>
            <Form.Select aria-label="Default select example" onChange={(e)=>this.setState({categorySelect: e.target.value})}>
              <option value={this.state.product.idproduct_category} >
                {this.state.product.category_name}
              </option>
              {this.state.category.map((item) => {
                return <option value={item.idproduct_category}>{item.category_name}</option>;
              })}
            </Form.Select>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Deskripsi Produk</Form.Label>
              <Form.Control defaultValue={this.state.product.product_desc} as="textarea" rows={4} ref="deskripsi" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Harga Modal Produk</Form.Label>
              <Form.Control type="number" defaultValue={this.state.product.product_capital} ref="modal" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control type="number" defaultValue={this.state.product.product_price} ref="harga" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" defaultValue={this.state.product.product_stock} ref="stok" />
            </Form.Group>
          </div>
        </div>
        <Button variant="primary" style={{marginLeft:"75vw"}} onClick={this.confirmEditProduct}>Edit Produk</Button>
      </div>
    );
  }
}
export default EditProduct;

