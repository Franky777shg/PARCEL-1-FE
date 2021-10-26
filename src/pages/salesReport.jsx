import React from "react";

// import styling
import { Tab, Tabs, Container, Dropdown, Table, Button } from "react-bootstrap";
import {BsSearch} from "react-icons/all"
import {toast} from "react-toastify"

//import axios
import axios from "axios";

//import chart
import {Bar} from "react-chartjs-2"

class SalesReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "home",
      parcel: [],
      product: [],
      parcelDate1 : "",
      parcelDate2 : "",
      date1 : "",
      date2 : "",
      modal : [],
      parcelLabel : [],
      parcelData : [],
      productLabel : [],
      productData : [],
      dateDesc : "",
      prodDesc : ""
    };
  }

  componentDidMount() {
    axios
      .get(`https://api-parcel-1.purwadhikafs2.com/productAdmin/getParcelReport`)
      .then((res) => {
        // console.log(res.data)
        this.setState({ parcel: res.data[0], parcelLabel : res.data[1], parcelData : res.data[2], dateDesc : res.data[3] });
        axios
          .get(`https://api-parcel-1.purwadhikafs2.com/productAdmin/getProductReport`)
          .then((res) => {
            this.setState({ product: res.data[0], productLabel : res.data[1], productData : res.data[2], prodDesc : res.data[3] });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  onSearchParcelDate =()=>{
      let data ={
          dateParcel1 : this.state.parcelDate1,
          dateParcel2 : this.state.parcelDate2
      }
    //   console.log(data)
      axios.post(`https://api-parcel-1.purwadhikafs2.com/productAdmin/getParcelDate`,data)
      .then(res =>{
          this.setState({parcel : res.data[0], parcelLabel : res.data[1], parcelData : res.data[2], dateDesc: res.data[3]})
      })
      .catch(err =>{
          this.setState({modal : err.response.data})
      })
  }

  onSearchProductDate=()=>{
      let data ={
          date1 : this.state.date1,
          date2 : this.state.date2
      }
    //   console.log(data)
      axios.post(`https://api-parcel-1.purwadhikafs2.com/productAdmin/getProductDate`, data)
      .then(res =>{
          this.setState({product : res.data[0], productLabel : res.data[1], productData : res.data[2], prodDesc : res.data[3]})
      })
      .catch(err =>{
        this.setState({modal : err.response.data})
    })
  } 

  onSortDate =()=>{
    let data ={
      dateParcel1 : this.state.parcelDate1,
      dateParcel2 : this.state.parcelDate2
    }

    axios.post(`https://api-parcel-1.purwadhikafs2.com/productAdmin/sortParcelDate`, data)
    .then(res =>{
      this.setState({parcel : res.data[0], parcelLabel : res.data[1], parcelData : res.data[2], dateDesc : res.data[3]})
    })
    .catch(err =>{
      this.setState({modal : err.response.data})
    })
  }

  render() {
      if(this.state.modal[0] ===true){
        toast.error(this.state.modal[1], {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({modal : [false,""]})
      }
    return (
      <div>
        <Container>
          <h1>Laporan Penjualan</h1>
          <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={(e) => this.setState({ key: e })} className="mb-3">
            <Tab eventKey="home" title="Parsel">
              <div className="d-flex justify-content-end mb-4">
              <input type="date"  onChange={(e)=>this.setState({parcelDate1 : e.target.value})}/>
              <input type="date"  onChange={(e)=>this.setState({parcelDate2 : e.target.value})}/>
              <Button variant="primary" onClick={this.onSearchParcelDate}><BsSearch/></Button>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sort by
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.onSortDate}>Penjualan Berdasarkan Tanggal</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
             
              <Bar data={{
                  labels : this.state.parcelLabel,
                  datasets :[
                  {
                  data : this.state.parcelData,
                  backgroundColor : [
                  'rgb(54, 162, 235)'
                  ],
                  label : `Total Penjualan Parsel ${this.state.dateDesc}`,
                  hoverOffset: 4
                  }
                  ]
                  }}
                  options={{
                    // responsive:true,
                    scales :{
                      yAxes:[{
                        ticks: {
                          autoSkip: false,
                          maxRotation: 90,
                        }
                    }]
                    }
                  }}
                  height={200}
                  width={1000} className="mb-3"/>
   
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama Parsel</th>
                    <th>Terjual(Pcs) </th>
                    <th>Total Harga</th>
                  </tr>
                </thead>
                <tbody>
                    {this.state.parcel.map((item,index)=>{
                        return(
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>Parsel {item.parcel_name}</td>
                            <td>{item.item_sold}</td>
                            <td>Rp.{(item.total_Payment).toLocaleString()}</td>
                            </tr>
                        )
                    })}

                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="profile" title="Produk">
              <div className="d-flex justify-content-end mb-2 me-2 ms-2">
              <input type="date" onChange={(e)=>this.setState({date1 : e.target.value})}/>
              <input type="date" onChange={(e)=>this.setState({date2 : e.target.value})}/>
              <Button variant="primary" onClick={this.onSearchProductDate}><BsSearch/></Button>
                
                
              </div>
              <Bar data={{
                  labels : this.state.productLabel,
                  datasets :[
                  {
                  data : this.state.productData,
                  backgroundColor : [
                  'rgb(54, 162, 235)'
                  ],
                  label : `Produk Terjual ${this.state.prodDesc}`,
                  hoverOffset: 4,
                  }
                  ]
                  }}
                  options={{
                    responsive:true,
                    scales :{
                      
                    xAxes: [{
                  
                      ticks: {
                        autoSkip  : false,    
                        maxRotation: 90,
                        minRotation: 90
                    }
                    }]
                    }
                  }}
                  height={400}
                  width={1000} className="mb-3"/>
              <Table striped bordered hover responsive>
                  
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Produk</th>
                    <th>Terjual(Pcs) </th>
                    <th>Total Harga</th>
                  </tr>
                </thead>
                <tbody>
                    {this.state.product.map((item,index)=>{
                        return(
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.product_name}</td>
                            <td>{item.total_Items}</td>
                            <td>Rp.{(item.total_price).toLocaleString()}</td>
                            </tr>
                        )
                    })}

                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default SalesReport;
