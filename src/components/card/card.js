import { React, useState } from 'react'
import { Card, Spin, Rate } from 'antd'
import './card.css'

const CardFilm = ({ title, discription, date, poster_path, rating, onRate }) => {
  const [loading, setLoading] = useState(true)

  const handleRateChange = (value) => {
    onRate(value)
  }

  // Определение цвета в зависимости от рейтинга
  const getRatingColor = (rating) => {
    if (rating >= 0 && rating < 3) {
      return '#E90000'
    } else if (rating >= 3 && rating < 5) {
      return '#E97E00'
    } else if (rating >= 5 && rating < 7) {
      return '#E9D100'
    } else {
      return '#66E900'
    }
  }

  return (
    <Card className="card" styles={{ body: { padding: 0 } }}>
      <div className="container">
        <div className="rating-circle" style={{ backgroundColor: getRatingColor(rating) }}>
          {rating}
        </div>
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
          <div className="title">
            <h5>{title}</h5>
          </div>
          <div className="date">{date}</div>
          <div className="genre">
            <ul>
              <li>Action</li>
              <li>Drama</li>
            </ul>
          </div>
          <div className="description">{discription}</div>
          <Rate allowHalf count={10} defaultValue={rating} onChange={handleRateChange} />
        </div>
      </div>
    </Card>
  )
}

export default CardFilm
