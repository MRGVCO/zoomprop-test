import { Listing } from '@/types/listing'
import ApartmentIcon from '@mui/icons-material/Apartment'
import BathtubIcon from '@mui/icons-material/Bathtub'
import BedIcon from '@mui/icons-material/Bed'
import { Box, Tooltip, Typography } from '@mui/material'

interface ListingDetailsProps {
  listing: Listing
}

const ListingDetails = ({ listing }: ListingDetailsProps) => {
  return (
    <Box id="description" display="flex">
      <img
        src={listing.primaryImageUrl}
        height={240}
        style={{ borderRadius: 8 }}
      />
      <Box id="descriptionText" ml={2}>
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
      </Box>
    </Box>
  )
}

export default ListingDetails
