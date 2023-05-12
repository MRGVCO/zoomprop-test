import FutureEstimatesLineGraph from '@/components/FutureEstimatesLineGraph'
import ListingDetails from '@/components/ListingDetails'
import PastEstimatesLineGraph from '@/components/PastEstimatesLineGraph'
import { getListingInfo } from '@/services/Listings'
import { Main } from '@/templates/Main'
import { Listing as IListing } from '@/types/listing'
import { Box, Container } from '@mui/material'
import { GetServerSidePropsContext } from 'next'

interface ListingProps {
  listing: IListing
}

const Listing = ({ listing }: ListingProps) => {
  return (
    <Main>
      <Container maxWidth="md">
        <ListingDetails listing={listing} />
        <Box mt={4}>
          <PastEstimatesLineGraph estimates={listing.estimateHistory} />
        </Box>
        <Box mt={4}>
          <FutureEstimatesLineGraph estimates={listing.estimatePrediction} />
        </Box>
      </Container>
    </Main>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { listingId } = context.query
  const listing = await getListingInfo(`${listingId}`)

  return {
    props: {
      listing,
    },
  }
}

export default Listing
