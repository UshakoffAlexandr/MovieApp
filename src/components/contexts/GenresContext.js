import React, { createContext, Component } from 'react'

import Service from '../../services/service'

export const GenresContext = createContext()

class GenresProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
    }
    this.service = new Service()
  }

  async componentDidMount() {
    this.service.getGenres().then((data) => {
      this.setState({ genres: data })
    })
  }

  render() {
    return <GenresContext.Provider value={this.state.genres}>{this.props.children}</GenresContext.Provider>
  }
}

export { GenresProvider }
