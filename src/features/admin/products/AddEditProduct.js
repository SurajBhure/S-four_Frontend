import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { useContext } from 'react'
import ProductForm from './ProductForm'
import ProductContext from './ProductContext'

const AddEditProduct = () => {
  const { handleDialogClose, openDialog, operation } = useContext(
    ProductContext,
  )
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>
          {operation == 'edit' ? 'Edit' : 'Add'} Product
        </DialogTitle>
        <DialogContent>
          <ProductForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddEditProduct
