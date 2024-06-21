import { Component } from 'react'

export default class Service extends Component {
  async movie(text) {
    const URL = 'https://api.themoviedb.org/3/'
    // const API = "fd8c493649e539fb64b7dacb739c80c6";

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhjNDkzNjQ5ZTUzOWZiNjRiN2RhY2I3MzljODBjNiIsInN1YiI6IjY2NTJiNWMxODRiNzQ5YjUzZGY3ZWM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UAbBLYAt9i-CWOwNDgOd9xm8-RguQgo0Q7hamQKKTbc',
      },
    }

    const query = URL + 'search/movie?'
    const res = await fetch(query + '&query=' + text, options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${URL} , recevied ${res.status}`)
    }

    return await res.json()
  }
}

//https://api.themoviedb.org/3/search/movie?api_key=fd8c493649e539fb64b7dacb739c80c6&query=return
