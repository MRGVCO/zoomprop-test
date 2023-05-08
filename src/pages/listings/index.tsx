import { getListings } from '../../services/Listings'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import { Box, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'

interface Listing {
  listingId: string
  city: string
  state: string
  stories: number
  streetAddress: string
  yearBuilt: number
  primaryImageUrl: string
}

interface Column {
  id: keyof Listing
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  url?: string
}

const columns: readonly Column[] = [
  { id: 'city', label: 'City', minWidth: 170 },
  { id: 'state', label: 'State', minWidth: 100 },
  {
    id: 'stories',
    label: 'Stories',
    minWidth: 10,
    align: 'center',
  },
  {
    id: 'streetAddress',
    label: 'Street Address',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'primaryImageUrl',
    label: 'Image',
    minWidth: 170,
    align: 'center',
    url: 'primaryImageUrl',
  },
  {
    id: 'yearBuilt',
    label: 'Year Built',
    minWidth: 170,
    align: 'right',
  },
]

function Index() {
  const router = useRouter()

  const [listings, setListings] = useState<Listing[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await getListings()
      setListings(result)
    }
    fetchData()
  }, [])

  const handleRowClick = (listingId: string) => {
    // Redirect to listing page
    router.push(`/listings/${listingId}`)
  }
  // Memoize table header row for performance
  const tableHeaderRow = useMemo(() => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    )
  }, [columns])

  return (
    <Main meta={<Meta title="title" description="description" />}>
      <Box
        sx={{
          // Making table in center, keeping sidebar on left
          marginRight: '65px',
        }}
      >
        <Typography mb={5} variant="h2">
          Properties Available
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>{tableHeaderRow}</TableHead>
              <TableBody>
                {listings.map((row: any) => {
                  return (
                    <TableRow
                      sx={{
                        cursor: 'pointer',
                      }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.listingId}
                      // sending listingId to handleRowClick function
                      onClick={() => handleRowClick(row.listingId)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id]
                        // Check if column is has image url to render image
                        return column.id === 'primaryImageUrl' ? (
                          <TableCell key={column.id} align={column.align}>
                            <NextLink
                              target="_blank"
                              href={`${row.primaryImageUrl}`}
                            >
                              <Image
                                unoptimized={true}
                                src={value}
                                loader={() => value}
                                alt="listing"
                                width={110}
                                height={90}
                                // For stopping event propagation to parent element
                                onClick={(event) => event.stopPropagation()}
                              />
                            </NextLink>
                          </TableCell>
                        ) : (
                          // Render text
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Main>
  )
}

export default Index
