import Header from '@/components/Header'
import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

const Main = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <Header />
      <Box my={2}>{children}</Box>
    </Box>
  )
}

export { Main }
