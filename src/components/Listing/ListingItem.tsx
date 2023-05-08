import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

function ListingItem({ listing, heading }: any) {
  return (
    <>
      <Box>
        <Typography variant="h3">{heading}</Typography>
        <Typography variant="h3">{listing ? listing : 'Owner'}</Typography>
      </Box>
      <Divider />
    </>
  )
}

export default ListingItem
