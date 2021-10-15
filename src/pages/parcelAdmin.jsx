import React from "react"
import {connect} from "react-redux"


//import styling 
import {Card, Button, Modal} from "react-bootstrap"
import "../style/parcelAdmin.css"
import {toast} from "react-toastify"

//import Icons 
import {AiFillPlusCircle} from "react-icons/all"

//import Pagination
import Pagination from "../components/pagination"

//import Link
import {Link} from "react-router-dom"

//import action
import {parcelForAdmin, deleteParcel, modalSuccess} from "../redux/actions"

import axios from "axios"

class ParcelAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            parcel :[],
            currentPage :"",
            productPerPage : "",
            active : 1,
            totalItems : "",
            modal : false,
            nama : "",
            id : ""
        }
    }
    

    componentDidMount(){
        window.scrollTo(0,0)
        this.props.parcelForAdmin(this.props.currentPage)
        
    }

    onDelete=(id, name)=>{
        this.setState({modal : true, nama : name, id : id})
    }

    onDeleteParcel=()=>{
        let data ={
            id : this.state.id,
            nama : this.state.nama,
            page : this.props.currentPage
        }

        // console.log(data)
        this.props.deleteParcel(data)
    }

    changeModal =()=>{
        this.props.modalSuccess()
        this.setState({modal : false, id : "", nama : ""})
    }




    render(){

        if(this.props.modal[0]===true){
            toast.success(this.props.modal[1], {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.changeModal()
        }

        const paginate=(pageNum)=> {
            this.props.parcelForAdmin(pageNum)
            window.scrollTo(0,0)
        }

        //halaman selanjutnya
        const nextPage =()=> {
            this.props.parcelForAdmin(this.props.currentPage+1)
            window.scrollTo(0,0)
        }

        //halaman sebelumnya
        const prevPage=()=>{
            this.props.parcelForAdmin(this.props.currentPage-1)
            window.scrollTo(0,0)
        }


        return(
            <div className="w-100 p-3">
                <h1>Parsel</h1>
                <div>
                <Button variant="primary" className="tambahProduk" as={Link} to="/addParcel"><AiFillPlusCircle style={{marginBottom:"3%"}}/> Tambah Produk</Button>
                </div>

                <div className="card-cont" id="product">
                    {this.props.parcel.map((item, index) =>{
                        return(
                        <Card className="card" key={index}>
                        <Card.Img variant="top" src={`http://localhost:2000/uploads/parcels/${item.parcel_image}`} style={{height:"30vh"}} />
                        <Card.Body>
                          <Card.Title>{item.parcel_name}</Card.Title>
                          <Card.Text style={{height:"20vh"}}>
                              {item.parcel_desc}
                              <p>Rp. {(item.parcel_price).toLocaleString()}</p>
                          </Card.Text>
                         
                          <div style={{display:"flex"}}>
                          <Button variant="primary" style={{marginRight:"1vw"}} as={Link} to={`/editParcelAdmin?${item.idparcel}`}>Edit Parcel</Button>
                          <Button variant="danger" onClick={()=>this.onDelete(item.idparcel, item.parcel_name)}>Hapus Parcel</Button>
                          </div>
                        </Card.Body>
                      </Card>

                        )
                    })}

                </div>
                <Pagination productPerPage={this.props.productPerPage} totalProduct={this.props.totalParcel} paginate={paginate} nextPage={nextPage} prevPage={prevPage} active={this.props.currentPage} />

                <Modal show={this.state.modal} onHide={()=>this.setState({modal : false})}>
                <Modal.Header closeButton>
                <Modal.Title>Peringatan</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah anda yakin menghapus {this.state.nama} ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>this.setState({modal : false})}>
                Batal
                </Button>
                <Button variant="success" onClick={this.onDeleteParcel}>
                Hapus
                </Button>
                </Modal.Footer>
                </Modal>


            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        currentPage : state.adminReducer.currentPageParcel,
        productPerPage : state.adminReducer.parcelPerPage,
        totalParcel : state.adminReducer.totalParcel,
        parcel : state.adminReducer.parcel,
        activePage : state.adminReducer.activeParcel,
        modal : state.adminReducer.modal
    }
}

export default connect(mapStateToProps, {parcelForAdmin, deleteParcel, modalSuccess}) (ParcelAdmin)