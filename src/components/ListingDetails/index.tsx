import GMap from '../GMap'
import { Listing } from '@/types/listing'
import { formatUSDPrice } from '@/utils/helperFn'
import ApartmentIcon from '@mui/icons-material/Apartment'
import BathtubIcon from '@mui/icons-material/Bathtub'
import BedIcon from '@mui/icons-material/Bed'
import { Box, Grid, Tooltip, Typography } from '@mui/material'

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
        </Box>
        <Box>
          <Typography variant="h1">
            {formatUSDPrice(listing.listPrice)}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs>
        <Box width="100%" height={240}>
          <GMap
            coordinates={{ lat: listing.latitude, lng: listing.longitude }}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default ListingDetails
