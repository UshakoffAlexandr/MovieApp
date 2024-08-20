import React, { Component } from 'react'

import { truncateDescription } from '../utils/utils'
import CardFilm from '../card'

class FilmList extends Component {
  render() {
    const { movies, ratings, onRate, getImage, getDate } = this.props

    return movies.map((movie) => (
      <CardFilm
        key={movie.id}
        genres_ids={movie.genres_ids}
        vote_average={movie.vote_average.toFixed(1)}
        poster_path={getImage(movie.id)}
        date={getDate(movie.id)}
        discription={truncateDescription(movie.discription)}
        title={movie.title}
        rating={movie.rating}
        starsRate={ratings.find((el) => el.id === movie.id)?.rating}
        onRate={(rating) => onRate(movie.id, rating)}
      />
    ))
  }
}

export default FilmList
