import React from 'react'
import { debounce } from 'lodash'
import './search.css'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = debounce(this.handleChange.bind(this), 500) // Используем debounce с задержкой в 500 мс
  }

  handleChange(event) {
    this.props.onSearch(event.target.value)
  }

  render() {
    return (
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies..."
          onChange={(e) => {
            e.persist()
            this.handleChange(e)
          }}
        />
      </div>
    )
  }
}
