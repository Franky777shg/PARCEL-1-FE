import React from "react";

// import Styling
import { Container, Col, Row,  Form, FloatingLabel, Button } from "react-bootstrap";
import {toast} from "react-toastify"

//import axios
import axios from "axios";

//import Redirect 
import {Redirect} from "react-router-dom"

class AddParcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      harga : 0,
      isiParcel : [],
      category : [],
      subCategory : [],
      idparcel : 0,
      images : "",
      gambar : "",
      modal : []
    };
  }

  componentDidMount(){
    axios.get(`http://localhost:2000/productAdmin/mainCategories`)
    .then(res =>{
        this.setState({category : res.data})
    })
  }

  onTambah=()=>{
      let data ={
          idparcel : this.state.idparcel,
          idproduct_category : "",
          qty_parcel_category : 1
      }

      this.setState({
        isiParcel :[...this.state.isiParcel, data],
        subCategory:[...this.state.subCategory,[]]})
      axios.get(`http://localhost:2000/productAdmin/mainCategories`)
    .then(res =>{
        this.setState({category : res.data})
        
    })
  }

  onHapus=(index)=>{
      // console.log(index)
      let newIsiParcel = [...this.state.isiParcel].splice(1,index)
      this.setState({isiParcel : newIsiParcel})

  }

  onKategori=(e,index)=>{
    axios.get(`http://localhost:2000/productAdmin/subCategories/${e}`)
    .then(res=>{
      // console.log(res.data)
      let dataNew =[...this.state.subCategory].slice()
      dataNew[index]= res.data
      // dataNew.push(res.data)
      // dataNew = res.data
      // console.log(dataNew)

      // let newSubCate = [...this.state.subCategory]
      // console.log(newSubCate)
      // let newSubCategory =[...this.state.subCategory].splice(1,index,dataNew)
      // newSubCategory=res.data
      // console.log(newSubCategory)
        this.setState({subCategory :dataNew})
    })
      // console.log(e, index)
      let newKategori =[...this.state.isiParcel]
      newKategori[index].kategori = e
    //   console.log(newKategori)
    // console.log(this.state.isiParcel)
    
  }

  onSubKategori=(e,index)=>{
      // console.log(e, index)
      let newSubKategori=[...this.state.isiParcel]
      newSubKategori[index].idproduct_category = e
      // console.log(this.state.isiParcel)
  }

  onQuantity=(e, index)=>{
      let newQuantity=[...this.state.isiParcel]
      newQuantity[index].qty_parcel_category = e
      // console.log(this.state.isiParcel)
      
  }

  handleChoose=(e)=>{
    this.setState({images: e.target.files[0], gambar : e.target.files[0].name})
    // console.log(this.state.images)
  }


  onTambahParcel=()=>{
      let data={
          nama : this.state.nama,
          price : this.state.harga,
          desc : this.refs.desk.value
      }
      let newItems={
        newItems : this.state.isiParcel
      }

      const photo = new FormData()
      photo.append('new', this.state.images)
      // console.log(photo.get('new'))
      // console.log(newItems)
      // console.log(photo.values)

      if(!data.nama || !data.price || !data.desc || !this.state.images || newItems.newItems.length===0){
        return toast.error('Pastikan semua form telah terisi!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

      // console.log(data)
      axios.post(`http://localhost:2000/productAdmin/addParcel`, data)
      .then(res =>{
        let newItemsIdParcel = newItems.newItems
        let parcelDetail =[]
        for(let i=0; i<newItemsIdParcel.length; i++){
          newItemsIdParcel[i].idparcel = res.data[0].idparcel
          parcelDetail.push(newItemsIdParcel[i])
        }

        let newParcelDetail ={
          parcelDetail
        }

        this.setState({idparcel : res.data[0].idparcel})
        axios.post(`http://localhost:2000/productAdmin/uploadParcel/${this.state.idparcel}/parcels`,photo, {headers:{'Content-Type' : 'multipart/form-data'}})
        .then(res =>{
          this.setState({ modal :res.data})
          axios.post(`http://localhost:2000/productAdmin/addParcelItens`,newParcelDetail)
          .then(res =>{
          this.setState({idparcel : 0, modal:[false, ""]})
        })
        
        })
        .catch(err=>console.log(err))
      })
      .catch(err => console.log(err))


  }


  render() {

    if(this.state.modal[0]===true){
      toast.success(this.state.modal[1], {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        return <Redirect to="/parcelAdmin" />
    }
      // console.log(this.state.isiParcel)
      // console.log(this.state.subCategory)
      // console.log(this.state.images)
      // console.log(this.state.idparcel)
    return (
      <div>
        <Container>
            <h1>Add Parcel</h1>
          <Row>
            <Col className="col-4">
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file"name="new"
            accept="image/*"
            onChange={(e)=>this.handleChoose(e)} />
            </Form.Group>
              {/* <Image src="holder.js/171x180" rounded /> */}
              <FloatingLabel controlId="floatingTextarea" label="Nama Parcel" className="mb-3">
                <Form.Control as="textarea" onChange={(e)=>this.setState({nama : e.target.value})} />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput" label="Deskripsi" className="mb-3">
                <Form.Control as="textarea"  style={{ height: "100px" }}  ref="desk"/>
              </FloatingLabel>

              <FloatingLabel controlId="floatingTextarea" label="Harga" className="mb-3">
                <Form.Control  type="number" onChange={(e)=>this.setState({harga : e.target.value})} />
              </FloatingLabel>
            </Col>
            <Col className="col-6">
            <Button variant="primary" onClick={this.onTambah}>Tambah isi parsel</Button>

            {this.state.isiParcel.map((item,index)=>{
                return(
                    <div key={index} className="d-inline-flex mb-2">
                        <Form.Select onChange={(e)=>this.onKategori(e.target.value, index)} aria-label="Default select example">
                        <option>Kategori </option>
                        {this.state.category.map((item, index) =>{
                            return (
                                <option key={index} value={item.idproduct_category} onChange={(e)=>this.onQuantity(e.target.value, index)}>{item.category_name}</option>
                            )
                        })}
                        </Form.Select>
                        <Form.Select aria-label="Default select example" onChange={(e)=>this.onSubKategori(e.target.value, index)}>
                        <option>SubKategori</option>
                        {this.state.subCategory[index].map((item,index)=>{
                            return(
                                <option key={index} value={item.idproduct_category} onChange={(e)=>this.onSubKategori(e.target.value, index)}>{item.category_name}</option>
                            )
                        })}
                        </Form.Select>
                        <Form.Control type="number" placeholder="Kuantitas" defaultValue={1} onChange={(e)=>this.onQuantity(e.target.value, index)}/>
                        <Button variant="danger" onClick={()=>this.onHapus(index)} >Hapus</Button>
                    </div>
                )
            })}

            </Col>
          </Row>
          <Button variant="success" onClick={this.onTambahParcel}>Tambah</Button>
        </Container>
      </div>
    );
  }
}

export default AddParcel;
