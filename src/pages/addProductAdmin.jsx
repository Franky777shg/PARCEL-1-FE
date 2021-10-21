import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

class AddProductAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jual: 0,
      kategori: [],
      categorySelect: "",
      persen: 20,
      idproduct: "",
      successModal: false,
      caption: "",
      images: "",
      gambar: "",
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:2000/productAdmin/productCategories`)
      .then((res) => {
        this.setState({ kategori: res.data });
      });
  }

  price = (e) => {
    this.setState({ persen: e.target.value });
    this.setState({ jual: this.state.persen * this.refs.modal.value });
  };

  handleChoose = (e) => {
    this.setState({
      images: e.target.files[0],
      gambar: e.target.files[0].name,
    });
    // console.log(this.state.images)
  };

  addProduk = () => {
    let idproduct_category = this.state.categorySelect;
    let name = this.refs.namaProduk.value;
    let desc = this.refs.deskripsi.value;
    let capital = +this.refs.modal.value;
    let price = +this.state.jual;
    let stock = +this.refs.stok.value;

    const photo = new FormData();
    photo.append("new", this.state.images);
    console.log(photo.get("new"));

    let data = {
      idproduct_category,
      name,
      desc,
      capital,
      price,
      stock,
    };
    console.log(data);

    if (
      !idproduct_category ||
      !name ||
      !desc ||
      !capital ||
      !price ||
      !stock ||
      !this.state.images
    ) {
      return toast.error("Pastikan seluruh form telah terisi", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    axios
      .post(`http://localhost:2000/productAdmin/addProductAdmin`, data)
      .then((res) => {
        this.setState({ idproduct: res.data.idproduct });
        axios
          .post(
            `http://localhost:2000/productAdmin/editUploadProduct/${this.state.idproduct}/products`,
            photo,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((res) => {
            this.setState({
              caption: "Data produk berhasil ditambahkan",
              successModal: true,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  render() {
    // console.log(this.state.kategori)
    // console.log(this.state.jual)
    console.log(this.state.images);
    if (this.state.successModal === true) {
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
        <h1>Tambah Produk</h1>
        <div className="d-flex flex-wrap  bd-highlight mb-3 justify-content-center">
          {/* <div className="d-flex flex-column">
          <Image src={this.state.gambar ? this.state.gambar : ""} className="me-2 mb-2" width={300} height={340} />
          <form enctype="multipart/form-data">
        <input 
            type="file"
            name="new"
            accept="image/*"
            onChange={(e)=>this.handleChoose(e)}
             />
        </form>
            </div> */}
          <div style={{ width: "40vw" }}>
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              type="text"
              placeholder="masukkan nama Produk"
              ref="namaProduk"
            />

            <Form.Label>Kategori</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) =>
                this.setState({ categorySelect: e.target.value })
              }
            >
              <option>Pilih Kategori</option>
              {this.state.kategori.map((item, index) => {
                return (
                  <option key={index} value={item.idproduct_category}>
                    {item.category_name}
                  </option>
                );
              })}
            </Form.Select>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Deskripsi Produk</Form.Label>
              <Form.Control
                placeholder="masukkan deskripsi produk"
                as="textarea"
                rows={4}
                ref="deskripsi"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Harga Modal Produk</Form.Label>
              <Form.Control
                type="number"
                placeholder="masukkan Harga Modal"
                onChange={(e) =>
                  this.setState({
                    jual:
                      (e.target.value * this.state.persen) / 100 +
                      parseInt(e.target.value),
                  })
                }
                ref="modal"
                min="1"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Masukkan Keuntungan(%)</Form.Label>
              <Form.Control
                type="number"
                defaultValue={this.state.persen}
                value={this.state.persen}
                onChange={(e) =>
                  this.setState({
                    persen: e.target.value,
                    jual:
                      (e.target.value / 100) * this.refs.modal.value +
                      parseInt(this.refs.modal.value),
                  })
                }
                ref="persen"
                min="1"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control
                type="number"
                placeholder="harga Jual"
                value={this.state.jual}
                onChange={(e) => this.setState({ jual: e.target.value })}
                ref="harga"
                min="1"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="masukkan stok produk"
                ref="stok"
              />
            </Form.Group>
            <form enctype="multipart/form-data">
              <input
                type="file"
                name="new"
                accept="image/*"
                onChange={(e) => this.handleChoose(e)}
              />
            </form>
          </div>
        </div>
        <Button
          variant="primary"
          style={{
            width: "15%",
            margin: "auto",
            marginTop: "2%",
            marginLeft: "55%",
          }}
          onClick={this.addProduk}
        >
          Tambah Produk
        </Button>
      </div>
    );
  }
}

export default AddProductAdmin;
