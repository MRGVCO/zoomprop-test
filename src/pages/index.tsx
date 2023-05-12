import Condition from '@/components/Condition'
import GMap from '@/components/GMap'
import { getListings } from '@/services/Listings'
import { Main } from '@/templates/Main'
import { Listing } from '@/types/listing'
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Link,
} from '@mui/material'
import NextLink from 'next/link'
import { useState } from 'react'

interface IndexProps {
  listings: Listing[]
}

const Index = ({ listings }: IndexProps) => {
  const [coordinates, setCoordinates] = useState({
    lat: listings[0] ? listings[0].latitude : 38.68,
    lng: listings[0] ? listings[0].longitude : -101.07,
  })

  return (
    <Main title="Available listings">
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs>
            <Grid container spacing={1}>
              {listings.map((l) => (
                <Grid key={l.listingId} item xs={6}>
                  <NextLink
                    href={{
                      pathname: '/listing/[listingId]',
                      query: {
                        listingId: l.listingId,
                      },
                    }}
                    passHref
                  >
                    <Link underline="none">
                      <Card
                        onMouseEnter={() => {
                          setCoordinates({ lat: l.latitude, lng: l.longitude })
                        }}
                        sx={{
                          '& .listingImage': {
                            display: 'block',
                            transition: 'all .2s',
                          },
                          '&:hover': {
                            '& .listingImage': {
                              transform: 'scale(1.1)',
                            },
                          },
                        }}
                      >
                        <Box>
                          <Box sx={{ overflow: 'hidden' }}>
                            <img
                              className="listingImage"
                              src={l.primaryImageUrl}
                              width="100%"
                            />
                          </Box>
                          <CardContent sx={{ padding: 2, height: 180 }}>
                            <Box
                              display="flex"
                              flexDirection="column"
                              height="100%"
                            >
                              <Typography>
                                {l.streetAddress}, {l.city}, {l.state}
                              </Typography>
                              <Condition match={!!l.agent}>
                                <Box mt="auto">
                                  <Typography variant="subtitle2">
                                    By {l.agent}
                                  </Typography>
                                </Box>
                              </Condition>
                            </Box>
                          </CardContent>
                        </Box>
                      </Card>
                    </Link>
                  </NextLink>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item sx={{ width: 300, display: { xs: 'none', md: 'block' } }}>
            <Box position="fixed">
              <Box
                sx={{
                  height: 300,
                  width: 300,
                }}
              >
                <GMap coordinates={coordinates} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Main>
  )
}

export const getServerSideProps = async () => {
  const listings = await getListings()

  return {
    props: {
      listings,
    },
  }
}

export default Index
