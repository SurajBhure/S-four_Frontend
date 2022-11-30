import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddEditProduct from './AddEditProduct'
import ProductList from './ProductList'

const Product = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<ProductList />} />
        <Route path="add-edit/:id/:op" element={<AddEditProduct />} />
      </Routes>
    </>
  )
}

export default Product
