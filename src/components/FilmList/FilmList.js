import React, { Component } from 'react'

import { truncateDescription, formatReleaseDate } from '../utils/utils'
import CardFilm from '../card'
import mokap from '../assets/mokap.jpeg'

class FilmList extends Component {
  getImage = (id) => {
    const baseURL = 'https://image.tmdb.org/t/p/w500'
    const stateUrl = this.props.movies.find((movie) => movie.id === id)?.poster_path
    return stateUrl ? baseURL + stateUrl : mokap
  }

  getDate = (id) => {
    const releaseDate = this.props.movies.find((movie) => movie.id === id)?.release_date
    return formatReleaseDate(releaseDate)
  }

  render() {
    const { movies, ratings, onRate } = this.props

    return movies.map((movie) => (
      <CardFilm
        key={movie.id}
        genres_ids={movie.genre_ids}
        vote_average={movie.vote_average.toFixed(1)}
        poster_path={this.getImage(movie.id)}
        date={this.getDate(movie.id)}
        discription={truncateDescription(movie.discription ? movie.discription : movie.overview)}
        title={movie.title}
        rating={movie.rating}
        starsRate={ratings.find((el) => el.id === movie.id)?.rating}
        onRate={(rating) => onRate(movie.id, rating)}
      />
    ))
  }
}

export default FilmList
