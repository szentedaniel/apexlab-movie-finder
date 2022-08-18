import { useLazyQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom';
import Movies from '../components/Movies'
import { LoadingContext } from '../contexts/LoadingContext';
import { GET_MOVIES } from '../graphql';

export default function MoviesPage() {
  const [params] = useSearchParams()
  const name = params.get('title')

  const { setLoading } = useContext(LoadingContext)

  const [getMovies, { error, loading, data }] = useLazyQuery(GET_MOVIES, { variables: { name: name }, })

  useEffect(() => {
    getMovies()
  }, [])

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  useEffect(() => {
    if (error) {
      console.warn(`Error occurred: ${error}`)
    }
  }, [error])




  return (
    <>
      {data &&
        <Typography variant='h3' marginBottom='0.25em'>
          {`Found ${data.searchMovies.length} results for "${name}"`}
        </Typography>
      }
      {(!loading && !data) &&
        <Typography variant='h3' marginBottom='0.25em'>
          {`Not found results for "${name}"`}
        </Typography>
      }
      {data &&
        <Movies movies={data.searchMovies} />
      }
    </>

  )
}
