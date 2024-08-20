import React, { Component } from 'react'
import { Rate } from 'antd'

class RateMovie extends Component {
  handleRateChange = (value) => {
    this.props.onRate(value)
  }

  render() {
    const { rating } = this.props

    return <Rate allowHalf count={10} size="large" onChange={this.handleRateChange} defaultValue={rating} />
  }
}

export default RateMovie
