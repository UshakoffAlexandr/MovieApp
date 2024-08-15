import React, { Component } from 'react'
import { parse, format, isValid } from 'date-fns'
import { Pagination } from 'antd'

import { GenresContext } from '../contexts/GenresContext'
import CardFilm from '../card'
import Service from '../../services/service'
import mokap from '../card/mokap.jpeg'
import './rated.css'

export default class Rated extends Component {
  static contextType = GenresContext

  constructor(props) {
    super(props)
    this.state = {
      RatedMovieData: [],
      loading: false,
      error: false,
      offline: !navigator.onLine,
      currentPage: 1,
      totalPages: 1,
      noResults: false,
      ratings: props.ratings,
    }
    this.service = new Service()
  }

  generateGenre = (genres_ids) => {
    const genres = this.context
    return genres_ids?.map((id) => {
      const genre = genres.find((g) => g.id === id)
      if (genre) {
        return (
          <li className="genres" key={id}>
            {genre.name}
          </li>
        )
      }
      return null
    })
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page, loading: true }, () => {
      this.getRatedMovies(page)
    })
  }

  componentDidMount() {
    this.getRatedMovies()
  }

  getRatedMovies(page = 1) {
    this.setState(() => {
      return { loading: true }
    })
    this.service
      .ratedMovies(this.props.guestSessionId, page)
      .then((res) => {
        const total_pages = res.total_pages
        if (res) {
          this.setState({ loading: false })
        }
        const films = res.results
        const filmsSlice = films.map((element) => ({
          id: element.id, // Используем реальный ID фильма
          title: element.title,
          discription: element.overview,
          release_date: element.release_date,
          poster_path: element.poster_path,
          vote_average: element.vote_average, // получение рейтинга из состояния
          genres_ids: element.genre_ids,
        }))
        this.setState({
          RatedMovieData: filmsSlice,
          loading: false,
          error: false,
          totalPages: total_pages,
          noResults: filmsSlice.length === 0,
        })
      })
      .catch(() => {
        this.setState({ loading: false, error: true })
      })
  }

  getImage(id) {
    const baseURL = 'https://image.tmdb.org/t/p/w500/'
    const stateUrl = this.state.RatedMovieData.find((movie) => movie.id === id).poster_path
    if (stateUrl === null) {
      return mokap
    }
    return baseURL + stateUrl
  }

  getDate = (id) => {
    const date = parse(
      this.state.RatedMovieData.find((movie) => movie.id === id).release_date,
      'yyyy-MM-dd',
      new Date()
    )
    if (!isValid(date)) {
      return 'Invalid Date'
    }
    const newFormatOfDate = format(date, 'MMMM d, yyyy')
    return newFormatOfDate
  }

  truncateDescription(desc, maxLength = 145) {
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
    const { RatedMovieData } = this.state

    return RatedMovieData.map((movie) => (
      <CardFilm
        genres_ids={movie.genres_ids}
        vote_average={movie.vote_average.toFixed(2)}
        poster_path={this.getImage(movie.id)}
        date={this.getDate(movie.id)}
        discription={this.truncateDescription(movie.discription)}
        title={movie.title}
        key={movie.id}
        rating={movie.rating} // передача рейтинга
        starsRate={this.state.ratings.find((el) => el.id === movie.id)?.rating} //
        onRate={(rating) => this.props.handleRate(movie.id, rating)} // обработка изменения рейтинга
      />
    ))
  }

  render() {
    const { loading, error, currentPage, noResults, totalPages } = this.state

    return (
      <div className="rated-container">
        {loading ? (
          <div>Loading...</div>
        ) : noResults ? (
          <div className="no-results">No results found</div>
        ) : (
          <>
            <div className="content">{this.config()}</div>
            {error && <div>Error occurred while fetching rated movies.</div>}
            <Pagination
              hideOnSinglePage
              current={currentPage}
              total={totalPages * 10}
              onChange={this.handlePageChange}
              showSizeChanger={false}
            />
          </>
        )}
      </div>
    )
  }
}
