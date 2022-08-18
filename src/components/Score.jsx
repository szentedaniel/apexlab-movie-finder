import React from 'react'
import { Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';

export default function Score({ score }, props) {
  return (
    <Stack direction='row' alignItems='center' justifyContent='end' top={0} spacing={0} {...props} marginLeft='3em'>
      {/* <Rating name="read-only" value={movie.score} precision={0.1} readOnly /> */}
      <StarIcon htmlColor='orange' />
      <Typography>{score.toFixed(1).replace('0.0', '--') + '/10'}</Typography>
    </Stack>
  )
}
