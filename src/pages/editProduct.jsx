import React from "react";
import axios from "axios";


//import styling
import { Image, Form, Button, Modal } from "react-bootstrap";
import {toast} from "react-toastify"

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      category: [],
      categorySelect: "",
      uploadModal : false,
      images: "",
      successModal : false,
      caption : "",
      jual : 0,
      persen : 20
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:2000/productAdmin/getProductId/${this.props.location.search.substring(1)}`)
      .then((res) => {
        this.setState({ product: res.data[0], categorySelect: res.data[0].idproduct_category, jual : res.data[0].product_price });
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
      let idproduct_category= this.state.categorySelect
      let product_desc = this.refs.deskripsi.value
      let product_capital= +this.refs.modal.value
      let product_price = +this.state.jual
      let product_stock = +this.refs.stok.value

      if(!product_name || !idproduct_category || !product_desc || !product_capital || !product_price || !product_stock ){
          return toast.error("Pastikan seluruh form telah terisi", {
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
          idproduct_category,
          product_desc,
          product_capital,
          product_price,
          product_stock
      }
      console.log(data)
      axios.post(`http://localhost:2000/productAdmin/editProduct/${this.state.product.idproduct}`, data)
      .then(res =>{
          this.setState({product: res.data[0], categorySelect: res.data[0].idproduct_category, successModal: true, caption : "Data produk berhasil diubah"})
          this.setState({successModal:false})
      })
      .catch(err => console.log(err))

      
  }

  handleChoose=(e)=>{
      this.setState({images: e.target.files[0]})
  }

  handleUpload =()=>{
      const data = new FormData()
      data.append('new', this.state.images)
      console.log(data.get('new'))

      axios.post(`http://localhost:2000/productAdmin/editUploadProduct/${this.state.product.idproduct}/products`, data, {headers:{'Content-Type': 'multipart/form-data'}}).then(res =>{
          this.setState({product : res.data[0], categorySelect:res.data[0].idproduct_category, successModal: res.data[1].success, uploadModal: false, caption : "Gambar berhasil di upload" })
          this.setState({successModal:false})
      })
      .catch(err => console.log(err))

  }

  render() {
    // console.log(this.state.product);
    // console.log(this.state.category);
    // console.log(this.state.successModal)
    // console.log(this.state.categorySelect);
    // console.log(this.props.location.search.substring(1))
    console.log(this.state.images)
    if(this.state.successModal===true){
        toast.success(this.state.caption, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        
    }
    return (
      <div>
        <h1>Edit Product</h1>
        <div className="d-flex flex-wrap  bd-highlight mb-3 justify-content-center">
            <div className="d-flex flex-column">
          <Image src={`http://localhost:2000/uploads/products/${this.state.product.product_image}`} className="me-2 mb-2" width={300} height={340} />
          <Button variant="primary" style={{width:"35%", margin:"auto", marginTop:"2%"}} onClick={()=>this.setState({uploadModal:true})}>Upload Foto</Button>
            </div>
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
              <Form.Label>Masukkan Keuntungan(%)</Form.Label>
              <Form.Control type="number" defaultValue={this.state.persen} value={this.state.persen} onChange={(e)=>this.setState({persen : e.target.value, jual : (e.target.value/100 * this.refs.modal.value)+parseInt(this.refs.modal.value)})} ref="persen" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control type="number" defaultValue={this.state.product.product_price} ref="harga" value={this.state.jual} onChange={(e)=>this.setState({jual : e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" defaultValue={this.state.product.product_stock} ref="stok" />
            </Form.Group>
          </div>
        </div>
        <Button variant="primary" style={{marginLeft:"75vw"}} onClick={this.confirmEditProduct}>Edit Produk</Button>

        <Modal show={this.state.uploadModal} onHide={()=>this.setState({uploadModal: false})}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Modal.Body>
        <form enctype="multipart/form-data">
        <input 
            type="file"
            name="new"
            accept="image/*"
            onChange={(e)=>this.handleChoose(e)} />
        </form>
        </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.setState({uploadModal: false})}>
            Batal 
          </Button>
          <Button variant="primary" onClick={this.handleUpload}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}
export default EditProduct;

