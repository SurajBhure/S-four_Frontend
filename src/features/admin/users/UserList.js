import * as React from 'react'
import UserService from '../../../services/UserService'
import MUIDataTable from 'mui-datatables'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import UserContext from './UserContext'
import AddEditUser from './AddEditUser'
import Swal from 'sweetalert2'
import { useState } from 'react'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [operation, setOperation] = useState('add')
  const [openDialog, setOpendialog] = useState(false)
  const [initialUser, setInitialUser] = useState({})

  const handleDialogClose = () => {
    setOpendialog(false)
  }

  const loadUsers = (query = '?role=admin') => {
    UserService.fetchAllUsers(query)
      .then((response) => {
        setUsers(response?.data?.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  React.useEffect(() => {
    loadUsers()
  }, [])

  const addUser = () => {
    setInitialUser({})
    setOperation('add')
    setOpendialog(true)
  } //addUser

  const editUser = (user) => {
    setInitialUser(user)
    setOperation('edit')
    setOpendialog(true)
  } //editUser

  const deleteUser = (id) => {
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
            loadUsers()
            Swal.fire('Deleted!', 'User has been deleted.', 'success')
          })
          .catch((err) => {
            console.log(err)

            Swal.fire('Not Deleted!', 'User has not been deleted.', 'error')
          })
      }
    })
  } //deleteUser

  const columns = [
    {
      label: 'ID',
      name: 'userId',
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
          const user = users[index]
          return `${user?.name?.first} ${user?.name?.last}`
        },
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
      label: 'Email',
      name: 'email',
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
      label: 'Role',
      name: 'role',
      options: {
        sort: false,
        filter: true,
      },
    },
    {
      label: 'Status',
      name: 'status',
      options: {
        sort: true,
        filter: false,
        customBodyRenderLite: (index) => {
          const user = users[index]
          return user.status == 1 ? 'Active' : 'Inactive'
        },
      },
    },
    {
      label: 'Action',
      name: 'action',
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index) => {
          const user = users[index]
          return (
            <>
              <IconButton color="primary" onClick={() => editUser(user)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => deleteUser(user._id)}>
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
      <Button variant="contained" color="primary" onClick={() => addUser()}>
        New+
      </Button>
      <MUIDataTable title="User List" data={users} columns={columns} />;
      <UserContext.Provider
        value={{
          operation,
          initialUser,
          handleDialogClose,
          openDialog,
          loadUsers,
        }}
      >
        <AddEditUser />
      </UserContext.Provider>
    </>
  )
}

export default UserList
