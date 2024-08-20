import React, { createContext, Component } from 'react'

import { BASE_URL } from '../app/app'

export const GenresContext = createContext()

class GenresProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
    }
  }

  async componentDidMount() {
    const apiKey = 'fd8c493649e539fb64b7dacb739c80c6'
    try {
      const response = await fetch(`${BASE_URL}genre/movie/list?api_key=${apiKey}`)
      const data = await response.json()
      this.setState({ genres: data.genres })
    } catch (error) {
      console.error('Error fetching genres:', error)
    }
  }

  render() {
    return <GenresContext.Provider value={this.state.genres}>{this.props.children}</GenresContext.Provider>
  }
}

export { GenresProvider }
