import React from 'react'
import { Rate } from 'antd'

const RateMovie = ({ rating, onRate }) => <Rate allowHalf value={rating} onChange={(value) => onRate(value)} />

export default RateMovie
