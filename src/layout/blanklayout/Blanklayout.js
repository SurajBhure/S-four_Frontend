import React from 'react'
import Product from '../../features/admin/products/Product'
import Users from '../../features/admin/users/Users'
import Register from '../../Register'
import Headers from './Headers'

const Blanklayout = () => {
  return (
    <>
      <div>
        <Headers />
      </div>
      <div>
        {/* <Register /> */}
        <Product />
        {/* <Users /> */}
      </div>
    </>
  )
}

export default Blanklayout
