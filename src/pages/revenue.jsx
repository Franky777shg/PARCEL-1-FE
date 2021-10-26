import Axios from "axios"
import { endOfDay, endOfMonth, format, lastDayOfMonth, startOfDay, startOfMonth } from "date-fns"
import { id } from "date-fns/locale"
import React, { Component } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import DataContainer from "../components/Revenue/Data/DataContainer"
import DataGrossRevenues from "../components/Revenue/Data/DataGrossRevenues"
import DataHeaderRevenues from "../components/Revenue/Data/DataHeaderRevenues"
import DataNetRevenues from "../components/Revenue/Data/DataNetRevenues"
import DataProductCapital from "../components/Revenue/Data/DataProductCapital"
import FilterByDate from "../components/Revenue/Filter/FilterByDate"
import FilterByDateRange from "../components/Revenue/Filter/FilterByDateRange"
import FilterByMonth from "../components/Revenue/Filter/FilterByMonth"
import FilterContainer from "../components/Revenue/Filter/FilterContainer"
import FilterInput from "../components/Revenue/Filter/FilterInput"
import ParcelRevenue from "../components/Revenue/Parcel/ParcelRevenue"
import ParcelRevenueContainer from "../components/Revenue/Parcel/ParcelRevenueContainer"

const REVENUE_API = "https://api-parcel-1.purwadhikafs2.com/revenue"

const lastMonth = new Date().setMonth(new Date().getMonth() - 1)

const defaultRevanueData = {
  totalGrossRevenues: 0,
  totalProductCapital: 0,
  totalNetRevenues: 0,
  parcelRevenueData: [],
}

class Revenue extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(lastMonth),
      endDate: new Date(),
      revenueData: {
        totalGrossRevenues: 0,
        totalProductCapital: 0,
        totalNetRevenues: 0,
        parcelRevenueData: [],
      },
      filterStatus: 0,
      revenueDesc: "",
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    Axios.post(`${REVENUE_API}`)
      .then((res) => this.setState({ revenueData: res.data, revenueDesc: "", filterStatus: 0 }))
      .catch((err) =>
        this.setState({ revenueData: defaultRevanueData, revenueDesc: "", filterStatus: 0 }, () =>
          toast.error(err.response.data)
        )
      )
  }

  fetchDataByDate = () => {
    const { startDate } = this.state
    const dateData = {
      startDate: startOfDay(startDate),
      endDate: endOfDay(startDate),
    }

    const revenueDesc = `Tanggal ${format(startDate, "dd MMMM yyyy", { locale: id })}`

    Axios.post(`${REVENUE_API}`, dateData)
      .then((res) => this.setState({ revenueData: res.data, revenueDesc, filterStatus: 1 }))
      .catch((err) =>
        this.setState({ revenueData: defaultRevanueData, revenueDesc, filterStatus: 1 }, () =>
          toast.error(err.response.data)
        )
      )
  }

  fetchDataByMonth = () => {
    const { startDate } = this.state

    const monthData = {
      startDate: startDate,
      endDate: lastDayOfMonth(startDate),
    }

    const revenueDesc = `Bulan ${format(startDate, "MMMM yyyy", { locale: id })}`

    Axios.post(`${REVENUE_API}`, monthData)
      .then((res) => this.setState({ revenueData: res.data, revenueDesc, filterStatus: 2 }))
      .catch((err) =>
        this.setState({ revenueData: defaultRevanueData, revenueDesc, filterStatus: 2 }, () =>
          toast.error(err.response.data)
        )
      )
  }

  fetchDataByDateRange = () => {
    const { startDate, endDate } = this.state
    const dateRangeData = {
      startDate: startDate,
      endDate: endDate,
    }

    const revenueDesc = `Dari ${format(startDate, "dd MMMM yyyy", { locale: id })} s.d 
    ${format(endDate, "dd MMMM yyyy", { locale: id })}`

    Axios.post(`${REVENUE_API}`, dateRangeData)
      .then((res) => this.setState({ revenueData: res.data, revenueDesc, filterStatus: 3 }))
      .catch((err) =>
        this.setState({ revenueData: defaultRevanueData, revenueDesc, filterStatus: 3 }, () =>
          toast.error(err.response.data)
        )
      )
  }

  onChangeFilterStatus = (idstatus) => {
    const startCurrentDate = startOfDay(new Date())
    const endCurrentDate = endOfDay(new Date())
    const startOfDayThisMonth = startOfMonth(new Date())
    const endOfDayThisMonth = endOfMonth(new Date())
    const startOfDayLastMonth = startOfDay(lastMonth)
    switch (idstatus) {
      case 1:
        this.setState({ startDate: startCurrentDate, endDate: endCurrentDate }, () =>
          this.fetchDataByDate()
        )
        break
      case 2:
        this.setState({ startDate: startOfDayThisMonth, endDate: endOfDayThisMonth }, () =>
          this.fetchDataByMonth()
        )
        break
      case 3:
        this.setState({ startDate: startOfDayLastMonth, endDate: endCurrentDate }, () =>
          this.fetchDataByDateRange()
        )
        break
      default:
        this.fetchData()
    }
  }

  onChangeFilterByDate = (date) => {
    this.setState({ startDate: endOfDay(date) }, () => this.fetchDataByDate())
  }

  onChangeFilterByMonth = (date) => {
    this.setState({ startDate: date }, () => this.fetchDataByMonth())
  }

  onChangeStartDateRange = (date) => {
    this.setState({ startDate: date }, () => this.fetchDataByDateRange())
  }

  onChangeEndDateRange = (date) => {
    this.setState({ endDate: endOfDay(date) }, () => this.fetchDataByDateRange())
  }

  renderFilterInput = () => {
    const { startDate, endDate, filterStatus } = this.state
    switch (filterStatus) {
      case 1:
        return (
          <FilterByDate startDate={startDate} onChangeFilterByDate={this.onChangeFilterByDate} />
        )
      case 2:
        return (
          <FilterByMonth startDate={startDate} onChangeFilterByMonth={this.onChangeFilterByMonth} />
        )
      case 3:
        return (
          <FilterByDateRange
            startDate={startDate}
            endDate={endDate}
            onChangeStartDateRange={this.onChangeStartDateRange}
            onChangeEndDateRange={this.onChangeEndDateRange}
          />
        )
      default:
        break
    }
  }

  render() {
    const { revenueData, filterStatus, revenueDesc } = this.state
    const { totalGrossRevenues, totalProductCapital, totalNetRevenues, parcelRevenueData } =
      revenueData
    return (
      <Container>
        <Row className="m-4">
          <Col>
            <h2 className="fw-bold text-center">Data Penghasilan ADJ Parcel</h2>
          </Col>
        </Row>
        <FilterContainer>
          <FilterInput
            filterStatus={filterStatus}
            onChangeFilterStatus={this.onChangeFilterStatus}
          />
          {this.renderFilterInput()}
        </FilterContainer>
        <DataContainer>
          <DataHeaderRevenues revenueDesc={revenueDesc} />
          <DataGrossRevenues totalGrossRevenues={totalGrossRevenues} />
          <DataProductCapital totalProductCapital={totalProductCapital} />
          <DataNetRevenues totalNetRevenues={totalNetRevenues} />
        </DataContainer>
        <ParcelRevenueContainer>
          <ParcelRevenue parcelRevenueData={parcelRevenueData} />
        </ParcelRevenueContainer>
      </Container>
    )
  }
}

export default Revenue
