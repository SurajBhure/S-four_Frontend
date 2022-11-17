import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddEditCustomer from './AddEditCustomer'
import CustomerList from './CustomerList'
const Customers = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<CustomerList />} />
        <Route path="add-edit/:id/:op" element={<AddEditCustomer />} />
      </Routes>
    </>
  )
}

export default Customers
