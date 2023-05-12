import Header from '@/components/Header'
import { Box } from '@mui/material'
import Head from 'next/head'
import { PropsWithChildren } from 'react'

interface MainProps extends PropsWithChildren {
  title?: string
}

const Main = ({ children, title }: MainProps) => {
  const slogan = 'Some Company Inc.'
  return (
    <Box>
      <Head>
        <title>{title ? `${title} - ${slogan}` : slogan}</title>
      </Head>
      <Header />
      <Box my={2}>{children}</Box>
    </Box>
  )
}

export { Main }
