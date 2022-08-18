import { useMemo, useState } from 'react'
import { Backdrop, CircularProgress, createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import SearchBar from './components/SearchBar'
import Home from './pages/Home'
import MoviesPage from './pages/MoviesPage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { LoadingContext } from './contexts/LoadingContext'
import { ColorModeContext } from './contexts/ColorModeContext'
import MovieDetails from './pages/MovieDetails'
import SimilarMovies from './pages/SimilarMovies'

function App({ client }) {

  const [name, setName] = useState('')
  const [mode, setMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

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
