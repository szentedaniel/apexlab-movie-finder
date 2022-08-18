import { Chip, Stack } from '@mui/material'
import React from 'react'
import { stringToColour } from '../utils'

export default function Categories({movie}) {
  return (
    <Stack direction='row' spacing={1} marginTop='2em' overflow='auto' flexWrap='wrap' marginY='5px'>

      {movie.genres.map(genre => (
        <Chip key={genre.id} label={genre.name} variant="outlined" style={{ borderColor: `${stringToColour(genre.name)}`, borderWidth: '3px', marginTop: '5px' }} />
      ))}
    </Stack>
  )
}
