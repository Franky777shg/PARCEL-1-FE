import React, { Component } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>Hello World</h1>
        <Link to="/fill-parcel/1">Isi Parsel</Link>
      </div>
    )
  }
}
