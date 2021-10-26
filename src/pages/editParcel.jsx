import axios from "axios"
import React from "react"

import {Container, Image, Form, FloatingLabel, Button, Modal, Row, Col} from "react-bootstrap"

import {toast} from "react-toastify"

class EditParcel extends React.Component{
    constructor(props){
        super(props)
        this.state={
            parcel : [],
            detail : [],
            nama : "", 
            harga : "",
            desc : "",
            category : [],
            subCategory : [],
            images : "",
            modal : false,
            idparcel : "",
            modalSuccess : [false, ""]
        }
    }
    componentDidMount(){
        window.scrollTo(0,0)
        axios.get(`https://api-parcel-1.purwadhikafs2.com/productAdmin/getParcelbyId/${this.props.location.search.substring(1)}`)
        .then(res => {
            let dataSubCategory = []

            for(let i =0; i<res.data[0].length; i++){
                dataSubCategory.push([])
            }
            this.setState({parcel : res.data[0], detail : res.data[1], nama : res.data[1].parcel_name, harga : res.data[1].parcel_price, desc : res.data[1].parcel_desc, subCategory : dataSubCategory, idparcel : res.data[1].idparcel})
            axios.get(`https://api-parcel-1.purwadhikafs2.com/productAdmin/mainCategories`)
            .then(res =>{
                this.setState({category : res.data})
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    onTambah=()=>{
        let data ={
            idparcel : this.state.idparcel,
            idproduct_category : 0,
            qty_parcel_category : 1,
            category_name : "",
            parent_category_name : ""
        }

        this.setState({
            parcel:[...this.state.parcel, data],
            subCategory : [...this.state.subCategory, []]
        })
        axios.get(`https://api-parcel-1.purwadhikafs2.com/productAdmin/mainCategories`)
        .then(res => {
            this.setState({category : res.data})
        })
        .catch(err => console.log(err))
    }

    onHapus=(index)=>{
        let newIsiParcel = this.state.parcel.filter((item, ind)=> ind !== index)
        let newSubCate = this.state.subCategory.filter((item,ind)=> ind !==index)
        this.setState({parcel : newIsiParcel, subCategory : newSubCate})
    }

    onKategori=(e,index)=>{
        axios.get(`https://api-parcel-1.purwadhikafs2.com/productAdmin/subCategories/${e}`)
        .then(res =>{
            let kate = [...this.state.category]
            let nameCate = kate.filter(item => item.idproduct_category === +e)

            let dataNew=[...this.state.subCategory].slice()
            dataNew[index] = res.data

            let newKategori = [...this.state.parcel]

            newKategori[index].kategori = e
            newKategori[index].parent_category_name = nameCate[0].category_name

            this.setState({subCategory: dataNew,parcel : newKategori})
        })
    }

    onSubKategori =(e,index)=>{
        let newSubKategori =[...this.state.parcel]
        newSubKategori[index].idproduct_category = e
        let newCategoryName = this.state.subCategory[index]
        let newNewCateName = newCategoryName.filter(item => item.idproduct_category === parseInt(e))
        
        newSubKategori[index].category_name = newNewCateName[0].category_name

        this.setState({parcel : newSubKategori})
    }

    onQuantity=(e,index)=>{
        let newQuantity =[...this.state.parcel]
        newQuantity[index].qty_parcel_category = e
        this.setState({parcel : newQuantity})
    }

    handleChoose=(e)=>{
        this.setState({images : e.target.files[0]})
    }

    onEditDeskripsi=()=>{
        let data ={
            parcel_name : this.state.nama,
            parcel_price : this.state.harga,
            parcel_desc : this.state.desc,
            idparcel : this.state.idparcel
        }

        // console.log(data)

        if(!this.state.nama || !this.state.harga || !this.state.desc){
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

        axios.post(`https://api-parcel-1.purwadhikafs2.com/productAdmin/editDeskripsi`, data)
        .then(res =>{
            let dataSubCategory = []

            for(let i =0; i<res.data[0].length; i++){
                dataSubCategory.push([])
            }
            this.setState({ parcel : res.data[0], detail : res.data[1], nama : res.data[1].parcel_name, harga : res.data[1].parcel_price, desc : res.data[1].parcel_desc,  idparcel : res.data[1].idparcel, modalSuccess : res.data[2].success, modal :false,subCategory : dataSubCategory})
        })
    }

    uploadEdit =()=>{
        const photo = new FormData()
        photo.append('new', this.state.images)

        if(!this.state.images){
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

        axios.post(`https://api-parcel-1.purwadhikafs2.com/productAdmin/uploadEditParcel/${this.state.idparcel}/parcels`, photo, {headers:{'Content-Type' : 'multipart/form-data'}})
        .then(res => {
            let dataSubCategory = []

            for(let i =0; i<res.data[0].length; i++){
                dataSubCategory.push([])
            }
            this.setState({ parcel : res.data[0], detail : res.data[1], nama : res.data[1].parcel_name, harga : res.data[1].parcel_price, desc : res.data[1].parcel_desc,  idparcel : res.data[1].idparcel, modalSuccess : res.data[2].success, modal : false, subCategory : dataSubCategory})
        })
    }

    editIsiParcel=()=>{
        let data ={
            newDetail : this.state.parcel,
            idparcel : this.state.idparcel,
            name : this.state.nama
        }

        for(let i=0; i<this.state.parcel.length; i++){
            // console.log(this.state.parcel[i])
            if(this.state.parcel[i].idproduct_category===0){
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
            else if(this.state.parcel[i].qty_parcel_category==="0"){
                return toast.error('Pastikan setiap Kuantitas minimal 1 !', {
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

        // console.log(data)
        if(!this.state.nama || !this.state.idparcel || this.state.parcel.length===0 ){
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
        axios.post(`https://api-parcel-1.purwadhikafs2.com/productAdmin/updateParcel`, data)
        .then(res =>{
            let dataSubCategory = []

            for(let i =0; i<res.data[0].length; i++){
                dataSubCategory.push([])
            }
            this.setState({ parcel : res.data[0], detail : res.data[1], nama : res.data[1].parcel_name, harga : res.data[1].parcel_price, desc : res.data[1].parcel_desc,  idparcel : res.data[1].idparcel, modalSuccess : res.data[2].success, modal : false,subCategory : dataSubCategory})
        })
        .catch(err =>console.log(err))
    }


    render(){
        // console.log(this.state.parcel)
        // console.log(this.state.subCategory)

        if(this.state.modalSuccess[0]===true){
            toast.success(this.state.modalSuccess[1], {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              this.setState({modalSuccess : [false, ""]})
          }
        return(
            <div>
                <Container className="container-fluid">
                    <h1>Edit Parsel</h1>
                    <Row className="justify-content-start">
                        <Col className="col-sm-8 col-md-8 col-lg-4">
                        <div className="d-flex flex-column mb-2">
                    <Image src={`https://api-parcel-1.purwadhikafs2.com/uploads/parcels/${this.state.detail.parcel_image}`} className="me-2 mb-2" width={300} height={340}  rounded />
                    <Button variant="primary" className="mb-2 mx-auto" style={{width:"35%"}} onClick={()=>this.setState({modal : true})}>Upload Gambar</Button>
                    <FloatingLabel controlId="floatingTextarea" label="Nama Parcel" className="mb-3">
                    <Form.Control as="textarea" defaultValue={this.state.nama} onChange={(e)=>this.setState({nama : e.target.value})} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Deskripsi" className="mb-3">
                    <Form.Control as="textarea" defaultValue={this.state.desc}  style={{ height: "100px" }}  ref="desk"/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTextarea" label="Harga" className="mb-3">
                    <Form.Control  type="number" defaultValue={this.state.harga} onChange={(e)=>this.setState({harga : e.target.value})} />
                    </FloatingLabel>
                    <Button variant="success" className="mx-auto" onClick={this.onEditDeskripsi} >Edit Deskripsi Parsel</Button>
                        </div>
                        </Col>
                        <Col className="col-sm-6">
                        
                    <Button variant="primary" style={{width:"28%"}} className="mb-2" onClick={this.onTambah}>Tambah isi parsel</Button>

                    <div>

                    {this.state.parcel.map((item, index)=>{
                        return(
                            <div key={index} className="d-inline-flex mb-2 col-12" >
                        <Form.Select value={item.parent_category_name} onChange={(e)=>this.onKategori(e.target.value, index)}  aria-label="Default select example">
                        <option value={0}>{item.idproduct_category ===0 ? "Kategori" : item.parent_category_name} </option>
                        {this.state.category.map((item, index) =>{
                            return (
                                <option key={`${index}z`} value={item.idproduct_category} onChange={(e)=>this.onQuantity(e.target.value, index)}>{item.category_name}</option>
                            )
                        })}
                        </Form.Select>
                        <Form.Select value={item.idproduct_category} aria-label="Default select example" onChange={(e)=>this.onSubKategori(e.target.value,index)} >
                        <option value={item.idproduct_category ? item.idproduct_category : 0}>{item.idproduct_category === 0 ? "Subkategori" : item.category_name}</option>
                        {this.state.subCategory[index].map((item, index)=>{
                            return(
                                <option key={`a${index}`} value={item.idproduct_category} onChange={(e)=>this.onSubKategori(e.target.value, index)}>{item.category_name}</option>
                            )
                        })}
                        </Form.Select>
                        <Form.Control type="number" placeholder="Kuantitas" value={item.qty_parcel_category} onChange={(e)=>this.onQuantity(e.target.value, index)} min="1"/>
                        <Button variant="danger" onClick={()=>this.onHapus(index)}>Hapus</Button>
                    </div>
                        )
                    })}
                    </div>
                    <Button variant="success" className="me-4" onClick={this.editIsiParcel} >Edit Isi Parsel</Button>
                        </Col>
                    </Row>

                </Container>


                <Modal show={this.state.modal} onHide={()=>this.setState({modal : false})}>
                <Modal.Header closeButton>
                <Modal.Title>Upload Gambar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control type="file"name="new"
                    accept="image/*"
                    onChange={(e)=>this.handleChoose(e)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>this.setState({modal : false})}>
                    Tutup
                </Button>
                <Button Button variant="success" onClick={this.uploadEdit}>
                Simpan
                </Button>
                </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default EditParcel