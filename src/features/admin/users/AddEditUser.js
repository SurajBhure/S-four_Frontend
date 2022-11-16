import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import UserContext from './UserContext'
import UserForm from './UserForm'
import { useContext } from 'react'

const AddEditUser = () => {
  const { handleDialogClose, openDialog = false, operation } = useContext(
    UserContext,
  )
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>{operation == 'edit' ? 'Edit' : 'Add'} User</DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddEditUser
