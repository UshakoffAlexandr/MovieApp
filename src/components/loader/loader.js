import React, { Component } from 'react'
import { Spin } from 'antd'

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}

class Loader extends Component {
  render() {
    return (
      <div style={loaderStyle}>
        <Spin size="large" />
      </div>
    )
  }
}

export default Loader
