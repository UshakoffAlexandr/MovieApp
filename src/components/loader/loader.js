import React from 'react'
import { Spin } from 'antd'

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}

const Loader = () => (
  <div style={loaderStyle}>
    <Spin tip="Loading" size="large" />
  </div>
)

export default Loader
