import React, { Component } from 'react'
import { Pagination } from 'antd'

import Loader from '../loader'
import Error from '../error'
import FilmList from '../FilmList/FilmList'
import mokap from '../assets/mokap.jpeg'
import { formatReleaseDate, truncateDescription } from '../utils/utils'

export default class Rated extends Component {
  state = {
    loading: false,
    error: false,
    currentPage: 1,
    totalPages: 1,
    ratedMovies: [],
  }

  async componentDidMount() {
    this.setState({ loading: true })
    await this.fetchRatedMovies()
  }

  async fetchRatedMovies(page = 1) {
    const { guestSessionId, service } = this.props
    try {
      const res = await service.ratedMovies(guestSessionId, page)
      this.setState({
        ratedMovies: res.results,
        totalPages: res.total_pages,
        loading: false,
        error: false,
      })
    } catch {
      this.setState({ error: true, loading: false })
    }
  }

  getImage = (id) => {
    const baseURL = 'https://image.tmdb.org/t/p/w500'
    const stateUrl = this.state.ratedMovies.find((ratedMovies) => ratedMovies.id === id)?.poster_path
    return stateUrl ? baseURL + stateUrl : mokap
  }

  getDate = (id) => {
    const releaseDate = this.state.ratedMovies.find((ratedMovies) => ratedMovies.id === id)?.release_date
    return formatReleaseDate(releaseDate)
  }

  handlePageChange = async (page) => {
    this.setState({ currentPage: page, loading: true })
    await this.fetchRatedMovies(page)
  }

  render() {
    const { loading, error, ratedMovies, currentPage, totalPages } = this.state
    const { handleRate } = this.props

    if (loading) return <Loader />
    if (error) return <Error />

    return (
      <div className="rated-container">
        <FilmList
          discription={truncateDescription(ratedMovies.discription)}
          getImage={this.getImage}
          getDate={this.getDate}
          movies={ratedMovies}
          onRate={handleRate}
        />
        <Pagination
          hideOnSinglePage
          current={currentPage}
          showSizeChanger={false}
          total={totalPages * 10}
          onChange={this.handlePageChange}
        />
      </div>
    )
  }
}
