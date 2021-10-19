import { format } from "date-fns"
import { id } from "date-fns/locale"
import React, { Component } from "react"
import { Accordion, Table } from "react-bootstrap"
import NumberFormat from "react-number-format"

export default class ParcelRevenue extends Component {
  render() {
    const { parcelRevenueData } = this.props
    return (
      <>
        <h2>Rincian Pendapatan Per Parsel</h2>
        {parcelRevenueData.length > 0 ? (
          <Accordion>
            {parcelRevenueData.map((parcel) => {
              const {
                idparcel,
                parcel_name,
                totalParcelPrice,
                totalParcelCapital,
                parcelRevenue,
                totalParcelOrdered,
                parcelDetail,
              } = parcel
              return (
                <Accordion.Item eventKey={idparcel} key={idparcel}>
                  <Accordion.Header>Parsel {parcel_name}</Accordion.Header>
                  <Accordion.Body>
                    <h4>Jumlah Parsel Terjual</h4>
                    <p className="lead">{totalParcelOrdered}</p>

                    <h4>Jumlah Pendapatan Kotor</h4>
                    <p className="lead">
                      <NumberFormat
                        value={totalParcelPrice}
                        prefix="Rp. "
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </p>

                    <h4>Jumlah Modal</h4>
                    <p className="lead">
                      <NumberFormat
                        value={totalParcelCapital}
                        prefix="Rp. "
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </p>

                    <h4>Jumlah Keuntungan</h4>
                    <p className="lead">
                      <NumberFormat
                        value={parcelRevenue}
                        prefix="Rp. "
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </p>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Tanggal Pesanan</th>
                          <th>Nomor Pesanan</th>
                          <th>Harga Parsel</th>
                          <th>Total Modal Produk</th>
                          <th>Keuntungan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parcelDetail.map((parcelDetail, idx) => {
                          const {
                            order_date,
                            order_number,
                            parcelPrice,
                            totalProductCapital,
                            parcelRevenue,
                          } = parcelDetail

                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                {format(new Date(order_date), "dd MMMM yyyy", { locale: id })}
                              </td>
                              <td>#{order_number}</td>
                              <td>
                                <NumberFormat
                                  value={parcelPrice}
                                  prefix="Rp. "
                                  displayType="text"
                                  thousandSeparator="."
                                  decimalSeparator=","
                                />
                              </td>
                              <td>
                                <NumberFormat
                                  value={totalProductCapital}
                                  prefix="Rp. "
                                  displayType="text"
                                  thousandSeparator="."
                                  decimalSeparator=","
                                />
                              </td>
                              <td>
                                <NumberFormat
                                  value={parcelRevenue}
                                  prefix="Rp. "
                                  displayType="text"
                                  thousandSeparator="."
                                  decimalSeparator=","
                                />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              )
            })}
          </Accordion>
        ) : (
          <p className="lead">Data Pendapatan Parsel Kosong</p>
        )}
      </>
    )
  }
}
