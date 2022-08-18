import React from 'react'
import { Box, Button, Stack, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'

export default function SearchBar({ onSearchInputChange, onSearch, name }) {

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (name && name !== '') {
      console.log('onSubmitHandler');
      onSearch()
    }
  }

  return (
    <Box component='div' width='100%' justifyContent='center'>

      <form noValidate autoComplete='off' onSubmit={onSubmitHandler}>

        <Stack direction='row' spacing={1} marginBottom='2.5em' marginTop='2.5em' justifyContent='center'>

          <Box
            sx={{
              width: '80%',
            }}
          >
            <TextField fullWidth label="Search movie title" onChange={onSearchInputChange} value={name} />
          </Box>
          <Button variant="contained" endIcon={<Search />} onClick={onSearch} disabled={(name && name !== '') ? false : true}>
            Search
          </Button>
        </Stack>

      </form >
    </Box>
  )

}
