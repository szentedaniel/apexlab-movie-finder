import { useLazyQuery } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Movies from '../components/Movies'
import { GET_SIMILAR_FROM_ID } from '../graphql'
import { LoadingContext } from '../contexts/LoadingContext';
import { Typography } from '@mui/material'

export default function SimilarMovies() {
  const [params] = useSearchParams()
  const movie_id = params.get('id')

  const { setLoading } = useContext(LoadingContext)



  const [getSimilarMoviesFromId, { error, loading, data }] = useLazyQuery(GET_SIMILAR_FROM_ID, { variables: { id: movie_id }, })

  useEffect(() => {
    getSimilarMoviesFromId()
  }, [])

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  useEffect(() => {
    console.warn(error)

  }, [error])




  return (
    <>
      {data &&
        <Typography variant='h3' marginBottom='0.25em'>
          {`Found ${data.movie.similar.length} related(similar) movie for "${data.movie.name}"`}
        </Typography>
      }
      {(!loading && !data) &&
        <Typography variant='h3' marginBottom='0.25em'>
          {`Not found related(similar) movie`}
        </Typography>
      }
      {data &&
        <Movies movies={data.movie.similar} />
      }
    </>
  )
}
