import React from 'react'
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { stringToColour } from '../utils';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import Score from './Score';
import Categories from './Categories';


export default function Movie({ movie }) {
  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Stack direction='row' width='100%' justifyContent='space-between' marginBottom='1em'>
            <Box component='div' maxWidth='70%'>
              <Typography component="div" variant="h4" textAlign='left'>
                <Link to={{ pathname: `/details`, search: `?id=${movie.id}` }}
                  state={{ movie: movie }}
                >
                  <Typography variant='a' color='primary'>
                    {movie.name}
                  </Typography>
                </Link>
              </Typography>
              <Typography component='span'>{moment(movie.releaseDate).format("YYYY-MM-DD")}</Typography>
            </Box>

            <Score score={movie.score} />
          </Stack>
          <Stack direction='row' alignItems='center' textAlign='justify'>

            {/* THUMBNAIL */}
            {movie.poster &&
              <>
                {
                  movie.poster.thumbnail &&
                  <Box component='img'
                    borderRadius='12px'
                    sx={{
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    src={movie.poster.thumbnail}
                  />
                }
              </>
            }
            <Typography component='div' padding='1em'>{movie.overview}</Typography>
          </Stack>
          {/* CATEGORIES */}
          {movie.genres.length > 0 &&
            <Categories movie={movie} />
          }
          {/* <Typography component='div' flex={true} align='right' alignItems='center'>
            sample
          </Typography> */}

        </CardContent>
      </Box>
    </Card>
  )
}
