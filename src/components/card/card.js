import { React, useState } from 'react'
import { Card, Spin } from 'antd'
import './card.css'

const CardFilm = ({ title, discription, date, poster_path }) => {
  const [loading, setLoading] = useState(true)

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
        </div>
      </div>
    </Card>
  )
}

export default CardFilm
