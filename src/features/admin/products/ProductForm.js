import * as React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Formik } from 'formik'
import * as yup from 'yup'

import FormControl from '@mui/material/FormControl'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Card, Container, Divider, IconButton } from '@mui/material'
import UploadIcon from '@mui/icons-material/UploadFile'
import DeleteIcon from '@mui/icons-material/Delete'
import { useContext } from 'react'
import ProductContext from './ProductContext'
import ProductService from '../../../services/ProductService'
import { useState } from 'react'
import { endpoints } from '../../../api'
import { useParams } from 'react-router-dom'

const ImageUpload = ({ name, src, handleDelete }) => (
  <Box
    component="figure"
    sx={{
      margin: 0.5,
      border: '1px solid #999',
      width: 80,
      height: 80,
      position: 'relative',
    }}
  >
    <img
      style={{ width: '100%', height: '100%' }}
      src={
        src
          ? src
          : `https://youthcrisiscenter.org/wp-content/uploads/2017/05/profile_placeholder.jpg`
      }
    />

    {src && (
      <IconButton
        onClick={handleDelete}
        sx={{ position: 'absolute', left: -13, top: 48 }}
        color="error"
      >
        <label htmlFor={name}>
          <DeleteIcon />
        </label>
      </IconButton>
    )}
  </Box>
)

const productSchema = yup.object().shape({
  name: yup.string().required(),
  status: yup.number(),
  brand: yup.string(),
  price: yup.number().required(),
  quantity: yup.number(),
  category: yup.string(),
})

const ProductForm = () => {
  const { id } = useParams()
  const [hasUpdated, setHasUpdated] = useState(false)
  const [images, setImages] = useState([])
  const [strImages, setStrImages] = useState([])
  // const [sizes, setSizes] = useState([])
  // const [colors, setColors] = useState([])
  const [initialValues, setInitialValues] = useState({
    _id: '',
    productNumber: '',
    name: '',
    brand: '',
    category: '',
    price: '',
    quantity: '',
    features: '',
    images: [],
    sizes: [],
    colors: [],
    status: 1,
  })

  const {
    initialProduct,
    handleDialogClose,
    operation,
    loadAllProducts,
  } = useContext(ProductContext)

  //for image handle part
  //for reading and converting multiple files into base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const tobase64Handler = async (arr) => {
    const filePathsPromises = []
    arr &&
      Array.from(arr).forEach((file) => {
        filePathsPromises.push(toBase64(file))
      })
    const filePaths = await Promise.all(filePathsPromises)
    // const mappedFiles = filePaths.map((base64File) => base64File);
    // setStrImages(mappedFiles);
    setStrImages(filePaths) //base64 converted images stored in strImage state
    // console.log("files: ", filePaths); //base64( string images)
  }

  const handleImageChange = (e) => {
    const { files } = e?.target
    let arr = []
    if (files) {
      arr = [...images, ...files]
      arr = arr.slice(0, 3)
      setImages(arr)
    }
    tobase64Handler(arr)
  } // handleImageChange

  const handleImageDelete = (index) => {
    const imgArr = [...images]
    imgArr.splice(index, 1)
    setImages(imgArr)
    // console.log("files: ", images);
    const imgStrArr = [...strImages]
    imgStrArr.splice(index, 1)
    setStrImages(imgStrArr)
    // console.log("files: ", strImages);
  } // handleImageDelete

  const loadSingleProduct = () => {
    if (operation == 'edit')
      ProductService.fetchOneProduct(id)
        .then((response) => {
          //get single product detail
          const product = response.data.data
          console.log(response.data.data)
          //stored detail in initialValues
          setInitialValues(product)

          //get array of images from product object
          const images = product.images

          if (images && images.length > 0) {
            let allPromises = []

            for (const img of images) {
              //url string format mdhe ahe blob mdhe convert krych
              const p = fetch(`${endpoints.serverBaseUrl}/${img}`).then((res) =>
                res.blob(),
              )
              allPromises.push(p)
            }
            //Promise.all used for all promises settlement and return single promise instead all promises which contains all promises data
            Promise.all(allPromises).then(async (promises) => {
              const arr = await promises
              console.log('Arr Pro', arr)
              setImages(arr)
              tobase64Handler(arr)
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
  }

  React.useEffect(() => {
    loadSingleProduct()
  }, [id])

  const checkDiff = (values, oldValues) => {
    const newValKeys = Object.keys(values)
    const oldValKeys = Object.keys(oldValues)
    // let changed = false;

    for (const prop of newValKeys) {
      const newVal = values[prop]
      const oldVal = oldValues[prop]

      // console.log(newVal + "->" + oldVal);

      if (typeof newVal == 'object') {
        for (const prop of Object.keys(newVal)) {
          const nv = newVal[prop]
          const ov = oldVal[prop]

          if (nv != ov) {
            setHasUpdated(true)
            return
          }
        }
      } else if (newVal && newVal != oldVal) {
        setHasUpdated(true)
        return
      }
    }
    setHasUpdated(false)
  }

  const handleSubmit = (values) => {
    // console.log("Product: ", product);

    const fd = new FormData()

    if (operation == 'edit') {
      //edit operation
      if (initialValues.productNumber != values.productNumber)
        fd.append('productNumber', values?.productNumber)

      if (initialValues.name != values.name) fd.append('name', values?.name)

      if (initialValues.brand != values.brand) fd.append('brand', values?.brand)

      if (initialValues.category != values.category)
        fd.append('category', values?.category)

      if (initialValues.price != values.price) fd.append('price', values?.price)

      if (initialValues.quantity != values.quantity)
        fd.append('quantity', values?.quantity)

      if (initialValues.status != values.status)
        fd.append('status', values?.status)

      if (initialValues.features != values.features)
        fd.append('features', values?.features)

      for (const img of images) fd.append('images', img)

      //edit operation
      ProductService.updateProduct(values?._id, fd)
        .then((response) => {
          const product = alert('Product updated...')
        })
        .catch((err) => {
          alert('Product not updated...')
        })
    } else {
      //add / create product
      //add operation

      fd.append('productNumber', values?.productNumber)
      fd.append('name', values?.name)
      fd.append('brand', values?.brand)
      fd.append('category', values?.category)
      fd.append('price', values?.price)
      fd.append('quantity', values?.quantity)
      fd.append('status', values?.status)
      fd.append('features', values?.features)

      for (const img of images) fd.append('images', img)

      ProductService.createProduct(fd)
        .then((response) => {
          alert('Product created')
          console.table(response.data.data)
          loadAllProducts()
          handleDialogClose()
        })
        .catch((err) => {
          alert('Product not created......')
          console.error(err)
        })
    }
  }

  return (
    <Container>
      <Box
        component="h3"
        sx={{
          backgroundColor: 'palegreen',
          padding: '3px 10px',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        {operation == 'edit' ? 'Edit' : 'Add'} Product
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Card sx={{ padding: 3 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={productSchema}
              onSubmit={handleSubmit}

              // onSubmit={(values) => {
              //   console.log("Product: ", values);
              // }}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Name"
                        name="name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e)
                          checkDiff(
                            { ...values, name: e.target.value },
                            initialValues,
                          )
                        }}
                        error={touched?.name && errors?.name ? true : false}
                        helperText={touched?.name && errors?.name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Product Number"
                        name="productNumber"
                        value={values.productNumber}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e)
                          checkDiff(
                            { ...values, productNumber: e.target.value },
                            initialValues,
                          )
                        }}
                        error={
                          touched?.productNumber && errors?.productNumber
                            ? true
                            : false
                        }
                        helperText={
                          touched?.productNumber && errors?.productNumber
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Brand"
                        name="brand"
                        value={values.brand}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e)
                          checkDiff(
                            { ...values, brand: e.target.value },
                            initialValues,
                          )
                        }}
                        error={touched?.brand && errors?.brand ? true : false}
                        helperText={touched?.brand && errors?.brand}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Price"
                        name="price"
                        value={values.price}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e)
                          checkDiff(
                            { ...values, price: e.target.value },
                            initialValues,
                          )
                        }}
                        error={touched?.price && errors?.price ? true : false}
                        helperText={touched?.price && errors?.price}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Category"
                        name="category"
                        value={values.category}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e)
                          checkDiff(
                            { ...values, category: e.target.value },
                            initialValues,
                          )
                        }}
                        error={
                          touched?.category && errors?.category ? true : false
                        }
                        helperText={touched?.category && errors?.category}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                          labelId="status"
                          id="status"
                          value={values.status}
                          label="Status"
                          name="status"
                          onChange={(e) => {
                            handleChange(e)
                            checkDiff(
                              { ...values, status: e.target.value },
                              initialValues,
                            )
                          }}
                        >
                          <MenuItem value={1}>Active</MenuItem>
                          <MenuItem value={0}>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} container justifyContent="space-evenly">
                      <Divider />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={
                          operation == 'edit' && !hasUpdated ? true : false
                        }
                      >
                        {operation == 'edit' ? 'Update' : 'Create'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              {Array.isArray(strImages) &&
                strImages.map((image, i) => {
                  return (
                    <Grid item xs={12} md={6} key={i}>
                      <ImageUpload
                        name={i}
                        src={image}
                        handleDelete={() => handleImageDelete(i)}
                      />
                    </Grid>
                  )
                })}

              {images.length < 3 && (
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      border: '1px solid #999',
                      width: 80,
                      height: 80,
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#eee',
                    }}
                  >
                    <IconButton>
                      <label htmlFor={'upload'}>
                        <UploadIcon />
                      </label>
                    </IconButton>
                    <input
                      style={{ display: 'none' }}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      id="upload"
                      name="upload"
                      onChange={handleImageChange}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductForm
