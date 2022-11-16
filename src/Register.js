import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import UserService from '../src/services/UserService'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ImageUpload from './ImageUpload'

const theme = createTheme()

const Register = () => {
  const [user, setUser] = useState({
    name: { first: '', last: '' },
    status: 1,
    role: 'customer',
  })

  //for profile image uploading we take state here to open or close dialog initially close
  const [openDialog, setOpenDialog] = useState(false)

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleNameChange = (e) => {
    const { name, value } = e.target
    if (user?.name) setUser({ ...user, name: { ...user?.name, [name]: value } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('User: ', user)
    if (!user?.email || !user?.password) {
      alert('Enter all required fields')
    } else {
      //if all required fields entered then on sign up button click open dialog to image upload
      setOpenDialog(true)
    }
  }

  const registerUser = (images) => {
    //api call
    //form data we have to pass while api calling so for creating form data object we use new FormData() constructor

    const fd = new FormData()
    //we append fields in fd object as key value pairs

    fd.append('avatar', images.avatar)
    fd.append('name.first', user?.name?.first)
    fd.append('name.last', user?.name?.last)
    fd.append('email', user.email)
    fd.append('password', user.password)
    fd.append('mobile', user.mobile)
    fd.append('status', user.status)
    fd.append('role', user.role)

    // console.log('fd:', fd)

    UserService.createUser(fd)
      .then((response) => {
        console.log(response.data.data)
        const message = response.data.message || 'Created'
        handleDialogClose()
        alert(message)
      })
      .catch((err) => {
        console.log(err)
        const message = err.response ? err.response.data.message : 'Not Created'
        alert(message)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ImageUpload
          register={registerUser}
          open={openDialog}
          handleClose={handleDialogClose}
        />
        <CssBaseline />
        <Grid
          container
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                margin: 'auto',
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Paper sx={{ px: 4, py: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    User Registration
                  </Typography>
                </Box>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="first"
                        value={user.name?.first}
                        onChange={handleNameChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="family-name"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="last"
                        value={user.name?.last}
                        onChange={handleNameChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="mobile"
                        label="Mobile"
                        name="mobile"
                        value={user.mobile}
                        onChange={handleChange}
                        autoComplete="mobile"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="#">Already have an account? Sign in</Link>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Register
