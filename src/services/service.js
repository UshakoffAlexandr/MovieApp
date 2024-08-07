import { Component } from 'react'

import Error from '../components/error'

export default class Service extends Component {
  async createGuestSession() {
    const URL = 'https://api.themoviedb.org/3/authentication/guest_session/new'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhjNDkzNjQ5ZTUzOWZiNjRiN2RhY2I3MzljODBjNiIsInN1YiI6IjY2NTJiNWMxODRiNzQ5YjUzZGY3ZWM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UAbBLYAt9i-CWOwNDgOd9xm8-RguQgo0Q7hamQKKTbc',
      },
    }

    const res = await fetch(URL, options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${URL}, received ${res.status}`)
    }

    return await res.json()
  }

  // existing movie method
  async movie(text, page = 1) {
    const URL = 'https://api.themoviedb.org/3/'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhjNDkzNjQ5ZTUzOWZiNjRiN2RhY2I3MzljODBjNiIsInN1YiI6IjY2NTJiNWMxODRiNzQ5YjUzZGY3ZWM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UAbBLYAt9i-CWOwNDgOd9xm8-RguQgo0Q7hamQKKTbc',
      },
    }

    const query = `${URL}search/movie?query=${text}&page=${page}`
    const res = await fetch(query, options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${URL}, received ${res.status}`)
    }

    return await res.json()
  }
}
