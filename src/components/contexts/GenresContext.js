import React, { createContext, useState, useEffect } from 'react'

export const GenresContext = createContext()

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchGenres = async () => {
      const URL = 'https://api.themoviedb.org/3/genre/movie/list'
      const apiKey =
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhjNDkzNjQ5ZTUzOWZiNjRiN2RhY2I3MzljODBjNiIsInN1YiI6IjY2NTJiNWMxODRiNzQ5YjUzZGY3ZWM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UAbBLYAt9i-CWOwNDgOd9xm8-RguQgo0Q7hamQKKTbc'
      const response = await fetch(`${URL}?api_key=${apiKey}`)
      const data = await response.json()
      setGenres(data.genres)
    }

    fetchGenres()
  }, [])

  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
}
