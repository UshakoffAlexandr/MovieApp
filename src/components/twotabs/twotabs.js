import React, { useState } from 'react'
import { HeartOutlined, TwitchOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

const items = [
  {
    label: 'Search',
    key: 'mail',
    icon: <TwitchOutlined />,
  },
  {
    label: 'Rated',
    key: 'app',
    icon: <HeartOutlined />,
  },
]

const Twotabs = ({ onTabChange }) => {
  const [current, setCurrent] = useState('mail')

  const handleMenuClick = (e) => {
    setCurrent(e.key)
    onTabChange(e.key) // вызываем переданный обработчик клика
  }

  return <Menu onClick={handleMenuClick} selectedKeys={[current]} mode="horizontal" items={items}></Menu>
}

export default Twotabs
