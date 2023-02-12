import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/AddAPhoto'
import { useState } from 'react'
import { useEffect } from 'react'

const Uploader = ({ handleChange, name, images }) => (
  <Box
    sx={{
      border: '1px solid #aaa',
      width: 100,
      height: 100,
      position: 'relative',
    }}
  >
    <IconButton sx={{ position: 'absolute', bottom: 0, left: 0, p: 0 }}>
      <label htmlFor="avatarupload">
        <AddIcon />
      </label>
    </IconButton>
    <input
      type="file"
      name={name}
      onChange={handleChange}
      accept=".jpg,.svg,.png,.webp,.jpeg"
      id="avatarupload"
      style={{ display: 'none' }}
    />
    <img src={images} style={{ width: '100%', height: '100%' }} alt="" />
  </Box>
)
const ImageUpload = ({ open, handleClose, register }) => {
  const [images, setImages] = useState({
    avatar: '',
  })

  const [strImages, setStrImages] = useState({
    avatar: '',
  })

  //binary to base64 (string) conversion
  useEffect(() => {
    if (images.avatar) {
      const fr = new FileReader()
      fr.addEventListener('load', (e) => {
        //string form mdhe converted image apn strImage state mdhe store keli
        setStrImages({ ...strImages, avatar: fr.result })
      })
      if (images.avatar) fr.readAsDataURL(images.avatar)
    }
  }, [images])

  const handleImageChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) setImages({ ...images, [name]: files[0] })
  }

  const handleRegistration = () => {
    console.log('Registration')
    register(images)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload images</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <h4>Avatar</h4>
            <Uploader
              handleChange={handleImageChange}
              name="avatar"
              images={strImages.avatar}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          disabled={!images.avatar}
          onClick={handleRegistration}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ImageUpload
