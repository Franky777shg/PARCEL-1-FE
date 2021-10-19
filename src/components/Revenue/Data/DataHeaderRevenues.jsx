import React, { Component } from "react"

export default class DataHeaderRevenues extends Component {
  render() {
    const { revenueDesc } = this.props
    return (
      <>
        <h2>Data Penghasilan</h2>
        {revenueDesc && <p className="lead">{revenueDesc}</p>}
      </>
    )
  }
}
