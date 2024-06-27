import React, { Component } from 'react'
import { parse, format, isValid } from 'date-fns'

import Error from '../error'
import Loader from '../loader'
import CardFilm from '../card'
import Service from '../../services/service'
import Search from '../search'
import mokap from '../card/mokap.jpeg'
import './app.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MovieData: [],
      loading: false,
      error: false,
      offline: !navigator.onLine,
    }
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)
    this.getTitle('return')
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
    this.setState({ loading: true }) // Устанавливаем состояние загрузки перед началом загрузки данных
    this.getTitle(query)
  }

  async getTitle(query) {
    const listFilms = new Service()
    try {
      const res = await listFilms.movie(query)
      const films = res.results.slice(0, 6) // Ограничиваем количество фильмов до 6
      const filmsSlice = films.map((element, index) => ({
        id: index,
        title: element.title,
        discription: element.overview,
        release_date: element.release_date,
        poster_path: element.poster_path,
      }))
      this.setState({
        MovieData: filmsSlice,
        loading: false,
        error: false,
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
    const stateUrl = this.state.MovieData[id].poster_path
    if (stateUrl === null) {
      return mokap
    }
    return baseURL + stateUrl
  }

  getDate = (id) => {
    const date = parse(this.state.MovieData[id].release_date, 'yyyy-MM-dd', new Date())
    if (!isValid(date)) {
      return 'Invalid Date'
    }
    const newFormatOfDate = format(date, 'MMMM d, yyyy')
    return newFormatOfDate
  }

  truncateDescription(desc, maxLength = 205) {
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

    return MovieData.map((movie, index) => (
      <CardFilm
        poster_path={this.getImage(index)}
        date={this.getDate(index)}
        discription={this.truncateDescription(movie.discription)}
        title={movie.title}
        key={index}
      />
    ))
  }

  render() {
    const { loading, error, offline } = this.state

    if (offline) {
      return <div className="offline">You are offline. Please check your internet connection.</div>
    }

    return (
      <div>
        <Search onSearch={this.handleSearch} />
        {loading ? <Loader /> : <div className="content">{this.config()}</div>}
        {error && <Error />}
      </div>
    )
  }
}
