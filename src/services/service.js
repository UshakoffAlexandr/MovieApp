import { Component } from 'react'

import { BASE_URL } from '../components/app/app'

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
    const URL = `${BASE_URL}authentication/guest_session/new?api_key=${this.API_KEY}`
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
    const queryURL = `${BASE_URL}guest_session/${guest_session_id}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`
    const res = await fetch(queryURL, this.options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${queryURL} received ${res.status}`)
    }
    return await res.json()
  }

  async movie(text, page = 1) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhjNDkzNjQ5ZTUzOWZiNjRiN2RhY2I3MzljODBjNiIsInN1YiI6IjY2NTJiNWMxODRiNzQ5YjUzZGY3ZWM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UAbBLYAt9i-CWOwNDgOd9xm8-RguQgo0Q7hamQKKTbc',
      },
    }

    const query = `${BASE_URL}search/movie?query=${text}&page=${page}`
    const res = await fetch(query, options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${URL}, received ${res.status}`)
    }

    return await res.json()
  }

  // Новый метод для получения рейтингов
  async loadRatings(guestSessionId) {
    const URL = `${BASE_URL}account/{account_id}/rated/movies?guest_session_id=${guestSessionId}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhjNDkzNjQ5ZTUzOWZiNjRiN2RhY2I3MzljODBjNiIsInN1YiI6IjY2NTJiNWMxODRiNzQ5YjUzZGY3ZWM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UAbBLYAt9i-CWOwNDgOd9xm8-RguQgo0Q7hamQKKTbc',
      },
    }

    try {
      const response = await fetch(URL, options)
      const data = await response.json()
      return data.results
    } catch (error) {
      throw new Error('Error loading ratings')
    }
  }

  // Новый метод для сохранения рейтингов
  async saveRatingToServer(id, rating, guestSessionId) {
    const URL = `${BASE_URL}movie/${id}/rating?guest_session_id=${guestSessionId}`
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhjNDkzNjQ5ZTUzOWZiNjRiN2RhY2I3MzljODBjNiIsInN1YiI6IjY2NTJiNWMxODRiNzQ5YjUzZGY3ZWM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UAbBLYAt9i-CWOwNDgOd9xm8-RguQgo0Q7hamQKKTbc',
      },
      body: JSON.stringify({
        value: rating, // Т.к. API ожидает рейтинг от 0 до 10
      }),
    }

    try {
      await fetch(URL, options)
    } catch (error) {
      throw new Error('Error saving rating')
    }
  }
}
