import React from "react";

// import Styling
import { Container, Col, Row,  Form, FloatingLabel, Button } from "react-bootstrap";
import {toast} from "react-toastify"
import {MdAdd} from "react-icons/all"

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
      modal : [],
      newSubCategory : [],
      categoryName : ""
    };
  }

  componentDidMount(){
    axios.get(`https://api-parcel-1.purwadhikafs2.com/productAdmin/mainCategories`)
    .then(res =>{
        this.setState({category : res.data})
    })
  }

  onTambah=()=>{
      let data ={
          idparcel : this.state.idparcel,
          idproduct_category : 0,
          qty_parcel_category : 1
      }

      this.setState({
        isiParcel :[...this.state.isiParcel, data],
        subCategory:[...this.state.subCategory,[]],
      })
      axios.get(`https://api-parcel-1.purwadhikafs2.com/productAdmin/mainCategories`)
      .then(res =>{
        this.setState({category : res.data})
        
    })
  }

  onHapus=(index)=>{
      // console.log(index)
      let newPar = this.state.isiParcel.filter((item,ind)=>ind !== index)
      let newSubCate = this.state.subCategory.filter((item,ind)=> ind !==index)
      this.setState({isiParcel : newPar, subCategory : newSubCate})

  }

  onKategori=(e,index)=>{
    axios.get(`https://api-parcel-1.purwadhikafs2.com/productAdmin/subCategories/${e}`)
    .then(res=>{
      // console.log(res.data)
      let dataNew =[...this.state.subCategory].slice()
      dataNew[index]= res.data

      this.setState({subCategory :dataNew})
      let newKategori =[...this.state.isiParcel]
      newKategori[index].kategori = e
      this.setState({isiParcel : newKategori})
    })
    
  }

  onSubKategori=(e,index)=>{
      // console.log(e, index)
      let newSubKategori=[...this.state.isiParcel]
      newSubKategori[index].idproduct_category = e
      // console.log(this.state.isiParcel)
      this.setState({isiParcel : newSubKategori})
  }

  onQuantity=(e, index)=>{
      let newQuantity=[...this.state.isiParcel]
      newQuantity[index].qty_parcel_category = e
      
      // console.log(this.state.isiParcel)
      this.setState({isiParcel : newQuantity})
      
  }

  handleChoose=(e)=>{
    this.setState({images: e.target.files[0], gambar : e.target.files[0].name})
  }

  onNewSubKategori=(e, name)=>{
    axios.get(`https://api-parcel-1.purwadhikafs2.com/productAdmin/subCategories/${e}`)
    .then(res =>{
      this.setState({newSubCategory : res.data, categoryName : name })
    })
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


      for(let i=0; i<newItems.newItems.length; i++){
        if(newItems.newItems[i].idproduct_category===0){
          return toast.error('Pastikan setiap kategori telah telah terisi!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        else if(newItems.newItems[i].qty_parcel_category === "0"){
          return toast.error('Pastikan setiap kuantitas minimal berjumlah 1 !', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      }

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
      axios.post(`https://api-parcel-1.purwadhikafs2.com/productAdmin/addParcel`, data)
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
        axios.post(`https://api-parcel-1.purwadhikafs2.com/productAdmin/uploadParcel/${this.state.idparcel}/parcels`,photo, {headers:{'Content-Type' : 'multipart/form-data'}})
        .then(res =>{
          this.setState({ modal :res.data})
          axios.post(`https://api-parcel-1.purwadhikafs2.com/productAdmin/addParcelItens`,newParcelDetail)
          .then(res =>{
          this.setState({idparcel : 0, modal:[false, ""]})
        })
        
        })
        .catch(err=>console.log(err))
      })
      .catch(err => console.log(err))


  }


  render() {
    // console.log(this.state.isiParcel)
    // console.log(this.state.subCategory)
    // console.log(this.state.quantity)
    // console.log(this.state.categoryName)
    

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
      
    return (
      <div>
        <Container className="container-fluid">
            <h1>Add Parcel</h1>
          <Row className="justify-content-start">
            <Col className="col-sm-12 col-md-8 col-lg-4">
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file"name="new"
            accept="image/*"
            onChange={(e)=>this.handleChoose(e)} />
            </Form.Group>
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
            <Button variant="primary" onClick={this.onTambah}><MdAdd/> Tambah isi parsel</Button>

            {this.state.isiParcel.map((item,index)=>{
                return(
                    <div key={index} className="d-inline-flex mb-2 col-12">
                        <Form.Select value={item.kategori} onChange={(e)=>this.onKategori(e.target.value, index)} aria-label="Default select example">
                        <option value={0}>Kategori </option>
                        {this.state.category.map((item, index) =>{
                            return (
                                <option key={index} value={item.idproduct_category} onChange={(e)=>this.onQuantity(e.target.value, index)}>{item.category_name}</option>
                            )
                        })}
                        </Form.Select>
                        <Form.Select aria-label="Default select example" value={item.idproduct_category} onChange={(e)=>this.onSubKategori(e.target.value, index)}>
                        <option value={0}>SubKategori</option>
                        {this.state.subCategory[index].map((item,index)=>{
                            return(
                                <option key={index} value={item.idproduct_category} onChange={(e)=>this.onSubKategori(e.target.value, index)}>{item.category_name}</option>
                            )
                        })}
                        </Form.Select>
                        <Form.Control type="number" placeholder="Kuantitas"  value={item.qty_parcel_category} onChange={(e)=>this.onQuantity(e.target.value, index)} min="1"/>
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
