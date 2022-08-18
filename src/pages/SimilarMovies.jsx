import { useLazyQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import Movies from '../components/Movies'
import { GET_SIMILAR_FROM_ID } from '../graphql'
import { LoadingContext } from '../contexts/LoadingContext';
import { Typography } from '@mui/material'

export default function SimilarMovies() {
  // const location = useLocation()
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
      {/* {data &&
        <Typography variant='h3' marginBottom='0.25em'>
          {`Found ${data.searchMovies.length} similar movie for "${data.movie.name}"`}
        </Typography>
      }
      {(!loading && !data) &&
        <Typography variant='h3' marginBottom='0.25em'>
          {`Not found similar movie for "${data.movie.name}"`}
        </Typography>
      } */}
      {data &&
        <Movies movies={data.movie.similar} />
      }
    </>
  )
}
