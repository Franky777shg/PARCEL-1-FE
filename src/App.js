import React, { Component } from "react"
import {Switch, Route} from 'react-router-dom'

//import Admin Pages
import ProductAdmin from "./pages/productAdmin"
import ParcelAdmin from "./pages/parcelAdmin" 

class App extends Component{
  render(){
    return(
      <div>
        <Switch>
          <Route component={ProductAdmin} path="/productAdmin"/>
          <Route component={ParcelAdmin} path="/parcelAdmin"/>
        </Switch>


      </div>

    )
  }
}
export default App