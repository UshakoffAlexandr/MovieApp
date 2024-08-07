import React, { createContext, useState, useEffect } from 'react'

export const GenresContext = createContext()

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([])

  const getGenre = async () => {
    const queryURL = `${this.baseURL}/genre/movie/list?language=en`
    const res = await fetch(queryURL, this.options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${queryURL} received ${res.status}`)
    }
    const allGenres = await res.json()
    return allGenres
  }

  const saveGenres = (res = []) => {
    setGenres(res)
  }

  useEffect(() => {
    const fetchGenres = async () => {
      const URL = 'https://api.themoviedb.org/3/genre/movie/list'
      const apiKey = 'fd8c493649e539fb64b7dacb739c80c6'
      const response = await fetch(`${URL}?api_key=${apiKey}`)
      const data = await response.json()
      setGenres(data.genres)
    }

    fetchGenres()
  }, [])

  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
}
