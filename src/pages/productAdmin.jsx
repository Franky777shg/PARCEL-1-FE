import React from  "react"
import {connect} from "react-redux"

//import Component Pagination
import Pagination from "../components/pagination"

//import styling dan Icons
import {AiFillPlusCircle} from "react-icons/all"
import {Button, Card, Modal} from "react-bootstrap"
import "../style/productAdmin.css"
import {toast} from "react-toastify"

//import action
import {productForAdmin, deleteProduct, modalSuccess} from '../redux/actions'

//import Link
import {Link} from "react-router-dom"

class ProductAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            active : 1,
            currentV1 : "",
            productV1 : [],
            perPageV1 : "",
            totalItemsV1 : "",
            name : "",
            id : 0,
            modal : false
        }
    }


    componentDidMount(){
        window.scrollTo(0,0)
        this.props.productForAdmin(this.props.currentPage)
    }

    onDeleteModal=(id,name)=>{
        // console.log(id)
        this.setState({id : id, name :name, modal :true})
        
    }

    onDelete=()=>{
        let data={
            id :this.state.id,
            name :this.state.name,
            page : this.props.currentPage
        }
        // console.log(data)

        this.props.deleteProduct(data)
        this.setState({modal : false})

    }

    changeModal =()=>{
        this.props.modalSuccess()
    }



    render(){
        // console.log(this.props.modal)

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


        //paginasi 
        const paginate=(pageNum)=> {
            this.props.productForAdmin(pageNum)
            window.scrollTo(0,0)
        }

        //pindah ke halaman selanjutnya
        const nextPage =()=> {
            this.props.productForAdmin(this.props.currentPage+1)
            window.scrollTo(0,0)
        }

        //pindah ke halaman sebelumnya
        const prevPage=()=>{
            this.props.productForAdmin(this.props.currentPage-1)
            window.scrollTo(0,0)
        }

        // console.log(this.state.productV1)
        // console.log(this.state.totalItemsV1)
        // console.log(this.state.perPageV1)
        // console.log(this.state.currentV1)
        // console.log(this.props.currentPage)
        // console.log(this.props.product)
        // console.log(this.props.modal)



        return(
            <div style={{backgroundColor:'#F1F1F1'}}>
                <h1>Product Admin</h1>
                <div>
                <Button variant="primary" className="tambah-parcel" as={Link} to={'/addProductAdmin'}><AiFillPlusCircle style={{marginBottom:"3%"}}/> Tambah Produk</Button>
                </div>

                <div className="card-cont" id="product">
                    {this.props.product.map((item, index) =>{
                        return(
                        <Card style={{ width: '18rem', marginLeft:"1vw", marginBottom:"1vh" }} key={index}>
                        <Card.Img variant="top" src={`https://api-parcel-1.purwadhikafs2.com/uploads/products/${item.product_image}`} style={{height:"35vh"}} />
                        <Card.Body>
                          <Card.Title>{item.product_name}</Card.Title>
                          <Card.Text className="overflow-auto"  style={{height:"25vh"}}>
                              {item.product_desc}
                          <p>
                             Stock : {item.product_stock}

                          </p>
                          </Card.Text>
                          <div style={{display:"flex"}} className="mt-auto">
                          <Button variant="primary" style={{marginRight:"1vw"}} as={Link} to={`/editProductAdmin?${item.idproduct}`}>Edit Product</Button>
                          <Button variant="danger" onClick={()=>this.onDeleteModal(item.idproduct, item.product_name)}>Hapus Product</Button>
                          </div>
                        </Card.Body>
                      </Card>

                        )
                    })}

                </div>

                <Pagination productPerPage={this.props.productPerPage} totalProduct={this.props.totalProduct} paginate={paginate} nextPage={nextPage} prevPage={prevPage} active={this.props.currentPage}/>

                <Modal show={this.state.modal} onHide={()=>this.setState({modal : false})}>
                <Modal.Header closeButton>
                <Modal.Title>Peringatan</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah anda yakin menghapus produk {this.state.name} ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>this.setState({modal : false})}>
                Batal
                </Button>
                <Button variant="success" onClick={this.onDelete}>
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
        currentPage : state.adminReducer.currentPage,
        productPerPage : state.adminReducer.productPerPage,
        totalProduct : state.adminReducer.totalProduct,
        product : state.adminReducer.product,
        activePage : state.adminReducer.active,
        modal : state.adminReducer.modal

    }
}


export default connect(mapStateToProps, {productForAdmin, deleteProduct, modalSuccess}) (ProductAdmin)