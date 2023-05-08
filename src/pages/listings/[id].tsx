import { getListing } from '../../services/Listing'
import ListingItem from '@/components/Listing/ListingItem'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Paper, Stack, styled, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import itemStyles from "../../../src/components/Listing/ItemStyles"

interface Props {
  listing: any
}

const PaperItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Listing: NextPage<Props> = ({ listing }) => {
  const router = useRouter()

  const src = `${listing[0].primaryImageUrl}`

  return (
    <Main meta={<Meta title="title" description="description" />}>
      <Box sx={itemStyles.container}>
        <Box sx={itemStyles.header}>
          <ArrowBackIcon
            sx={itemStyles.backIcon}
            onClick={() => {
              // Return to the previous page
              router.back()
            }}
          />
          <Typography
            sx={itemStyles.title}
            onClick={() => {
              router.back()
            }}
            variant="h3"
          >
            Back
          </Typography>
        </Box>

        <Typography sx={itemStyles.propertyDetailsTitle} variant="h2">
          Property Details
        </Typography>
        <Box sx={itemStyles.propertyDetailsContainer}>
          <Box sx={itemStyles.imageContainer}>
            <Image
              src={src}
              unoptimized={true}
              priority={true}
              loader={() => src}
              alt="house"
              width={500}
              height={400}
            />
          </Box>
          <Box sx={itemStyles.listingDetailsContainer}>
            <ListingItem listing={listing[0].agent} heading="Agent" />
            <ListingItem
              listing={listing[0].annualRevenue}
              heading="Annual Revenue"
            />
            <ListingItem
              listing={listing[0].averageDailyRate}
              heading="Average Daily Rate"
            />
            <ListingItem listing={listing[0].baths} heading="Baths" />
            <ListingItem listing={listing[0].bathsFull} heading="Baths Full" />
            <ListingItem listing={listing[0].beds} heading="beds" />
            <ListingItem
              listing={listing[0].capRate.toFixed(3)}
              heading="Cap Rate"
            />

            <ListingItem listing={listing[0].city} heading="City" />
            <ListingItem listing={listing[0].created} heading="Created" />
          </Box>
        </Box>
        <Typography sx={itemStyles.moreInfoTitle} variant="h2">
          More Info
        </Typography>
        <Box sx={itemStyles.moreInfoContainer}>
          <Stack spacing={1.5}>
            <PaperItem>
              Average Daily Rate = {listing[0].averageDailyRate}
            </PaperItem>
            <PaperItem>Living Area = {listing[0].livingArea}</PaperItem>
            <PaperItem>Zip Code = {listing[0].zipcode}</PaperItem>
            <PaperItem>Property Type = {listing[0].propertyType}</PaperItem>
            <PaperItem>
              Market Estimated Rate = {listing[0].marketEstimate}
            </PaperItem>
            <PaperItem>Year Build = {listing[0].yearBuilt}</PaperItem>
            <PaperItem>Lot Area = {listing[0].lotArea}</PaperItem>
            <PaperItem>Latitude = {listing[0].latitude}</PaperItem>
            <PaperItem>Longitude = {listing[0].longitude}</PaperItem>
          </Stack>
        </Box>
      </Box>
    </Main>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const id = context.params?.id as string // access the id parameter from context.params
  const listing = await getListing(id)
  return {
    props: {
      listing,
    },
  }
}

export default Listing
