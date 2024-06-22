import React, { Component } from 'react'
import { parse, format } from 'date-fns'

import Error from '../error'
import Loader from '../loader'
import CardFilm from '../card'
import Service from '../../services/service'
import mokap from '../card/mokap.jpeg'
import './app.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MovieData: [
        {
          id: 0,
          title: '',
          discription: '',
          poster_path: '',
        },
      ],
      loading: true,
      error: false,
      offline: !navigator.onLine,
    }
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)
    this.getTitle()
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

  getTitle() {
    this.setState({ loading: true }) // Устанавливаем состояние загрузки перед началом загрузки данных

    const listFilms = new Service()
    let filmsSlice = []

    listFilms
      .movie('love')
      .then((res) => {
        const films = res.results

        films.forEach((element, index) => {
          filmsSlice.push({
            id: index,
            title: element.title,
            discription: element.overview,
            release_date: element.release_date,
            poster_path: element.poster_path,
          })
        })
        this.setState({
          MovieData: filmsSlice,
          loading: false,
          error: false,
        })
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        })
      })
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
    const newFormatOfDate = format(
      parse(this.state.MovieData[id].release_date, 'yyyy-MM-dd', new Date()),
      'MMMM d, yyyy'
    )
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
    const j = []
    for (let i = 0; i < 6; i++) {
      j.push(
        <CardFilm
          poster_path={this.getImage(i)}
          date={this.getDate(i)}
          discription={this.truncateDescription(this.state.MovieData[i].discription)}
          title={this.state.MovieData[i].title}
          key={i}
        />
      )
    }
    return j
  }

  render() {
    const { loading, error, offline } = this.state

    if (loading) {
      return <Loader />
    }

    if (error) {
      return <Error />
    }

    if (offline) {
      return <div className="offline">You are offline. Please check your internet connection.</div>
    }

    return <div className="content">{this.config()}</div>
  }
}
