import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import { useLocation, useSearchParams } from 'react-router-dom'
import { GET_MOVIE_FROM_ID } from '../graphql'
import { LoadingContext } from '../contexts/LoadingContext'
import DetailedMovie from '../components/DetailedMovie'
import axios from 'axios';
import { IMDB_API_KEY } from '../config'

const SAMPLE_IMDB = {
  id: "tt0137523",
  resultType: "Title",
  image: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.7273_AL_.jpg",
  title: "Fight Club",
  description: "(1999)"
}
const SAMPLE_WIKI = {
  imDbId: "tt0137523",
  title: "Fight Club",
  fullTitle: "Fight Club (1999)",
  type: "Movie",
  year: "1999",
  language: "en",
  titleInLanguage: "Fight Club",
  url: "https://en.wikipedia.org/wiki/Fight_Club",
  plotShort: {
    plainText: "Fight Club is a 1999 American film directed by David Fincher and starring Brad Pitt, Edward Norton, and Helena Bonham Carter. It is based on the 1996 novel of the same name by Chuck Palahniuk. Norton plays the unnamed narrator, who is discontented with his white-collar job. He forms a \"fight club\" with soap salesman Tyler Durden (Pitt), and becomes embroiled in a relationship with a destitute woman, Marla Singer (Bonham Carter).\r\nPalahniuk's novel was optioned by Fox 2000 Pictures producer Laura Ziskin, who hired Jim Uhls to write the film adaptation. Fincher was selected because of his enthusiasm for the story. He developed the script with Uhls and sought screenwriting advice from the cast and others in the film industry. It was filmed in and around Los Angeles from July to December 1998. He and the cast compared the film to Rebel Without a Cause (1955) and The Graduate (1967), with a theme of conflict between Generation X and the value system of advertising.\r\nStudio executives did not like the film, and they restructured Fincher's intended marketing campaign to try to reduce anticipated losses. Fight Club failed to meet the studio's expectations at the box office, and received polarized reactions from critics. It was ranked as one of the most controversial and talked-about films of 1999. The film later found commercial success with its home video release, establishing Fight Club as a cult classic and causing media to revisit the film. In 2009, on the tenth anniversary of the film's release, The New York Times dubbed it the \"defining cult movie of our time.\""
  },
  errorMessage: ""
}

export default function MovieDetails() {
  const location = useLocation()
  const [params] = useSearchParams()
  const movie_id = params.get('id')

  const { setLoading } = useContext(LoadingContext)
  const loading_ctx = useContext(LoadingContext)

  const [movie, setMovie] = useState()
  const [IMDbResult, setIMDbResult] = useState()
  const [wikiContent, setWikiContent] = useState()
  const [apiLoading, setApiLoading] = useState()
  const [doneWithFetching, setDoneWithFetching] = useState(false)


  const [getMovieFromId, { error, loading, data }] = useLazyQuery(GET_MOVIE_FROM_ID, { variables: { id: movie_id }, })

  const getContentFromWikipedia = async (title) => {
    setApiLoading(true)

    axios.get(`https://imdb-api.com/en/API/SearchMovie/${IMDB_API_KEY}/${title}`).then(res => {
      let gotError = false
      if (res.data.errorMessage) {
        gotError = true
        alert(res.data.errorMessage)
      }
      console.log(res.data);
      const imdbData = res.data.results[0]
      const imdbId = imdbData.id
      setIMDbResult(imdbData)

      if (!gotError) {

        axios.get(`https://imdb-api.com/en/API/Wikipedia/${IMDB_API_KEY}/${imdbId}`).then(res => {
          if (res.data.errorMessage) alert(res.data.errorMessage)
          console.log(res.data);
          setWikiContent(res.data)
          setApiLoading(false)
          setDoneWithFetching(true)
        }).catch(err => {
          console.log(err);
          setApiLoading(false)
          setDoneWithFetching(true)
        })
      }
    }).catch(err => {
      console.log(err);
      setApiLoading(false)
      setDoneWithFetching(true)
    })

    // // FOR TESTING WITHOUT API
    // setTimeout(() => {
    //   setIMDbResult(SAMPLE_IMDB)
    //   setTimeout(() => {
    //     setWikiContent(SAMPLE_WIKI)
    //     setApiLoading(false)
    //     setDoneWithFetching(true)
    //   }, 500);
    // }, 1000);


  }

  useEffect(() => {
    if (!location.state) { getMovieFromId(); console.log('nincs átvíve, lekérés...'); }
    else { setMovie(location.state); console.log('át van víve'); }

  }, [])

  useEffect(() => {
    if (data) {
      const movie = data.movie
      setMovie((prev) => (prev = { ...prev, movie }))
    }
  }, [data])

  useEffect(() => {
    if (loading !== undefined) {
      if (!apiLoading) {
        setLoading(loading)
      }
    }
  }, [loading])

  useEffect(() => {
    if (apiLoading !== undefined) {
      if (!loading) {
        setLoading(apiLoading)
      }
    }
  }, [apiLoading])

  useEffect(() => {
    if (error) {
      console.warn(`Error occurred: ${error}`)
    }
  }, [error])

  useEffect(() => {
    if (movie) {
      getContentFromWikipedia(movie.movie.name)
    }
  }, [movie])



  return (
    <>
      {(!loading_ctx.loading && doneWithFetching && movie) &&
        <DetailedMovie movie={movie.movie} IMDbResult={IMDbResult} wikiContent={wikiContent} />
      }
    </>
  )
}
