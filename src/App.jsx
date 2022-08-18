import { useEffect, useMemo, useState } from 'react'
import { Backdrop, Box, CircularProgress, createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import SearchBar from './components/SearchBar'
import Home from './pages/Home'
import MoviesPage from './pages/MoviesPage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { LoadingContext } from './contexts/LoadingContext'
import { ColorModeContext } from './contexts/ColorModeContext'
import { makeStyles } from '@mui/styles'
import MovieDetails from './pages/MovieDetails'
import SimilarMovies from './pages/SimilarMovies'


const useStyles = makeStyles((theme) => ({
  root: {
    "&::-webkit-scrollbar": {
      width: 7,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: `1px solid slategrey`,
    },
  },
}));



function App({ client }) {

  const [name, setName] = useState('')
  const [mode, setMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const classes = useStyles();

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? 'dark' : 'light',
        },
      }),
    [mode],
  );

  const onSearchInputChange = e => {
    e.preventDefault()
    setName(e.target.value)
  }

  const onSearch = () => {
    navigate(`/search?title=${name}`)
    setName('')
  }


  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <SearchBar onSearchInputChange={onSearchInputChange} onSearch={onSearch} name={name} />
            {
              loading &&
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            }

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="search" element={<MoviesPage />} />
              <Route path="details" element={<MovieDetails />} />
              <Route path="similar" element={<SimilarMovies />} />
            </Routes>
          </ThemeProvider>
        </LoadingContext.Provider>
      </ColorModeContext.Provider>

    </>
  )
}

export default App
