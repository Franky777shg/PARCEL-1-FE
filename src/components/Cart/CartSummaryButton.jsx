import React, { Component } from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default class CartSummaryButton extends Component {
  render() {
    const { onCheckout } = this.props
    return (
      <>
        <Button
          style={{ backgroundColor: "#7792A8", border: "none" }}
          className="mx-1"
          size="lg"
          as={Link}
          to="/"
        >
          Lanjut Belanja
        </Button>
        <Button
          style={{ backgroundColor: "#8F9B85", border: "none" }}
          size="lg"
          className="mx-1"
          onClick={onCheckout}
        >
          Checkout Sekarang
        </Button>
      </>
    )
  }
}
