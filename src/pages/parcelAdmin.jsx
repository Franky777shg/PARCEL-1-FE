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
            currentPage :"",
            productPerPage : "",
            active : 1,
            totalItems : ""
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:2000/productAdmin/getParcelPerPage/${1}`)
        .then(res =>{
            this.setState({parcel : res.data[0], productPerPage : res.data[2].perpage, currentPage : res.data[1].current, totalItems : res.data[3].totalItems})
        })
        .catch(err => console.log(err))
    }
    render(){

        const {currentPage, productPerPage, totalItems, parcel}= this.state


        // console.log(totalItems)
        
        //pindah ke halaman xx
        const paginate=(pageNum)=> {
            axios.get(`http://localhost:2000/productAdmin/getParcelPerPage/${pageNum}`)
            .then(res =>{
                this.setState({parcel : res.data[0], productPerPage : res.data[2].perpage, currentPage : res.data[1].current, totalItems : res.data[3].totalItems, active : pageNum})
            })
        }
        //halaman selanjutnya
        const nextPage =()=> {
            axios.get(`http://localhost:2000/productAdmin/getParcelPerPage/${currentPage+1}`)
            .then(res =>{
                this.setState({parcel : res.data[0], productPerPage : res.data[2].perpage, currentPage : res.data[1].current, totalItems : res.data[3].totalItems, active : currentPage+1})
            })
        }

        const prevPage=()=>{
            axios.get(`http://localhost:2000/productAdmin/getParcelPerPage/${currentPage-1}`)
            .then(res =>{
                this.setState({parcel : res.data[0], productPerPage : res.data[2].perpage, currentPage : res.data[1].current, totalItems : res.data[3].totalItems, active : currentPage-1})
            })
        }


        return(
            <div>
                <h1>Parcel</h1>
                <div>
                <Button variant="primary" className="tambahProduk"><AiFillPlusCircle style={{marginBottom:"3%"}}/> Tambah Produk</Button>
                </div>

                <div className="card-cont" id="product">
                    {parcel.map(item =>{
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
                <Pagination productPerPage={productPerPage} totalProduct={totalItems} paginate={paginate} nextPage={nextPage} prevPage={prevPage} active={this.state.active}/>


            </div>
        )
    }
}

export default ParcelAdmin