import React, { Component } from 'react'
import { parse, format, isValid } from 'date-fns'
import { Pagination } from 'antd'

import Error from '../error'
import Loader from '../loader'
import CardFilm from '../card'
import Service from '../../services/service'
import Search from '../search'
import Twotabs from '../twotabs'
import Rated from '../rated'
import mokap from '../card/mokap.jpeg'
import './app.css'
import 'antd/dist/reset.css'
import { GenresProvider } from '../contexts/GenresContext'

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
      currentTab: 'mail', // 'mail' для Search, 'app' для Rated
      ratings: {}, // для хранения рейтингов фильмов
      guestSessionId: '', // ID гостевой сессии
    }

    this.service = new Service()
  }

  async componentDidMount() {
    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)
    const session = await this.service.createGuestSession()
    try {
      this.setState({ guestSessionId: session.guest_session_id })
    } catch (error) {
      this.setState({ error: true })
    }
    console.log(session)
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline)
    window.removeEventListener('offline', this.handleOffline)
  }

  handleOnline = () => {
    this.setState({ offline: false })
  }

  handleOffline = () => {
    this.setState({ offline: true })
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
    const listFilms = new Service()
    try {
      const res = await listFilms.movie(query, page)
      console.log(res)
      const films = res.results
      const filmsSlice = films.map((element) => ({
        id: element.id, // Используем реальный ID фильма
        title: element.title,
        discription: element.overview,
        release_date: element.release_date,
        poster_path: element.poster_path,
        vote_average: this.state.ratings[element.id] || 0, // получение рейтинга из состояния
      }))
      this.setState({
        MovieData: filmsSlice,
        loading: false,
        error: false,
        totalPages: res.total_pages,
        noResults: filmsSlice.length === 0,
      })
    } catch (error) {
      this.setState({
        loading: false,
        error: true,
      })
    }
  }

  getImage(id) {
    const baseURL = 'https://image.tmdb.org/t/p/w500/'
    const stateUrl = this.state.MovieData.find((movie) => movie.id === id).poster_path
    if (stateUrl === null) {
      return mokap
    }
    return baseURL + stateUrl
  }

  getDate = (id) => {
    const date = parse(this.state.MovieData.find((movie) => movie.id === id).release_date, 'yyyy-MM-dd', new Date())
    if (!isValid(date)) {
      return 'Invalid Date'
    }
    const newFormatOfDate = format(date, 'MMMM d, yyyy')
    return newFormatOfDate
  }

  truncateDescription(desc, maxLength = 150) {
    if (desc.length <= maxLength) {
      return desc
    }
    const words = desc.split(' ')
    let truncatedDesc = ''
    for (let word of words) {
      if ((truncatedDesc + word).length + 1 > maxLength) {
        break
      }
      truncatedDesc += (truncatedDesc ? ' ' : '') + word
    }
    return truncatedDesc + ' ...'
  }

  config = () => {
    const { MovieData } = this.state

    return MovieData.map((movie) => (
      <CardFilm
        poster_path={this.getImage(movie.id)}
        date={this.getDate(movie.id)}
        discription={this.truncateDescription(movie.discription)}
        title={movie.title}
        key={movie.id}
        rating={movie.rating} // передача рейтинга
        onRate={(rating) => this.handleRate(movie.id, rating)} // обработка изменения рейтинга
      />
    ))
  }

  handleTabChange = (key) => {
    this.setState({ currentTab: key })
  }

  handleRate = (id, rating) => {
    // Обновляем локальное состояние
    this.setState((prevState) => ({
      ratings: {
        ...prevState.ratings,
        [id]: rating,
      },
    }))

    // Отправляем рейтинг на сервер
    const { guestSessionId } = this.state
    const URL = `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestSessionId}`
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhjNDkzNjQ5ZTUzOWZiNjRiN2RhY2I3MzljODBjNiIsInN1YiI6IjY2NTJiNWMxODRiNzQ5YjUzZGY3ZWM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UAbBLYAt9i-CWOwNDgOd9xm8-RguQgo0Q7hamQKKTbc',
      },
      body: JSON.stringify({
        value: rating, // Т.к. API ожидает рейтинг от 0 до 10
      }),
    }

    fetch(URL, options)
      .then((response) => response.json())
      .then((data) => console.log('Rating submitted successfully:', data))
      .catch((error) => console.error('Error submitting rating:', error))
  }

  render() {
    const { loading, error, offline, currentPage, noResults, currentTab, totalPages } = this.state

    if (offline) {
      return <div className="offline">You are offline. Please check your internet connection.</div>
    }

    return (
      <GenresProvider>
        <div className="app-container">
          <Twotabs onTabChange={this.handleTabChange} />
          {currentTab === 'mail' ? (
            <>
              <Search onSearch={this.handleSearch} />
              {loading ? (
                <Loader />
              ) : noResults ? (
                <div className="no-results">No results found</div>
              ) : (
                <>
                  <div className="content">{this.config()}</div>
                  <Pagination
                    current={currentPage}
                    showSizeChanger={false}
                    total={totalPages * 10}
                    onChange={this.handlePageChange}
                  />
                </>
              )}
            </>
          ) : (
            <Rated guestSessionId={this.state.guestSessionId} ratings={this.state.ratings} />
          )}
          {error && <Error />}
        </div>
      </GenresProvider>
    )
  }
}
