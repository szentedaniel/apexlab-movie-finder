import React from 'react'
import Movie from './Movie'
import { Stack } from '@mui/material'

export default function Movies({ movies }) {
  return (
    <Stack spacing={2} direction='column'>
      {movies &&
        movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
    </Stack>
  )
}
