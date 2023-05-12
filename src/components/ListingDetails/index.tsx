import GMap from '../GMap'
import { Listing } from '@/types/listing'
import { formatUSDPrice } from '@/utils/helperFn'
import { convertToPercentage, formatPercentage } from '@/utils/listing'
import ApartmentIcon from '@mui/icons-material/Apartment'
import BathtubIcon from '@mui/icons-material/Bathtub'
import BedIcon from '@mui/icons-material/Bed'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material'

interface ListingDetailsProps {
  listing: Listing
}

const ListingDetails = ({ listing }: ListingDetailsProps) => {
  console.log(listing)
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <img
          src={listing.primaryImageUrl}
          width="100%"
          style={{ borderRadius: 8 }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography variant="h2">{listing.streetAddress}</Typography>
          <Typography variant="h5">
            {listing.city}, {listing.state}
          </Typography>
          <Typography variant="h5">{listing.zipcode}</Typography>
        </Box>
        <Box display="flex">
          <Tooltip title="Beds">
            <Box display="flex" alignItems="center" mr={1}>
              <BedIcon sx={{ width: 20 }} />
              <Typography ml={1}>{listing.beds}</Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Baths">
            <Box display="flex" alignItems="center" mr={1}>
              <BathtubIcon sx={{ width: 20 }} />
              <Typography ml={1}>{listing.baths}</Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Year built">
            <Box display="flex" alignItems="center" mr={1}>
              <ApartmentIcon sx={{ width: 20 }} />
              <Typography ml={1}>{listing.yearBuilt}</Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Area ft&sup2;">
            <Box display="flex" alignItems="center" mr={1}>
              <SquareFootIcon sx={{ width: 20 }} />
              <Typography ml={1}>{listing.livingArea}</Typography>
            </Box>
          </Tooltip>
        </Box>
        <Box>
          <Typography variant="h1">
            {formatUSDPrice(listing.listPrice)}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box width="100%" height={240}>
          <GMap
            coordinates={{ lat: listing.latitude, lng: listing.longitude }}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography>Year over year growth</Typography>
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={3}>
                    <Typography>1 year</Typography>
                    <Typography>
                      {formatPercentage(convertToPercentage(listing.yoy1))}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>3 year</Typography>
                    <Typography>
                      {formatPercentage(convertToPercentage(listing.yoy3))}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>5 year</Typography>
                    <Typography>
                      {formatPercentage(convertToPercentage(listing.yoy5))}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>10 year</Typography>
                    <Typography>
                      {formatPercentage(convertToPercentage(listing.yoy10))}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography>Appreciation</Typography>
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={4}>
                    <Typography>Past month</Typography>
                    <Typography>
                      {formatPercentage(convertToPercentage(listing.months1))}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Past 3 months</Typography>
                    <Typography>
                      {formatPercentage(convertToPercentage(listing.months3))}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Past 6 months</Typography>
                    <Typography>
                      {formatPercentage(convertToPercentage(listing.months6))}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Next month</Typography>
                    <Typography>
                      {formatPercentage(
                        convertToPercentage(listing.nextMonths1),
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Next 3 months</Typography>
                    <Typography>
                      {formatPercentage(
                        convertToPercentage(listing.nextMonths3),
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Next 6 months</Typography>
                    <Typography>
                      {formatPercentage(
                        convertToPercentage(listing.nextMonths6),
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ListingDetails
