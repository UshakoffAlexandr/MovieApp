import React, { Component } from 'react'
import { Pagination } from 'antd'

import Loader from '../loader'
import Error from '../error'
import FilmList from '../FilmList/FilmList'

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
        <FilmList movies={ratedMovies} onRate={handleRate} />
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
