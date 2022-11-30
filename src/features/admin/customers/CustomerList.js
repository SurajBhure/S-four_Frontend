import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import UserService from '../../../services/UserService'
import { useEffect } from 'react'
import { DeleteIcon, EditIcon } from '@mui/icons-material'
const CustomerList = () => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])

  const loadAllCustomers = (query = '?role=customer') => {
    UserService.fetchAllUser(query)
      .then((response) => {
        console.log('Customers: ', response?.data?.data)
        setCustomers(response?.data?.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  //loaded all customers in state when page rendered
  useEffect(() => {
    loadAllCustomers()
  }, [])

  //for adding new customer
  const addCustomer = () => {
    navigate('add-edit/0/add')
  }

  //for editing customer details
  const editCustomer = (customer) => {
    navigate(`add-edit/${customer._id}/edit`)
  }

  //for deleting customer from list
  const deleteCustomer = (id) => {
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
        UserService.deleteUser(id)
          .then((response) => {
            loadAllCustomers()
            Swal.fire('Deleted!', 'Customer has been deleted.', 'success')
          })
          .catch((err) => {
            console.log(err)

            Swal.fire('Not Deleted!', 'Customer has not been deleted.', 'error')
          })
      }
    })
  } //deleteCustomer

  const columns = [
    {
      label: 'ID',
      name: 'custId',
      options: {
        sort: true,
        filter: false,
      },
    },

    {
      label: 'Gender',
      name: 'gender',
      options: {
        sort: false,
        filter: true,
      },
    },
    {
      label: 'Email',
      name: 'email',
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: 'Mobile',
      name: 'mobile',
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: 'Name',
      name: 'name',
      options: {
        sort: true,
        filter: false,
        customBodyRenderLite: (index) => {
          const customer = customers[index]
          return `${customer?.name?.first} ${customer?.name?.last}`
        },
      },
    },

    {
      label: 'Status',
      name: 'status',
      options: {
        sort: true,
        filter: false,
        customBodyRenderLite: (index) => {
          const customer = customers[index]
          return customer.status == 1 ? 'Active' : 'Inactive'
        },
      },
    },
    {
      label: 'Actions',
      name: 'action',
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index) => {
          const customer = customers[index]
          return (
            <>
              <IconButton
                color="primary"
                onClick={() => editCustomer(customer)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => deleteCustomer(customer._id)}
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
      <Button variant="contained" color="primary" onClick={() => addCustomer()}>
        Add+
      </Button>

      <MUIDataTable title="Customer List" data={customers} columns={columns} />
    </>
  )
}

export default CustomerList
