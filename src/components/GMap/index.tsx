import PlaceIcon from '@mui/icons-material/Place'
import { Box } from '@mui/material'
import GoogleMapReact from 'google-map-react'

interface GMapProps {
  coordinates: {
    lat: number
    lng: number
  }
}

interface IconWrapProps {
  lat: number
  lng: number
}
// @ts-ignore
const IconWrap = (props: IconWrapProps) => {
  return (
    <Box>
      <PlaceIcon color="error" />
    </Box>
  )
}

const GMap = ({ coordinates }: GMapProps) => {
  return (
    <Box position="fixed">
      <Box
        sx={{
          height: 300,
          width: 300,
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyBO2I_RBjLCMFC9WZ4d6oIKOSqhWj7h8i8',
          }}
          defaultCenter={{
            lat: 38.68,
            lng: -101.07,
          }}
          defaultZoom={13}
          center={coordinates}
        >
          <IconWrap lat={coordinates.lat} lng={coordinates.lng} />
        </GoogleMapReact>
      </Box>
    </Box>
  )
}

export default GMap
