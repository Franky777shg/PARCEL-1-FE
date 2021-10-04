import React from "react"

//import axios
import axios from "axios"

//import styling 
import {Card, Button} from "react-bootstrap"
import "../style/parcelAdmin.css"

//import Icons 
import {AiFillPlusCircle} from "react-icons/all"

//import Pagination
import Pagination from "../components/pagination"

class ParcelAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            parcel :[],
            currentPage :1,
            productPerPage : 6,
            active : 1
        }
    }
    componentDidMount(){
        axios.get('http://localhost:2000/productAdmin/getParcelAdmin')
        .then(res =>{
            this.setState({parcel : res.data})
        })
        .catch(err => console.log(err))
    }
    render(){

        const {currentPage, productPerPage, parcel}= this.state

        const indexOfLastProduct = currentPage * productPerPage
        const indexOfFirstPost = indexOfLastProduct - productPerPage
        const currentProduct = parcel.slice(indexOfFirstPost, indexOfLastProduct)

        const paginate=(pageNum)=> this.setState({currentPage: pageNum, active:pageNum})

        const nextPage =()=> this.setState({currentPage: currentPage+1, active:"next"})

        const prevPage=()=>this.setState({currentPage: currentPage-1, active: "prev"})


        return(
            <div>
                <h1>Parcel</h1>
                <div>
                <Button variant="primary" className="tambahProduk"><AiFillPlusCircle style={{marginBottom:"3%"}}/> Tambah Produk</Button>
                </div>

                <div className="card-cont" id="product">
                    {currentProduct.map(item =>{
                        return(
                        <Card className="card">
                        <Card.Img variant="top" src={`http://localhost:2000/uploads/parcels/${item.parcel_image}`} style={{height:"30vh"}} />
                        <Card.Body>
                          <Card.Title>{item.parcel_name}</Card.Title>
                          <Card.Text style={{height:"20vh"}}>
                              {item.parcel_desc}
                              <p>Rp. {(item.parcel_price).toLocaleString()}</p>
                          </Card.Text>
                         
                          <div style={{display:"flex"}}>
                          <Button variant="primary" style={{marginRight:"1vw"}}>Edit Parcel</Button>
                          <Button variant="danger">Hapus Parcel</Button>
                          </div>
                        </Card.Body>
                      </Card>

                        )
                    })}

                </div>
                <Pagination productPerPage={productPerPage} totalProduct={parcel.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} active={this.state.active}/>


            </div>
        )
    }
}

export default ParcelAdmin