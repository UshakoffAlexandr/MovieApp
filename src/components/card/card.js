import React, { Component } from 'react'
import { Card, Spin, Rate, Typography } from 'antd'

import './card.css'
import GenreList from '../genres/genresList.js'

const { Text } = Typography

class CardFilm extends Component {
  state = {
    loading: true,
  }

  handleRateChange = (value) => {
    const { onRate } = this.props
    if (onRate) {
      onRate(value)
    }
  }

  getRatingColor = (vote_average) => {
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

  handleImageLoad = () => {
    this.setState({ loading: false })
  }

  render() {
    const { title, discription, date, poster_path, vote_average, starsRate, genres_ids } = this.props
    const { loading } = this.state

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
            onLoad={this.handleImageLoad}
            style={{ display: loading ? 'none' : 'block' }}
          />
          <div className="text">
            <div className="title-rating">
              <div className="title">
                <h5>{title}</h5>
              </div>
              <div className="rating-circle" style={{ borderColor: this.getRatingColor(vote_average) }}>
                <Text style={{ fontSize: 19 }}>{vote_average}</Text>
              </div>
            </div>
            <div className="date">{date}</div>
            <div className="gen">
              <GenreList genres_ids={genres_ids} />
            </div>
            <div className="description">{discription}</div>
            <Rate className="stars" allowHalf count={10} defaultValue={starsRate} onChange={this.handleRateChange} />
          </div>
        </div>
      </Card>
    )
  }
}

export default CardFilm
