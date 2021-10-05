import React from  "react"

//import axios
import axios from "axios"

//import Component Pagination
import Pagination from "../components/pagination"

//import styling dan Icons
import {AiFillPlusCircle} from "react-icons/all"
import {Button, Card} from "react-bootstrap"
import "../style/productAdmin.css"

//import Link
import {Link} from "react-router-dom"

class ProductAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            product :[],
            currentPage :1,
            productPerPage : 9,
            active : 1
        }
    }

    componentDidMount(){
        axios.get('http://localhost:2000/productAdmin/getProductAdmin')
        .then(res =>{
            this.setState({product : res.data})
        })
        .catch(err => console.log(err))
    }




    render(){
        const {currentPage, productPerPage, product}= this.state

        const indexOfLastProduct = currentPage * productPerPage
        const indexOfFirstPost = indexOfLastProduct - productPerPage
        const currentProduct = product.slice(indexOfFirstPost, indexOfLastProduct)

        const paginate=(pageNum)=> this.setState({currentPage: pageNum, active:pageNum})

        const nextPage =()=> this.setState({currentPage: currentPage+1, active:"next"})

        const prevPage=()=>this.setState({currentPage: currentPage-1, active: "prev"})


        return(
            <div style={{backgroundColor:'#F1F1F1'}}>
                <h1>Product Admin</h1>
                <div>
                <Button variant="primary" className="tambah-parcel"><AiFillPlusCircle style={{marginBottom:"3%"}}/> Tambah Produk</Button>
                </div>
                <div className="card-cont" id="product">
                    {currentProduct.map((item, index) =>{
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
                <Pagination productPerPage={productPerPage} totalProduct={product.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} active={this.state.active}/>


            </div>
        )
    }
}


export default ProductAdmin