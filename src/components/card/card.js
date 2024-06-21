import { React } from 'react'
import { Card } from 'antd'
import './card.css'

const CardFilm = ({ title, discription, date, poster_path }) => {
  return (
    <Card className="card" styles={{ body: { padding: 0 } }}>
      <div className="container">
        <img className="photo" src={poster_path} alt="Poster" />
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
