import React, { Component } from 'react'
import { Pagination } from 'antd'

import Error from '../error'
import Loader from '../loader'
import Service from '../../services/service'
import Search from '../search'
import Twotabs from '../twotabs'
import Rated from '../rated'
import './app.css'
import 'antd/dist/reset.css'
import FilmList from '../FilmList/FilmList'

export const BASE_URL = 'https://api.themoviedb.org/3/'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MovieData: [],
      loading: false,
      error: false,
      offline: !navigator.onLine,
      currentPage: 1,
      totalPages: 1,
      query: '',
      noResults: false,
      currentTab: 'mail',
      ratings: [],
      guestSessionId: '',
    }

    this.service = new Service()
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)

    this.initializeGuestSession()
    this.loadRatings()
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline)
    window.removeEventListener('offline', this.handleOffline)
  }

  handleOnline = () => this.setState({ offline: false })

  handleOffline = () => this.setState({ offline: true })

  initializeGuestSession = async () => {
    const storedSessionId = localStorage.getItem('guestSessionId')

    if (storedSessionId) {
      this.setState({ guestSessionId: storedSessionId })
    } else {
      try {
        const session = await this.service.createGuestSession()
        this.setState({ guestSessionId: session.guest_session_id })
        localStorage.setItem('guestSessionId', session.guest_session_id)
      } catch {
        this.setState({ error: true })
      }
    }
  }

  loadRatings = async () => {
    try {
      const ratings = await this.service.loadRatings(this.state.guestSessionId)
      this.setState({ ratings })
    } catch {
      this.setState({ error: true })
    }
  }

  handleSearch = (query) => {
    this.setState({ query, currentPage: 1, loading: true, noResults: false }, () => {
      this.getTitle(query, 1)
    })
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page, loading: true }, () => {
      this.getTitle(this.state.query, page)
    })
  }

  async getTitle(query, page) {
    try {
      const res = await this.service.movie(query, page)
      const filmsSlice = res.results.map((element) => ({
        genre_ids: element.genre_ids,
        id: element.id,
        title: element.title,
        discription: element.overview,
        release_date: element.release_date,
        poster_path: element.poster_path,
        vote_average: element.vote_average,
      }))
      this.setState({
        MovieData: filmsSlice,
        loading: false,
        error: false,
        totalPages: res.total_pages,
        noResults: filmsSlice.length === 0,
      })
    } catch {
      this.setState({ loading: false, error: true })
    }
  }

  handleTabChange = (key) => this.setState({ currentTab: key })

  handleRate = async (id, rating) => {
    const newMovie = { id, rating }
    this.setState((prevState) => {
      const existingRatingIndex = prevState.ratings.findIndex((el) => el.id === id)
      const updatedRatings =
        existingRatingIndex === -1
          ? [...prevState.ratings, newMovie]
          : prevState.ratings.map((el, index) => (index === existingRatingIndex ? newMovie : el))

      this.service.saveRatingToServer(id, rating, this.state.guestSessionId)

      return { ratings: updatedRatings }
    })
  }

  render() {
    const { loading, error, offline, currentPage, noResults, currentTab, totalPages, MovieData, ratings } = this.state

    if (offline) {
      return <div className="offline">Вы находитесь в оффлайн-режиме. Проверьте подключение к интернету.</div>
    }

    const content =
      currentTab === 'mail' ? (
        <>
          <Search onSearch={this.handleSearch} />
          {loading ? (
            <Loader />
          ) : noResults ? (
            <div className="no-results">Результаты не найдены</div>
          ) : (
            <>
              <div className="content">
                <FilmList movies={MovieData} ratings={ratings} onRate={this.handleRate} />
              </div>
              <Pagination
                hideOnSinglePage
                current={currentPage}
                showSizeChanger={false}
                total={totalPages * 10}
                onChange={this.handlePageChange}
              />
            </>
          )}
        </>
      ) : (
        <Rated
          ratings={this.state.ratings}
          handleRate={this.handleRate}
          guestSessionId={this.state.guestSessionId}
          service={this.service}
        />
      )

    return (
      <div className="app-container">
        <Twotabs onTabChange={this.handleTabChange} />
        {content}
        {error && <Error />}
      </div>
    )
  }
}
