// src/components/GenreList.js
import React, { Component } from 'react'

import { GenresContext } from '../contexts/GenresContext'

class GenreList extends Component {
  static contextType = GenresContext

  render() {
    const { genres_ids } = this.props
    const genres = this.context

    return (
      <ul>
        {genres_ids?.map((id) => {
          const genre = genres?.find((g) => g.id === id)
          return genre ? (
            <li className="genres" key={id}>
              {genre.name}
            </li>
          ) : null
        })}
      </ul>
    )
  }
}

export default GenreList
