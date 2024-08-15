import React from 'react'
import { Rate } from 'antd'

const RateMovie = ({ rating, onRate }) => {
  return <Rate allowHalf count={10} size="large" onChange={(value) => onRate(value)} defaultValue={rating} />
}

export default RateMovie
