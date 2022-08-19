import { Box, Button, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Categories from './Categories'
import Score from './Score'
import { useViewportSize } from '@mantine/hooks';

export default function DetailedMovie({ movie, IMDbResult, wikiContent }) {
  const { height, width } = useViewportSize();

  const [imdbUrl, setImdbUrl] = useState()
  const [wikiUrl, setWikiUrl] = useState()

  useEffect(() => {
    // console.log({ movie });
    // console.log(IMDbResult);
    if (IMDbResult) {
      setImdbUrl(`https://www.imdb.com/title/${IMDbResult.id}/`)
      if (wikiContent) {
        setWikiUrl(wikiContent.url)
        // console.log(wikiContent);
      }
    }
  }, [])
  return (
    <Box component='div' width='100%'>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        {IMDbResult ? (
          <Box component='img'
            sx={{ width: '200px', height: 'auto' }}
            src={IMDbResult.image}
            borderRadius='12px'
          />

        ) : (
          <Skeleton sx={{ bgcolor: 'grey.900' }}
            variant="rectangular"
            width={175}
            height={278}
          />
        )}

        <Stack direction='column' alignItems='end'>

          <Typography variant='h3' marginBottom='1em'>
            {movie.name}
          </Typography>
          <Stack direction='row' marginBottom='1em'>
            <Score score={movie.score} />
            {/* <Trending value={movie.popularity} /> */}
          </Stack>
          <Stack direction={(width > 600) ? 'row' : 'column'} marginBottom='1em' sx={{ '& a': { m: 1 }, }}>
            <Button variant='contained' disabled={(wikiUrl) ? false : true} href={(wikiUrl) ? wikiUrl : '/#'} target={(wikiUrl) ? '_blank' : ''} style={{ backgroundColor: `${wikiUrl ? '#FFFFFF' : '#bbbbbb'}`, color: '#000000' }} >Wikipedia</Button>
            <Button variant='contained' disabled={imdbUrl ? false : true} href={imdbUrl ? imdbUrl : '/#'} target={imdbUrl ? '_blank' : ''} style={{ backgroundColor: `${imdbUrl ? '#E2B616' : '#6d580e'}`, color: '#000000' }} >IMDb</Button>
            <Link to={{ pathname: `/similar`, search: `?id=${movie.id}` }}>
              <Button variant='contained' target={imdbUrl ? '_blank' : ''} >Related</Button>
            </Link>
          </Stack>
          <Categories movie={movie} />
        </Stack>
      </Stack>

      <>
        {
          wikiContent ? (
            <Box component='div' marginY='4em'>
              <Typography component='div' variant='body1'>
                {wikiContent.plotShort.plainText}
              </Typography>
            </Box>
          ) : (
            <>
              <Typography component='div' variant='body1' marginTop='4em'>
                <Skeleton />
              </Typography>
              <Typography component='div' variant='body1'>
                <Skeleton />
              </Typography>
              <Typography component='div' variant='body1'>
                <Skeleton />
              </Typography>
              <Typography component='div' variant='body1'>
                <Skeleton />
              </Typography>
              <Typography component='div' variant='body1'>
                <Skeleton />
              </Typography>
            </>
          )
        }
      </>

    </Box >
  )
}
