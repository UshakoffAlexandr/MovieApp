import { Component } from 'react'

import Error from '../components/error'

export default class Service extends Component {
  API_KEY = 'fd8c493649e539fb64b7dacb739c80c6'
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhjNDkzNjQ5ZTUzOWZiNjRiN2RhY2I3MzljODBjNiIsInN1YiI6IjY2NTJiNWMxODRiNzQ5YjUzZGY3ZWM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UAbBLYAt9i-CWOwNDgOd9xm8-RguQgo0Q7hamQKKTbc',
    },
  }

  async createGuestSession() {
    const URL = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.API_KEY}`
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
  async ratedMovies(guest_session_id, page) {
    const baseURL = 'https://api.themoviedb.org/3/'
    const queryURL = `${baseURL}guest_session/${guest_session_id}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`
    console.log(queryURL)
    const res = await fetch(queryURL, this.options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${queryURL} received ${res.status}`)
    }
    return await res.json()
  }
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
