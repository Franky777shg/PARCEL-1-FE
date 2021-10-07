import React from  "react"
import {connect} from "react-redux"

//import axios
import axios from "axios"

//import Component Pagination
import Pagination from "../components/pagination"

//import styling dan Icons
import {AiFillPlusCircle} from "react-icons/all"
import {Button, Card} from "react-bootstrap"
import "../style/productAdmin.css"

//import action
import {productForAdmin} from '../redux/actions'

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
            totalItemsV1 : ""
        }
    }


    componentDidMount(){
        axios.get(`http://localhost:2000/productAdmin/getProductPerPage/${this.props.currentPage}`)
            .then(res =>{
                this.setState({productV1: res.data[0], perPageV1:res.data[2].perpage, currentV1:res.data[1].current, totalItemsV1 : res.data[3].totalItems})

                this.props.productForAdmin(this.props.currentPage)

            })
            .catch(err => console.log(err))

    }




    render(){
        const {currentV1, perPageV1,totalItemsV1, productV1}= this.state

        //paginasi 
        const paginate=(pageNum)=> {
            axios.get(`http://localhost:2000/productAdmin/getProductPerPage/${pageNum}`)
            .then(res =>{
                this.setState({productV1: res.data[0], perPageV1:res.data[2].perpage, currentV1:res.data[1].current, totalItemsV1 : res.data[3].totalItems, active: this.props.currentPage})
                this.props.productForAdmin(pageNum)
            })
        }

        //pindah ke halaman selanjutnya
        const nextPage =()=> {
            axios.get(`http://localhost:2000/productAdmin/getProductPerPage/${currentV1+1}`)
            .then(res =>{
                this.setState({productV1: res.data[0], perPageV1:res.data[2].perpage, currentV1:res.data[1].current, totalItemsV1 : res.data[3].totalItems, active: currentV1+1})
            })
        }

        //pindah ke halaman sebelumnya
        const prevPage=()=>{
            axios.get(`http://localhost:2000/productAdmin/getProductPerPage/${currentV1-1}`)
            .then(res =>{
                this.setState({productV1: res.data[0], perPageV1:res.data[2].perpage, currentV1:res.data[1].current, totalItemsV1 : res.data[3].totalItems, active: currentV1-1})
            })
        }

        // console.log(this.state.productV1)
        // console.log(this.state.totalItemsV1)
        // console.log(this.state.perPageV1)
        // console.log(this.state.currentV1)
        console.log(this.props.currentPage)
        console.log(this.props.product)


        return(
            <div style={{backgroundColor:'#F1F1F1'}}>
                <h1>Product Admin</h1>
                <div>
                <Button variant="primary" className="tambah-parcel" as={Link} to={'/addProductAdmin'}><AiFillPlusCircle style={{marginBottom:"3%"}}/> Tambah Produk</Button>
                </div>
                <div className="card-cont" id="product">
                    {productV1.map((item, index) =>{
                        return(
                        <Card style={{ width: '18rem', marginLeft:"1vw", marginBottom:"1vh" }} key={index}>
                        <Card.Img variant="top" src={`http://localhost:2000/uploads/products/${item.product_image}`} style={{height:"35vh"}} />
                        <Card.Body>
                          <Card.Title>{item.product_name}</Card.Title>
                          <Card.Text  style={{height:"30vh"}}>
                              {item.product_desc}
                          <p>
                             Stock : {item.product_stock}

                          </p>
                          </Card.Text>
                          <div style={{display:"flex", marginBottom:"0"}}>
                          <Button variant="primary" style={{marginRight:"1vw"}} as={Link} to={`/editProductAdmin?${item.idproduct}`}>Edit Product</Button>
                          <Button variant="danger">Hapus Product</Button>
                          </div>
                        </Card.Body>
                      </Card>

                        )
                    })}

                </div>

                <Pagination productPerPage={perPageV1} totalProduct={totalItemsV1} paginate={paginate} nextPage={nextPage} prevPage={prevPage} active={this.props.currentPage}/>


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
        activePage : state.adminReducer.active

    }
}


export default connect(mapStateToProps, {productForAdmin}) (ProductAdmin)