import { AppBar, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <NextLink href="/" passHref>
          <Link underline="none">
            <Typography variant="h4">😎 Listings</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}

export default Header
