import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export default function Trending({ value }, props) {

  const calcColor = value => {
    if (value >= 75) {
      return 'lime'
    } else if (value >= 60) {
      return 'gray'
    } else return 'red'
  }

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='end' top={0} spacing={0} {...props} marginLeft='3em'>
        {/* <Rating name="read-only" value={movie.score} precision={0.1} readOnly /> */}
        <TrendingUpIcon htmlColor={calcColor(value)} />
        {value ? (
          <Typography>{value.toFixed(0) + '%'}</Typography>
        ) : (
          <Typography>{'0%'}</Typography>
        )
        }
      </Stack>
    </>
  )
}
