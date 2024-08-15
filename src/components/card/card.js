import { React, useState, useContext } from 'react'
import { Card, Spin, Rate, Typography } from 'antd'

import { GenresContext } from '../contexts/GenresContext'

import './card.css'

const { Text } = Typography
const CardFilm = ({ title, discription, date, poster_path, onRate, starsRate, vote_average, genres_ids }) => {
  const [loading, setLoading] = useState(true)
  const genres = useContext(GenresContext)
  console.log(genres_ids)

  const handleRateChange = (value) => {
    onRate(value)
  }

  const getRatingColor = (vote_average) => {
    if (vote_average < 3) {
      return '#E90000'
    } else if (vote_average < 5) {
      return '#E97E00'
    } else if (vote_average < 7) {
      return '#E9D100'
    } else {
      return '#66E900'
    }
  }

  const generateGenre = () => {
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

  return (
    <Card className="card" styles={{ body: { padding: 0 } }}>
      <div className="container">
        {loading && (
          <div className="loader">
            <Spin />
          </div>
        )}
        <img
          className="photo"
          src={poster_path}
          alt="Poster"
          onLoad={() => setLoading(false)}
          style={{ display: loading ? 'none' : 'block' }}
        />
        <div className="text">
          <div className="title-rating">
            <div className="title">
              <h5>{title}</h5>
            </div>
            <div className="rating-circle" style={{ borderColor: getRatingColor(vote_average) }}>
              <Text
                style={{
                  fontSize: 19,
                }}
              >
                {vote_average}
              </Text>
            </div>
          </div>
          <div className="date">{date}</div>
          <div className="gen">
            <ul>{generateGenre()}</ul>
          </div>
          <div className="description">{discription}</div>
          <Rate className="stars" allowHalf count={10} defaultValue={starsRate} onChange={handleRateChange} />
        </div>
      </div>
    </Card>
  )
}

export default CardFilm
