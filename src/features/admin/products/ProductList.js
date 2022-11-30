import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Swal from 'sweetalert2'

import ProductService from '../../../services/ProductService'
import MUIDataTable from 'mui-datatables'
import ProductContext from './ProductContext'
import AddEditProduct from './AddEditProduct'

const ProductList = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [operation, setOperation] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [initialProduct, setInitialProduct] = useState({})

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const loadAllProducts = () => {
    ProductService.getAllProducts()
      .then((response) => {
        setProducts(response?.data?.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    loadAllProducts()
  }, [])

  const addProduct = () => {
    setInitialProduct({})
    setOperation('add')
    setOpenDialog(true)
  } //addProduct

  const editProduct = (product) => {
    setInitialProduct(product)
    setOperation('edit')
    setOpenDialog(true)
  } //editProduct

  const deleteProduct = (id) => {
    console.log('Id: ', id)

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        ProductService.deleteProduct(id)
          .then((response) => {
            loadAllProducts()
            Swal.fire('Deleted!', 'Product has been deleted.', 'success')
          })
          .catch((err) => {
            console.log(err)

            Swal.fire('Not Deleted!', 'Product has not been deleted.', 'error')
          })
      }
    })
  } //deleteProduct

  //product list tables columns
  const columns = [
    {
      label: 'ID',
      name: 'prodId',
    },

    {
      label: 'Name',
      name: 'name',
    },
    {
      label: 'Brand',
      name: 'brand',
    },
    {
      label: 'Price',
      name: 'price',
    },
    {
      label: 'Stock',
      name: 'stock',
    },
    {
      label: 'Category',
      name: 'category',
    },

    {
      label: 'Status',
      name: 'status',
      options: {
        customBodyRenderLite: (index) => {
          const product = products[index]
          return product?.status == 1 ? 'Active' : 'Inactive'
        },
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        customBodyRenderLite: (index) => {
          const product = products[index]
          return (
            <>
              <IconButton color="primary" onClick={() => editProduct(product)}>
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => deleteProduct(product._id)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )
        },
      },
    },
  ]

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => addProduct()}>
        Add+
      </Button>
      <MUIDataTable title="Product List" data={products} columns={columns} />;
      <ProductContext.Provider
        value={{
          loadAllProducts,
          handleDialogClose,
          openDialog,
          operation,
          initialProduct,
        }}
      >
        <AddEditProduct />
      </ProductContext.Provider>
    </>
  )
}

export default ProductList
