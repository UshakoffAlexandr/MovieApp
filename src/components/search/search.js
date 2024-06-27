import React, { Component } from 'react'
import { debounce } from 'lodash'
import './search.css'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.handleChange = debounce(this.handleChange.bind(this), 100)
  }

  handleChange(e) {
    const query = e.target.value
    this.props.onSearch(query)
  }

  render() {
    return (
      <div className="search">
        <input type="text" placeholder="Search for movies..." onChange={this.handleChange} />
      </div>
    )
  }
}
